import React from 'react';
import { 
  Printer, 
  Download, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Award, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function FormalReportView({ pages }) {
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Action Bar (Hidden during Print) */}
      <div className="bg-[#091526] border border-slate-800 rounded-xl p-4 sm:p-5 shadow-lg no-print flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase font-mono">
              Official Executive A4 Standard
            </span>
            <span className="text-xs text-slate-400">
              10-Page Formal Report View (@media print Ready)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            รายงานผู้บริหาร A4 ฉบับทางการ (10 หน้าเต็ม พร้อมส่วนลงนาม)
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            สามารถกดปุ่ม "พิมพ์ / บันทึกเป็น PDF" เพื่อดาวน์โหลดเอกสารรูปเล่มทางการแบบไร้ขอบเมนูส่วนเกิน
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerPrint}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>พิมพ์ / บันทึก PDF (10 หน้า)</span>
          </button>
        </div>
      </div>

      {/* Render 10 Pages */}
      <div className="flex flex-col items-center">
        {pages.map((page) => {
          if (page.pageType === 'cover') {
            return (
              <div key={page.pageNumber} className="a4-page flex flex-col justify-between border border-slate-200">
                {/* Header */}
                <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#0b192c] text-white flex items-center justify-center font-extrabold text-xl">
                      V
                    </div>
                    <div>
                      <div className="text-xs font-extrabold tracking-widest text-slate-900">
                        VEJTHANI HOSPITAL
                      </div>
                      <div className="text-[10px] text-slate-600 tracking-wider">
                        INTERNATIONAL JCI ACCREDITED
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono font-bold text-slate-700">
                      {page.documentCode}
                    </div>
                    <div className="text-[9px] text-emerald-700 font-bold uppercase tracking-wider">
                      CONFIDENTIAL &amp; STRATEGIC
                    </div>
                  </div>
                </div>

                {/* Middle Content */}
                <div className="my-auto space-y-6 text-center py-12">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold tracking-wider">
                    {page.project}
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug whitespace-pre-line">
                    {page.title}
                  </h1>

                  <div className="text-xs font-mono font-bold text-sky-800 tracking-widest">
                    {page.subTitle}
                  </div>

                  <div className="w-24 h-1 bg-amber-600 mx-auto my-6"></div>

                  <div className="space-y-1 text-xs text-slate-700">
                    <p className="font-bold text-sm text-slate-900">{page.organization}</p>
                    <p className="text-amber-800 font-semibold">{page.targetRevenue}</p>
                    <p className="font-mono text-slate-600 pt-2">{page.dateThai}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-300 pt-4 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{page.signOffNote}</span>
                  <span className="font-mono font-bold text-slate-700">หน้า 1 / 10</span>
                </div>
              </div>
            );
          }

          if (page.pageType === 'signoff') {
            return (
              <div key={page.pageNumber} className="a4-page flex flex-col justify-between border border-slate-200">
                {/* Header */}
                <div className="border-b border-slate-300 pb-3 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-sky-900">{page.header}</span>
                  <span className="font-mono">VEJTHANI AI IPD/NSD 2026</span>
                </div>

                {/* Body */}
                <div className="my-auto space-y-8 py-6">
                  <div>
                    <h2 className="text-lg font-extrabold text-slate-900 pb-2 border-b-2 border-slate-900">
                      {page.title}
                    </h2>
                    <p className="text-xs text-slate-700 mt-3 leading-relaxed">
                      {page.summaryText}
                    </p>
                  </div>

                  {/* Signatories Grid */}
                  <div className="grid grid-cols-2 gap-8 pt-4">
                    {page.signatories.map((sig, sidx) => (
                      <div key={sidx} className="border border-slate-300 rounded-lg p-5 bg-slate-50/50 flex flex-col justify-between h-44 text-center">
                        <div className="text-[10px] font-bold text-sky-800 uppercase tracking-wider">
                          {sig.roleLabel}
                        </div>
                        
                        <div className="border-b border-dashed border-slate-400 mx-6 mb-2"></div>

                        <div>
                          <div className="text-xs font-bold text-slate-900">{sig.name}</div>
                          <div className="text-[11px] text-slate-600">{sig.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Official Seal Box */}
                  <div className="p-4 border-2 border-slate-900 rounded-lg text-center bg-slate-100/70">
                    <div className="text-xs font-extrabold text-slate-900 uppercase tracking-widest">
                      ตราประทับรับรองเชิงยุทธศาสตร์ (OFFICIAL EXECUTIVE SEAL)
                    </div>
                    <div className="text-[11px] font-mono text-slate-700 mt-1 whitespace-pre-line">
                      {page.officialSeal}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-300 pt-3 flex items-center justify-between text-[10px] text-slate-500">
                  <span>โรงพยาบาลเวชธานี และโรงพยาบาลเวชธานี วัฒนะวิภา</span>
                  <span className="font-mono font-bold text-slate-700">หน้า {page.pageNumber} / 10</span>
                </div>
              </div>
            );
          }

          // Normal Content Pages
          return (
            <div key={page.pageNumber} className="a4-page flex flex-col justify-between border border-slate-200">
              {/* Header */}
              <div className="border-b border-slate-300 pb-3 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-sky-900">{page.header}</span>
                <span className="font-mono text-[10px]">AI STRATEGY &amp; EVIDENCE PORTAL</span>
              </div>

              {/* Body */}
              <div className="space-y-4 py-4 flex-1">
                <h2 className="text-base font-extrabold text-slate-900 pb-1.5 border-b border-slate-800">
                  {page.title}
                </h2>

                {page.sections?.map((sec, sidx) => (
                  <div key={sidx} className="space-y-2">
                    <h3 className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-700"></span>
                      <span>{sec.heading}</span>
                    </h3>

                    {sec.text && (
                      <p className="text-xs text-slate-700 leading-relaxed text-justify">
                        {sec.text}
                      </p>
                    )}

                    {/* Bullet List */}
                    {sec.bullets && (
                      <ul className="space-y-1.5 pl-1">
                        {sec.bullets.map((b, bidx) => (
                          <li key={bidx} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                            <span className="text-sky-700 font-bold mt-0.5">•</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Cards Grid if any */}
                    {sec.cards && (
                      <div className="grid grid-cols-2 gap-2.5 pt-1">
                        {sec.cards.map((c, cidx) => (
                          <div key={cidx} className="p-2.5 border border-slate-200 rounded-md bg-slate-50">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="text-xs font-extrabold px-1.5 py-0.2 rounded bg-sky-900 text-white font-mono">
                                {c.code}
                              </span>
                              <span className="text-[11px] font-bold text-slate-900">{c.name}</span>
                            </div>
                            <p className="text-[10px] text-slate-600 leading-normal">
                              {c.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Table if any */}
                    {sec.table && (
                      <div className="overflow-hidden border border-slate-300 rounded-md mt-2">
                        <table className="w-full text-left border-collapse text-[11px]">
                          <thead>
                            <tr className="bg-slate-100 border-b border-slate-300 text-slate-900 font-bold">
                              {sec.table.headers.map((th, tidx) => (
                                <th key={tidx} className="p-2 border-r last:border-r-0 border-slate-300">
                                  {th}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {sec.table.rows.map((row, ridx) => (
                              <tr key={ridx} className="border-b last:border-b-0 border-slate-200 hover:bg-slate-50">
                                {row.map((cell, cidx) => (
                                  <td key={cidx} className="p-2 border-r last:border-r-0 border-slate-200 text-slate-700 font-normal">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-300 pt-3 flex items-center justify-between text-[10px] text-slate-500">
                <span>โรงพยาบาลเวชธานี และโรงพยาบาลเวชธานี วัฒนะวิภา</span>
                <span className="font-mono font-bold text-slate-700">หน้า {page.pageNumber} / 10</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
