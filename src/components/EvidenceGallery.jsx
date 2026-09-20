import React, { useState, useMemo, useEffect } from 'react';
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
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function EvidenceGallery({ manifest, onSelectMedia, initialCategory = 'all' }) {
  const [selectedPhase, setSelectedPhase] = useState('all'); // 'all', 'Day 1', 'Day 2'
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Categories definition with color accents
  const categories = [
    { id: 'all', label: 'ทั้งหมด (All Evidence)', desc: 'รวมหลักฐาน 61 รายการ', icon: Layers, badgeColor: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'portfolio', label: 'ภาพผลงาน & ผังระบบ', desc: 'สถาปัตยกรรม, CI & แชทยุทธศาสตร์', icon: Sparkles, badgeColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'prompts', label: 'AI Prompts & Chats', desc: 'ภาพหน้าจอแชท & คำสั่งระบบ', icon: Terminal, badgeColor: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'atmosphere', label: 'ภาพบรรยากาศการอบรมจริง', desc: 'ภาพกิจกรรมในห้องเรียน (ไม่มีแชทปน)', icon: Users, badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'documents', label: 'เอกสาร & สไลด์ทางการ', desc: 'PDF, PPTX, DOCX, ZIP', icon: FileText, badgeColor: 'bg-rose-50 text-rose-700 border-rose-200' },
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
      <div className="executive-card-white p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                Data Integrity &amp; Strict Separation
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                คัดแยกหมวดหมู่เข้มงวด 100% จากไฟล์หลักฐานจริง
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>คลังหลักฐานเชิงประจักษ์ (Evidence &amp; Deliverables)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              {selectedCategory === 'atmosphere' 
                ? 'ภาพถ่ายบรรยากาศการอบรมเชิงปฏิบัติการจริงในห้องสัมมนา การฝึกอบรม และกิจกรรมกลุ่ม (คัดกรองแยกเฉพาะรูปกิจกรรม ไม่ปนเปื้อนภาพแชท)'
                : selectedCategory === 'portfolio'
                ? 'ภาพผลงานยุทธศาสตร์ สถาปัตยกรรมระบบ แดชบอร์ดสรุปผลงาน และผังการพยาบาล AI-Driven Workflow'
                : selectedCategory === 'documents'
                ? 'คลังเอกสารทางการ สไลด์นำเสนอหลักสูตร คู่มือการใช้งาน และโค้ดปลั๊กอิน ZIP สมบูรณ์'
                : 'รวบรวมหลักฐานและผลงานทั้งหมด 61 รายการ คัดแยกหมวดหมู่อย่างโปร่งใส ตรวจสอบย้อนกลับได้ระดับ 100%'}
            </p>
          </div>

          {/* Phase Selector (Day 1 / Day 2 / All) */}
          <div className="flex items-center bg-blue-50/80 p-1.5 rounded-xl border border-blue-200/80 self-start lg:self-auto shadow-inner">
            <button
              onClick={() => setSelectedPhase('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                selectedPhase === 'all' 
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              ทุกวันอบรม ({manifest.length})
            </button>
            <button
              onClick={() => setSelectedPhase('Day 1')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedPhase === 'Day 1' 
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Day 1: 14 ก.ย.</span>
            </button>
            <button
              onClick={() => setSelectedPhase('Day 2')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedPhase === 'Day 2' 
                  ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-md shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Day 2: 18 ก.ย.</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-blue-100">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isCatActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-xl text-left transition-all border cursor-pointer relative group ${
                  isCatActive
                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-400 shadow-md ring-2 ring-blue-400/20'
                    : 'bg-white/80 border-slate-200 text-slate-600 hover:border-blue-300 hover:bg-blue-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <Icon className={`w-4 h-4 ${isCatActive ? 'text-blue-700' : 'text-slate-400 group-hover:text-blue-600'}`} />
                  <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-bold ${
                    isCatActive ? 'bg-blue-700 text-white shadow-sm' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {count}
                  </span>
                </div>
                <div className={`text-xs font-bold leading-tight truncate ${isCatActive ? 'text-blue-950' : 'text-slate-800'}`}>
                  {cat.label}
                </div>
                {cat.desc && (
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{cat.desc}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter & Live Search Bar */}
      <div className="executive-card-white p-3.5 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหาชื่อไฟล์, หัวข้อภาษาไทย, ฝ่ายงาน, หรือคีย์เวิร์ด..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-blue-50/50 border border-blue-100 rounded-lg text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
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

        {/* Department Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-blue-700 shrink-0" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-blue-50/50 border border-blue-100 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 w-full sm:w-64 cursor-pointer"
          >
            <option value="all">ทุกฝ่ายงาน ({departments.length - 1} ฝ่าย)</option>
            {departments.filter(d => d !== 'all').map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1 font-medium">
        <span>
          แสดง <strong>{filteredItems.length}</strong> รายการหลักฐาน
          {selectedPhase !== 'all' && ` (${selectedPhase})`}
          {selectedCategory !== 'all' && ` [หมวด: ${categories.find(c => c.id === selectedCategory)?.label}]`}
        </span>
        {filteredItems.length === 0 && (
          <span className="text-amber-700 font-bold bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            ไม่พบรายการที่ตรงกับเงื่อนไขการค้นหา
          </span>
        )}
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              className="executive-card-white overflow-hidden flex flex-col justify-between group relative"
            >
              {/* Media Thumbnail or Document Badge */}
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                {isImage ? (
                  <img
                    src={assetUrl}
                    alt={item.title}
                    loading="eager"
                    decoding="async"
                    onClick={() => onSelectMedia(item)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}

                {/* Fallback & Document Cover */}
                <div 
                  className={`w-full h-full ${isImage ? 'hidden' : 'flex'} flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-blue-50 to-indigo-100/70 border-b border-blue-100`}
                >
                  {isPdf && <FileText className="w-12 h-12 text-rose-500 mb-2 drop-shadow-sm" />}
                  {isPptx && <FileText className="w-12 h-12 text-amber-500 mb-2 drop-shadow-sm" />}
                  {isDocx && <FileText className="w-12 h-12 text-blue-600 mb-2 drop-shadow-sm" />}
                  {isZip && <Download className="w-12 h-12 text-purple-600 mb-2 drop-shadow-sm" />}
                  {isTxt && <FileText className="w-12 h-12 text-emerald-600 mb-2 drop-shadow-sm" />}
                  
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">
                    {isPdf ? 'PDF DOCUMENT' : isPptx ? 'POWERPOINT DECK' : isDocx ? 'WORD DOCUMENT' : isZip ? 'CLAUDE PLUGIN ZIP' : 'TEXT TRANSCRIPT'}
                  </span>
                  <span className="text-[11px] text-slate-600 mt-1 line-clamp-1 font-mono font-medium">
                    {item.fileName}
                  </span>
                </div>

                {/* Overlaid Badges */}
                <div className="absolute top-2.5 left-2.5 flex gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-blue-900 border border-blue-200 backdrop-blur shadow-sm">
                    {item.phase}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold backdrop-blur shadow-sm border ${
                    item.category === 'portfolio' ? 'bg-amber-50/95 text-amber-800 border-amber-300' :
                    item.category === 'prompts' ? 'bg-purple-50/95 text-purple-800 border-purple-300' :
                    item.category === 'atmosphere' ? 'bg-emerald-50/95 text-emerald-800 border-emerald-300' :
                    'bg-rose-50/95 text-rose-800 border-rose-300'
                  }`}>
                    {item.category === 'portfolio' ? 'ภาพผลงาน' :
                     item.category === 'prompts' ? 'AI Prompts' :
                     item.category === 'atmosphere' ? 'ภาพบรรยากาศจริง' : 'เอกสารทางการ'}
                  </span>
                </div>

                {/* Preview Trigger Overlay */}
                {isImage && (
                  <button
                    onClick={() => onSelectMedia(item)}
                    className="absolute inset-0 bg-blue-900/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200 cursor-pointer text-white text-xs font-bold gap-2 backdrop-blur-xs"
                  >
                    <div className="px-3.5 py-1.5 rounded-full bg-white text-blue-900 shadow-lg flex items-center gap-1.5 transform group-hover:scale-105 transition-transform font-bold">
                      <Eye className="w-4 h-4 text-blue-600" />
                      <span>คลิกเพื่อดูภาพขยาย</span>
                    </div>
                  </button>
                )}
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>{item.department}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-blue-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Tags & Action Row */}
                <div className="pt-3 border-t border-blue-100 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-500 font-medium">
                    {item.date}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    {isImage ? (
                      <button
                        onClick={() => onSelectMedia(item)}
                        className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-800 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-blue-200 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>ขยายภาพ</span>
                      </button>
                    ) : (
                      <a
                        href={assetUrl}
                        download={item.fileName}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
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
