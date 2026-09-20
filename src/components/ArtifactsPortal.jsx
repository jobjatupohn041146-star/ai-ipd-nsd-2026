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
  Flame
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
      <div className="bg-[#091526] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-400/30 uppercase font-mono">
                AI Artifacts &amp; Gems Portal
              </span>
              <span className="text-xs text-slate-400">
                GitHub-Style Prompt &amp; Model Repository
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
              <span>คลังผลงานคำสั่ง AI และตลับ Gem ประจำโรงพยาบาลเวชธานี</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-sky-400 font-mono">
                {artifacts.length} รายการ
              </span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              รวบรวมตลับ Gemini Gems, ปลั๊กอิน Claude Skills, สคริปต์คำสั่ง และระบบต้นแบบที่พัฒนาขึ้นในโครงการ
            </p>
          </div>

          {/* Type Selector Tabs */}
          <div className="flex items-center bg-[#060e1a] p-1 rounded-lg border border-slate-800 self-start sm:self-auto overflow-x-auto">
            {types.map(t => {
              const Icon = t.icon;
              const count = t.id === 'all' ? artifacts.length : artifacts.filter(a => a.category === t.id).length;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveType(t.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeType === t.id ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t.label}</span>
                  <span className="text-[10px] px-1 py-0.2 rounded-full bg-slate-800 font-mono">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GitHub Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#081525] p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาตามชื่อผลงาน, คำสั่ง, คุณค่าทางธุรกิจ, ผู้พัฒนา, หรือแท็ก..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0c1f36] border border-slate-700/80 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-[#0c1f36] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 w-full sm:w-60 cursor-pointer"
          >
            <option value="all">ทุกหน่วยงาน ({departments.length - 1} ฝ่าย)</option>
            {departments.filter(d => d !== 'all').map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List of Repositories / Artifact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(item => {
          const isDownload = item.url.endsWith('.zip');
          return (
            <div
              key={item.id}
              className="executive-card executive-card-hover rounded-xl p-5 border border-slate-800 bg-[#091629] flex flex-col justify-between space-y-4"
            >
              {/* Top Meta */}
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono border ${
                      item.category === 'gem' ? 'bg-purple-950/80 text-purple-300 border-purple-500/40' :
                      item.category === 'claude' ? 'bg-amber-950/80 text-amber-300 border-amber-500/40' :
                      'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                    }`}>
                      {item.badge}
                    </span>
                    <span className="text-xs text-sky-400 font-medium truncate max-w-[220px]">
                      {item.department}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono shrink-0">
                    {item.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mt-2 leading-snug">
                  {item.title}
                </h3>

                <div className="mt-2.5 p-3 rounded-lg bg-[#060e1a]/80 border border-slate-800/80">
                  <div className="text-[11px] text-amber-400/90 font-semibold mb-1 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" />
                    <span>คุณค่าเชิงธุรกิจ &amp; ผลลัพธ์ทางคลินิก (Business Value):</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.businessValue}
                  </p>
                </div>
              </div>

              {/* Footer Row: Author, Tags, CTA */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400">
                  <span className="text-slate-500">ผู้พัฒนา:</span>{' '}
                  <strong className="text-slate-300">{item.author}</strong>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {isDownload ? (
                    <a
                      href={item.url}
                      download
                      className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ดาวน์โหลด Plugin</span>
                    </a>
                  ) : (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
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
