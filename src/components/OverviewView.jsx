import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight, 
  Activity, 
  Sparkles, 
  Layers, 
  BookOpen,
  Award,
  Zap
} from 'lucide-react';

export default function OverviewView({ setCurrentTab, onOpenEvidence }) {
  const kpis = [
    { label: 'เป้าหมายรายได้รวม 5 ปี', value: '฿10B', change: 'ลาดพร้าว + วัฒนะวิภา 2570', icon: TrendingUp, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'from-amber-500/10' },
    { label: 'อัตราเติบโตรายได้บริการ', value: '+20%', change: 'สกัดรอยรั่ว & Referral', icon: Zap, color: 'text-sky-400', border: 'border-sky-500/30', bg: 'from-sky-500/10' },
    { label: 'Follow-up Adherence', value: '85%', change: 'นัดหมายต่อเนื่องกลุ่มซับซ้อน', icon: HeartHandshake, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'from-emerald-500/10' },
    { label: 'Referral Conversion', value: '35%', change: 'ส่งต่อเข้าสู่ศูนย์ความเป็นเลิศ', icon: Award, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'from-purple-500/10' },
    { label: '1-Click ISBAR Handover', value: '2 วินาที', change: 'ลดเวลาสรุปส่งเวรทันใจ', icon: Clock, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'from-cyan-500/10' },
    { label: 'Critical Response Time', value: '≤ 3 นาที', change: 'มาตรฐาน JCI IPSG.2 ขั้นวิกฤต', icon: Activity, color: 'text-rose-400', border: 'border-rose-500/30', bg: 'from-rose-500/10' },
    { label: 'ลด Alarm Fatigue', value: '40-60%', change: 'กรองสัญญาณรบกวนในวอร์ด', icon: ShieldCheck, color: 'text-teal-400', border: 'border-teal-500/30', bg: 'from-teal-500/10' },
    { label: 'คืนเวลาดูแลคนไข้', value: '35%', change: 'ลดงานเอกสารและคีย์ข้อมูล', icon: Sparkles, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'from-blue-500/10' },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Clinical EWS & ISBAR Handover',
      subtitle: 'นวัตกรรมเฝ้าระวังวิกฤตและส่งเวรไร้รอยต่อ',
      desc: 'ระบบช่วยประเมินคะแนนวิกฤตล่วงหน้า แจ้งเตือนทีมแพทย์และพยาบาลภายใน 3 นาที พร้อมการส่งเวรด้วยโครงสร้าง 1-Click ISBAR ใน 2 วินาที',
      tools: ['Clinical EWS Prototype', '1-Click ISBAR', 'Alarm Filter']
    },
    {
      num: '02',
      title: 'Business Unit Manager Transformation',
      subtitle: 'เปลี่ยนหัวหน้าพยาบาลสู่ผู้นำบริหารหน่วยธุรกิจ',
      desc: 'ดูแลทั้งคุณภาพการรักษาและประสิทธิภาพทางการเงิน สกัดกั้นรอยรั่วไหลของรายได้ (Revenue Leakage) และลดอัตราปฏิเสธเคลมประกันด้วย AI Audit',
      tools: ['RCM Anomaly Investigator', 'Bed Capacity Dashboard', 'CPQL Control']
    },
    {
      num: '03',
      title: 'Tacit Knowledge to Digital Assets',
      subtitle: 'เปลี่ยนความรู้เฉพาะตัวเป็นสินทรัพย์ดิจิทัลองค์กร',
      desc: 'สร้างสรรค์ 23 ชิ้นงาน AI ประกอบด้วย 15+ Gemini Gems และ Claude Plugins เช่น IDP Builder พัฒนาบุคคล และ Vejthani E-Book Builder',
      tools: ['ipd-nursing-ai-toolkit', 'idp-builder', 'vejthani-ebook-builder']
    },
    {
      num: '04',
      title: 'PDPA Zero-Leakage & Section 38',
      subtitle: 'ธรรมาภิบาลและกำกับดูแลความปลอดภัย 100%',
      desc: 'มาตรการ Local-First ไม่นำข้อมูลส่วนบุคคลคนไข้ (HN, ชื่อ) ป้อนเข้า AI ภายนอก และระบบเกลี่ยภาษาโฆษณาตาม พ.ร.บ.สถานพยาบาล มาตรา 38',
      tools: ['Explicit Consent Gate', 'De-identification Engine', 'Ad Compliance Check']
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-gradient-to-br from-[#0c1f38] via-[#091526] to-[#060e1a] p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>EXECUTIVE STRATEGIC NORTH STAR</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            From Clinical Care to <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">Category Leadership</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            ระบบคิดเชิงกลยุทธ์สำหรับหัวหน้าพยาบาลผู้ป่วยใน (IPD) และฝ่ายการพยาบาล (NSD) โรงพยาบาลเวชธานี
            ที่เปลี่ยนความเป็นเลิศทางคลินิก (Clinical Excellence) ให้กลายเป็นการเติบโตทางธุรกิจที่วัดผลได้จริง 
            พร้อมรองรับการเปิดตัว <strong>"โรงพยาบาลเวชธานี วัฒนะวิภา"</strong> สู่เป้าหมายรายได้รวม 10,000 ล้านบาท
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentTab('report')}
              className="px-4 py-2.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-sky-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>อ่านรายงานผู้บริหาร 10 หน้าเต็ม</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('artifacts')}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>สำรวจคลังผลงาน Gemini &amp; Claude (23 ชิ้นงาน)</span>
            </button>
            <button
              onClick={() => setCurrentTab('evidence')}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Layers className="w-4 h-4 text-sky-400" />
              <span>ตรวจหลักฐานภาพ &amp; เอกสารจริง</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-sky-400" />
              <span>Executive KPI Dashboard (ตัวชี้วัดผลสัมฤทธิ์เชิงยุทธศาสตร์)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ตัวเลขเป้าหมายและการประเมินผลเชิงประจักษ์จากการนำร่องระบบปัญญาประดิษฐ์ทางการพยาบาล
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div 
                key={idx}
                className={`p-4 rounded-xl executive-card executive-card-hover border bg-gradient-to-b ${kpi.bg} to-[#091526] ${kpi.border}`}
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-medium">{kpi.label}</span>
                  <Icon className={`w-4 h-4 ${kpi.color}`} />
                </div>
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${kpi.color}`}>
                  {kpi.value}
                </div>
                <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <span>{kpi.change}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Pillars Grid */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>4 เสาหลักยุทธศาสตร์การเปลี่ยนผ่าน (Strategic Pillars)</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            กรอบการทำงานระดับ C-Level ที่เชื่อมโยงวิสัยทัศน์องค์กรสู่การปฏิบัติการพยาบาลในหอผู้ป่วยจริง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl executive-card executive-card-hover border border-slate-700/60 bg-[#0c1a2d]/80 relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl font-extrabold text-slate-700/60 font-mono select-none">
                  {p.num}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  {p.subtitle}
                </span>
              </div>
              <h4 className="text-base font-bold text-white mt-2 mb-1.5">{p.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.desc}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800">
                {p.tools.map((t, ti) => (
                  <span key={ti} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live System Highlight: Clinical EWS Vercel App */}
      <div className="rounded-xl border border-sky-500/40 bg-gradient-to-r from-sky-950/60 via-[#0b1b33] to-[#071324] p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            LIVE PRODUCTION PROTOTYPE
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">
            Vejthani Clinical EWS &amp; Inpatient Nursing Workflow
          </h4>
          <p className="text-xs text-slate-300 max-w-2xl">
            ระบบสนับสนุนการทำงานและการเฝ้าระวังวิกฤตล่วงหน้า ออกแบบเฉพาะสำหรับ 6 ศูนย์ความเป็นเลิศทางการแพทย์โรงพยาบาลเวชธานี
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://cheeptham333-vejthani-clinical-ews.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
          >
            <span>เปิดแอปพลิเคชันจริง (Vercel)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
