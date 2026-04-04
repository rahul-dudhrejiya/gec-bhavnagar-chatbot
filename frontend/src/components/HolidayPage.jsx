import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Calendar } from 'lucide-react';
import { getHolidays } from '../services/api';

const TYPE_STYLE = {
  National:   'bg-orange-900/40 text-orange-300 border-orange-500/30',
  Festival:   'bg-purple-900/40 text-purple-300 border-purple-500/30',
  University: 'bg-blue-900/40 text-blue-300 border-blue-500/30',
  Regional:   'bg-teal-900/40 text-teal-300 border-teal-500/30',
  Weekend:    'bg-slate-700/40 text-slate-300 border-slate-500/30',
};

export default function HolidayPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    getHolidays().then(d => setData(d?.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <Loader2 size={32} className="text-indigo-500 animate-spin" />
    </div>
  );

  const types = ['All', 'National', 'Festival', 'University', 'Regional'];
  const filtered = filter === 'All' ? data?.holidays : data?.holidays?.filter(h => h.type === filter);

  return (
    <div className="min-h-screen bg-hero text-white">
      <div className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"><ArrowLeft size={20}/></button>
        <div><h1 className="font-bold text-white text-sm">Holiday Calendar 2025-26</h1><p className="text-[10px] text-slate-400">GEC Bhavnagar · GTU Academic Year</p></div>
      </div>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
        {data && <>
          {/* College Timings */}
          <div className="glass rounded-2xl p-5 border border-indigo-500/20">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2"><Calendar size={16} className="text-indigo-400"/> College Timings</h3>
            <div className="space-y-2 text-sm">
              {Object.entries(data.collegeTimings || {}).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-white font-semibold">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${filter===t ? 'bg-indigo-600 text-white' : 'glass text-slate-400 hover:text-white'}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Holiday list */}
          <div className="space-y-2">
            {filtered?.map((h, i) => (
              <div key={i} className="glass rounded-xl px-4 py-3 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm text-white">{h.occasion}</p>
                  <p className="text-xs text-slate-400">{h.date}{h.day ? ` · ${h.day}` : ''}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-1 rounded-full border shrink-0 ${TYPE_STYLE[h.type] || ''}`}>
                  {h.type}
                </span>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-500 pb-4">
            * Dates are as per GTU Academic Calendar 2025-26. Verify from official GTU website.
          </p>
        </>}
      </div>
    </div>
  );
}
