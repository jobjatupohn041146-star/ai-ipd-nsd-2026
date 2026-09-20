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
