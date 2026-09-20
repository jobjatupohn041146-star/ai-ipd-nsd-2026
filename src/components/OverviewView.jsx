import React from 'react';
import { 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  HeartHandshake, 
  ArrowRight, 
  Activity, 
  Sparkles, 
  Layers, 
  BookOpen,
  Award,
  Zap,
  Camera,
  Flame,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function OverviewView({ setCurrentTab, onOpenEvidence }) {
  const kpis = [
    { label: 'อัตราสำเร็จการอบรม', value: '100%', change: '13 แผนกพยาบาลแกนนำผ่านครบ', icon: Award, color: 'text-blue-600', badgeBg: 'bg-blue-50 text-blue-700 border-blue-200', gradient: 'from-blue-50/60 to-white' },
    { label: 'นวัตกรรม AI ที่สร้างได้', value: '23 ระบบ', change: '18 Gems · 3 Skills · 2 Apps', icon: Sparkles, color: 'text-purple-600', badgeBg: 'bg-purple-50 text-purple-700 border-purple-200', gradient: 'from-purple-50/60 to-white' },
    { label: 'Follow-up Adherence', value: '85%', change: 'นัดหมายต่อเนื่องกลุ่มซับซ้อน', icon: HeartHandshake, color: 'text-emerald-600', badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200', gradient: 'from-emerald-50/60 to-white' },
    { label: 'ความพึงพอใจการอบรม', value: '98.5%', change: 'ผลประเมินระดับดีเยี่ยม', icon: TrendingUp, color: 'text-amber-600', badgeBg: 'bg-amber-50 text-amber-700 border-amber-200', gradient: 'from-amber-50/60 to-white' },
    { label: '1-Click ISBAR Handover', value: '2 วินาที', change: 'ลดเวลาสรุปส่งเวรทันใจ', icon: Clock, color: 'text-sky-600', badgeBg: 'bg-sky-50 text-sky-700 border-sky-200', gradient: 'from-sky-50/60 to-white' },
    { label: 'Critical Response Time', value: '≤ 3 นาที', change: 'มาตรฐาน JCI IPSG.2 ขั้นวิกฤต', icon: Activity, color: 'text-rose-600', badgeBg: 'bg-rose-50 text-rose-700 border-rose-200', gradient: 'from-rose-50/60 to-white' },
    { label: 'ลด Alarm Fatigue', value: '40-60%', change: 'กรองสัญญาณรบกวนในวอร์ด', icon: ShieldCheck, color: 'text-teal-600', badgeBg: 'bg-teal-50 text-teal-700 border-teal-200', gradient: 'from-teal-50/60 to-white' },
    { label: 'คืนเวลาดูแลคนไข้', value: '35%', change: 'ลดงานเอกสารและคีย์ข้อมูล', icon: Zap, color: 'text-indigo-600', badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200', gradient: 'from-indigo-50/60 to-white' },
  ];

  const pillars = [
    {
      num: '01',
      title: 'Clinical EWS & ISBAR Handover',
      subtitle: 'นวัตกรรมเฝ้าระวังวิกฤตและส่งเวรไร้รอยต่อ',
      desc: 'ระบบช่วยประเมินคะแนนวิกฤตล่วงหน้า แจ้งเตือนทีมแพทย์และพยาบาลภายใน 3 นาที พร้อมการส่งเวรด้วยโครงสร้าง 1-Click ISBAR ใน 2 วินาที',
      tools: ['Clinical EWS Prototype', '1-Click ISBAR', 'Alarm Filter'],
      accentColor: 'border-blue-200 bg-gradient-to-br from-blue-50/70 via-white to-white'
    },
    {
      num: '02',
      title: 'Business Unit Manager Transformation',
      subtitle: 'เปลี่ยนหัวหน้าพยาบาลสู่ผู้นำบริหารหน่วยธุรกิจ',
      desc: 'ดูแลทั้งคุณภาพการรักษาและประสิทธิภาพทางการเงิน สกัดกั้นรอยรั่วไหลของรายได้ (Revenue Leakage) และลดอัตราปฏิเสธเคลมประกันด้วย AI Audit',
      tools: ['RCM Anomaly Investigator', 'Bed Capacity Dashboard', 'CPQL Control'],
      accentColor: 'border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white to-white'
    },
    {
      num: '03',
      title: 'Tacit Knowledge to Digital Assets',
      subtitle: 'เปลี่ยนความรู้เฉพาะตัวเป็นสินทรัพย์ดิจิทัลองค์กร',
      desc: 'สร้างสรรค์ 23 ชิ้นงาน AI ประกอบด้วย 18 Gemini Gems และ Claude Plugins เช่น IDP Builder พัฒนาบุคคล และ Vejthani E-Book Builder',
      tools: ['ipd-nursing-ai-toolkit', 'idp-builder', 'vejthani-ebook-builder'],
      accentColor: 'border-purple-200 bg-gradient-to-br from-purple-50/70 via-white to-white'
    },
    {
      num: '04',
      title: 'PDPA Zero-Leakage & Section 38',
      subtitle: 'ธรรมาภิบาลและกำกับดูแลความปลอดภัย 100%',
      desc: 'มาตรการ Local-First ไม่นำข้อมูลส่วนบุคคลคนไข้ (HN, ชื่อ) ป้อนเข้า AI ภายนอก และระบบเกลี่ยภาษาโฆษณาตาม พ.ร.บ.สถานพยาบาล มาตรา 38',
      tools: ['Explicit Consent Gate', 'De-identification Engine', 'Ad Compliance Check'],
      accentColor: 'border-orange-200 bg-gradient-to-br from-orange-50/70 via-white to-white'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section (White & Blue Executive Banner) */}
      <div className="relative rounded-3xl overflow-hidden border border-blue-100 bg-gradient-to-br from-white via-[#f0f7ff] to-[#e0f2fe] p-6 sm:p-10 shadow-xl shadow-blue-500/5">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>EXECUTIVE TRAINING REPORT &amp; NURSING AI WORKFLOW</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            สรุปผลสัมฤทธิ์ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-600 to-blue-800">โครงการอบรม AI Strategy &amp; Inpatient Nursing Workflow</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            หลักสูตรเชิงปฏิบัติการระดับผู้บริหารและพยาบาลวิชาชีพแกนนำ โรงพยาบาลเวชธานี (AI IPD / NSD 2026) 
            ที่เปลี่ยนการทำงานประจำวันสู่ระบบอัตโนมัติ <strong>ยกระดับความเป็นเลิศทางคลินิก (Clinical Excellence)</strong> 
            สร้างสรรค์นวัตกรรม AI Gems และปัญญาประดิษฐ์ทางการพยาบาลพร้อมใช้งานจริง 23 ระบบ
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>ดู Dashboard ผลการอบรม</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentTab('report')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-blue-900 border border-blue-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs transform hover:-translate-y-0.5"
            >
              <FileText className="w-4 h-4 text-blue-600" />
              <span>อ่านรายงาน A4 ผลการอบรม (10 หน้า)</span>
            </button>
            <button
              onClick={() => setCurrentTab('portfolio')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-blue-900 border border-blue-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>ภาพผลงาน &amp; ยุทธศาสตร์</span>
            </button>
            <button
              onClick={() => setCurrentTab('atmosphere')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-emerald-800 border border-emerald-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs transform hover:-translate-y-0.5"
            >
              <Camera className="w-4 h-4 text-emerald-600" />
              <span>ภาพบรรยากาศการอบรมจริง</span>
            </button>
            <button
              onClick={() => setCurrentTab('artifacts')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-purple-900 border border-purple-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer shadow-xs transform hover:-translate-y-0.5"
            >
              <Flame className="w-4 h-4 text-purple-600" />
              <span>คลังคำสั่ง AI &amp; Gems (23 รายการ)</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (Glow & Shimmer Effects) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              <span>Executive KPI Dashboard (ตัวชี้วัดผลสัมฤทธิ์เชิงยุทธศาสตร์)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
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
                className={`p-5 rounded-2xl executive-card-white executive-card-hover border bg-gradient-to-b ${kpi.gradient}`}
              >
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-semibold">{kpi.label}</span>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${kpi.badgeBg}`}>
                    <Icon className={`w-4 h-4 ${kpi.color}`} />
                  </div>
                </div>
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${kpi.color}`}>
                  {kpi.value}
                </div>
                <div className="text-[11px] text-slate-500 mt-1.5 flex items-center gap-1 font-medium">
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
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>4 เสาหลักยุทธศาสตร์การเปลี่ยนผ่าน (Strategic Pillars)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            กรอบการทำงานระดับ C-Level ที่เชื่อมโยงวิสัยทัศน์องค์กรสู่การปฏิบัติการพยาบาลในหอผู้ป่วยจริง
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl executive-card-white executive-card-hover border ${p.accentColor} relative overflow-hidden`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl font-black text-blue-200/80 font-mono select-none">
                  {p.num}
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                  {p.subtitle}
                </span>
              </div>
              <h4 className="text-base font-extrabold text-slate-900 mt-3 mb-1.5">{p.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{p.desc}</p>
              
              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                {p.tools.map((t, ti) => (
                  <span key={ti} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-2xs">
                    ✓ {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live System Highlight: Clinical EWS Vercel App */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 via-sky-50 to-white p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="space-y-2 text-center sm:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            LIVE PRODUCTION PROTOTYPE
          </div>
          <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Vejthani Clinical EWS &amp; Inpatient Nursing Workflow
          </h4>
          <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
            ระบบสนับสนุนการทำงานและการเฝ้าระวังวิกฤตล่วงหน้า ออกแบบเฉพาะสำหรับ 6 ศูนย์ความเป็นเลิศทางการแพทย์โรงพยาบาลเวชธานี
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 relative z-10">
          <a
            href="https://cheeptham333-vejthani-clinical-ews.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-500/25 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>เปิดแอปพลิเคชันจริง (Vercel)</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
