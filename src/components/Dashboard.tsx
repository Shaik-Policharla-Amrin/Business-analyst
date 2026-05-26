/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Search, 
  HelpCircle, 
  BookMarked, 
  CheckCircle, 
  Clock, 
  GraduationCap, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  RefreshCw, 
  Check, 
  Info,
  Calendar,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Phase, Subtopic, UserProgress, Difficulty, TechTool } from '../types';
import { BA_PHASES } from '../data';

interface DashboardProps {
  progress: UserProgress;
  setProgress: (prevProgress: any) => void;
  onNavigateToSql: () => void;
}

export default function Dashboard({ progress, setProgress, onNavigateToSql }: DashboardProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<Difficulty | 'All'>('All');
  const [selectedTool, setSelectedTool] = React.useState<TechTool | 'All'>('All');
  const [selectedPhaseId, setSelectedPhaseId] = React.useState<string>('All');
  
  // Accordion states: keep track of expanded weeks. Default expand Week 1.
  const [expandedWeeks, setExpandedWeeks] = React.useState<Record<number, boolean>>({ 1: true });
  // Expanded subtopics inside week details
  const [activeSubtopicId, setActiveSubtopicId] = React.useState<string | null>('w1-s1');

  // Support responsive layouts & tabs
  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks(prev => ({ ...prev, [weekNum]: !prev[weekNum] }));
  };

  const getSubtopicStatus = (subtopicId: string): 'pending' | 'active' | 'completed' => {
    if (progress.subtopicStatuses && progress.subtopicStatuses[subtopicId]) {
      return progress.subtopicStatuses[subtopicId];
    }
    if (progress.completedSubtopics?.includes(subtopicId)) {
      return 'completed';
    }
    return 'pending';
  };

  const setSubtopicStatus = (subtopicId: string, status: 'pending' | 'active' | 'completed') => {
    const isCompleted = status === 'completed';
    const wasCompleted = progress.completedSubtopics?.includes(subtopicId);
    let updatedCompleted = [...(progress.completedSubtopics || [])];

    if (isCompleted && !wasCompleted) {
      updatedCompleted.push(subtopicId);
    } else if (!isCompleted && wasCompleted) {
      updatedCompleted = updatedCompleted.filter(id => id !== subtopicId);
    }

    // Toggle daily goals as well
    const todayStr = new Date().toISOString().split('T')[0];
    const dailyGoal = { ...progress.dailyGoalProgress };
    
    if (dailyGoal.date === todayStr) {
      if (isCompleted && !wasCompleted) {
        dailyGoal.subtopicsCompleted += 1;
      } else if (!isCompleted && wasCompleted) {
        dailyGoal.subtopicsCompleted = Math.max(0, dailyGoal.subtopicsCompleted - 1);
      }
    } else {
      dailyGoal.date = todayStr;
      dailyGoal.subtopicsCompleted = (isCompleted && !wasCompleted) ? 1 : 0;
    }

    const updatedStatuses = {
      ...(progress.subtopicStatuses || {}),
      [subtopicId]: status
    };

    setProgress((prev: any) => ({
      ...prev,
      completedSubtopics: updatedCompleted,
      subtopicStatuses: updatedStatuses,
      dailyGoalProgress: dailyGoal
    }));
  };

  const toggleSubtopicCompletion = (subtopicId: string) => {
    const currentStatus = getSubtopicStatus(subtopicId);
    const nextStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    setSubtopicStatus(subtopicId, nextStatus);
  };

  const toggleBookmark = (subtopicId: string) => {
    const isBookmarked = progress.bookmarkedSubtopics.includes(subtopicId);
    let updated = [...progress.bookmarkedSubtopics];
    if (isBookmarked) {
      updated = updated.filter(id => id !== subtopicId);
    } else {
      updated.push(subtopicId);
    }
    setProgress((prev: any) => ({ ...prev, bookmarkedSubtopics: updated }));
  };

  const toggleRevision = (subtopicId: string) => {
    const isRevision = progress.revisionSubtopics.includes(subtopicId);
    let updated = [...progress.revisionSubtopics];
    if (isRevision) {
      updated = updated.filter(id => id !== subtopicId);
    } else {
      updated.push(subtopicId);
    }
    setProgress((prev: any) => ({ ...prev, revisionSubtopics: updated }));
  };

  const saveNote = (subtopicId: string, text: string) => {
    setProgress((prev: any) => ({
      ...prev,
      notes: {
        ...prev.notes,
        [subtopicId]: text
      }
    }));
  };

  // Filter roadmaps structure based on filters
  const filteredPhases = BA_PHASES.filter(p => selectedPhaseId === 'All' || p.id === selectedPhaseId).map(phase => {
    const filteredWeeks = phase.weeks.map(week => {
      const filteredSubtopics = week.subtopics.filter(sub => {
        const matchesSearch = sub.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              sub.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              sub.concepts.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDifficulty = selectedDifficulty === 'All' || sub.difficulty === selectedDifficulty;
        const matchesTool = selectedTool === 'All' || sub.tool === selectedTool;
        return matchesSearch && matchesDifficulty && matchesTool;
      });

      return { ...week, subtopics: filteredSubtopics };
    }).filter(week => week.subtopics.length > 0);

    return { ...phase, weeks: filteredWeeks };
  }).filter(phase => phase.weeks.length > 0);

  // Motivational rank levels
  const getMotivationalRank = () => {
    const completedCount = progress.completedSubtopics.length;
    if (completedCount >= 10) return { rank: 'Data Architect', label: 'You are crushing intermediate datasets!' };
    if (completedCount >= 5) return { rank: 'Analytics Associate', label: 'Consistent progress pays off! Let\'s go!' };
    if (completedCount >= 1) return { rank: 'Excel Explorer', label: 'First steps completed. Master those shortcuts!' };
    return { rank: 'Beginner Cadet', label: 'Commit to 1 practice task today!' };
  };

  const currentLevel = getMotivationalRank();



  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-10 animate-fade-in text-slate-100">
      
      {/* Welcome Header Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] p-8 text-white relative overflow-hidden border border-slate-700 shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <GraduationCap className="h-48 w-48 text-cyan-500" />
        </div>
        <div className="max-w-2xl relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="h-3 w-3 animate-pulse" /> Personal Tracker & Roadmap
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-black tracking-tight text-white">
            Business Analyst A-Z Roadmap
          </h2>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
            This comprehensive, curated study roadmap provides completely free step-by-step learning paths, active practice consoles, real certification guides, and interview prep audits to help you master SQL, Excel, and analytics logic.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={onNavigateToSql}
              className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 active:bg-cyan-600 rounded-xl font-bold text-slate-900 text-xs font-mono transition duration-150 flex items-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
            >
              <CheckCircle className="h-4 w-4 text-slate-900" /> Start Active SQL Sandbox
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Progress Metrics and Gamification widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Goals Panel */}
        <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-2">
            <Calendar className="h-4.5 w-4.5 text-cyan-400" /> Today's Quota Targets
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-slate-800 space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Subtopics</p>
              <h4 className="text-xl font-black text-slate-100 font-mono">
                {progress.dailyGoalProgress?.subtopicsCompleted || 0}
                <span className="text-xs text-slate-450 font-normal"> / 2 completed</span>
              </h4>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, ((progress.dailyGoalProgress?.subtopicsCompleted || 0) / 2) * 100)}%` }}
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A]/70 border border-slate-800 space-y-1">
              <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">SQL Queries</p>
              <h4 className="text-xl font-black text-slate-100 font-mono">
                {progress.dailyGoalProgress?.sqlCompleted || 0}
                <span className="text-xs text-slate-450 font-normal"> / 1 solved</span>
              </h4>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                <div 
                  className="bg-cyan-500 h-full rounded-full shadow-[0_0_8px_rgba(34,211,238,0.4)] transition-all duration-300"
                  style={{ width: `${Math.min(100, ((progress.dailyGoalProgress?.sqlCompleted || 0) / 1) * 100)}%` }}
                />
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-450 leading-normal italic text-center pt-1 border-t border-slate-800">
            "One small query solved daily compiles to complete career mastery."
          </p>
        </div>

        {/* Motivational Rank Card */}
        <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-5 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-2">
              <CheckCircle className="h-4.5 w-4.5 text-emerald-400" /> Motivation & Rank Level
            </h3>
            <div className="flex items-center gap-4 pt-1">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-xl font-black font-mono text-cyan-400 border border-cyan-500/20">
                Lvl {Math.min(10, Math.floor(progress.completedSubtopics.length / 2) + 1)}
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-white leading-none">{currentLevel.rank}</h4>
                <span className="text-xs text-slate-450 mt-1 block">{currentLevel.label}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-slate-400">Total subtopics solved:</span>
            <span className="font-mono font-bold text-slate-200 bg-[#0F172A] px-2 py-0.5 rounded border border-slate-800">
              {progress.completedSubtopics.length} items
            </span>
          </div>
        </div>

      </div>

      {/* Filter and Search Section */}
      <div className="bg-[#1E293B] rounded-2xl p-6 border border-slate-700 space-y-4">
        <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-mono">Search & Filters</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <input 
              type="text" 
              placeholder="Search SQL, Excel lookups, pivot tables formulas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-100 placeholder-slate-500"
            />
            <Search className="h-4 w-4 text-slate-500 absolute left-3.5 top-3.5" />
          </div>

          <div>
            <select 
              value={selectedDifficulty} 
              onChange={(e) => setSelectedDifficulty(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-100"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <select 
              value={selectedTool} 
              onChange={(e) => setSelectedTool(e.target.value as any)}
              className="w-full px-4 py-2.5 bg-[#0F172A] border border-slate-700 rounded-xl text-xs focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-slate-100"
            >
              <option value="All">All Tools</option>
              <option value="SQL">SQL</option>
              <option value="Excel">Excel</option>
              <option value="Power BI">Power BI</option>
              <option value="Tableau">Tableau</option>
              <option value="Python">Python</option>
              <option value="Agile/Scrum">Agile / Scrum</option>
              <option value="BA Core">BA Core Foundations</option>
              <option value="Data Viz">Data Viz Principles</option>
            </select>
          </div>
        </div>
      </div>

      {/* Week Roadmap Accordion and details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: 16-Week Accordions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-700 pb-3">
            <h3 className="font-sans font-bold text-lg text-slate-100 tracking-tight flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyan-400" />
              16-Week Roadmap Structure
            </h3>
            <span className="text-xs text-cyan-455 font-mono bg-[#0F172A] border border-slate-700 px-3 py-1 rounded-full">
              {filteredPhases.flatMap(p => p.weeks).length} active weeks found
            </span>
          </div>

          {/* Phase Filter Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedPhaseId('All')}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-center transition cursor-pointer ${
                selectedPhaseId === 'All'
                  ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-900/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
              }`}
            >
              All Phases
            </button>
            <button
              onClick={() => setSelectedPhaseId('p1')}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-center transition cursor-pointer ${
                selectedPhaseId === 'p1'
                  ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-900/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-805/30'
              }`}
            >
              Phase 1
            </button>
            <button
              onClick={() => setSelectedPhaseId('p2')}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-center transition cursor-pointer ${
                selectedPhaseId === 'p2'
                  ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-900/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-805/30'
              }`}
            >
              Phase 2
            </button>
            <button
              onClick={() => setSelectedPhaseId('p3')}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-center transition cursor-pointer ${
                selectedPhaseId === 'p3'
                  ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-900/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-805/30'
              }`}
            >
              Phase 3
            </button>
            <button
              onClick={() => setSelectedPhaseId('p4')}
              className={`flex-1 min-w-[70px] py-1.5 px-2 rounded-lg text-[9px] font-mono font-bold uppercase tracking-wider text-center transition cursor-pointer ${
                selectedPhaseId === 'p4'
                  ? 'bg-cyan-500 text-slate-900 shadow-md shadow-cyan-900/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-805/30'
              }`}
            >
              Phase 4
            </button>
          </div>

          {filteredPhases.map((phase) => {
            // Calculate phase active progress
            const phaseSubtopicIds = phase.weeks.flatMap(w => w.subtopics).map(s => s.id);
            const totalInPhase = phaseSubtopicIds.length;
            const completedInPhase = phaseSubtopicIds.filter(id => progress.completedSubtopics?.includes(id)).length;
            const activeInPhase = phaseSubtopicIds.filter(id => getSubtopicStatus(id) === 'active').length;
            const phaseProgressPercent = totalInPhase > 0 ? Math.round((completedInPhase / totalInPhase) * 100) : 0;

            return (
              <div key={phase.id} className="space-y-4 pt-1">
                <div className="border-l-4 border-cyan-500 pl-3 py-2 bg-slate-900/40 rounded-r-xl border border-slate-800 border-l-cyan-500">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase font-mono">{phase.weeksRange}</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-extrabold bg-[#0F172A] border border-slate-800 px-2 py-0.5 rounded-full">
                      {phaseProgressPercent}% completed
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-sans tracking-tight leading-normal mt-0.5">{phase.title}</h4>
                  
                  {/* Phase Mini Progress bar */}
                  <div className="w-full bg-slate-800/80 h-1 rounded-full mt-2 overflow-hidden flex">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-305" style={{ width: `${phaseProgressPercent}%` }} />
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono mt-1">
                    <span>{completedInPhase} of {totalInPhase} terms completed</span>
                    {activeInPhase > 0 && <span className="text-cyan-400 animate-pulse">⚡ {activeInPhase} active in progress</span>}
                  </div>

                  <p className="text-xs text-slate-400 leading-normal mt-1.5">{phase.description}</p>
                </div>

                <div className="space-y-3">
                  {phase.weeks.map((week) => {
                    const isWeekExpanded = !!expandedWeeks[week.weekNum];
                    const weekCompletedCount = week.subtopics.filter(s => progress.completedSubtopics.includes(s.id)).length;
                    const isWeekCompleteOnRoadmap = week.subtopics.length > 0 && weekCompletedCount === week.subtopics.length;

                    return (
                      <div 
                        key={week.weekNum} 
                        className="bg-[#1E293B] rounded-xl border border-slate-700 shadow-sm overflow-hidden transition-all duration-200"
                      >
                        <button 
                          onClick={() => toggleWeek(week.weekNum)}
                          className="w-full flex items-center justify-between p-4 bg-slate-805/40 hover:bg-slate-800 transition duration-150 cursor-pointer"
                        >
                          <div className="flex items-center gap-3 text-left">
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                              isWeekCompleteOnRoadmap 
                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30' 
                                : 'bg-[#0F172A] text-slate-400 border border-slate-700'
                            }`}>
                              W{week.weekNum}
                            </div>
                            <div>
                              <h5 className="text-xs font-semibold text-white">{week.title}</h5>
                              <p className="text-[10px] text-slate-400 truncate max-w-[280px] md:max-w-md">{week.focus}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 font-mono text-xs text-slate-400">
                            <span className="text-[10px]">
                              {weekCompletedCount} of {week.subtopics.length} complete
                            </span>
                            {isWeekExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                          </div>
                        </button>

                        {isWeekExpanded && (
                          <div className="p-4 space-y-2 border-t border-slate-800 bg-[#0F172A]/40">
                            {week.subtopics.map((sub) => {
                              const isSubtopicCompleted = progress.completedSubtopics.includes(sub.id);
                              const subtopicStatus = getSubtopicStatus(sub.id);
                              const isActiveInPreview = activeSubtopicId === sub.id;

                              return (
                                <div 
                                  key={sub.id}
                                  className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-150 gap-2 ${
                                    isActiveInPreview 
                                      ? 'border-cyan-500 bg-cyan-500/10' 
                                      : 'border-slate-800 hover:border-slate-700 bg-slate-900/30'
                                  }`}
                                >
                                  <button 
                                    onClick={() => setActiveSubtopicId(sub.id)}
                                    className="flex-1 flex text-left items-start gap-3 justify-between cursor-pointer"
                                  >
                                    <div>
                                      <h6 className="text-xs font-semibold text-slate-205 flex items-center gap-2">
                                        {sub.title}
                                        {progress.bookmarkedSubtopics.includes(sub.id) && (
                                          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" title="Bookmarked" />
                                        )}
                                      </h6>
                                      <div className="flex flex-wrap gap-1.5 mt-1.5 items-center">
                                        <span className="text-[9px] font-mono font-bold bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/50">
                                          {sub.tool}
                                        </span>
                                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                                          sub.difficulty === 'Beginner' ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400' :
                                          sub.difficulty === 'Intermediate' ? 'bg-cyan-500/15 border-cyan-500/20 text-cyan-400' :
                                          'bg-amber-500/15 border-amber-500/20 text-amber-500'
                                        }`}>
                                          {sub.difficulty}
                                        </span>
                                        <span className="text-[9px] text-slate-400 font-mono flex items-center gap-1">
                                          <Clock className="h-2.5 w-2.5" /> {sub.estimatedTime}
                                        </span>
                                      </div>
                                    </div>
                                  </button>

                                  {/* Interactive Status Selector Dropdown */}
                                  <div className="flex items-center gap-1.5 pl-2">
                                    <select
                                      value={subtopicStatus}
                                      onChange={(e) => setSubtopicStatus(sub.id, e.target.value as any)}
                                      className={`px-2 py-1 rounded-lg text-[10px] font-mono font-bold outline-none border transition duration-150 cursor-pointer ${
                                        subtopicStatus === 'completed'
                                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                          : subtopicStatus === 'active'
                                          ? 'bg-cyan-500/10 border-cyan-500/35 text-cyan-400 animate-pulse'
                                          : 'bg-slate-800 border-slate-700 text-slate-400/80 hover:text-slate-300'
                                      }`}
                                    >
                                      <option value="pending" className="bg-[#1E293B] text-slate-300">Pending</option>
                                      <option value="active" className="bg-[#1E293B] text-cyan-400 font-bold">⏱ Active</option>
                                      <option value="completed" className="bg-[#1E293B] text-emerald-400 font-bold">✓ Complete</option>
                                    </select>
                                  </div>
                                </div>
                              );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
        </div>

        {/* Right Side: Deep-Dive Preview panel with instant actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="sticky top-6">
            {activeSubtopicId ? (
              (() => {
                const subtopic = BA_PHASES.flatMap(p => p.weeks)
                  .flatMap(w => w.subtopics)
                  .find(s => s.id === activeSubtopicId);

                if (!subtopic) return null;
                const isSubtopicCompleted = progress.completedSubtopics.includes(subtopic.id);
                const currentStatus = getSubtopicStatus(subtopic.id);
                const isBookmarked = progress.bookmarkedSubtopics.includes(subtopic.id);
                const isRevision = progress.revisionSubtopics.includes(subtopic.id);

                return (
                  <div className="bg-[#1E293B] rounded-2xl border border-slate-700 shadow-md p-6 space-y-6">
                    {/* Header bar and action toggles */}
                    <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                      <div>
                        <div className="flex gap-2 mb-2 items-center text-[10px] font-mono">
                          <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700/50">
                            {subtopic.tool}
                          </span>
                          <span className={`px-2 py-0.5 rounded font-bold border ${
                            subtopic.difficulty === 'Beginner' ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-400' :
                            subtopic.difficulty === 'Intermediate' ? 'bg-cyan-500/15 border-cyan-500/20 text-cyan-400' :
                            'bg-amber-500/15 border-amber-500/20 text-amber-500'
                          }`}>
                            {subtopic.difficulty}
                          </span>
                        </div>
                        <h3 className="font-sans font-extrabold text-base text-white leading-snug">{subtopic.title}</h3>
                        <p className="text-xs text-slate-400 leading-normal mt-1">{subtopic.desc}</p>
                      </div>

                      {/* Tool toggles */}
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => toggleBookmark(subtopic.id)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isBookmarked 
                              ? 'bg-amber-550/15 border-amber-500/30 text-amber-400' 
                              : 'bg-[#0F172A] border-slate-705 text-slate-400 hover:text-white'
                          }`}
                          title={isBookmarked ? 'Remove Bookmark' : 'Bookmark for later'}
                        >
                          <BookMarked className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => toggleRevision(subtopic.id)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            isRevision 
                              ? 'bg-cyan-500/15 border-cyan-500/30 text-cyan-400' 
                              : 'bg-[#0F172A] border-slate-705 text-slate-400 hover:text-white'
                          }`}
                          title="Schedule for active Revision tracker"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Theoretical Concepts Bullet listing */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-305 uppercase tracking-widest flex items-center gap-2">
                        <Info className="h-3.5 w-3.5 text-cyan-400" /> Syllabus Concepts
                      </h4>
                      <ul className="text-xs text-slate-450 space-y-2 list-disc pl-4 leading-relaxed">
                        {subtopic.concepts.map((concept, idx) => (
                          <li key={idx} className="hover:text-cyan-300 transition cursor-default">
                            {concept}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Interactive Tasks Checklist */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-305 uppercase tracking-widest flex items-center gap-2">
                        <Trophy className="h-3.5 w-3.5 text-emerald-400" /> Practice Challenges
                      </h4>
                      <div className="space-y-2">
                        {subtopic.tasks.map((task) => (
                          <div 
                            key={task.id} 
                            className="bg-[#0F172A]/80 rounded-xl p-3 border border-slate-700 text-xs flex gap-3 items-start justify-between"
                          >
                            <div className="space-y-1">
                              <p className="font-bold text-white leading-normal">{task.title}</p>
                              <p className="text-[11px] text-slate-450 leading-relaxed">{task.desc}</p>
                            </div>
                            <span className="text-[9px] font-mono font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                              Recommended
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Notes block for user */}
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <h4 className="text-xs font-bold text-slate-305 uppercase tracking-widest flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-slate-400" /> My Study Notes
                      </h4>
                      <textarea
                        value={progress.notes[subtopic.id] || ''}
                        onChange={(e) => saveNote(subtopic.id, e.target.value)}
                        placeholder={`Paste SQL snippets, Excel formula cheat sheets here. (Stored locally for weeks of retrieval!)`}
                        rows={3}
                        className="w-full text-xs font-sans p-3 border border-slate-700 rounded-xl bg-[#0F172A] focus:ring-1 focus:ring-cyan-500 outline-none text-slate-100"
                      />
                      <p className="text-[10px] text-slate-500 text-right italic font-mono">
                        Auto-saved locally
                      </p>
                    </div>

                    {/* Curated reading materials */}
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-305 uppercase tracking-widest leading-none">External Resources</h4>
                      <div className="space-y-1.5 pt-1">
                        {subtopic.resources.map((res, index) => (
                          <div key={index} className="flex justify-between items-center text-xs">
                            <span className="text-slate-450">{res.name} {res.desc && `— ${res.desc}`}</span>
                            {res.url && res.url !== 'javascript:void(0)' ? (
                              <a 
                                href={res.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-cyan-450 hover:underline font-mono text-[10px]"
                              >
                                View Link
                              </a>
                            ) : (
                              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono border border-slate-700/50">In-App</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                     {/* Segmented status controls */}
                     <div className="space-y-2 pt-3 border-t border-slate-800">
                       <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-3">Topic Tracker Status</h4>
                       <div className="grid grid-cols-3 gap-2">
                         <button
                           onClick={() => setSubtopicStatus(subtopic.id, 'pending')}
                           className={`py-2 px-3 rounded-xl font-mono text-[10px] font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                             currentStatus === 'pending'
                               ? 'bg-slate-800/80 border-slate-600 text-slate-205'
                               : 'bg-slate-900/30 border-slate-805 text-slate-500 hover:text-slate-400'
                           }`}
                         >
                           <span className="text-sm mb-0.5">○</span>
                           Pending
                         </button>
                         <button
                           onClick={() => setSubtopicStatus(subtopic.id, 'active')}
                           className={`py-2 px-3 rounded-xl font-mono text-[10px] font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                             currentStatus === 'active'
                               ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-extrabold shadow-[0_0_8px_rgba(34,211,238,0.15)] animate-pulse'
                               : 'bg-slate-900/30 border-slate-805 text-slate-500 hover:text-slate-400'
                           }`}
                         >
                           <span className="text-sm mb-0.5">⏱</span>
                           Active
                         </button>
                         <button
                           onClick={() => setSubtopicStatus(subtopic.id, 'completed')}
                           className={`py-2 px-3 rounded-xl font-mono text-[10px] font-bold border transition cursor-pointer flex flex-col items-center justify-center ${
                             currentStatus === 'completed'
                               ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-400 font-extrabold'
                               : 'bg-slate-900/30 border-slate-805 text-slate-500 hover:text-slate-400'
                           }`}
                         >
                           <span className="text-sm mb-0.5">✓</span>
                           Complete
                         </button>
                       </div>
                     </div>

                  </div>
                );
              })()
            ) : (
              <div className="h-[400px] rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-center p-6 space-y-2 bg-[#1E293B]/50">
                <HelpCircle className="h-10 w-10 text-slate-550" />
                <h4 className="text-sm font-bold text-slate-300">No active subtopic selected</h4>
                <p className="text-xs text-slate-500 max-w-[280px]">
                  Click on any subtopic in the 16-week accordion tree on the left to show its corresponding study material, practice assignments, resources, and custom notes.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
