// PlacementPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, TrendingUp } from 'lucide-react';
import { getPlacements } from '../services/api';

export function PlacementPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlacements().then(d => setData(d?.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-[#0f0f1a] flex items-center justify-center">
      <Loader2 size={32} className="text-indigo-500 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-hero text-white">
      <div className="sticky top-0 z-50 glass border-b border-white/5 px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/dashboard')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all"><ArrowLeft size={20}/></button>
        <div><h1 className="font-bold text-white text-sm">Placement Report 2024-25</h1><p className="text-[10px] text-slate-400">GEC Bhavnagar T&P Cell</p></div>
      </div>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {data && <>
          {/* Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              ['💼', `${data.overallPlacementPercent}%`, 'Placement Rate'],
              ['🏆', data.highestPackage, 'Highest Pkg'],
              ['📊', data.averagePackage, 'Average Pkg'],
              ['🏢', data.totalCompanies, 'Companies'],
            ].map(([e,v,l]) => (
              <div key={l} className="glass rounded-xl p-4 text-center">
                <div className="text-2xl mb-1">{e}</div>
                <div className="text-lg font-extrabold text-gradient">{v}</div>
                <div className="text-xs text-slate-400">{l}</div>
              </div>
            ))}
          </div>

          {/* Branch-wise bars */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2"><TrendingUp size={16} className="text-green-400"/>Branch-wise Placement</h3>
            {data.branchWiseStats?.map(s => (
              <div key={s.branch} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-white">{s.branch}</span>
                  <span className="text-slate-400">{s.placed}/{s.total} · Avg {s.averagePackage} · High {s.highestPackage}</span>
                </div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full"
                       style={{width:`${Math.round(s.placed/s.total*100)}%`}}/>
                </div>
              </div>
            ))}
          </div>

          {/* All records */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold text-white mb-4">📋 Placement Records</h3>
            <div className="divide-y divide-white/5">
              {data.records?.map((r,i) => (
                <div key={i} className="flex items-center justify-between py-2.5">
                  <div>
                    <span className="text-sm font-bold text-white">{r.company}</span>
                    <span className="text-xs text-slate-400 ml-2">{r.role}</span>
                    <div className="text-xs text-slate-500">{r.branch} · {r.type} · {r.studentsPlaced} placed</div>
                  </div>
                  <span className="text-sm font-bold text-green-400">{r.package}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top companies */}
          <div className="glass rounded-2xl p-5">
            <h3 className="font-bold text-white mb-3">🏢 All Recruiting Companies</h3>
            <div className="flex flex-wrap gap-2">
              {data.topCompanies?.map(c => <span key={c} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-indigo-900/40 text-indigo-300 border border-indigo-500/30">{c}</span>)}
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}

export default PlacementPage;
