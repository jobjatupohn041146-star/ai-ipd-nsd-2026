import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Layers, 
  Users, 
  FileText, 
  Award,
  Sparkles,
  Printer,
  Camera,
  Flame,
  LayoutGrid
} from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  portfolioCount, 
  atmosphereCount, 
  artifactsCount, 
  docsCount,
  peopleCount 
}) {
  const navItems = [
    { id: 'overview', label: 'ภาพรวมผู้บริหาร', sub: 'BLUF & KPIs', icon: Activity },
    { id: 'portfolio', label: 'ภาพผลงาน & ยุทธศาสตร์', sub: 'Architecture & CI', icon: Sparkles, badge: portfolioCount, highlightColor: 'from-blue-600 to-sky-600' },
    { id: 'atmosphere', label: 'ภาพบรรยากาศการอบรมจริง', sub: 'Day 1 & Day 2', icon: Camera, badge: atmosphereCount, highlightColor: 'from-emerald-600 to-teal-600' },
    { id: 'artifacts', label: 'คลังคำสั่ง AI & Gems', sub: 'GitHub Style', icon: Flame, badge: artifactsCount, highlightColor: 'from-purple-600 to-indigo-600' },
    { id: 'people', label: 'ทำเนียบผู้นำ & พยาบาล', sub: '16 Champions', icon: Users, badge: peopleCount },
    { id: 'documents', label: 'เอกสาร & สไลด์ทางการ', sub: 'PDF, PPTX, ZIP', icon: Layers, badge: docsCount },
    { id: 'report', label: 'รายงาน A4 ฉบับทางการ', sub: '10-Page Formal Report', icon: FileText, special: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm no-print">
      {/* Top Banner (Hospital Standard Status) */}
      <div className="bg-gradient-to-r from-[#0d3b66] via-[#1e40af] to-[#0284c7] px-4 sm:px-6 py-1.5 text-xs text-white flex flex-wrap justify-between items-center shadow-inner">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            VEJTHANI HOSPITAL · JCI ACCREDITED
          </span>
          <span className="text-white/40 hidden sm:inline">|</span>
          <span className="text-sky-100 hidden sm:inline">โรงพยาบาลเวชธานี ลาดพร้าว &amp; เวชธานี วัฒนะวิภา 2570</span>
        </div>
        <div className="flex items-center gap-4 text-sky-100 text-[11px] font-medium">
          <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full border border-white/20">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" /> PDPA Zero-Leakage Safe
          </span>
          <span className="hidden md:inline bg-orange-500/20 text-orange-200 border border-orange-400/30 px-2 py-0.5 rounded-full font-mono font-bold">
            🎯 Road to ฿10B (5-Year Strategy)
          </span>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo and System Title */}
        <div className="flex items-center gap-4">
          <img 
            src="./assets/vejthani-logo.png" 
            alt="Vejthani Hospital Logo" 
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm transition-transform hover:scale-105"
            onError={(e) => {
              // Fallback if path differs
              e.target.src = 'public/assets/vejthani-logo.png';
            }}
          />
          <div className="border-l border-slate-200 pl-3.5">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900">
                Executive AI Strategy &amp; Evidence Portal
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wider">
                C-Level Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium">
              โครงการอบรมเชิงปฏิบัติการ AI Strategy &amp; Inpatient Nursing Workflow (AI IPD / NSD 2026)
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setCurrentTab('report');
              setTimeout(() => window.print(), 350);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-xs font-bold shadow-md shadow-orange-500/25 border border-orange-400/40 transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="พิมพ์หรือบันทึกรายงานผู้บริหาร 10 หน้าเป็น PDF"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์รายงาน A4 ฉบับทางการ (PDF)</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-[#f8fafc] border-t border-slate-200 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex space-x-1 sm:space-x-2 overflow-x-auto py-1.5 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md shadow-blue-600/30 border border-blue-500'
                    : item.special
                    ? 'text-orange-700 bg-orange-50/80 hover:bg-orange-100/80 border border-orange-300/80'
                    : 'text-slate-600 hover:bg-white hover:text-blue-700 border border-transparent hover:border-slate-200 hover:shadow-xs'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.special ? 'text-orange-600' : 'text-blue-600'}`} />
                <div className="text-left leading-tight">
                  <div>{item.label}</div>
                  <div className={`text-[10px] font-normal ${isActive ? 'text-sky-100' : 'text-slate-400'}`}>
                    {item.sub}
                  </div>
                </div>
                {item.badge !== undefined && (
                  <span className={`ml-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
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
