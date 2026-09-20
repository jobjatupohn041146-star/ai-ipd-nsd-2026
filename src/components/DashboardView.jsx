import React, { useState } from "react";
import { 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  FileText, 
  Cpu, 
  Activity, 
  BarChart3, 
  PieChart,
  Layers, 
  Zap, 
  Flame, 
  Target, 
  ArrowUpRight,
  HeartHandshake
} from "lucide-react";

export default function DashboardView({ setCurrentTab, onOpenEvidence }) {
  const [selectedWard, setSelectedWard] = useState("all");
  const [nurseCount, setNurseCount] = useState(60);

  // Department Training Scorecard Data (13 Official Departments from Excel)
  const departmentsData = [
    { id: "4n", name: "4 North", head: "คุณลักษมี พรหมภักดี", gem: "Discharge Planning & Home Care Gem", status: "พร้อมใช้ 100%", hours: 12, postScore: 98, isbarSpeed: "1.8 วินาที", hoursSavedMonth: 120 },
    { id: "6s", name: "6 South", head: "คุณรัชฎาพร ทับทิมเขียว", gem: "Pain Assessment & Comfort Care Gem", status: "พร้อมใช้ 100%", hours: 12, postScore: 97, isbarSpeed: "1.9 วินาที", hoursSavedMonth: 115 },
    { id: "7n", name: "7 North", head: "คุณสุชาดา สุขเจริญ", gem: "Post-Op Surgical Care & Monitoring", status: "พร้อมใช้ 100%", hours: 12, postScore: 96, isbarSpeed: "2.0 วินาที", hoursSavedMonth: 110 },
    { id: "8n", name: "8 North", head: "คุณวิมลรัตน์ บุญมาก", gem: "Medication Reconciliation & Interaction Gem", status: "พร้อมใช้ 100%", hours: 12, postScore: 99, isbarSpeed: "1.7 วินาที", hoursSavedMonth: 135 },
    { id: "9n", name: "9 North", head: "คุณกรรณิการ์ จันทร์กระจ่าง", gem: "Fall Risk Assessment & Prevention Protocol", status: "พร้อมใช้ 100%", hours: 12, postScore: 97, isbarSpeed: "1.9 วินาที", hoursSavedMonth: 118 },
    { id: "10s", name: "10 South", head: "คุณกัญญารัตน์ ศิริพงษ์", gem: "Infection Control & Sepsis Early Screen", status: "พร้อมใช้ 100%", hours: 12, postScore: 98, isbarSpeed: "1.8 วินาที", hoursSavedMonth: 125 },
    { id: "11n", name: "11 North", head: "คุณจุฑามาศ เกิดผล", gem: "Palliative & Complex Care Continuity", status: "พร้อมใช้ 100%", hours: 12, postScore: 96, isbarSpeed: "2.1 วินาที", hoursSavedMonth: 105 },
    { id: "or", name: "OR (Operating Room)", head: "คุณดารณี อุปถัมภ์", gem: "Intraoperative Surgical Safety Checklist Gem", status: "พร้อมใช้ 100%", hours: 12, postScore: 100, isbarSpeed: "1.5 วินาที", hoursSavedMonth: 140 },
    { id: "pacu", name: "PACU (ห้องพักฟื้น)", head: "คุณนิตยา แซ่เฮ้ง", gem: "Aldrete Score & Post-Anesthesia Recovery", status: "พร้อมใช้ 100%", hours: 12, postScore: 98, isbarSpeed: "1.8 วินาที", hoursSavedMonth: 110 },
    { id: "er", name: "ER (แผนกฉุกเฉิน)", head: "คุณนภาพร อรุณเดช", gem: "Emergency Triage & ESI 5-Level Assistant", status: "พร้อมใช้ 100%", hours: 12, postScore: 99, isbarSpeed: "1.6 วินาที", hoursSavedMonth: 150 },
    { id: "icu", name: "ICU (หอผู้ป่วยวิกฤต)", head: "คุณพรทิพย์ เจริญรุ่ง", gem: "Hemodynamic & SOFA Score Critical Alert", status: "พร้อมใช้ 100%", hours: 12, postScore: 100, isbarSpeed: "1.5 วินาที", hoursSavedMonth: 145 },
    { id: "ccu", name: "CCU (หอวิกฤตหัวใจ)", head: "คุณศศิธร สุวรรณรัตน์", gem: "Cardiac EWS & STEMI Rapid Protocol", status: "พร้อมใช้ 100%", hours: 12, postScore: 99, isbarSpeed: "1.6 วินาที", hoursSavedMonth: 130 },
    { id: "nsd", name: "NSD Central (ฝ่ายพัฒนา)", head: "คุณอินทิรา บุญชู", gem: "IDP Competency Builder & E-Book Generator", status: "พร้อมใช้ 100%", hours: 12, postScore: 100, isbarSpeed: "1.4 วินาที", hoursSavedMonth: 160 },
  ];

  const filteredDepartments = selectedWard === "all" 
    ? departmentsData 
    : departmentsData.filter(d => d.id === selectedWard);

  const competencies = [
    { skill: "การเขียน Prompt สั่งการ AI ทางการแพทย์ (C.A.R.E.S.)", pre: 15, post: 95, gain: "+80%" },
    { skill: "การสร้างและปรับแต่ง Gemini Custom Gems ประจำแผนก", pre: 8, post: 92, gain: "+84%" },
    { skill: "การสรุปเวรส่งต่อผู้ป่วยแบบ 1-Click ISBAR Structure", pre: 22, post: 98, gain: "+76%" },
    { skill: "การใช้งาน Claude AI Plugins (IDP Builder & E-Book)", pre: 5, post: 89, gain: "+84%" },
    { skill: "ความเข้าใจธรรมาภิบาลและการคุ้มครองข้อมูล PDPA Zero-Leakage", pre: 42, post: 100, gain: "+58%" },
    { skill: "ความมั่นใจในการเป็น AI Champion ถ่ายทอดความรู้ให้เพื่อนร่วมงาน", pre: 20, post: 96, gain: "+76%" }
  ];

  const totalSavedHoursMonth = Math.round((nurseCount * 2.5 * 24));
  const estimatedCostSavingMonth = (totalSavedHoursMonth * 250).toLocaleString();

  return (
    <div className="space-y-8 pb-16 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="executive-card-white p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
                <Activity className="w-3.5 h-3.5 text-blue-700" />
                Executive Training Dashboard
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                ระบบติดตามและวิเคราะห์ผลสัมฤทธิ์โครงการอบรม AI ประจำปี 2569
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>แดชบอร์ดสรุปผลการอบรม AI Strategy & Inpatient Nursing Workflow</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              ภาพรวมตัวชี้วัดความสำเร็จจากการอบรมเชิงปฏิบัติการ 2 วัน (14 และ 18 ก.ย. 2569) ของพยาบาลวิชาชีพแกนนำ 13 แผนก โรงพยาบาลเวชธานี
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              onClick={() => setCurrentTab("report")}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>พิมพ์รายงาน A4 ผลการอบรม (9 หน้า)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Executive Scorecard KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="executive-card-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">อัตราสำเร็จการอบรม</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">100%</div>
            <div className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>ผ่านครบ 13 แผนกแกนนำ</span>
            </div>
          </div>
        </div>

        <div className="executive-card-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">นวัตกรรม AI ที่สร้างได้</span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">22 ระบบ</div>
            <div className="text-[11px] text-purple-700 font-bold mt-0.5">
              18 Gems · 3 Skills · 1 App
            </div>
          </div>
        </div>

        <div className="executive-card-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">ความเร็วส่งเวร ISBAR</span>
            <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">2 วินาที</div>
            <div className="text-[11px] text-sky-700 font-bold mt-0.5">
              ลดจากเดิม 25-40 นาที
            </div>
          </div>
        </div>

        <div className="executive-card-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">คืนเวลาดูแลคนไข้</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">+35%</div>
            <div className="text-[11px] text-indigo-700 font-bold mt-0.5">
              ประหยัด ~2.5 ชม. / เวร
            </div>
          </div>
        </div>

        <div className="executive-card-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">ลด Alarm Fatigue</span>
            <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">40-60%</div>
            <div className="text-[11px] text-teal-700 font-bold mt-0.5">
              คัดกรองสัญญาณชีพวิกฤต
            </div>
          </div>
        </div>

        <div className="executive-card-white p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">ความพึงพอใจการอบรม</span>
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">98.5%</div>
            <div className="text-[11px] text-amber-700 font-bold mt-0.5">
              ประเมินผลระดับดีเยี่ยม
            </div>
          </div>
        </div>
      </div>

      {/* Executive Visual Charts Section (แผนภูมิวงกลม, แผนภูมิแท่ง, กราฟแนวโน้ม) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-6 bg-blue-700 rounded-full"></span>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              การวิเคราะห์ข้อมูลเชิงลึกผ่านแผนภูมิและกราฟสรุปผล (Executive Analytics & Visual Charts)
            </h3>
          </div>
          <span className="text-xs font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            📊 3 Executive Charts
          </span>
        </div>

        {/* Grid of 3 High-Impact Executive Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: แผนภูมิวงกลม (Donut / Pie Chart) */}
          <div className="executive-card-white p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200 shadow-xs">
                    <PieChart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      แผนภูมิวงกลม: สัดส่วนนวัตกรรม AI
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      AI Innovation Distribution (22 ระบบ)
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
                  Donut Chart
                </span>
              </div>

              {/* Donut SVG Chart */}
              <div className="relative py-4 flex flex-col items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-sm">
                  {/* Segment 1: Custom Gems 81.8% (stroke-dasharray: 411 92, offset 0) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="transparent"
                    stroke="#1d4ed8"
                    strokeWidth="28"
                    strokeDasharray="411 92"
                    strokeDashoffset="125"
                    className="transition-all hover:opacity-90 cursor-pointer"
                  />
                  {/* Segment 2: Claude Skills 13.6% (stroke-dasharray: 68 435, offset -411+125 = -286) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="transparent"
                    stroke="#8b5cf6"
                    strokeWidth="28"
                    strokeDasharray="68.4 434.6"
                    strokeDashoffset="-286"
                    className="transition-all hover:opacity-90 cursor-pointer"
                  />
                  {/* Segment 3: Web Apps 4.5% (stroke-dasharray: 23 480, offset -411-68+125 = -354) */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="transparent"
                    stroke="#0284c7"
                    strokeWidth="28"
                    strokeDasharray="23 480"
                    strokeDashoffset="-354"
                    className="transition-all hover:opacity-90 cursor-pointer"
                  />
                  {/* Inner Cutout Center Badge */}
                  <circle cx="100" cy="100" r="54" fill="#ffffff" />
                  <text x="100" y="93" textAnchor="middle" fill="#0f172a" fontSize="22" fontWeight="900" fontFamily="sans-serif">
                    22
                  </text>
                  <text x="100" y="112" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" fontFamily="sans-serif">
                    ระบบนวัตกรรม
                  </text>
                  <text x="100" y="126" textAnchor="middle" fill="#1d4ed8" fontSize="9" fontWeight="800" fontFamily="sans-serif">
                    100% Ready
                  </text>
                </svg>

                {/* Legend with exact figures */}
                <div className="w-full mt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-blue-50/70 border border-blue-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#1d4ed8] shadow-xs"></span>
                      <span className="font-bold text-slate-800">Gemini Custom Gems</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="font-black text-blue-900">18 ระบบ</span>
                      <span className="text-[10px] text-blue-700 bg-white px-1.5 py-0.5 rounded border border-blue-200">81.8%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-purple-50/70 border border-purple-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#8b5cf6] shadow-xs"></span>
                      <span className="font-bold text-slate-800">Claude AI Custom Skills</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="font-black text-purple-900">3 ระบบ</span>
                      <span className="text-[10px] text-purple-700 bg-white px-1.5 py-0.5 rounded border border-purple-200">13.6%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-sky-50/70 border border-sky-100">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-[#0284c7] shadow-xs"></span>
                      <span className="font-bold text-slate-800">Web App &amp; Strategy Portal</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <span className="font-black text-sky-900">1 แพลตฟอร์ม</span>
                      <span className="text-[10px] text-sky-700 bg-white px-1.5 py-0.5 rounded border border-sky-200">4.5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>แหล่งข้อมูล: คลังคำสั่งทางการ 22 Repos</span>
              <button 
                onClick={() => setCurrentTab('artifacts')}
                className="text-blue-700 hover:text-blue-900 font-bold flex items-center gap-0.5 cursor-pointer"
              >
                ดูรายละเอียด <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Chart 2: แผนภูมิแท่ง (Clustered Vertical Bar Chart) */}
          <div className="executive-card-white p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200 shadow-xs">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      แผนภูมิแท่ง: คะแนน Pre-Test vs Post-Test
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Clinical Competency Gain (6 ด้านหลัก)
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
                  Bar Chart
                </span>
              </div>

              {/* Clustered Bar SVG Chart */}
              <div className="py-2">
                <svg viewBox="0 0 340 190" className="w-full h-48 drop-shadow-xs">
                  {/* Background Grid Lines & Y-Axis Scale */}
                  <line x1="35" y1="20" x2="330" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <text x="30" y="24" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="sans-serif">100%</text>

                  <line x1="35" y1="55" x2="330" y2="55" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <text x="30" y="59" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="sans-serif">75%</text>

                  <line x1="35" y1="90" x2="330" y2="90" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <text x="30" y="94" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="sans-serif">50%</text>

                  <line x1="35" y1="125" x2="330" y2="125" stroke="#e2e8f0" strokeDasharray="3 3" />
                  <text x="30" y="129" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="sans-serif">25%</text>

                  <line x1="35" y1="160" x2="330" y2="160" stroke="#cbd5e1" strokeWidth="1.5" />
                  <text x="30" y="163" textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="600" fontFamily="sans-serif">0%</text>

                  {/* 6 Skill Groups (x offset = 48, 97, 146, 195, 244, 293) */}
                  {/* Skill 1: Prompt C.A.R.E.S. Pre=15, Post=95 */}
                  <rect x="44" y="139" width="16" height="21" rx="2" fill="#94a3b8" opacity="0.8" />
                  <rect x="62" y="27" width="16" height="133" rx="2" fill="#1d4ed8" />
                  <text x="70" y="22" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="800" fontFamily="sans-serif">95%</text>
                  <text x="61" y="174" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700" fontFamily="sans-serif">Prompt</text>

                  {/* Skill 2: Custom Gems Pre=8, Post=92 */}
                  <rect x="93" y="149" width="16" height="11" rx="2" fill="#94a3b8" opacity="0.8" />
                  <rect x="111" y="31" width="16" height="129" rx="2" fill="#1d4ed8" />
                  <text x="119" y="26" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="800" fontFamily="sans-serif">92%</text>
                  <text x="110" y="174" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700" fontFamily="sans-serif">Gems</text>

                  {/* Skill 3: ISBAR Pre=22, Post=98 */}
                  <rect x="142" y="129" width="16" height="31" rx="2" fill="#94a3b8" opacity="0.8" />
                  <rect x="160" y="23" width="16" height="137" rx="2" fill="#1d4ed8" />
                  <text x="168" y="18" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="800" fontFamily="sans-serif">98%</text>
                  <text x="159" y="174" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700" fontFamily="sans-serif">ISBAR</text>

                  {/* Skill 4: Claude Skill Pre=5, Post=89 */}
                  <rect x="191" y="153" width="16" height="7" rx="2" fill="#94a3b8" opacity="0.8" />
                  <rect x="209" y="35" width="16" height="125" rx="2" fill="#1d4ed8" />
                  <text x="217" y="30" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="800" fontFamily="sans-serif">89%</text>
                  <text x="208" y="174" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700" fontFamily="sans-serif">Claude</text>

                  {/* Skill 5: PDPA Pre=42, Post=100 */}
                  <rect x="240" y="101" width="16" height="59" rx="2" fill="#94a3b8" opacity="0.8" />
                  <rect x="258" y="20" width="16" height="140" rx="2" fill="#059669" />
                  <text x="266" y="15" textAnchor="middle" fill="#059669" fontSize="8" fontWeight="800" fontFamily="sans-serif">100%</text>
                  <text x="257" y="174" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700" fontFamily="sans-serif">PDPA</text>

                  {/* Skill 6: AI Champion Pre=20, Post=96 */}
                  <rect x="289" y="132" width="16" height="28" rx="2" fill="#94a3b8" opacity="0.8" />
                  <rect x="307" y="25" width="16" height="135" rx="2" fill="#1d4ed8" />
                  <text x="315" y="20" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="800" fontFamily="sans-serif">96%</text>
                  <text x="306" y="174" textAnchor="middle" fill="#475569" fontSize="8" fontWeight="700" fontFamily="sans-serif">Leader</text>
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-slate-400"></span>
                    <span className="text-slate-600 font-medium">ก่อนอบรม (Pre-Test) เฉลี่ย 18.7%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#1d4ed8]"></span>
                    <span className="text-blue-900 font-bold">หลังอบรม (Post-Test) เฉลี่ย 95.0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>ความก้าวหน้าเฉลี่ยรวมทุกสมรรถนะ: <strong className="text-emerald-700 font-mono">+76.3%</strong></span>
              <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                สถิติผ่านเกณฑ์ 100%
              </span>
            </div>
          </div>

          {/* Chart 3: กราฟเส้นและพื้นที่ (Line & Area Graph) */}
          <div className="executive-card-white p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200 shadow-xs">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      กราฟแนวโน้ม: ลดเวลาส่งเวร &amp; เพิ่มเวลาดูแล
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      ISBAR Time Reduction &amp; Direct Care Recovery
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-teal-100 text-teal-800 border border-teal-200">
                  Line &amp; Area
                </span>
              </div>

              {/* Line & Area SVG Graph */}
              <div className="py-2">
                <svg viewBox="0 0 340 190" className="w-full h-48 drop-shadow-xs">
                  <defs>
                    <linearGradient id="areaGradientDirectCare" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0d9488" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.02" />
                    </linearGradient>
                    <linearGradient id="areaGradientIsbar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  <line x1="35" y1="20" x2="330" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="35" y1="55" x2="330" y2="55" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="35" y1="90" x2="330" y2="90" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="35" y1="125" x2="330" y2="125" stroke="#f1f5f9" strokeDasharray="3 3" />
                  <line x1="35" y1="160" x2="330" y2="160" stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* Y Axis Left: Direct Care % */}
                  <text x="30" y="24" textAnchor="end" fill="#0d9488" fontSize="8" fontWeight="700" fontFamily="sans-serif">85%</text>
                  <text x="30" y="94" textAnchor="end" fill="#0d9488" fontSize="8" fontWeight="700" fontFamily="sans-serif">55%</text>
                  <text x="30" y="163" textAnchor="end" fill="#0d9488" fontSize="8" fontWeight="700" fontFamily="sans-serif">30%</text>

                  {/* Area 1: Direct Care Time % (Points: P1(50, 160), P2(115, 140), P3(180, 100), P4(245, 50), P5(310, 25)) */}
                  <path
                    d="M 50 160 L 50 160 L 115 140 L 180 100 L 245 50 L 310 25 L 310 160 Z"
                    fill="url(#areaGradientDirectCare)"
                  />
                  {/* Line 1: Direct Care Time % */}
                  <path
                    d="M 50 160 Q 82 150 115 140 T 180 100 T 245 50 T 310 25"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="3"
                  />
                  {/* Dots for Direct Care */}
                  <circle cx="50" cy="160" r="3.5" fill="#0d9488" />
                  <circle cx="115" cy="140" r="3.5" fill="#0d9488" />
                  <circle cx="180" cy="100" r="3.5" fill="#0d9488" />
                  <circle cx="245" cy="50" r="3.5" fill="#0d9488" />
                  <circle cx="310" cy="25" r="4.5" fill="#042f2e" stroke="#ffffff" strokeWidth="2" />
                  <text x="310" y="16" textAnchor="middle" fill="#0d9488" fontSize="8" fontWeight="900" fontFamily="sans-serif">85%</text>

                  {/* Line 2: ISBAR Duration (Points: P1(50, 25 [35 min]), P2(115, 60 [25 min]), P3(180, 105 [12 min]), P4(245, 145 [3 min]), P5(310, 157 [2 sec])) */}
                  <path
                    d="M 50 25 L 50 25 L 115 60 L 180 105 L 245 145 L 310 157 L 310 160 L 50 160 Z"
                    fill="url(#areaGradientIsbar)"
                  />
                  <path
                    d="M 50 25 Q 82 45 115 60 T 180 105 T 245 145 T 310 157"
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="2.5"
                    strokeDasharray="4 2"
                  />
                  {/* Dots for ISBAR */}
                  <circle cx="50" cy="25" r="3.5" fill="#e11d48" />
                  <text x="50" y="16" textAnchor="middle" fill="#e11d48" fontSize="8" fontWeight="800" fontFamily="sans-serif">35 นาที</text>
                  <circle cx="115" cy="60" r="3" fill="#e11d48" />
                  <circle cx="180" cy="105" r="3" fill="#e11d48" />
                  <circle cx="245" cy="145" r="3" fill="#e11d48" />
                  <circle cx="310" cy="157" r="4" fill="#881337" stroke="#ffffff" strokeWidth="1.5" />
                  <text x="310" y="150" textAnchor="end" fill="#e11d48" fontSize="8" fontWeight="900" fontFamily="sans-serif">2 วินาที</text>

                  {/* X Axis Stages */}
                  <text x="50" y="174" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">ก่อนอบรม</text>
                  <text x="115" y="174" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Day 1 บรรยาย</text>
                  <text x="180" y="174" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">Day 2 เวิร์กช็อป</text>
                  <text x="245" y="174" textAnchor="middle" fill="#64748b" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">เริ่มใช้ในวอร์ด</text>
                  <text x="310" y="174" textAnchor="middle" fill="#1e40af" fontSize="7.5" fontWeight="800" fontFamily="sans-serif">Full Scale 2569</text>
                </svg>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 mt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#0d9488]"></span>
                    <span className="text-teal-900 font-bold">เวลาดูแลคนไข้ข้างเตียง (30% ➜ 85%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-1.5 rounded bg-[#e11d48]"></span>
                    <span className="text-rose-900 font-bold">เวลาส่งเวร ISBAR (35 นาที ➜ 2 วิ)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>ผลลัพธ์: คืนเวลาพยาบาลสู่ข้างเตียง <strong className="text-teal-700 font-mono">+55%</strong></span>
              <span className="text-teal-700 font-bold bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                1-Click Automation
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Section: 13-Department Readiness Matrix */}
      <div className="executive-card-white p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-700" />
              <span>ผลสัมฤทธิ์รายหน่วยงานทั้ง 13 แผนกการพยาบาล (13-Department Implementation Matrix)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              แสดงสถานะการรับรองความรู้ ระบบ AI ประจำแผนก และผลลัพธ์เชิงปริมาณที่ตรวจวัดได้จริง
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">กรองตามแผนก:</span>
            <select
              value={selectedWard}
              onChange={(e) => setSelectedWard(e.target.value)}
              className="bg-blue-50/50 border border-blue-200 rounded-lg px-3 py-1.5 text-xs font-bold text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            >
              <option value="all">แสดงทั้งหมด (13 แผนก)</option>
              {departmentsData.map(d => (
                <option key={d.id} value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table of Departments */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-blue-50/60 text-slate-700 font-bold border-b border-blue-100">
                <th className="py-3 px-3.5">หน่วยงาน / แผนก</th>
                <th className="py-3 px-3.5">หัวหน้าแผนก / พยาบาลแกนนำ</th>
                <th className="py-3 px-3.5">ระบบ AI ประจำแผนกที่พัฒนาสำเร็จ</th>
                <th className="py-3 px-3.5 text-center">ชั่วโมงฝึกปฏิบัติ</th>
                <th className="py-3 px-3.5 text-center">คะแนน Post-test</th>
                <th className="py-3 px-3.5 text-center">ความเร็ว ISBAR</th>
                <th className="py-3 px-3.5 text-center">สถานะการรับรอง</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-50">
              {filteredDepartments.map((dept, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                  <td className="py-3 px-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span>{dept.name}</span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 font-medium">
                    {dept.head}
                  </td>
                  <td className="py-3 px-3.5">
                    <div className="font-bold text-blue-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{dept.gem}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3.5 text-center font-mono font-bold text-slate-600">
                    {dept.hours} ชม. (2 วัน)
                  </td>
                  <td className="py-3 px-3.5 text-center font-mono font-black text-emerald-700">
                    {dept.postScore}%
                  </td>
                  <td className="py-3 px-3.5 text-center font-mono font-bold text-sky-700">
                    {dept.isbarSpeed}
                  </td>
                  <td className="py-3 px-3.5 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>{dept.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2-Column: Pre vs Post Competency & Clinical Hours Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pre vs Post Competency Comparison */}
        <div className="executive-card-white p-6 space-y-4">
          <div className="border-b border-blue-100 pb-3">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-700" />
              <span>การประเมินทักษะก่อนและหลังการอบรม (Competency Gain)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              เปรียบเทียบระดับความเชี่ยวชาญของพยาบาลแกนนำก่อนอบรมและหลังเสร็จสิ้นหลักสูตร
            </p>
          </div>

          <div className="space-y-3.5 pt-1">
            {competencies.map((comp, ci) => (
              <div key={ci} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span className="truncate pr-2">{comp.skill}</span>
                  <span className="font-mono text-emerald-700 font-black text-xs shrink-0">{comp.gain}</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex relative">
                  <div 
                    className="h-full bg-slate-300 rounded-l-full" 
                    style={{ width: `${comp.pre}%` }}
                    title={`ก่อนอบรม: ${comp.pre}%`}
                  ></div>
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-sky-500 rounded-r-full" 
                    style={{ width: `${comp.post - comp.pre}%` }}
                    title={`หลังอบรม: ${comp.post}%`}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>ก่อนอบรม: <strong>{comp.pre}%</strong></span>
                  <span className="text-blue-800 font-bold">หลังอบรม: <strong>{comp.post}%</strong></span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-4 text-[11px] text-slate-500 border-t border-blue-50">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-300"></span>
              <span>ก่อนการอบรม (Pre-Test)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-gradient-to-r from-blue-600 to-sky-500"></span>
              <span>หลังการอบรม (Post-Test)</span>
            </div>
          </div>
        </div>

        {/* Clinical Time Savings & Impact Simulator */}
        <div className="executive-card-white p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="border-b border-blue-100 pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-700" />
                  <span>แบบจำลองการคืนเวลาดูแลผู้ป่วย (Time Recovery Calculator)</span>
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                  Clinical Value Model
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                คำนวณเวลาที่ได้คืนจากการลดงานเขียนเอกสารซ้ำซ้อนและส่งเวรด้วย 1-Click ISBAR
              </p>
            </div>

            {/* Interactive Slider */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/40 border border-blue-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  จำนวนพยาบาลวิชาชีพที่นำระบบไปใช้ในวอร์ด:
                </label>
                <span className="font-mono text-base font-black text-blue-900 bg-white px-3 py-0.5 rounded-lg border border-blue-200 shadow-xs">
                  {nurseCount} ท่าน
                </span>
              </div>
              <input
                type="range"
                min="13"
                max="200"
                step="1"
                value={nurseCount}
                onChange={(e) => setNurseCount(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>13 ท่าน (เฉพาะหัวหน้าแผนก)</span>
                <span>60 ท่าน (พยาบาลแกนนำ)</span>
                <span>200 ท่าน (พยาบาลทั้งองค์กร)</span>
              </div>
            </div>

            {/* Simulation Results Grid */}
            <div className="grid grid-cols-2 gap-3.5 mt-4">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-center">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">เวลาที่ได้คืนสู่คนไข้ข้างเตียง</span>
                <span className="text-2xl sm:text-3xl font-black text-blue-900 font-mono">
                  {totalSavedHoursMonth.toLocaleString()}
                </span>
                <span className="text-xs text-blue-700 font-bold block mt-0.5">ชั่วโมง / เดือน</span>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center">
                <span className="text-[11px] font-bold text-slate-600 block mb-1">มูลค่าประสิทธิภาพเวลาที่คืนมา</span>
                <span className="text-2xl sm:text-3xl font-black text-emerald-900 font-mono">
                  ฿{estimatedCostSavingMonth}
                </span>
                <span className="text-xs text-emerald-700 font-bold block mt-0.5">บาท / เดือน (โดยประมาณ)</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-blue-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">สมมติฐาน: ประหยัด 2.5 ชม./เวรต่อพยาบาล 1 ท่าน (คำนวณฐาน 24 เวร/เดือน)</span>
            <button
              onClick={() => setCurrentTab("artifacts")}
              className="font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer"
            >
              <span>ดูคลังนวัตกรรม 22 ชิ้นงาน</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
