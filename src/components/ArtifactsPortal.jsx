import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  ExternalLink, 
  Cpu, 
  Activity, 
  BookOpen, 
  Filter, 
  CheckCircle, 
  Layers, 
  Code, 
  ShieldCheck, 
  Download,
  Flame,
  Zap
} from 'lucide-react';

export default function ArtifactsPortal({ artifacts }) {
  const [activeType, setActiveType] = useState('all'); // 'all', 'gem', 'claude', 'app'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  // Filter types
  const types = [
    { id: 'all', label: 'ทั้งหมด (All Repos)', icon: Layers },
    { id: 'gem', label: 'Gemini Custom Gems', icon: Sparkles },
    { id: 'claude', label: 'Claude AI Plugins & Skills', icon: Cpu },
    { id: 'app', label: 'Interactive Web Apps', icon: Activity },
  ];

  // Unique departments
  const departments = useMemo(() => {
    const set = new Set();
    artifacts.forEach(a => {
      if (a.department) set.add(a.department);
    });
    return ['all', ...Array.from(set).sort()];
  }, [artifacts]);

  // Filtered artifacts
  const filtered = useMemo(() => {
    return artifacts.filter(item => {
      if (activeType !== 'all' && item.category !== activeType) return false;
      if (selectedDept !== 'all' && item.department !== selectedDept) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchValue = item.businessValue.toLowerCase().includes(q);
        const matchAuthor = item.author.toLowerCase().includes(q);
        const matchDept = item.department.toLowerCase().includes(q);
        const matchTags = item.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchValue && !matchAuthor && !matchDept && !matchTags) return false;
      }
      return true;
    });
  }, [artifacts, activeType, selectedDept, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* GitHub-style Header */}
      <div className="executive-card-white p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-purple-100 text-purple-800 border border-purple-200 uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                AI Artifacts &amp; Gems Portal
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                GitHub-Style Prompt &amp; Model Repository
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>คลังผลงานคำสั่ง AI และตลับ Gem ประจำโรงพยาบาลเวชธานี</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold border border-blue-200">
                {artifacts.length} รายการ
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              รวบรวมตลับ Gemini Gems ประจำฝ่ายงาน, สกิลปลั๊กอิน Claude AI สำหรับพยาบาลวิชาชีพ, และระบบเว็บแอปพลิเคชันต้นแบบที่สร้างขึ้นจริงในโครงการ AI IPD / NSD 2026
            </p>
          </div>

          {/* Type Selector Tabs */}
          <div className="flex items-center bg-blue-50/80 p-1.5 rounded-xl border border-blue-200/80 self-start lg:self-auto overflow-x-auto shadow-inner">
            {types.map(t => {
              const Icon = t.icon;
              const count = t.id === 'all' ? artifacts.length : artifacts.filter(a => a.category === t.id).length;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveType(t.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeType === t.id 
                      ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md shadow-blue-500/20' 
                      : 'text-slate-600 hover:text-blue-900'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    activeType === t.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GitHub Search & Filter Controls */}
      <div className="executive-card-white p-3.5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาตามชื่อผลงาน, คำสั่ง AI, คุณค่าทางธุรกิจ, ผู้พัฒนา, หรือแท็ก..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-blue-700"
            >
              ล้าง
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-blue-700 shrink-0" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-blue-50/50 border border-blue-100 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 w-full sm:w-64 cursor-pointer"
          >
            <option value="all">ทุกหน่วยงาน ({departments.length - 1} ฝ่าย)</option>
            {departments.filter(d => d !== 'all').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List of Repositories / Artifact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(item => {
          const isDownload = item.url.endsWith('.zip');
          return (
            <div
              key={item.id}
              className="executive-card-white p-5 flex flex-col justify-between space-y-4 group relative"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold font-mono border shadow-xs ${
                      item.category === 'gem' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      item.category === 'claude' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {item.badge}
                    </span>
                    <span className="text-xs font-bold text-blue-700 truncate max-w-[220px]">
                      {item.department}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono shrink-0 font-medium">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mt-2.5 leading-snug group-hover:text-blue-800 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-200/80 shadow-inner">
                  <div className="text-[11px] text-amber-800 font-extrabold mb-1 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>คุณค่าเชิงธุรกิจ &amp; ผลลัพธ์ทางคลินิก (Business Value):</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {item.businessValue}
                  </p>
                </div>
              </div>

              {/* Footer Row: Author, Tags, CTA */}
              <div className="pt-3.5 border-t border-blue-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <span className="text-slate-400">ผู้พัฒนา:</span>{' '}
                  <strong className="text-slate-800 font-semibold">{item.author}</strong>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {isDownload ? (
                    <a
                      href={item.url}
                      download
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด Plugin</span>
                    </a>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <span>เปิดลิงก์ผลงานจริง</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
