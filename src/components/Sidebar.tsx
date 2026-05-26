/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Database, 
  FileSpreadsheet, 
  MessageSquare, 
  Briefcase, 
  Award, 
  Heart,
  Flame,
  Menu,
  X,
  BookOpen,
  Compass
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progressPercent: number;
  streakCount: number;
}

export default function Sidebar({ activeTab, setActiveTab, progressPercent, streakCount }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'BA A-Z Roadmap', icon: LayoutDashboard },
    { id: 'sql-playground', label: 'SQL Practice Console', icon: Database },
    { id: 'excel-formulas', label: 'Excel Lab & Pivots', icon: FileSpreadsheet },
    { id: 'interview-prep', label: '50 Mock Interviews', icon: MessageSquare },
    { id: 'ba-projects', label: 'Roadmap Projects (20+)', icon: Briefcase },
    { id: 'certifications', label: 'Free Credentials', icon: Award },
    { id: 'da-resources', label: 'Data Analyst (roadmap.sh)', icon: Compass },
    { id: 'bookmarks-notes', label: 'Revision & Study Notes', icon: BookOpen },
  ];

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden flex h-16 items-center justify-between border-b border-slate-700 bg-[#0F172A] px-4 text-white sticky top-0 z-30 font-sans">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded bg-cyan-500 font-mono font-bold text-sm text-slate-900 shadow-[0_0_10px_rgba(34,211,238,0.4)] tracking-widest">
            BA
          </div>
          <span className="font-sans font-semibold tracking-tight text-sm">Business Analyst Roadmap</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 font-mono text-amber-500 font-semibold text-sm">
            <Flame className="h-4 w-4 fill-amber-500" />
            <span>{streakCount}d</span>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white">
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Sidebar background overlay for mobile */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-black/60 z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed md:sticky top-16 md:top-0 left-0 bottom-0 z-40 w-72 md:w-80 bg-[#1E293B] border-r border-slate-700 text-slate-100 flex flex-col justify-between transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Top Header Section */}
        <div className="p-6">
          <div className="hidden md:flex items-center gap-3 mb-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-cyan-500 font-mono font-bold text-lg text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              BA
            </div>
            <div>
              <h1 className="font-sans font-extrabold text-base tracking-tight leading-none text-white">BA Roadmap</h1>
              <span className="text-xs text-cyan-400 font-semibold font-mono">Business Analyst Hub</span>
            </div>
          </div>

          {/* Gamified Streak Reminder */}
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-4 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                <Flame className="h-5 w-5 fill-orange-500/20 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Active Streak</p>
                <h4 className="text-sm font-bold text-white font-sans">{streakCount} Days Learning</h4>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono font-black text-xl text-orange-400">{streakCount}</span>
              <span className="text-xs text-orange-400 font-bold font-mono">d</span>
            </div>
          </div>

          {/* Overall Progress Meter */}
          <div className="bg-[#0F172A]/80 rounded-2xl p-4 border border-slate-700 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Progress</span>
              <span className="text-xs font-bold font-mono text-cyan-400">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-cyan-500 h-full rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2 italic font-sans">
              {progressPercent === 100 
                ? '🏆 Outstanding! Job Ready Analyst!' 
                : `${Math.round((progressPercent / 100) * 16)} of 16 study weeks covered`}
            </p>
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-2 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150 relative cursor-pointer
                  ${isActive 
                    ? 'bg-cyan-500/10 text-cyan-400 shadow-inner border-l-4 border-cyan-500' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/30'
                  }
                `}
              >
                <IconComponent className={`h-4.5 w-4.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-700 text-xs text-slate-500 text-center font-mono">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span>Personal Roadmap Tracker</span>
          </div>
          <p className="text-[10px]">&copy; 2026 Business Analyst Hub</p>
        </div>
      </aside>
    </>
  );
}
