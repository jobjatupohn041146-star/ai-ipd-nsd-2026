import React, { useState } from 'react';
import { Users, Award, Sparkles, ShieldCheck, Heart, Search, Target, BookOpen, Briefcase, Hash } from 'lucide-react';

export default function PeopleShowcase({ participants }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = participants.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.nickname?.toLowerCase().includes(q) ||
      p.role?.toLowerCase().includes(q) ||
      p.department?.toLowerCase().includes(q) ||
      p.empId?.toLowerCase().includes(q) ||
      p.aiTools?.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="executive-card-white p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-800 border border-blue-200 uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
                <Users className="w-3.5 h-3.5 text-blue-700" />
                Executive Leadership &amp; Champions
              </span>
              <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
                ทำเนียบผู้นำการเปลี่ยนผ่านองค์กรสู่ AI-Native Hospital
              </span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>ทำเนียบผู้ผ่านการอบรม พยาบาลวิชาชีพแกนนำ และคณะทำงาน</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono font-bold border border-blue-200">
                {participants.length} ท่าน
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              รายชื่อบุคลากรผู้ผ่านการอบรม พยาบาลวิชาชีพแกนนำทั้ง 13 แผนก และคณะทำงานฝ่ายพัฒนาทรัพยากรบุคคล (NSD/IPD) โรงพยาบาลเวชธานี
            </p>
          </div>

          <div className="w-full lg:w-80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, ชื่อเล่น, รหัส, หรือแผนก..."
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
          </div>
        </div>
      </div>

      {/* Grid of Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((person, idx) => {
          return (
            <div
              key={idx}
              className="executive-card-white p-5 flex flex-col justify-between space-y-4 group relative"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center text-white font-black text-base shadow-md shadow-blue-500/20 shrink-0">
                    {person.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                        {person.badge}
                      </span>
                      {person.empId && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-0.5">
                          <Hash className="w-2.5 h-2.5 text-slate-400" />
                          <span>{person.empId}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mt-1 truncate group-hover:text-blue-800 transition-colors">
                      {person.name} {person.nickname && <span className="text-blue-700 font-medium">({person.nickname})</span>}
                    </h3>
                    <div className="text-xs text-blue-700 font-semibold truncate">
                      {person.role}
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 font-medium bg-blue-50/50 px-2.5 py-1 rounded-lg border border-blue-100">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="truncate"><strong>หน่วยงาน:</strong> {person.department}</span>
                </div>

                {person.responsibilities && (
                  <div className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                    <strong className="text-slate-700">งานที่รับผิดชอบ:</strong> {person.responsibilities}
                  </div>
                )}

                {person.aiGoal && (
                  <div className="mt-2.5 p-3 rounded-xl bg-gradient-to-br from-emerald-50/70 to-teal-50/40 border border-emerald-200/80 text-xs text-emerald-900">
                    <div className="font-bold flex items-center gap-1 text-emerald-800 mb-0.5 text-[11px]">
                      <Target className="w-3 h-3 text-emerald-600" />
                      <span>เป้าหมายการประยุกต์ใช้ AI ในแผนก:</span>
                    </div>
                    <p className="line-clamp-2 text-slate-700 font-medium">
                      {person.aiGoal}
                    </p>
                  </div>
                )}
              </div>

              {/* AI Tools & Specialties */}
              <div className="pt-3.5 border-t border-blue-100">
                <div className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 mb-2 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-blue-600" />
                  <span>ระบบ AI และความเชี่ยวชาญ:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {person.aiTools.map((tool, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-semibold font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
