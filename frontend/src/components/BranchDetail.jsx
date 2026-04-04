import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Users, BookOpen, TrendingUp, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { getBranch } from '../services/api';

const EMOJIS = { CE:'💻', IT:'🌐', ICT:'📡', EC:'⚡', MECH:'⚙️', CIVIL:'🏗️' };

function SemCard({ sem }) {
  const [open, setOpen] = useState(sem.semNumber <= 2);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-all">
        <span className="font-bold text-sm text-white">Semester {sem.semNumber}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">{sem.subjects.length} subjects</span>
          {open ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
        </div>
      </button>
      {open && (
        <div className="border-t border-white/5 divide-y divide-white/5">
          {sem.subjects.map((s, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2.5">
              <div>
                {s.code && <span className="text-[10px] font-mono text-slate-500 mr-2">{s.code}</span>}
                <span className="text-xs text-slate-200">{s.name}</span>
                {s.type && s.type !== 'Theory' && <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-900/50 text-indigo-300">{s.type}</span>}
              </div>
              <span className="text-[10px] text-slate-500 shrink-0 ml-4">{s.faculty}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BranchDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    getBranch(code)
      .then(d => setBranch(d?.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <Loader2 size={32} className="text-indigo-500 animate-spin" />
    </div>
  );

  if (!branch) return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col items-center justify-center gap-4 text-white">
      <p className="text-xl">Branch "{code}" not found</p>
      <button onClick={() => navigate('/dashboard')} className="px-4 py-2 bg-indigo-600 rounded-xl text-sm">← Back</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-hero text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all">
          <ArrowLeft size={20} />
        </button>
        <span className="text-2xl">{EMOJIS[branch.code] || '📚'}</span>
        <div className="flex-1">
          <h1 className="font-bold text-white text-sm">{branch.code} – {branch.name}</h1>
          <p className="text-[10px] text-slate-400">HOD: {branch.hod} · Intake: {branch.intake}</p>
        </div>
        <button onClick={() => navigate(`/chat?q=Tell me about ${branch.code}`)}
                className="flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all">
          <MessageCircle size={13} /> Ask AI
        </button>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 glass rounded-2xl p-1 mb-5">
          {[['overview','Overview'],['subjects','Subjects'],['faculty','Faculty'],['placement','Placement']].map(([t,l]) => (
            <button key={t} onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${tab===t ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === 'overview' && (
          <div className="space-y-4 animate-fade-up">
            <div className="glass rounded-2xl p-5">
              <p className="text-sm text-slate-300 leading-relaxed">{branch.fullDescription}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div className="glass rounded-xl p-3"><span className="text-slate-400">Accreditation</span><div className="font-semibold text-white mt-0.5">{branch.accreditation}</div></div>
                <div className="glass rounded-xl p-3"><span className="text-slate-400">Established</span><div className="font-semibold text-white mt-0.5">{branch.establishedYear}</div></div>
                <div className="glass rounded-xl p-3"><span className="text-slate-400">HOD Email</span><div className="font-semibold text-indigo-300 mt-0.5 break-all text-[10px]">{branch.hodEmail}</div></div>
                <div className="glass rounded-xl p-3"><span className="text-slate-400">Intake</span><div className="font-semibold text-white mt-0.5">{branch.intake} students/year</div></div>
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold text-sm text-white mb-3">🚀 Career Opportunities</h3>
              <div className="flex flex-wrap gap-2">
                {branch.careerOpportunities?.map(c => <span key={c} className="px-3 py-1 text-xs rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-500/20">{c}</span>)}
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold text-sm text-white mb-3">🔬 Labs & Facilities</h3>
              <div className="space-y-1.5">
                {branch.labsAndFacilities?.map(l => <div key={l} className="flex items-center gap-2 text-xs text-slate-300"><span className="text-green-400">✓</span>{l}</div>)}
              </div>
            </div>
          </div>
        )}

        {/* Subjects */}
        {tab === 'subjects' && (
          <div className="space-y-3 animate-fade-up">
            {branch.semesters?.sort((a,b) => a.semNumber - b.semNumber).map(sem => <SemCard key={sem.semNumber} sem={sem} />)}
            <div className="text-center pt-2">
              <a href="https://gtu.ac.in/syllabus/syllabus.aspx" target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300">
                Download official GTU syllabus →
              </a>
            </div>
          </div>
        )}

        {/* Faculty */}
        {tab === 'faculty' && (
          <div className="space-y-3 animate-fade-up">
            {branch.faculty?.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-900 flex items-center justify-center text-indigo-300 font-bold shrink-0">
                    {f.name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-white">{f.name}</h4>
                      {f.isHOD && <span className="text-[9px] px-2 py-0.5 rounded-full bg-indigo-600 text-white font-bold">HOD</span>}
                    </div>
                    <p className="text-xs text-slate-400">{f.designation}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{f.qualification} · {f.specialization}</p>
                    <p className="text-xs text-slate-500 mt-0.5">Experience: {f.experience}</p>
                    {f.subjectsTaught?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {f.subjectsTaught.map(s => <span key={s} className="text-[9px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">{s}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Placement */}
        {tab === 'placement' && (
          <div className="space-y-4 animate-fade-up">
            <div className="grid grid-cols-3 gap-3">
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-xl font-extrabold text-gradient">{branch.averagePackage}</div>
                <div className="text-xs text-slate-400 mt-0.5">Average Package</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-xl font-extrabold text-gradient">{branch.highestPackage}</div>
                <div className="text-xs text-slate-400 mt-0.5">Highest Package</div>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <div className="text-xl font-extrabold text-gradient">{branch.placementPercent}%</div>
                <div className="text-xs text-slate-400 mt-0.5">Placement %</div>
              </div>
            </div>
            <div className="glass rounded-2xl p-5">
              <h3 className="font-bold text-sm text-white mb-3">🏢 Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {branch.topRecruiters?.map(c => <span key={c} className="px-3 py-1 text-xs rounded-full bg-green-900/30 text-green-300 border border-green-500/20">{c}</span>)}
              </div>
            </div>
            <button onClick={() => navigate('/placements')} className="w-full py-3 glass glass-hover rounded-xl text-sm font-semibold text-indigo-300 border border-indigo-500/20 transition-all">
              View Full Placement Report →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
