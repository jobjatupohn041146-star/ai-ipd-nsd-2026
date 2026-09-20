import React, { useState } from 'react';
import { Users, Award, Sparkles, ShieldCheck, Heart, Search } from 'lucide-react';

export default function PeopleShowcase({ participants }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = participants.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.department.toLowerCase().includes(q) ||
      p.aiTools.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#091526] border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30 uppercase">
                Executive Leadership &amp; Champions
              </span>
              <span className="text-xs text-slate-400">
                ทำเนียบผู้นำการเปลี่ยนผ่านองค์กรสู่ AI-Native Hospital
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
              <Users className="w-5 h-5 text-sky-400" />
              <span>ทำเนียบผู้นำฝ่ายการพยาบาล คณะทำงาน และทีมที่ปรึกษา AI</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              ผู้บริหาร พยาบาลวิชาชีพแกนนำ และที่ปรึกษาผู้ร่วมขับเคลื่อนโครงการ AI IPD / NSD 2026 โรงพยาบาลเวชธานี
            </p>
          </div>

          <div className="w-full sm:w-72">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="ค้นหาชื่อ, ตำแหน่ง, หรือฝ่ายงาน..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#060e1a] border border-slate-700/80 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Leaders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((person, idx) => {
          return (
            <div
              key={idx}
              className="executive-card executive-card-hover rounded-xl p-5 border border-slate-800 bg-[#0a182d] flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  {/* Initials Avatar */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-blue-800 flex items-center justify-center text-white font-extrabold text-base shadow-md border border-sky-400/30 shrink-0">
                    {person.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-950 text-sky-300 border border-sky-600/40">
                      {person.badge}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1 truncate">
                      {person.name}
                    </h3>
                    <div className="text-[11px] text-sky-400 font-medium truncate">
                      {person.role}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 mt-2 font-mono">
                  {person.department}
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {person.bio}
                </p>
              </div>

              {/* AI Tools & Specialties */}
              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>เครื่องมือ AI และระบบที่รับผิดชอบ:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {person.aiTools.map((tool, ti) => (
                    <span
                      key={ti}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700 font-mono"
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
