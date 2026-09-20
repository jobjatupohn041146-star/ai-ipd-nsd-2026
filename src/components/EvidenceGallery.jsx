import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Layers, 
  FileText, 
  Image as ImageIcon, 
  Terminal, 
  Users, 
  Calendar, 
  Download, 
  ExternalLink,
  Eye,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function EvidenceGallery({ manifest, onSelectMedia }) {
  const [selectedPhase, setSelectedPhase] = useState('all'); // 'all', 'Day 1', 'Day 2'
  const [selectedCategory, setSelectedCategory] = useState('all'); // 'all', 'portfolio', 'prompts', 'atmosphere', 'documents'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  // Categories definition
  const categories = [
    { id: 'all', label: 'ทั้งหมด', icon: Layers },
    { id: 'portfolio', label: 'Portfolio & Architecture', desc: 'ผังระบบ, CI & ยุทธศาสตร์', icon: Sparkles },
    { id: 'prompts', label: 'AI Prompts & TextScreenshots', desc: 'ภาพหน้าจอแชท & คำสั่ง AI', icon: Terminal },
    { id: 'atmosphere', label: 'ภาพบรรยากาศการอบรมจริง', desc: 'ภาพกิจกรรมและห้องเรียน (ห้ามมีแชทปน)', icon: Users },
    { id: 'documents', label: 'เอกสาร & สไลด์ทางการ', desc: 'PDF, PPTX, DOCX, ZIP', icon: FileText },
  ];

  // Unique departments for filter
  const departments = useMemo(() => {
    const set = new Set();
    manifest.forEach(item => {
      if (item.department) set.add(item.department);
    });
    return ['all', ...Array.from(set).sort()];
  }, [manifest]);

  // Filtered evidence items
  const filteredItems = useMemo(() => {
    return manifest.filter(item => {
      // Phase filter
      if (selectedPhase !== 'all' && item.phase !== selectedPhase) return false;
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Department filter
      if (selectedDept !== 'all' && item.department !== selectedDept) return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchFileName = item.fileName?.toLowerCase().includes(q);
        const matchDept = item.department?.toLowerCase().includes(q);
        const matchTags = item.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchFileName && !matchDept && !matchTags) return false;
      }
      return true;
    });
  }, [manifest, selectedPhase, selectedCategory, selectedDept, searchQuery]);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts = { all: 0, portfolio: 0, prompts: 0, atmosphere: 0, documents: 0 };
    manifest.forEach(item => {
      if (selectedPhase === 'all' || item.phase === selectedPhase) {
        counts.all++;
        if (counts[item.category] !== undefined) {
          counts[item.category]++;
        }
      }
    });
    return counts;
  }, [manifest, selectedPhase]);

  // Asset URL helper
  const getAssetUrl = (fileName) => {
    return `./assets/${encodeURIComponent(fileName)}`;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Strategy Summary */}
      <div className="bg-[#0c1c31] border border-slate-700/80 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase">
                Data Integrity &amp; Strict Separation
              </span>
              <span className="text-xs text-slate-400">
                คัดแยกหมวดหมู่อย่างเข้มงวด 100% จากไฟล์หลักฐานจริง
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5">
              คลังหลักฐานเชิงประจักษ์ (Evidence &amp; Deliverables Repository)
            </h2>
          </div>

          {/* Phase Selector (Day 1 / Day 2 / All) */}
          <div className="flex items-center bg-[#071322] p-1 rounded-lg border border-slate-800 self-start md:self-auto">
            <button
              onClick={() => setSelectedPhase('all')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                selectedPhase === 'all' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              ทุกวันอบรม ({manifest.length})
            </button>
            <button
              onClick={() => setSelectedPhase('Day 1')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedPhase === 'Day 1' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Day 1: 14 ก.ย. 2569</span>
            </button>
            <button
              onClick={() => setSelectedPhase('Day 2')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedPhase === 'Day 2' ? 'bg-sky-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>Day 2: 18 ก.ย. 2569</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-5 pt-4 border-t border-slate-800">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isCatActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-lg text-left transition-all border cursor-pointer ${
                  isCatActive
                    ? 'bg-sky-600/20 border-sky-500 text-white shadow-md'
                    : 'bg-[#091526]/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`w-4 h-4 ${isCatActive ? 'text-sky-400' : 'text-slate-500'}`} />
                  <span className={`text-xs px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isCatActive ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300'
                  }`}>
                    {count}
                  </span>
                </div>
                <div className="text-xs font-bold leading-tight truncate">{cat.label}</div>
                {cat.desc && (
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{cat.desc}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Live Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#081525] p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาชื่อไฟล์, หัวข้อภาษาไทย, ฝ่ายงาน, หรือคีย์เวิร์ด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#0c1f36] border border-slate-700/80 rounded-lg text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
            >
              ล้าง
            </button>
          )}
        </div>

        {/* Department Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-[#0c1f36] border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500 w-full sm:w-64 cursor-pointer"
          >
            <option value="all">ทุกฝ่ายงาน ({departments.length - 1} ฝ่าย)</option>
            {departments.filter(d => d !== 'all').map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          แสดง <strong>{filteredItems.length}</strong> รายการหลักฐาน
          {selectedPhase !== 'all' && ` (${selectedPhase})`}
          {selectedCategory !== 'all' && ` [หมวด: ${categories.find(c => c.id === selectedCategory)?.label}]`}
        </span>
        {filteredItems.length === 0 && (
          <span className="text-amber-400">ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา</span>
        )}
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const isImage = item.fileType.startsWith('image/');
          const isPdf = item.fileType.includes('pdf');
          const isDocx = item.fileName.endsWith('.docx');
          const isPptx = item.fileName.endsWith('.pptx');
          const isZip = item.fileName.endsWith('.zip');
          const isTxt = item.fileName.endsWith('.txt');
          const assetUrl = getAssetUrl(item.fileName);

          return (
            <div
              key={item.id}
              className="executive-card executive-card-hover rounded-xl overflow-hidden border border-slate-800 flex flex-col justify-between bg-[#091526]"
            >
              {/* Media Thumbnail or Document Badge */}
              <div className="relative aspect-[16/10] bg-[#050b14] overflow-hidden group">
                {isImage ? (
                  <img
                    src={assetUrl}
                    alt={item.title}
                    loading="eager"
                    decoding="async"
                    onClick={() => onSelectMedia(item)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                {/* Fallback & Document Cover */}
                <div 
                  className={`w-full h-full ${isImage ? 'hidden' : 'flex'} flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#0c1f36] to-[#071322] border-b border-slate-800`}
                >
                  {isPdf && <FileText className="w-12 h-12 text-rose-400 mb-2" />}
                  {isPptx && <FileText className="w-12 h-12 text-amber-400 mb-2" />}
                  {isDocx && <FileText className="w-12 h-12 text-sky-400 mb-2" />}
                  {isZip && <Download className="w-12 h-12 text-purple-400 mb-2" />}
                  {isTxt && <FileText className="w-12 h-12 text-emerald-400 mb-2" />}
                  
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {isPdf ? 'PDF DOCUMENT' : isPptx ? 'POWERPOINT DECK' : isDocx ? 'WORD DOCUMENT' : isZip ? 'CLAUDE PLUGIN ZIP' : 'TEXT TRANSCRIPT'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                    {item.fileName}
                  </span>
                </div>

                {/* Overlaid Badges */}
                <div className="absolute top-2 left-2 flex gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#060e1a]/80 text-sky-300 border border-slate-700 backdrop-blur-md">
                    {item.phase}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold backdrop-blur-md border ${
                    item.category === 'portfolio' ? 'bg-amber-950/80 text-amber-300 border-amber-600/40' :
                    item.category === 'prompts' ? 'bg-purple-950/80 text-purple-300 border-purple-600/40' :
                    item.category === 'atmosphere' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/40' :
                    'bg-rose-950/80 text-rose-300 border-rose-600/40'
                  }`}>
                    {item.category === 'portfolio' ? 'Portfolio' :
                     item.category === 'prompts' ? 'AI Prompts' :
                     item.category === 'atmosphere' ? 'Atmosphere' : 'Document'}
                  </span>
                </div>

                {/* Preview Trigger Overlay */}
                {isImage && (
                  <button
                    onClick={() => onSelectMedia(item)}
                    className="absolute inset-0 bg-sky-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer text-white text-xs font-semibold gap-1.5"
                  >
                    <Eye className="w-4 h-4" />
                    <span>คลิกเพื่อดูภาพขยาย</span>
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-sky-400">
                    {item.department}
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags & Action Row */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono text-[10px] text-slate-500">
                    {item.date}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {isImage ? (
                      <button
                        onClick={() => onSelectMedia(item)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-sky-600 hover:text-white text-slate-300 font-medium text-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>ขยายภาพ</span>
                      </button>
                    ) : (
                      <a
                        href={assetUrl}
                        download={item.fileName}
                        className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white font-medium text-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>ดาวน์โหลด</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
