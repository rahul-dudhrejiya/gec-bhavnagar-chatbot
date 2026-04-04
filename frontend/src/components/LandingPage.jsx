import { useState, useEffect } from 'react'
import {
  GraduationCap, Search, MessageCircle, BookOpen, Users, Calendar,
  Briefcase, ExternalLink, Bell, ChevronRight, Award, Cpu, HardHat,
  Zap, Building2, Wifi, X, TrendingUp, Clock, MapPin, Phone, Globe
} from 'lucide-react'
import { searchQuery, getNotices } from '../services/api'

const BRANCH_INFO = [
  { code:'CE',    name:'Computer Engineering',               icon:Cpu,       color:'from-blue-500 to-indigo-600',   seats:60 },
  { code:'IT',    name:'Information Technology',             icon:Wifi,      color:'from-violet-500 to-purple-600', seats:60 },
  { code:'ICT',   name:'Info & Communication Technology',    icon:Zap,       color:'from-cyan-500 to-blue-600',     seats:30 },
  { code:'MECH',  name:'Mechanical Engineering',             icon:HardHat,   color:'from-orange-500 to-red-600',    seats:60 },
  { code:'CIVIL', name:'Civil Engineering',                  icon:Building2, color:'from-yellow-500 to-orange-600', seats:60 },
  { code:'EC',    name:'Electronics & Communication Engg.',  icon:Zap,       color:'from-emerald-500 to-teal-600',  seats:60 },
]

const QUICK_LINKS = [
  { label:'GTU Results',        url:'https://gturesults.in/',                                         icon:TrendingUp, color:'text-green-400'  },
  { label:'GTU Student Portal', url:'https://student.gtu.ac.in/Login.aspx',                           icon:Users,      color:'text-blue-400'   },
  { label:'Question Papers',    url:'https://gtu.ac.in/OldQuestionPapers/OldQuestionPapers.aspx',     icon:BookOpen,   color:'text-purple-400' },
  { label:'GTU Syllabus',       url:'https://gtu.ac.in/syllabus/syllabus.aspx',                       icon:BookOpen,   color:'text-yellow-400' },
  { label:'Exam Timetable',     url:'https://gtu.ac.in/timetable/timetable.aspx',                     icon:Calendar,   color:'text-pink-400'   },
  { label:'GEC Bhavnagar',      url:'https://www.gecbhavnagar.ac.in',                                 icon:Globe,      color:'text-cyan-400'   },
  { label:'MYSY Scholarship',   url:'https://mysy.guj.nic.in/',                                       icon:Award,      color:'text-orange-400' },
  { label:'NPTEL Courses',      url:'https://nptel.ac.in',                                            icon:GraduationCap, color:'text-teal-400'},
]

const STATS = [
  { label:'Established', value:'1963', icon:Award    },
  { label:'Branches',    value:'6',    icon:BookOpen  },
  { label:'Total Seats', value:'330',  icon:Users     },
  { label:'Placement %', value:'70%',  icon:Briefcase },
]

const DEFAULT_NOTICES = [
  { title:'End Semester Exam Form – Nov/Dec 2025', tag:'URGENT',    desc:'Fill exam forms on GTU portal before deadline.' },
  { title:'TCS Campus Drive – CE/IT/EC Students',  tag:'PLACEMENT', desc:'60%+ eligible. Report to T&P cell for registration.' },
  { title:'Diwali Vacation – 18 to 25 Oct 2025',   tag:'HOLIDAY',   desc:'College closed as per GTU academic calendar.' },
  { title:'NPTEL Oct 2025 Enrollment Open',         tag:'ACADEMIC',  desc:'Register for free online certificate courses at nptel.ac.in' },
]

const tagStyle = (t) => ({
  URGENT:    'bg-red-500/20 text-red-400 border-red-500/30',
  PLACEMENT: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  HOLIDAY:   'bg-green-500/20 text-green-400 border-green-500/30',
  ACADEMIC:  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  Exam:      'bg-red-500/20 text-red-400 border-red-500/30',
  General:   'bg-slate-500/20 text-slate-400 border-slate-500/30',
}[t] || 'bg-slate-500/20 text-slate-400 border-slate-500/30')

export default function LandingPage({ onStartChat }) {
  const [searchText, setSearchText]     = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [searching, setSearching]       = useState(false)
  const [notices, setNotices]           = useState([])
  const [backendOnline, setBackendOnline] = useState(null)

  useEffect(() => {
    fetch('/api/college-info')
      .then(r => r.ok ? setBackendOnline(true) : setBackendOnline(false))
      .catch(() => setBackendOnline(false))
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
      setSearchResults({ error:'Search failed – backend may be offline.' })
    } finally { setSearching(false) }
  }

  const displayNotices = notices.length > 0
    ? notices.map(n => ({ title:n.title, tag:n.category||n.tag||'General', desc:n.description }))
    : DEFAULT_NOTICES

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden">

      {/* gradient orbs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-blue-600/8 rounded-full blur-3xl pointer-events-none"/>
      <div className="fixed top-20 right-1/4 w-80 h-80 bg-indigo-600/8 rounded-full blur-3xl pointer-events-none"/>

      {/* ── HERO ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-14 pb-8 text-center">

        {/* status badge */}
        <div className="inline-flex items-center gap-2 bg-slate-900/70 border border-white/8 backdrop-blur px-4 py-1.5 rounded-full mb-8 text-xs font-semibold uppercase tracking-widest">
          <span className={`w-2 h-2 rounded-full ${backendOnline===true?'bg-emerald-400 animate-pulse':backendOnline===false?'bg-red-400':'bg-yellow-400 animate-pulse'}`}/>
          <span className={backendOnline===true?'text-emerald-300':backendOnline===false?'text-red-300':'text-yellow-300'}>
            {backendOnline===true?'Backend Online · DB Connected':backendOnline===false?'Backend Offline – Local Mode':'Connecting…'}
          </span>
        </div>

        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            <GraduationCap size={32}/>
          </div>
          <div className="text-left">
            <div className="text-[11px] font-black tracking-[0.2em] uppercase text-blue-400 mb-1">Government Engineering College</div>
            <h1 className="text-2xl md:text-3xl font-black text-white">Bhavnagar Assistant</h1>
          </div>
        </div>

        <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-5 leading-relaxed">
          Smart college companion for GEC Bhavnagar students. Get instant info on <strong className="text-slate-200">branches, faculty, GTU results, placements & holidays</strong>.
        </p>

        {/* search */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-4 relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"/>
          <input
            type="text" value={searchText}
            onChange={e=>{ setSearchText(e.target.value); if(!e.target.value) setSearchResults(null) }}
            placeholder="Search branches, faculty, GTU info…"
            className="w-full bg-slate-900/80 border border-white/10 rounded-2xl pl-10 pr-32 py-3.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500/50 transition-all"
          />
          <button type="submit" disabled={searching||!searchText.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all">
            {searching?'…':'Search'}
          </button>
        </form>

        {searchResults && (
          <div className="max-w-2xl mx-auto bg-slate-900/80 border border-white/8 rounded-2xl p-4 mb-5 text-left animate-slide-up">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Results</span>
              <button onClick={()=>setSearchResults(null)}><X size={13} className="text-slate-500"/></button>
            </div>
            {searchResults.error ? <p className="text-red-400 text-sm">{searchResults.error}</p> : (
              <>
                {searchResults.branches?.map(b=>(
                  <div key={b.code} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <BookOpen size={14} className="text-blue-400 flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white">{b.code} – {b.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{b.shortDescription}</div>
                    </div>
                    <button onClick={()=>onStartChat(`Tell me about ${b.code}`)} className="text-[11px] text-blue-400 whitespace-nowrap">Ask →</button>
                  </div>
                ))}
                {searchResults.gtuInfo?.map(g=>(
                  <div key={g._id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                    <ExternalLink size={14} className="text-purple-400 flex-shrink-0"/>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-white">{g.title}</div>
                    </div>
                    <a href={g.url} target="_blank" rel="noreferrer" className="text-[11px] text-purple-400 whitespace-nowrap">Open →</a>
                  </div>
                ))}
                {!searchResults.branches?.length && !searchResults.gtuInfo?.length && (
                  <p className="text-slate-400 text-xs">No results. Try the chatbot!</p>
                )}
              </>
            )}
          </div>
        )}

        <button onClick={()=>onStartChat(null)}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-all hover:scale-105 active:scale-95">
          <MessageCircle size={20}/> Start Chatting <ChevronRight size={18}/>
        </button>
      </div>

      {/* ── STATS ── */}
      <div className="max-w-6xl mx-auto px-4 pb-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATS.map(({label,value,icon:Icon})=>(
          <div key={label} className="bg-slate-900/60 border border-white/6 rounded-2xl p-4 text-center">
            <Icon size={18} className="text-blue-400 mx-auto mb-1.5"/>
            <div className="text-xl font-black text-white">{value}</div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-medium">{label}</div>
          </div>
        ))}
      </div>

      {/* ── BRANCHES ── */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <h2 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <BookOpen size={16} className="text-blue-400"/> Engineering Branches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BRANCH_INFO.map(({code,name,icon:Icon,color,seats})=>(
            <button key={code} onClick={()=>onStartChat(`Tell me about ${code}`)}
              className="bg-slate-900/60 border border-white/6 hover:border-blue-500/30 rounded-2xl p-4 text-left transition-all group hover:scale-[1.02] active:scale-[0.98]">
              <div className="flex items-start justify-between mb-2.5">
                <div className={`w-9 h-9 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
                  <Icon size={16} className="text-white"/>
                </div>
                <span className="text-[10px] font-bold bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">{seats} seats</span>
              </div>
              <div className="text-[10px] font-black text-blue-400 tracking-widest uppercase mb-0.5">{code}</div>
              <div className="text-xs font-semibold text-white group-hover:text-blue-100 transition-colors leading-snug">{name}</div>
              <div className="mt-2 text-[10px] text-slate-500 group-hover:text-blue-400 flex items-center gap-1">Explore <ChevronRight size={10}/></div>
            </button>
          ))}
        </div>
      </div>

      {/* ── QUICK LINKS + NOTICES ── */}
      <div className="max-w-6xl mx-auto px-4 pb-6 grid md:grid-cols-2 gap-4">

        <div className="bg-slate-900/60 border border-white/6 rounded-2xl p-5">
          <h2 className="text-xs font-bold text-white flex items-center gap-2 mb-4">
            <ExternalLink size={14} className="text-blue-400"/> Important GTU Links
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {QUICK_LINKS.map(({label,url,icon:Icon,color})=>(
              <a key={label} href={url} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 bg-white/3 hover:bg-white/7 rounded-xl px-3 py-2 transition-all group">
                <Icon size={13} className={`${color} flex-shrink-0`}/>
                <span className="text-[11px] text-slate-300 group-hover:text-white font-medium leading-tight">{label}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-white/6 rounded-2xl p-5">
          <h2 className="text-xs font-bold text-white flex items-center gap-2 mb-4">
            <Bell size={14} className="text-yellow-400"/> Latest Notices
          </h2>
          <div className="space-y-2">
            {displayNotices.map((n,i)=>(
              <div key={i} className="flex items-start gap-2 py-2 border-b border-white/5 last:border-0">
                <span className={`mt-0.5 text-[9px] font-black px-1.5 py-0.5 rounded-full border whitespace-nowrap ${tagStyle(n.tag)}`}>{n.tag}</span>
                <div>
                  <div className="text-[11px] font-semibold text-white leading-snug">{n.title}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{n.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>onStartChat('Latest notices')} className="mt-3 w-full text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-1">
            More notices via chatbot <ChevronRight size={11}/>
          </button>
        </div>
      </div>

      {/* ── TOPIC CHIPS ── */}
      <div className="max-w-6xl mx-auto px-4 pb-6">
        <h2 className="text-xs font-bold text-white flex items-center gap-2 mb-3">
          <MessageCircle size={14} className="text-indigo-400"/> Ask the Chatbot About…
        </h2>
        <div className="flex flex-wrap gap-2">
          {['GTU Results','Old Question Papers','Holiday List 2025-26','Placement Stats',
            'CE Faculty','IT Subjects Sem 5','Scholarship (MYSY)','College Timing',
            'MECH Career Options','EC HOD','Hostel Facilities','GTU Student Portal',
            'Civil Faculty','ICT Subjects','Highest Package 2024','Exam Timetable',
            'GTU 70+30 Marks','About GEC Bhavnagar'].map(q=>(
            <button key={q} onClick={()=>onStartChat(q)}
              className="bg-white/4 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-slate-300 hover:text-white text-[11px] font-medium px-3.5 py-1.5 rounded-xl transition-all">
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 mt-4">
        <div className="max-w-6xl mx-auto px-4 py-7 grid md:grid-cols-3 gap-5 text-xs text-slate-400">
          <div>
            <div className="text-white font-bold mb-1.5 flex items-center gap-2"><GraduationCap size={14}/> GEC Bhavnagar</div>
            <div className="leading-relaxed">Government Engineering College, Bhavnagar<br/>Affiliated to Gujarat Technological University (GTU)</div>
          </div>
          <div>
            <div className="text-white font-semibold mb-1.5">Contact</div>
            <div className="flex items-start gap-1.5 mb-1"><MapPin size={11} className="mt-0.5 flex-shrink-0"/>Vidyanagar, Bhavnagar, Gujarat – 364002</div>
            <div className="flex items-center gap-1.5 mb-1"><Phone size={11}/>+91-278-2521234</div>
            <div className="flex items-center gap-1.5"><Globe size={11}/><a href="https://gecbhavnagar.ac.in" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">gecbhavnagar.ac.in</a></div>
          </div>
          <div>
            <div className="text-white font-semibold mb-1.5">Project Info</div>
            <div className="leading-relaxed">Design Engineering · GTU 5th Semester<br/>MERN Stack · MongoDB + Express + React + Node.js</div>
            <div className="mt-1.5 text-indigo-400 font-medium">GEC Bhavnagar © 2025</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
