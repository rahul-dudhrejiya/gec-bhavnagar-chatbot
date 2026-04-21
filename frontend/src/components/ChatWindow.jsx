  import { useState, useEffect, useRef, useCallback } from 'react'
  import {
    ArrowLeft, Send, RefreshCw, GraduationCap,
    ExternalLink, Sparkles, X, Search
  } from 'lucide-react'
  import { sendChat } from '../services/api'

  // ── Simple markdown renderer ──────────────────────────────────────────────────
  function renderText(text) {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) => {
        if (/^\*\*[^*]+\*\*$/.test(p))
          return <strong key={j} className="text-blue-200 font-semibold">{p.slice(2,-2)}</strong>
        // make URLs clickable
        return p.split(/(https?:\/\/[^\s)]+)/g).map((u, k) =>
          /^https?:\/\//.test(u)
            ? <a key={k} href={u} target="_blank" rel="noreferrer"
                className="text-blue-400 underline hover:text-blue-300 inline-flex items-center gap-0.5">
                {u} <ExternalLink size={10}/>
              </a>
            : u
        )
      })
      return <p key={i} className={`${line === '' ? 'h-2' : 'mb-0.5'}`}>{parts}</p>
    })
  }

  // ── Category badge ────────────────────────────────────────────────────────────
  const CAT = {
    greeting:         { bg:'bg-blue-500/20',   text:'text-blue-300',   label:'Welcome'    },
    branch_info:      { bg:'bg-violet-500/20', text:'text-violet-300', label:'Branch'     },
    faculty:          { bg:'bg-cyan-500/20',   text:'text-cyan-300',   label:'Faculty'    },
    subjects:         { bg:'bg-sky-500/20',    text:'text-sky-300',    label:'Subjects'   },
    placement:        { bg:'bg-green-500/20',  text:'text-green-300',  label:'Placement'  },
    holiday:          { bg:'bg-yellow-500/20', text:'text-yellow-300', label:'Holiday'    },
    gtu_result:       { bg:'bg-emerald-500/20',text:'text-emerald-300',label:'GTU Result' },
    gtu_papers:       { bg:'bg-teal-500/20',   text:'text-teal-300',   label:'Papers'     },
    gtu_portal:       { bg:'bg-lime-500/20',   text:'text-lime-300',   label:'Portal'     },
    gtu_exam:         { bg:'bg-amber-500/20',  text:'text-amber-300',  label:'Exam Info'  },
    fees_scholarship: { bg:'bg-rose-500/20',   text:'text-rose-300',   label:'Scholarship'},
    contact:          { bg:'bg-pink-500/20',   text:'text-pink-300',   label:'Contact'    },
    notice:           { bg:'bg-red-500/20',    text:'text-red-300',    label:'Notice'     },
    college_info:     { bg:'bg-indigo-500/20', text:'text-indigo-300', label:'College'    },
  }

  // ── Suggestion chips shown at the bottom of each bot message ─────────────────
  const QUICK_CHIPS = [
    'CE Branch','IT Branch','MECH Branch','EC Branch',
    'GTU Result','Question Papers','Placement Stats','Holiday List',
  ]

  // ── Offline fallback responses ────────────────────────────────────────────────
  const OFFLINE = {
    default: {
      text: `⚠️ **Server is starting up...**\n\nRender free server takes 30–60 seconds to wake up on first visit.\n\n**Please wait a moment and try again!**\n\nMeanwhile here are some things you can ask:\n• Tell me about CE branch\n• GTU result link\n• Holiday list 2026-27\n• Placement stats`,
      category:'fallback', suggestions:['About GEC','CE Branch','GTU Result','Holiday List']
    },
    ce: { text:`🏛️ **Computer Engineering (CE)**\n\n**HOD:** Dr. Hardik Molia\n**Intake:** 60 seats\n**Accreditation:** NBA Accredited\n\n**Faculty:**\n• Dr. Hardik Molia – Machine Learning, Data Mining\n• Mr. K. P. Kandoriya – DBMS, Web Technology\n• Mr. Ashish Nimavat – Networks, Cybersecurity\n• Mr. Chinmay Vyas – Cloud Computing\n• Prof. H. S. Sanghavi – Algorithms, Compiler\n• Mr. Kirit Rathod – AI, Python\n\n**Average Package:** ₹5.0 LPA\n**Highest Package:** ₹14 LPA`, category:'branch_info', suggestions:['CE Faculty','CE Subjects Sem 5','CE Placement','IT Branch'] },
    it: { text:`🏛️ **Information Technology (IT)**\n\n**HOD:** Mr. Shailesh Molia\n**Intake:** 60 seats\n\n**Faculty:**\n• Mr. Shailesh Molia – Software Engineering\n• Mr. Anoop Patel – Cybersecurity\n• Mr. Jayesh Rathod – Web Technologies\n• Ms. Sweta Garasia – DBMS\n• Mr. Nishidh Chavda – Cloud, DevOps\n• Mr. Virendra Barot – Python, AI\n\n**Average Package:** ₹4.8 LPA\n**Highest Package:** ₹11 LPA`, category:'branch_info', suggestions:['IT Faculty','IT Subjects','IT Placement','CE Branch'] },
    placement: { text:`💼 **GEC Bhavnagar Placement 2025-26**\n\n📊 **Overall Stats:**\n• Students Placed: **203**\n• Placement %: **74%**\n• Highest Package: **₹14 LPA** (CE – TCS)\n• Average Package: **₹4.7 LPA**\n• Total Companies: **32**\n\n**Branch-wise:**\n• CE: 47/60 placed | High: ₹14L | Avg: ₹5.0L\n• IT: 44/60 placed | High: ₹11L | Avg: ₹4.8L\n• EC: 43/60 placed | High: ₹12L | Avg: ₹4.5L\n• MECH: 40/60 placed | High: ₹10L | Avg: ₹4.0L\n• CIVIL: 37/60 placed | High: ₹8.5L | Avg: ₹3.8L\n\n🏢 **Top Companies:** TCS · Infosys · Wipro · L&T · Capgemini · HCL · Accenture · ONGC`, category:'placement', suggestions:['CE Placement','IT Placement','Top Companies','GTU Result'] },
    holiday: { text:`📅 **Holiday Calendar 2026-27**\n\n🇮🇳 **National Holidays:**\n• 15 Aug 2026 – Independence Day\n• 02 Oct 2026 – Gandhi Jayanti\n• 26 Jan 2027 – Republic Day\n• 14 Apr 2027 – Dr. Ambedkar Jayanti\n• 01 May 2027 – Gujarat Sthapana Divas\n\n🪔 **Festival Holidays:**\n• 25 Aug 2026 – Janmashtami\n• 20-22 Oct 2026 – Diwali (3 days)\n• 14 Jan 2027 – Uttarayan\n• 19 Mar 2027 – Holi\n• 25 Dec 2026 – Christmas\n\n🎓 **Vacation:**\n• Dec 2026 – Jan 2027: Winter Vacation\n• May – Jun 2027: Summer Vacation\n\n⏰ **Timings:** 10:45 AM – 5:45 PM\n(2nd & 4th Saturday off)`, category:'holiday', suggestions:['College Timing','GTU Exam Schedule','Notices'] },
    gtu: { text:`📊 **GTU Important Links**\n\n🔗 **Check Result:**\nhttps://gturesults.in\n\n🔗 **Student Portal (Hall ticket, Exam form):**\nhttps://student.gtu.ac.in/Login.aspx\n\n🔗 **Download Question Papers:**\nhttps://gtu.ac.in/OldQuestionPapers/OldQuestionPapers.aspx\n\n🔗 **GTU Syllabus:**\nhttps://gtu.ac.in/syllabus/syllabus.aspx\n\n🔗 **Exam Timetable:**\nhttps://gtu.ac.in/timetable/timetable.aspx\n\n📝 **Exam Scheme:** 70 marks External + 30 marks Internal = 100\nMinimum pass: 40% in each component\nMinimum attendance: 75%`, category:'gtu_result', suggestions:['Hall Ticket','Revaluation','GTU Syllabus','Exam Timetable'] },
  }

  function getOffline(msg) {
    const m = msg.toLowerCase()
    if (m.includes('ce') || m.includes('computer')) return OFFLINE.ce
    if (m.includes('it') && !m.includes('ict')) return OFFLINE.it
    if (m.includes('place') || m.includes('package') || m.includes('job')) return OFFLINE.placement
    if (m.includes('holiday') || m.includes('vacation') || m.includes('calendar')) return OFFLINE.holiday
    if (m.includes('gtu') || m.includes('result') || m.includes('paper') || m.includes('portal')) return OFFLINE.gtu
    return OFFLINE.default
  }

  // ── Message bubble ────────────────────────────────────────────────────────────
  function Message({ msg, onChip }) {
    const isBot = msg.sender === 'bot'
    const cat   = CAT[msg.category] || CAT.college_info
    const time  = new Date(msg.timestamp).toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })

    return (
      <div className={`flex ${isBot?'justify-start':'justify-end'} animate-[fadeUp_0.35s_ease-out]`}>
        <div className={`max-w-[86%] md:max-w-[75%] ${!isBot && 'flex flex-col items-end'}`}>

          {/* bubble */}
          <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
            isBot
              ? 'bg-[#1e293b] border border-white/8 text-slate-100 rounded-tl-sm'
              : 'bg-blue-600 text-white rounded-tr-sm'
          }`}>
            {isBot && msg.category && (
              <span className={`inline-flex items-center gap-1 ${cat.bg} ${cat.text} text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2`}>
                <Sparkles size={7}/>{cat.label}
              </span>
            )}
            <div className="whitespace-pre-wrap break-words leading-[1.7]">
              {isBot ? renderText(msg.text) : msg.text}
            </div>
          </div>

          {/* suggestion chips */}
          {isBot && msg.suggestions?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2 max-w-full">
              {msg.suggestions.map((s,i) => (
                <button key={i} onClick={() => onChip(s)}
                  className="text-[11px] font-medium bg-[#1e293b] hover:bg-blue-600 border border-white/8 hover:border-blue-500 text-slate-300 hover:text-white px-3 py-1 rounded-full transition-all">
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className={`text-[10px] mt-1 px-1 ${isBot?'text-slate-600':'text-blue-300'}`}>{time}</div>
        </div>
      </div>
    )
  }

  function TypingDots() {
    return (
      <div className="flex justify-start">
        <div className="bg-[#1e293b] border border-white/8 px-5 py-3.5 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
          {[0,1,2].map(i => (
            <span key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay:`${i*0.15}s`, animationDuration:'0.9s' }}/>
          ))}
          <span className="text-xs text-slate-500 ml-1.5">GEC Assistant is typing…</span>
        </div>
      </div>
    )
  }

  // ════════════════════════════════════════════════════════════════════════════
  export default function ChatWindow({ onBack, initialMessage }) {
    const [messages, setMessages] = useState([])
    const [input, setInput]       = useState('')
    const [typing, setTyping]     = useState(false)
    const [offline, setOffline]   = useState(false)
    const [search, setSearch]     = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const endRef   = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, typing])

    // Wake up Render on mount
    useEffect(() => {
      const url = import.meta.env.VITE_API_URL || ''
      fetch(`${url}/health`).catch(() => {})
    }, [])

    // Boot message
    useEffect(() => {
      setMessages([{
        id:'boot', sender:'bot', timestamp:new Date(), category:'greeting',
        text:`👋 **Welcome to GEC Bhavnagar Assistant!**\n\nI am your college guide. Ask me anything about:\n\n• **Branches** — CE, IT, ICT, MECH, CIVIL, EC\n• **Faculty** — Professor names, HOD details\n• **GTU** — Results, papers, portal, syllabus\n• **Placements** — Companies, packages, stats\n• **Holidays** — Full 2026-27 calendar\n• **Scholarships** — MYSY, SC/ST schemes\n\nJust type your question below! 👇`,
        suggestions: QUICK_CHIPS,
      }])
      if (initialMessage) setTimeout(() => handleSend(initialMessage), 700)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSend = useCallback(async (text) => {
      const msg = (text || input).trim()
      if (!msg || typing) return
      setInput('')
      setMessages(prev => [...prev, { id:Date.now()+'u', sender:'user', text:msg, timestamp:new Date() }])
      setTyping(true)
      inputRef.current?.focus()

      try {
        const res = await sendChat(msg)
        setOffline(false)
        setMessages(prev => [...prev, {
          id:Date.now()+'b', sender:'bot',
          text:res.response, category:res.category,
          suggestions: res.suggestions?.length ? res.suggestions : QUICK_CHIPS,
          timestamp:new Date(),
        }])
      } catch {
        setOffline(true)
        const fb = getOffline(msg)
        setMessages(prev => [...prev, {
          id:Date.now()+'b', sender:'bot',
          text:fb.text, category:fb.category,
          suggestions:fb.suggestions,
          timestamp:new Date(),
        }])
      } finally { setTyping(false) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input, typing])

    const reset = () => setMessages([{
      id:'r', sender:'bot', timestamp:new Date(), category:'greeting',
      text:`👋 Chat reset! What would you like to know?\n\nAsk me about branches, GTU results, placement, holidays and more.`,
      suggestions:QUICK_CHIPS,
    }])

    const filtered = showSearch && search
      ? messages.filter(m => m.text.toLowerCase().includes(search.toLowerCase()))
      : messages

    return (
      <div className="flex flex-col h-screen bg-[#0f172a] max-w-3xl mx-auto">
        <style>{`
          @keyframes fadeUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        `}</style>

        {/* ── HEADER ── */}
        <div className="bg-[#0f172a]/95 backdrop-blur border-b border-white/6 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-1.5 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-all">
              <ArrowLeft size={20}/>
            </button>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <GraduationCap size={20} className="text-white"/>
              </div>
              <div className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0f172a] ${offline?'bg-yellow-400':'bg-emerald-400 animate-pulse'}`}/>
            </div>
            <div>
              <p className="font-bold text-sm text-white">GEC Bhavnagar Assistant</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {offline ? '⚠️ Connecting…' : '🟢 Online · Live Database'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setShowSearch(s => !s)}
              className={`p-2 rounded-xl transition-all ${showSearch?'bg-blue-600/20 text-blue-400':'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Search size={18}/>
            </button>
            <button onClick={reset} className="p-2 text-slate-400 hover:bg-white/5 hover:text-white rounded-xl transition-all" title="New chat">
              <RefreshCw size={18}/>
            </button>
          </div>
        </div>

        {/* search bar */}
        {showSearch && (
          <div className="bg-[#0f172a]/90 border-b border-white/6 px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <Search size={13} className="text-slate-500"/>
            <input autoFocus type="text" value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search in chat…"
              className="flex-1 bg-transparent text-sm text-white placeholder-slate-600 outline-none"/>
            {search && <button onClick={()=>setSearch('')}><X size={13} className="text-slate-500"/></button>}
            <button onClick={()=>{setShowSearch(false);setSearch('')}}><X size={15} className="text-slate-400 hover:text-white"/></button>
          </div>
        )}

        {/* offline notice */}
        {offline && (
          <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-2 flex items-center gap-2 flex-shrink-0">
            <span className="text-xs text-yellow-300">⏳ Server is waking up (Render free plan). Please wait 30–60 sec and retry your question.</span>
          </div>
        )}

        {/* ── MESSAGES ── */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 min-h-0">
          {filtered.map(m => <Message key={m.id} msg={m} onChip={handleSend}/>)}
          {typing && <TypingDots/>}
          <div ref={endRef}/>
        </div>

        {/* ── INPUT AREA ── */}
        <div className="bg-[#0f172a]/95 border-t border-white/6 px-4 py-3 space-y-2.5 flex-shrink-0">

          {/* quick chips row */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            {QUICK_CHIPS.map(q => (
              <button key={q} onClick={() => handleSend(q)}
                className="whitespace-nowrap bg-white/4 hover:bg-blue-600 border border-white/8 hover:border-blue-500 text-slate-300 hover:text-white text-[11px] font-medium px-3.5 py-1.5 rounded-xl transition-all flex-shrink-0">
                {q}
              </button>
            ))}
          </div>

          {/* text input */}
          <form onSubmit={e=>{e.preventDefault();handleSend()}} className="flex items-end gap-3">
            <div className="flex-1 bg-[#1e293b] border border-white/8 rounded-2xl px-4 py-3 focus-within:border-blue-500/40 transition-all">
              <textarea ref={inputRef} value={input} onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();handleSend()}}}
                placeholder="Type your question… e.g. CE branch faculty, GTU result link"
                rows={1} className="w-full bg-transparent outline-none text-sm text-white placeholder-slate-600 resize-none leading-relaxed"
                style={{ maxHeight:'100px', overflowY:'auto' }}/>
            </div>
            <button type="submit" disabled={!input.trim()||typing}
              className={`p-3.5 rounded-2xl transition-all flex-shrink-0 ${input.trim()&&!typing?'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]':'bg-slate-800 text-slate-600 cursor-not-allowed'}`}>
              <Send size={18}/>
            </button>
          </form>

          <p className="text-[10px] text-slate-700 text-center">
            GEC Bhavnagar · Design Engineering Project · GTU 2026
          </p>
        </div>
      </div>
    )
  }
