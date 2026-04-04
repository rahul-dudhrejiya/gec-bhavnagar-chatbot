import { useState, useEffect, useRef, useCallback } from 'react'
import {
  ArrowLeft, Send, RefreshCw, Search, GraduationCap, ExternalLink,
  Sparkles, Clock, X, Mic, ChevronDown, Info
} from 'lucide-react'
import { sendChat } from '../services/api'

// ─── Simple Markdown renderer ──────────────────────────────────────────────────
function renderMarkdown(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    // Bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) => {
      if (/^\*\*[^*]+\*\*$/.test(p)) {
        return <strong key={j} className="text-blue-200 font-bold">{p.slice(2,-2)}</strong>
      }
      // URLs
      const urlParts = p.split(/(https?:\/\/[^\s]+)/g).map((u, k) => {
        if (/^https?:\/\//.test(u)) {
          return (
            <a key={k} href={u} target="_blank" rel="noreferrer"
              className="text-blue-400 underline decoration-blue-400/50 hover:text-blue-300 inline-flex items-center gap-1">
              {u}<ExternalLink size={10} className="inline"/>
            </a>
          )
        }
        return u
      })
      return <span key={j}>{urlParts}</span>
    })
    return <div key={i} className={line.startsWith('•') ? 'pl-2' : ''}>{parts}</div>
  })
}

// ─── Category badge config ─────────────────────────────────────────────────────
const CATEGORY_STYLE = {
  greeting:        { bg:'bg-blue-500/20',   text:'text-blue-400',   label:'Greeting'    },
  college_info:    { bg:'bg-indigo-500/20', text:'text-indigo-300', label:'College Info' },
  branches:        { bg:'bg-violet-500/20', text:'text-violet-300', label:'Branches'    },
  branch_info:     { bg:'bg-purple-500/20', text:'text-purple-300', label:'Branch Info' },
  faculty:         { bg:'bg-cyan-500/20',   text:'text-cyan-300',   label:'Faculty'     },
  subjects:        { bg:'bg-sky-500/20',    text:'text-sky-300',    label:'Academics'   },
  placement:       { bg:'bg-green-500/20',  text:'text-green-300',  label:'Placement'   },
  holiday:         { bg:'bg-yellow-500/20', text:'text-yellow-300', label:'Holidays'    },
  gtu_result:      { bg:'bg-emerald-500/20',text:'text-emerald-300',label:'GTU Result'  },
  gtu_papers:      { bg:'bg-teal-500/20',   text:'text-teal-300',   label:'GTU Papers'  },
  gtu_portal:      { bg:'bg-lime-500/20',   text:'text-lime-300',   label:'GTU Portal'  },
  gtu_exam:        { bg:'bg-amber-500/20',  text:'text-amber-300',  label:'GTU Exam'    },
  academics:       { bg:'bg-orange-500/20', text:'text-orange-300', label:'Academics'   },
  fees_scholarship:{ bg:'bg-rose-500/20',   text:'text-rose-300',   label:'Scholarship' },
  contact:         { bg:'bg-pink-500/20',   text:'text-pink-300',   label:'Contact'     },
  notice:          { bg:'bg-red-500/20',    text:'text-red-300',    label:'Notice'      },
  small_talk:      { bg:'bg-slate-500/20',  text:'text-slate-400',  label:'Chat'        },
  fallback:        { bg:'bg-slate-600/20',  text:'text-slate-400',  label:'Info'        },
}

const DEFAULT_SUGGESTIONS = [
  'About GEC Bhavnagar','CE Branch','IT Branch','Placement Stats',
  'Holiday List','GTU Results','Question Papers','College Timing',
]

// ─── Message Bubble ────────────────────────────────────────────────────────────
function Message({ msg, onSuggestionClick }) {
  const isBot  = msg.sender === 'bot'
  const cat    = CATEGORY_STYLE[msg.category] || CATEGORY_STYLE.small_talk
  const timeStr = new Date(msg.timestamp).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })

  return (
    <div className={`flex ${isBot?'justify-start':'justify-end'} animate-slide-up`}>
      <div className={`max-w-[88%] md:max-w-[80%] ${isBot?'':'flex flex-col items-end'}`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? 'bg-slate-800/90 border border-white/8 text-slate-100 rounded-tl-sm'
            : 'bg-blue-600 text-white rounded-tr-sm'
        }`}>
          {isBot && msg.category && (
            <div className={`inline-flex items-center gap-1 ${cat.bg} ${cat.text} text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full mb-2`}>
              <Sparkles size={8}/> {cat.label}
            </div>
          )}
          <div className="whitespace-pre-wrap break-words leading-[1.65]">
            {isBot ? renderMarkdown(msg.text) : msg.text}
          </div>
        </div>

        {/* Suggestion chips under bot messages */}
        {isBot && msg.suggestions?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {msg.suggestions.map((s,i) => (
              <button key={i} onClick={() => onSuggestionClick(s)}
                className="text-[11px] font-medium bg-slate-800 hover:bg-blue-600 border border-white/8 hover:border-blue-500 text-slate-300 hover:text-white px-3 py-1 rounded-full transition-all">
                {s}
              </button>
            ))}
          </div>
        )}

        <div className={`text-[10px] mt-1.5 px-1 font-medium ${isBot?'text-slate-600':'text-blue-300 text-right'}`}>
          {timeStr}
        </div>
      </div>
    </div>
  )
}

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="bg-slate-800/90 border border-white/8 px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full typing-dot"/>
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full typing-dot"/>
        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full typing-dot"/>
        <span className="text-xs text-slate-500 ml-1">GEC Assistant is typing…</span>
      </div>
    </div>
  )
}

// ─── MAIN CHATWINDOW ──────────────────────────────────────────────────────────
export default function ChatWindow({ onBack, initialMessage }) {
  const [messages, setMessages]   = useState([])
  const [input, setInput]         = useState('')
  const [isTyping, setIsTyping]   = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOffline, setIsOffline] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef       = useRef(null)

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior:'smooth' })

  useEffect(() => { scrollToBottom() }, [messages, isTyping])

  // Boot message
  useEffect(() => {
    const boot = {
      id: 'boot', sender:'bot', timestamp:new Date(),
      category:'greeting',
      text:'🎓 **Jai GEC Bhavnagar!**\n\nHello! I am your **GEC Bhavnagar College Assistant**.\n\nI can help you with branch info, faculty, GTU results, placements, holidays and much more.\n\nWhat would you like to know?',
      suggestions: DEFAULT_SUGGESTIONS,
    }
    setMessages([boot])

    // If landing page passed a topic, auto-send it
    if (initialMessage) {
      setTimeout(() => handleSend(initialMessage), 600)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const FALLBACK_RESPONSES = {
    'about gec bhavnagar': '🏛️ **Government Engineering College, Bhavnagar**\n\n📍 Vidyanagar, Bhavnagar, Gujarat – 364002\n🗓️ Established: 1963\n🎓 Affiliated: Gujarat Technological University (GTU)\n✅ Approved: AICTE, Govt. of Gujarat\n🌐 https://www.gecbhavnagar.ac.in\n\n**Branches:** CE · IT · ICT · MECH · CIVIL · EC\n**Total Intake:** ~330 students/year',
    'gtu results': '📊 **GTU Results**\n\n🔗 Check here: https://gturesults.in/\n\nEnter your Enrollment Number → Select Semester → View Results',
    'holiday list': '📅 **Holiday Calendar 2025-26**\n\n🇮🇳 15 Aug – Independence Day\n🇮🇳 02 Oct – Gandhi Jayanti\n🪔 20-21 Oct – Diwali\n🎊 14 Jan 2026 – Uttarayan\n🎊 02 Mar 2026 – Holi\n🇮🇳 26 Jan 2026 – Republic Day\n\n⏰ College: 10:45 AM – 5:45 PM\n2nd & 4th Saturdays are holidays',
    'placement stats': '💼 **Placement 2024-25**\n\n• Total Placed: 187 students\n• Highest Package: ₹12 LPA (CE)\n• Average Package: ₹4.2 LPA\n• Total Companies: 28\n• Overall Placement: 70%\n\n**Top Companies:** TCS · Infosys · Wipro · L&T · Capgemini · HCL',
    'college timing': '⏰ **College Timings**\n\n• Weekdays: 10:45 AM – 5:45 PM\n• 1st/3rd/5th Saturday: 10:45 AM – 5:45 PM\n• 2nd & 4th Saturday: HOLIDAY\n• Sunday: HOLIDAY',
  }

  const getOfflineResponse = (msg) => {
    const lower = msg.toLowerCase()
    for (const [key, resp] of Object.entries(FALLBACK_RESPONSES)) {
      if (lower.includes(key.split(' ')[0])) return { text: resp, category: 'college_info', suggestions: DEFAULT_SUGGESTIONS }
    }
    if (lower.includes('ce') || lower.includes('computer')) return {
      text:'🏛️ **Computer Engineering (CE)**\n\nHOD: Dr. Hardik Molia\nIntake: 60 seats\nHighest Package: ₹12 LPA\n\nFaculty: Dr. Hardik Molia, Mr. K.P. Kandoriya, Mr. Ashish Nimavat, Mr. Chinmay Vyas, Prof. H.S. Sanghavi, Mr. Kirit Rathod',
      category:'branch_info', suggestions:['CE faculty','CE subjects','CE placement','IT details']
    }
    if (lower.includes('it') && !lower.includes('ict')) return {
      text:'🏛️ **Information Technology (IT)**\n\nHOD: Mr. Shailesh Molia\nIntake: 60 seats\nHighest Package: ₹10 LPA\n\nFaculty: Shailesh Molia, Anoop Patel, Jayesh Rathod, Sweta Garasia, Nishidh Chavda, Virendra Barot, Bharat Vainsh',
      category:'branch_info', suggestions:['IT faculty','IT subjects','IT placement','CE details']
    }
    return {
      text:'⚠️ **Backend Offline**\n\nThe server is not running. Please:\n1. Start backend: `cd backend && npm run dev`\n2. Start MongoDB\n3. Refresh page\n\nBasic info available offline. Type: "about gec", "holiday list", "placement stats", "gtu results"',
      category:'fallback', suggestions:['About GEC','Holiday list','Placement stats','GTU results']
    }
  }

  const handleSend = useCallback(async (textToSend) => {
    const text = (textToSend || input).trim()
    if (!text || isTyping) return

    const userMsg = { id: Date.now().toString(), sender:'user', text, timestamp:new Date() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)
    inputRef.current?.focus()

    try {
      const res = await sendChat(text)
      setIsOffline(false)
      const botMsg = {
        id: (Date.now()+1).toString(), sender:'bot',
        text: res.response,
        category: res.category,
        suggestions: res.suggestions?.length ? res.suggestions : DEFAULT_SUGGESTIONS,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMsg])
    } catch (err) {
      setIsOffline(true)
      const fallback = getOfflineResponse(text)
      const botMsg = {
        id: (Date.now()+1).toString(), sender:'bot',
        text: fallback.text,
        category: fallback.category,
        suggestions: fallback.suggestions,
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMsg])
    } finally { setIsTyping(false) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, isTyping])

  const handleReset = () => {
    setMessages([{
      id:'reset', sender:'bot', timestamp:new Date(), category:'greeting',
      text:'Chat reset! How can I help you?\n\nAsk me about branches, faculty, placements, GTU results, holidays and more.',
      suggestions: DEFAULT_SUGGESTIONS,
    }])
  }

  const filteredMessages = searchTerm
    ? messages.filter(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()))
    : messages

  return (
    <div className="flex flex-col h-screen bg-[#020617] max-w-4xl mx-auto border-x border-slate-900 overflow-hidden">

      {/* ── HEADER ── */}
      <div className="bg-slate-950/90 backdrop-blur-xl border-b border-white/5 px-4 py-3 flex items-center justify-between z-20 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-white">
            <ArrowLeft size={20}/>
          </button>
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <GraduationCap size={20} className="text-white"/>
            </div>
            <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate-950 ${isOffline?'bg-yellow-400':'bg-emerald-400 animate-pulse'}`}/>
          </div>
          <div>
            <h2 className="font-bold text-sm text-white">GEC Bhavnagar Assistant</h2>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isOffline?'bg-yellow-400':'bg-emerald-400 animate-pulse'}`}/>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                {isOffline ? 'Offline Mode' : 'Online · Live Database'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setShowSearch(s=>!s)} className={`p-2 rounded-xl transition-all ${showSearch?'bg-blue-600/20 text-blue-400':'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            <Search size={18}/>
          </button>
          <button onClick={handleReset} className="p-2 hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-white" title="Reset Chat">
            <RefreshCw size={18}/>
          </button>
        </div>
      </div>

      {/* Search bar (collapsible) */}
      {showSearch && (
        <div className="bg-slate-950/80 border-b border-white/5 px-4 py-2 flex items-center gap-2 animate-slide-up flex-shrink-0">
          <Search size={14} className="text-slate-500"/>
          <input autoFocus type="text" value={searchTerm}
            onChange={e=>setSearchTerm(e.target.value)}
            placeholder="Search chat history…"
            className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none"
          />
          {searchTerm && <button onClick={()=>setSearchTerm('')}><X size={14} className="text-slate-500"/></button>}
          <button onClick={()=>{setShowSearch(false);setSearchTerm('')}}><X size={16} className="text-slate-400"/></button>
        </div>
      )}

      {/* Offline banner */}
      {isOffline && (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 flex items-center gap-2 flex-shrink-0">
          <Info size={14} className="text-yellow-400 flex-shrink-0"/>
          <p className="text-xs text-yellow-300">Backend offline. Start server with <code className="font-mono bg-black/30 px-1 rounded">cd backend && npm run dev</code></p>
        </div>
      )}

      {/* ── MESSAGES ── */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 min-h-0">
        {filteredMessages.map(msg => (
          <Message key={msg.id} msg={msg} onSuggestionClick={handleSend}/>
        ))}
        {isTyping && <TypingIndicator/>}
        <div ref={messagesEndRef}/>
      </div>

      {/* ── INPUT AREA ── */}
      <div className="bg-slate-950/95 border-t border-white/5 p-4 space-y-3 flex-shrink-0">
        {/* Quick suggestions row */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {DEFAULT_SUGGESTIONS.slice(0,5).map(q => (
            <button key={q} onClick={() => handleSend(q)}
              className="whitespace-nowrap bg-white/4 hover:bg-blue-600 border border-white/8 hover:border-blue-500 text-slate-300 hover:text-white text-[11px] font-medium px-3 py-1.5 rounded-xl transition-all flex-shrink-0">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={e=>{e.preventDefault();handleSend()}} className="flex items-end gap-3">
          <div className="flex-1 bg-slate-900/60 border border-white/8 rounded-2xl px-4 py-3 focus-within:border-blue-500/40 focus-within:bg-slate-900 transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e=>setInput(e.target.value)}
              onKeyDown={e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend()} }}
              placeholder="Ask anything about GEC Bhavnagar…"
              rows={1}
              className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-500 resize-none leading-relaxed"
              style={{ maxHeight:'120px', overflowY:'auto' }}
            />
          </div>
          <button type="submit" disabled={!input.trim()||isTyping}
            className={`p-3.5 rounded-2xl transition-all flex-shrink-0 ${
              input.trim()&&!isTyping
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                : 'bg-slate-800 text-slate-600 cursor-not-allowed'
            }`}>
            <Send size={18} className={input.trim()?'translate-x-0.5':''}/>
          </button>
        </form>

        <div className="text-center text-[10px] text-slate-600">
          GEC Bhavnagar Assistant · Design Engineering Project · GTU 5th Sem
        </div>
      </div>
    </div>
  )
}
