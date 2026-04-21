import { useState, useEffect } from 'react'
import {
  GraduationCap, Search, MessageCircle, BookOpen,
  Briefcase, ExternalLink, Bell, ChevronRight,
  Award, Cpu, HardHat, Zap, Building2, Wifi,
  X, TrendingUp, Calendar, Globe, Phone, MapPin,
  Users, Clock
} from 'lucide-react'
import { searchQuery, getNotices } from '../services/api'

const BRANCHES = [
  { code:'CE',    name:'Computer Engineering',              icon:Cpu,       color:'bg-blue-600',   seats:60, pkg:'₹5–14 LPA' },
  { code:'IT',    name:'Information Technology',            icon:Wifi,      color:'bg-violet-600', seats:60, pkg:'₹4.8–11 LPA' },
  { code:'ICT',   name:'Info & Communication Technology',   icon:Zap,       color:'bg-cyan-600',   seats:30, pkg:'NO DATA AVAILABLE' },
  { code:'MECH',  name:'Mechanical Engineering',            icon:HardHat,   color:'bg-orange-600', seats:60, pkg:'₹4–10 LPA' },
  { code:'CIVIL', name:'Civil Engineering',                 icon:Building2, color:'bg-yellow-600', seats:60, pkg:'₹3.8–8.5 LPA' },
  { code:'EC',    name:'Electronics & Communication',       icon:Zap,       color:'bg-emerald-600',seats:60, pkg:'₹4.5–12 LPA' },
]

// ── GTU links — all verified working ──────────────────────────────────────────
const GTU_LINKS = [
  { label:'Check GTU Result',     url:'https://gturesults.in/',                                        icon:TrendingUp, color:'text-green-400'  },
  { label:'GTU Student Portal',   url:'https://student.gtu.ac.in/Login.aspx',                          icon:Users,      color:'text-blue-400'   },
  { label:'Old Question Papers',  url:'https://gtu.ac.in/OldQuestionPapers/OldQuestionPapers.aspx',    icon:BookOpen,   color:'text-purple-400' },
  { label:'GTU Syllabus',         url:'https://gtu.ac.in/syllabus/syllabus.aspx',                      icon:BookOpen,   color:'text-yellow-400' },
  { label:'Exam Timetable',       url:'https://gtu.ac.in/timetable/timetable.aspx',                    icon:Calendar,   color:'text-pink-400'   },
  { label:'GEC Bhavnagar Website',url:'https://www.gecbhavnagar.ac.in',                                icon:Globe,      color:'text-cyan-400'   },
  { label:'MYSY Scholarship',     url:'https://mysy.guj.nic.in/',                                      icon:Award,      color:'text-orange-400' },
  { label:'GTU Official Website', url:'https://www.gtu.ac.in',                                         icon:Globe,      color:'text-teal-400'   },
]

const STATS = [
  { label:'Est.',          value:'1963',  icon:Award   },
  { label:'Branches',      value:'6',     icon:BookOpen },
  { label:'Total Seats',   value:'330',   icon:Users    },
  { label:'Placed 25-26',  value:'203',   icon:Briefcase},
]

const DEFAULT_NOTICES = [
  { title:'End Semester Exam Form – Nov/Dec 2026',   tag:'EXAM',      desc:'Fill exam forms on GTU portal before deadline. Check student.gtu.ac.in' },
  { title:'TCS & Infosys Campus Drive 2026',          tag:'PLACEMENT', desc:'CE, IT, EC students with CGPA 6.5+ eligible. Register at T&P cell.' },
  { title:'Diwali Vacation – 17 to 24 Oct 2026',     tag:'HOLIDAY',   desc:'College closed as per GTU academic calendar 2026-27.' },
  { title:'MYSY Scholarship Renewal 2026-27',         tag:'ACADEMIC',  desc:'Renew before 31 Oct 2026. Visit mysy.guj.nic.in' },
]

const tagColor = t => ({
  EXAM:      'bg-red-500/15 text-red-400 border-red-500/25',
  PLACEMENT: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  HOLIDAY:   'bg-green-500/15 text-green-400 border-green-500/25',
  ACADEMIC:  'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  Exam:      'bg-red-500/15 text-red-400 border-red-500/25',
  General:   'bg-slate-500/15 text-slate-400 border-slate-500/25',
}[t] || 'bg-slate-500/15 text-slate-400 border-slate-500/25')

// ── Quick ask topics ──────────────────────────────────────────────────────────
const TOPICS = [
  'CE Branch Details','IT Branch Details','MECH Branch Details','EC Branch Details',
  'GTU Result Link','Download Question Papers','Holiday List 2026-27','Placement Stats 2025-26',
  'MYSY Scholarship','CE HOD Name','IT Faculty','College Timing',
  'GTU Exam 70+30 Marks','Hall Ticket Download','Hostel Facilities','GTU Syllabus',
]

export default function LandingPage({ onStartChat }) {
  const [searchText, setSearchText]     = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [searching, setSearching]       = useState(false)
  const [notices, setNotices]           = useState([])
  const [status, setStatus]             = useState('loading') // 'loading' | 'online' | 'offline'

  useEffect(() => {
    const url = import.meta.env.VITE_API_URL || ''
    fetch(`${url}/health`)
      .then(r => r.ok ? setStatus('online') : setStatus('offline'))
      .catch(() => setStatus('offline'))
    getNotices({ limit:4 }).then(r => setNotices(r.data || [])).catch(() => {})
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchText.trim()) return
    setSearching(true)
    try {
      const res = await searchQuery(searchText)
      setSearchResults(res)
    } catch {
      setSearchResults({ error:'Search not available right now. Try asking the chatbot directly!' })
    } finally { setSearching(false) }
  }

  const displayNotices = notices.length > 0
    ? notices.map(n => ({ title:n.title, tag:n.category||'General', desc:n.description }))
    : DEFAULT_NOTICES

  const statusBadge = {
    loading: { dot:'bg-yellow-400 animate-pulse', text:'text-yellow-300', label:'Connecting to server…' },
    online:  { dot:'bg-emerald-400 animate-pulse', text:'text-emerald-300', label:'Server Online · Live Database' },
    offline: { dot:'bg-red-400', text:'text-red-300', label:'Server Starting Up (may take 60s)' },
  }[status]

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <style>{`
        .no-scrollbar::-webkit-scrollbar{display:none}
        .no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* ── HEADER ── */}
      <div className="bg-[#0f172a]/95 backdrop-blur border-b border-white/5 sticky top-0 z-20 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap size={18} className="text-white"/>
            </div>
            <div>
              <p className="text-xs font-black text-blue-400 uppercase tracking-widest leading-none">GEC Bhavnagar</p>
              <p className="text-sm font-bold text-white leading-tight">Student Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusBadge.dot}`}/>
            <span className={`text-[10px] font-bold uppercase tracking-widest hidden sm:block ${statusBadge.text}`}>{statusBadge.label}</span>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="max-w-5xl mx-auto px-4 pt-10 pb-6 text-center">

        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-6 text-xs font-bold uppercase tracking-widest text-blue-400">
          <GraduationCap size={13}/> GTU Design Engineering Project · Sem 6
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-3 leading-tight">
          GEC Bhavnagar<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Student Assistant</span>
        </h1>

        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto mb-6 leading-relaxed">
          Stop jumping between 5 websites. Ask anything about your college — branches, faculty, GTU results, placements, holidays — and get instant answers.
        </p>

        {/* search bar */}
        <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-4 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"/>
          <input type="text" value={searchText}
            onChange={e=>{ setSearchText(e.target.value); if(!e.target.value) setSearchResults(null) }}
            placeholder="Search branches, faculty, GTU info…"
            className="w-full bg-[#1e293b] border border-white/10 rounded-2xl pl-10 pr-28 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/40 transition-all"/>
          <button type="submit" disabled={searching||!searchText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">
            {searching?'…':'Search'}
          </button>
        </form>

        {/* search results */}
        {searchResults && (
          <div className="max-w-xl mx-auto bg-[#1e293b] border border-white/8 rounded-2xl p-4 mb-5 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Results</span>
              <button onClick={()=>setSearchResults(null)}><X size={13} className="text-slate-500"/></button>
            </div>
            {searchResults.error
              ? <p className="text-sm text-slate-400">{searchResults.error}</p>
              : <>
                  {searchResults.branches?.map(b => (
                    <div key={b.code} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                      <BookOpen size={13} className="text-blue-400 flex-shrink-0"/>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-white">{b.code} – {b.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{b.shortDescription}</p>
                      </div>
                      <button onClick={()=>onStartChat(`Tell me about ${b.code}`)} className="text-[11px] text-blue-400 whitespace-nowrap hover:text-blue-300">Ask →</button>
                    </div>
                  ))}
                  {!searchResults.branches?.length && <p className="text-xs text-slate-400">No results. Try asking the chatbot directly!</p>}
                </>
            }
          </div>
        )}

        <button onClick={() => onStartChat(null)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all hover:scale-105 active:scale-95 text-base">
          <MessageCircle size={20}/> Start Chatting <ChevronRight size={18}/>
        </button>
      </div>

      {/* ── STATS ── */}
      <div className="max-w-5xl mx-auto px-4 pb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({label,value,icon:Icon}) => (
          <div key={label} className="bg-[#1e293b] border border-white/6 rounded-2xl p-4 text-center">
            <Icon size={17} className="text-blue-400 mx-auto mb-1.5"/>
            <p className="text-2xl font-black text-white">{value}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* ── BRANCHES ── */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
          <BookOpen size={15} className="text-blue-400"/> Engineering Branches
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {BRANCHES.map(({code,name,icon:Icon,color,seats,pkg}) => (
            <button key={code} onClick={() => onStartChat(`Tell me about ${code} branch`)}
              className="bg-[#1e293b] border border-white/6 hover:border-blue-500/30 rounded-2xl p-4 text-left transition-all group hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-start justify-between mb-2.5">
                <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center`}>
                  <Icon size={16} className="text-white"/>
                </div>
                <span className="text-[10px] font-bold text-slate-500">{seats} seats</span>
              </div>
              <p className="text-[10px] font-black text-blue-400 tracking-widest uppercase mb-0.5">{code}</p>
              <p className="text-xs font-semibold text-white group-hover:text-blue-100 transition-colors leading-snug mb-1.5">{name}</p>
              <p className="text-[10px] text-slate-500">{pkg}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ── GTU LINKS + NOTICES ── */}
      <div className="max-w-5xl mx-auto px-4 pb-6 grid md:grid-cols-2 gap-4">

        {/* GTU Links */}
        <div className="bg-[#1e293b] border border-white/6 rounded-2xl p-5">
          <h2 className="text-xs font-bold text-white flex items-center gap-2 mb-4">
            <ExternalLink size={14} className="text-blue-400"/> Important GTU Links
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {GTU_LINKS.map(({label,url,icon:Icon,color}) => (
              <a key={label} href={url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-white/3 hover:bg-white/7 rounded-xl px-3 py-2 transition-all group">
                <Icon size={13} className={`${color} flex-shrink-0`}/>
                <span className="text-[11px] text-slate-300 group-hover:text-white font-medium leading-tight">{label}</span>
                <ExternalLink size={9} className="text-slate-600 group-hover:text-slate-400 ml-auto flex-shrink-0"/>
              </a>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="bg-[#1e293b] border border-white/6 rounded-2xl p-5">
          <h2 className="text-xs font-bold text-white flex items-center gap-2 mb-4">
            <Bell size={14} className="text-yellow-400"/> Latest Notices
          </h2>
          <div className="space-y-2">
            {displayNotices.map((n,i) => (
              <div key={i} className="flex items-start gap-2 py-2 border-b border-white/5 last:border-0">
                <span className={`mt-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-full border whitespace-nowrap ${tagColor(n.tag)}`}>{n.tag}</span>
                <div>
                  <p className="text-[11px] font-semibold text-white leading-snug">{n.title}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => onStartChat('Latest notices and announcements')}
            className="mt-3 w-full text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-1">
            Ask chatbot for more <ChevronRight size={11}/>
          </button>
        </div>
      </div>

      {/* ── ASK TOPICS ── */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <h2 className="text-xs font-bold text-white flex items-center gap-2 mb-3">
          <MessageCircle size={14} className="text-indigo-400"/> Popular Questions
        </h2>
        <div className="flex flex-wrap gap-2">
          {TOPICS.map(q => (
            <button key={q} onClick={() => onStartChat(q)}
              className="bg-white/4 hover:bg-blue-600 border border-white/8 hover:border-blue-500 text-slate-300 hover:text-white text-[11px] font-medium px-3.5 py-1.5 rounded-xl transition-all">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* ── COLLEGE INFO ROW ── */}
      <div className="max-w-5xl mx-auto px-4 pb-6">
        <div className="bg-[#1e293b] border border-white/6 rounded-2xl p-5 grid sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="text-xs font-bold text-white mb-1">Address</p>
              <p className="text-[11px] text-slate-400 leading-relaxed">Vidyanagar, Bhavnagar,<br/>Gujarat – 364002</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone size={16} className="text-blue-400 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="text-xs font-bold text-white mb-1">Contact</p>
              <p className="text-[11px] text-slate-400">+91-278-2521234</p>
              <a href="mailto:principal@gecbhavnagar.ac.in" className="text-[11px] text-blue-400 hover:underline">principal@gecbhavnagar.ac.in</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock size={16} className="text-blue-400 mt-0.5 flex-shrink-0"/>
            <div>
              <p className="text-xs font-bold text-white mb-1">College Timings</p>
              <p className="text-[11px] text-slate-400">Mon–Fri: 10:45 AM – 5:45 PM</p>
              <p className="text-[11px] text-slate-400">2nd & 4th Sat: Holiday</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 mt-2">
        <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <GraduationCap size={14} className="text-blue-400"/>
            <span>GEC Bhavnagar Student Assistant · Design Engineering · GTU 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://www.gecbhavnagar.ac.in" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">College Website</a>
            <a href="https://www.gtu.ac.in" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GTU Website</a>
            <a href="https://gturesults.in" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">GTU Results</a>
          </div>
        </div>
      </footer>
    </div>
  )
}