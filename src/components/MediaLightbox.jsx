import React, { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink, Calendar, Layers, ShieldCheck } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative max-w-6xl w-full max-h-[95vh] bg-[#091526] border border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
          title="ปิดหน้าต่าง (Esc)"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media Preview Area */}
        <div className="flex-1 bg-black/60 flex items-center justify-center relative overflow-hidden min-h-[300px] md:min-h-[500px]">
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

          {/* Zoom Toggle Pill */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="absolute bottom-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-slate-900/80 text-white text-xs font-semibold flex items-center gap-1.5 border border-slate-700 backdrop-blur cursor-pointer hover:bg-slate-800"
          >
            {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
            <span>{isZoomed ? 'ย่อขนาด' : 'ซูม 150%'}</span>
          </button>
        </div>

        {/* Metadata Sidebar */}
        <div className="w-full md:w-96 p-6 border-t md:border-t-0 md:border-l border-slate-800 flex flex-col justify-between space-y-4 bg-[#0a182d] overflow-y-auto max-h-[85vh]">
          <div className="space-y-3">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 font-mono">
                {item.phase}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {item.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {item.title}
            </h3>

            {/* Department */}
            <div className="text-xs text-sky-400 font-semibold">
              {item.department}
            </div>

            {/* Description */}
            <div className="p-3.5 rounded-xl bg-[#060e1a]/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              {item.description}
            </div>

            {/* File Info */}
            <div className="space-y-1.5 pt-2 text-[11px] text-slate-400 font-mono">
              <div><strong>ชื่อไฟล์:</strong> {item.fileName}</div>
              <div><strong>วันที่บันทึก:</strong> {item.date}</div>
              <div><strong>ชนิดไฟล์:</strong> {item.fileType}</div>
            </div>

            {/* Tags */}
            {item.tags && (
              <div className="pt-2">
                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-1">Tags:</div>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((t, ti) => (
                    <span key={ti} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
            <a
              href={assetUrl}
              download={item.fileName}
              className="w-full py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-sky-600/30"
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
