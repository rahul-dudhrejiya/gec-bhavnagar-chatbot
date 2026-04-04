import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, TrendingUp, Calendar, Bell, ExternalLink, ChevronRight, Loader2 } from 'lucide-react';
import { getAllBranches, getPlacements, getNotices, getCollegeInfo } from '../services/api';

const BRANCH_EMOJIS = { CE:'💻', IT:'🌐', ICT:'📡', EC:'⚡', MECH:'⚙️', CIVIL:'🏗️' };
const BRANCH_COLORS = {
  CE:'border-indigo-500/40 bg-indigo-500/5', IT:'border-blue-500/40 bg-blue-500/5',
  ICT:'border-cyan-500/40 bg-cyan-500/5',   EC:'border-purple-500/40 bg-purple-500/5',
  MECH:'border-orange-500/40 bg-orange-500/5', CIVIL:'border-amber-500/40 bg-amber-500/5',
};

function StatCard({ emoji, value, label, sub }) {
  return (
    <div className="glass rounded-xl p-4 text-center">
      <div className="text-2xl mb-1">{emoji}</div>
      <div className="text-xl font-extrabold text-gradient">{value}</div>
      <div className="text-xs text-white font-semibold mt-0.5">{label}</div>
      {sub && <div className="text-[10px] text-slate-500 mt-0.5">{sub}</div>}
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [branches,  setBranches]  = useState([]);
  const [placement, setPlacement] = useState(null);
  const [notices,   setNotices]   = useState([]);
  const [college,   setCollege]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [tab, setTab] = useState('branches');

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [b, p, n, c] = await Promise.allSettled([
          getAllBranches(), getPlacements(), getNotices({ limit: 6 }), getCollegeInfo()
        ]);
        if (b.status === 'fulfilled') setBranches(b.value?.data || []);
        if (p.status === 'fulfilled') setPlacement(p.value?.data);
        if (n.status === 'fulfilled') setNotices(n.value?.data || []);
        if (c.status === 'fulfilled') setCollege(c.value?.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <div className="text-center">
        <Loader2 size={36} className="text-indigo-500 animate-spin mx-auto mb-3" />
        <p className="text-slate-400 text-sm">Loading dashboard…</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-hero text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-white text-sm">Dashboard</h1>
          <p className="text-[10px] text-slate-400">GEC Bhavnagar – Overview</p>
        </div>
        <button onClick={() => navigate('/chat')} className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all">
          <MessageCircle size={14} /> Chat
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        {/* College Info Banner */}
        {college && (
          <div className="glass rounded-2xl p-5 border border-indigo-500/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-extrabold text-lg text-white">{college.name}</h2>
                <p className="text-xs text-slate-400 mt-0.5">Estd. {college.established} · Affiliated to GTU · AICTE Approved</p>
                <p className="text-xs text-slate-500 mt-1">📍 {college.address}</p>
              </div>
              <a href={college.website} target="_blank" rel="noopener noreferrer"
                 className="shrink-0 flex items-center gap-1 px-3 py-1.5 glass glass-hover rounded-xl text-xs text-indigo-300 border border-indigo-500/30">
                Website <ExternalLink size={10} />
              </a>
            </div>
          </div>
        )}

        {/* Stats */}
        {placement && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard emoji="💼" value={`${placement.overallPlacementPercent}%`} label="Placement Rate" sub="2024-25" />
            <StatCard emoji="🏆" value={placement.highestPackage} label="Highest Package" sub="2024-25" />
            <StatCard emoji="📊" value={placement.averagePackage} label="Avg Package" sub="2024-25" />
            <StatCard emoji="🏢" value={placement.totalCompanies} label="Companies" sub="Visited campus" />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 glass rounded-2xl p-1">
          {[['branches','🏛️ Branches'],['placements','💼 Placements'],['notices','📋 Notices']].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${tab===t ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Tab: Branches */}
        {tab === 'branches' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {branches.map(b => (
              <button key={b.code} onClick={() => navigate(`/branches/${b.code}`)}
                      className={`glass p-4 rounded-2xl border text-left hover:scale-[1.02] transition-all active:scale-95 ${BRANCH_COLORS[b.code] || ''}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-2xl">{BRANCH_EMOJIS[b.code] || '📚'}</span>
                    <h3 className="font-bold text-sm text-white mt-1">{b.code} – {b.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{b.shortDescription}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-500 mt-1 shrink-0" />
                </div>
                <div className="mt-3 flex gap-3 text-xs text-slate-500">
                  <span>👤 HOD: {b.hod?.split(' ').slice(-1)[0]}</span>
                  <span>📊 {b.placementPercent}% placed</span>
                  <span>💰 {b.averagePackage}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab: Placements */}
        {tab === 'placements' && placement && (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold text-white mb-3 flex items-center gap-2"><TrendingUp size={16} className="text-green-400" /> Placement Overview 2024-25</h3>
              <div className="space-y-2">
                {placement.branchWiseStats?.map(stat => (
                  <div key={stat.branch} className="flex items-center gap-3">
                    <span className="w-12 text-xs font-bold text-slate-300">{stat.branch}</span>
                    <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all"
                           style={{ width: `${Math.round(stat.placed / stat.total * 100)}%` }} />
                    </div>
                    <span className="text-xs text-slate-400 w-20 shrink-0">{stat.placed}/{stat.total} · {stat.averagePackage}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold text-white mb-3">🏢 Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {placement.topCompanies?.map(c => (
                  <span key={c} className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-900/40 text-indigo-300 border border-indigo-500/30">{c}</span>
                ))}
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold text-white mb-3">📋 Recent Placement Records</h3>
              <div className="space-y-2">
                {placement.records?.slice(0, 8).map((r, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <span className="text-xs font-bold text-white">{r.company}</span>
                      <span className="text-xs text-slate-400 ml-2">{r.role}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-green-400">{r.package}</span>
                      <span className="text-xs text-slate-500 ml-1">({r.branch})</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Notices */}
        {tab === 'notices' && (
          <div className="space-y-3">
            {notices.length === 0
              ? <div className="glass rounded-xl p-8 text-center text-slate-400 text-sm">No notices available</div>
              : notices.map(n => (
                  <div key={n._id} className={`glass rounded-xl p-4 ${n.isImportant ? 'border-l-4 border-red-500' : ''}`}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">{n.isImportant ? '⚠️' : '📌'}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-white">{n.title}</h4>
                        <p className="text-xs text-slate-400 mt-0.5">{n.description}</p>
                        {n.link && (
                          <a href={n.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-400 mt-1">
                            View <ExternalLink size={10} />
                          </a>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${n.isImportant ? 'bg-red-900/50 text-red-300' : 'bg-slate-800 text-slate-400'}`}>
                        {n.category}
                      </span>
                    </div>
                  </div>
                ))
            }
          </div>
        )}

        {/* GTU Links */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-bold text-white mb-4">🔗 Important Links</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              ['GTU Results','https://gturesults.in/','📊'],
              ['Student Portal','https://student.gtu.ac.in/Login.aspx','🎓'],
              ['Old Papers','https://gtu.ac.in/OldQuestionPapers/OldQuestionPapers.aspx','📄'],
              ['GTU Syllabus','https://gtu.ac.in/syllabus/syllabus.aspx','📚'],
              ['GEC Website','https://gecbhavnagar.ac.in','🏛️'],
              ['Exam Timetable','https://gtu.ac.in/timetable/timetable.aspx','📅'],
              ['MYSY Scholarship','https://mysy.guj.nic.in/','💰'],
              ['SWAYAM Courses','https://swayam.gov.in','🎯'],
            ].map(([label,url,emoji]) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 p-2.5 glass glass-hover rounded-xl transition-all group">
                <span className="text-lg">{emoji}</span>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-white leading-tight">{label}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
