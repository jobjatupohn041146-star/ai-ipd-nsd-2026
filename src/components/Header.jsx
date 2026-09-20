import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Layers, 
  Users, 
  FileText, 
  Award,
  Sparkles,
  Printer
} from 'lucide-react';

export default function Header({ currentTab, setCurrentTab, totalEvidence, totalArtifacts }) {
  const navItems = [
    { id: 'overview', label: 'ภาพรวมผู้บริหาร', sub: 'BLUF & KPIs', icon: Activity },
    { id: 'evidence', label: 'หลักฐานการอบรม', sub: 'Day 1 / Day 2', icon: Layers, badge: totalEvidence },
    { id: 'artifacts', label: 'คลังผลงาน AI & Gems', sub: 'GitHub Style', icon: Sparkles, badge: totalArtifacts },
    { id: 'people', label: 'ทำเนียบผู้นำและผู้ร่วมอบรม', sub: 'Leaders & Coaches', icon: Users },
    { id: 'report', label: 'รายงาน A4 ฉบับทางการ', sub: '10-Page Formal Report', icon: FileText, highlight: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060e1a]/95 backdrop-blur-md border-b border-slate-800 shadow-xl no-print">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0b192c] via-[#102a4e] to-[#0b192c] border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap justify-between items-center">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            VEJTHANI HOSPITAL · JCI ACCREDITED
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300 hidden sm:inline">โรงพยาบาลเวชธานี ลาดพร้าว &amp; เวชธานี วัฒนะวิภา 2570</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <span className="flex items-center gap-1 text-sky-400 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" /> PDPA Zero-Leakage Safe
          </span>
          <span className="hidden md:inline text-amber-400 font-mono">
            🎯 Road to ฿10B (5-Year Plan)
          </span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-500/20 border border-sky-400/30">
            <span>V</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                Executive AI Strategy &amp; Evidence Portal
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase tracking-wider">
                C-Level Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              โครงการอบรมเชิงปฏิบัติการ AI Strategy &amp; Inpatient Nursing Workflow (AI IPD / NSD 2026)
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentTab('report');
              setTimeout(() => window.print(), 300);
            }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-semibold shadow-md shadow-amber-900/30 border border-amber-400/30 transition-all cursor-pointer"
            title="พิมพ์หรือบันทึกรายงานผู้บริหาร 10 หน้าเป็น PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>พิมพ์รายงาน A4 (PDF)</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#081322] border-t border-slate-800/80 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30 border border-sky-400/30'
                    : item.highlight
                    ? 'text-amber-300 hover:bg-slate-800/80 border border-amber-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-400' : 'text-sky-400'}`} />
                <div className="text-left leading-tight">
                  <div>{item.label}</div>
                  <div className={`text-[10px] font-normal ${isActive ? 'text-sky-100' : 'text-slate-400'}`}>
                    {item.sub}
                  </div>
                </div>
                {item.badge !== undefined && (
                  <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-sky-800 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
