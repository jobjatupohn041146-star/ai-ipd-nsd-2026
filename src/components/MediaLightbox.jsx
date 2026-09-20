import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink, Calendar, Layers, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export default function MediaLightbox({ item, onClose, onPrev, onNext }) {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!item) return null;

  const assetUrl = `./assets/${encodeURIComponent(item.fileName)}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative max-w-6xl w-full max-h-[95vh] bg-white border border-blue-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row ring-1 ring-blue-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-rose-600 transition-all cursor-pointer shadow-lg"
          title="ปิดหน้าต่าง (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Area */}
        <div className="flex-1 bg-slate-950 flex items-center justify-center relative overflow-hidden min-h-[320px] md:min-h-[520px]">
          <img
            src={assetUrl}
            alt={item.title}
            className={`transition-all duration-300 select-none ${
              isZoomed 
                ? 'max-w-none scale-150 cursor-zoom-out' 
                : 'max-w-full max-h-[75vh] object-contain cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* Nav buttons */}
          {onPrev && (
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer border border-white/10"
              title="ก่อนหน้า"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          {onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-blue-600 transition-all cursor-pointer border border-white/10"
              title="ถัดไป"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Zoom Toggle Pill */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute bottom-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-bold flex items-center gap-1.5 border border-white/20 backdrop-blur cursor-pointer hover:bg-slate-800"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4 text-blue-400" /> : <ZoomIn className="w-4 h-4 text-blue-400" />}
            <span>{isZoomed ? 'ย่อขนาด' : 'ซูม 150%'}</span>
          </button>
        </div>

        {/* Metadata Sidebar */}
        <div className="w-full md:w-96 p-6 border-t md:border-t-0 md:border-l border-blue-100 flex flex-col justify-between space-y-4 bg-gradient-to-b from-white to-blue-50/30 overflow-y-auto max-h-[85vh]">
          <div className="space-y-3.5">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200 font-mono">
                {item.phase}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border font-mono ${
                item.category === 'portfolio' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                item.category === 'prompts' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                item.category === 'atmosphere' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                'bg-rose-50 text-rose-800 border-rose-300'
              }`}>
                {item.category === 'portfolio' ? 'Portfolio' :
                 item.category === 'prompts' ? 'AI Prompts' :
                 item.category === 'atmosphere' ? 'Atmosphere' : 'Document'}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
              {item.title}
            </h3>

            {/* Department */}
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
              {item.department}
            </div>

            {/* Description */}
            <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 leading-relaxed font-medium">
              {item.description}
            </div>

            {/* File Info */}
            <div className="space-y-1 pt-1 text-[11px] text-slate-500 font-mono">
              <div><strong className="text-slate-700 font-sans">ชื่อไฟล์:</strong> {item.fileName}</div>
              <div><strong className="text-slate-700 font-sans">วันที่บันทึก:</strong> {item.date}</div>
              <div><strong className="text-slate-700 font-sans">ชนิดไฟล์:</strong> {item.fileType}</div>
            </div>

            {/* Tags */}
            {item.tags && (
              <div className="pt-2">
                <div className="text-[10px] text-slate-400 uppercase font-extrabold tracking-wider mb-1.5">Tags:</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t, ti) => (
                    <span key={ti} className="text-[10px] px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold shadow-2xs">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-blue-100 flex items-center justify-between gap-2">
            <a
              href={assetUrl}
              download={item.fileName}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              <span>ดาวน์โหลดภาพต้นฉบับ</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
