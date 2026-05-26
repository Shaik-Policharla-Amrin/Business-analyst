/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Briefcase, 
  Code, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles
} from 'lucide-react';
import { BA_PROJECTS } from '../data';
import { UserProgress, Project } from '../types';

interface ProjectsHubProps {
  progress: UserProgress;
  setProgress: (prevProgress: any) => void;
}

export default function ProjectsHub({ progress, setProgress }: ProjectsHubProps) {
  const [activeProjId, setActiveProjId] = React.useState<string | null>('proj-zomato');
  
  const toggleProjectCompletion = (pId: string) => {
    const isCompleted = progress.completedProjects.includes(pId);
    let updated = [...progress.completedProjects];
    if (isCompleted) {
      updated = updated.filter(id => id !== pId);
    } else {
      updated.push(pId);
    }
    setProgress((prev: any) => ({ ...prev, completedProjects: updated }));
  };

  // Combine curated static list with other list items from the newsletter
  // to show a total list representing the "20+ Projects"
  const expandedList: Project[] = [
    ...BA_PROJECTS,
    {
      id: 'proj-ipl',
      title: 'IPL T20 Cricket Match Outcomes Analysis',
      difficulty: 'Intermediate',
      tools: ['SQL', 'Tableau'],
      description: 'Analyze matches data across years, identifying factors that impact matches (win-shares after batting first, venue advantages, MVP trends).',
      deliverables: ['Dashboard showing year over year MVP distributions', 'Constituent victory graphs per batting selection'],
      steps: ['Connect IPL database inside SQL schema.', 'Compose aggregation group-by metrics summarizing match locations wins.', 'Build interactive KPI dashboard cards.']
    },
    {
      id: 'proj-covid9',
      title: 'Global Covid-19 Epidemic Visualizer',
      difficulty: 'Advanced',
      tools: ['SQL', 'Tableau', 'Data Viz'],
      description: 'Structure multi-country epidemic analysis graphs, charting total active counts per capita.',
      deliverables: ['Spatial map detailing growth variance per region', 'Weekly percentage change rolling models'],
      steps: ['Utilize standard SQL window functions to evaluate running count changes.', 'Bridge data sheets with country density registers.', 'Publish a Tableau layout with interactive filters.']
    },
    {
      id: 'proj-iris',
      title: 'Iris Flower Dataset Classifier',
      difficulty: 'Beginner',
      tools: ['Python', 'Excel'],
      description: 'Organize structural measurements of flowers, demonstrating scatter plots classifications.',
      deliverables: ['Interactive scatter plot mapping features correlations', 'Excel basic metric summary list'],
      steps: ['Clean plant attributes dimensions in pandas or excel sheets.', 'Calculate averages and medians per flower species.', 'Assess feature correlations using coefficient estimators tools.']
    },
    {
      id: 'proj-car',
      title: 'Automobiles Retail valuation Model',
      difficulty: 'Advanced',
      tools: ['Python', 'Excel', 'Data Viz'],
      description: 'Review motor vehicles price correlations, adjusting pricing indexes based on horse-powers.',
      deliverables: ['Predictive workbook valuing second-hand vehicle valuations', 'Regression model results spreadsheet report'],
      steps: ['Remove duplicate columns using Excel Power Query step tools.', 'Test variables using Excel Analysis ToolPak.', 'Highlight residual distributions charts.']
    },
    {
      id: 'proj-hr',
      title: 'HR Employee Attrition Forecasting',
      difficulty: 'Advanced',
      tools: ['Power BI', 'SQL'],
      description: 'Evaluate workforce turnover rates, highlighting high risk departments.',
      deliverables: ['Executive HR turnover dashboard', 'Calculated correlation coefficients mapping salary hikes overrides'],
      steps: ['Formulate tenure columns via SQL case when operators.', 'Plot department clusters attrition metrics.', 'Publish a BI toolkit to aid management budgeting.']
    },
    {
      id: 'proj-titanic',
      title: 'Titanic Passenger Survivability analysis',
      difficulty: 'Beginner',
      tools: ['Excel', 'Data Viz'],
      description: 'Evaluate shipwreck records, charting odds of survivability across passenger tiers.',
      deliverables: ['Workbook PivotTables dividing genders survivability rates', 'Visual combo graphs depicting age variations'],
      steps: ['Normalize blank age fields with fallback median parameters.', 'Summarize aggregates using SUM and COUNT checks.', 'Incorporate high-contrast summary cards.']
    }
  ];

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-sans font-black tracking-tight text-white flex items-center gap-2">
          <Briefcase className="h-6 w-6 text-cyan-400" /> Portfolio Projects Directory
        </h2>
        <p className="text-xs text-slate-400">
          Access complete business intelligence project templates. Clean datasets, structure dashboards, and prepare resume-worthy deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Project List Column */}
        <div className="lg:col-span-5 space-y-3 max-h-[580px] overflow-y-auto pr-2">
          {expandedList.map((proj, idx) => {
            const isActive = activeProjId === proj.id;
            const isCompleted = progress.completedProjects.includes(proj.id);

            return (
              <div 
                key={proj.id}
                className={`p-4 rounded-xl border text-left transition duration-150 flex items-start justify-between cursor-pointer ${
                  isActive 
                    ? 'border-cyan-500/50 bg-[#1E293B] shadow-sm text-white' 
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-[#1E293B]/40'
                }`}
                onClick={() => setActiveProjId(proj.id)}
              >
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold bg-[#0F172A] px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">
                      Proj #{idx + 1}
                    </span>
                    <span className={`text-[9px] font-mono font-bold px-1.5 rounded py-0.5 border ${
                      proj.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      proj.difficulty === 'Intermediate' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                      'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    }`}>
                      {proj.difficulty}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white leading-tight">{proj.title}</h4>
                  
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tools.map(t => (
                      <span key={t} className="bg-cyan-500/5 text-cyan-400/80 text-[8px] font-mono px-1.5 py-0.2 rounded border border-cyan-500/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProjectCompletion(proj.id);
                  }}
                  className={`h-6 w-6 rounded-lg flex items-center justify-center shrink-0 border transition-all cursor-pointer ${
                    isCompleted 
                      ? 'bg-emerald-500 border-emerald-500 text-white font-bold' 
                      : 'bg-[#0F172A] hover:bg-emerald-500/10 hover:text-emerald-400 border-slate-800 text-slate-500'
                  }`}
                >
                  ✓
                </button>
              </div>
            );
          })}
        </div>

        {/* Project Deep-Dive Content Panel */}
        <div className="lg:col-span-7 space-y-6">
          {activeProjId ? (
            (() => {
              const activeProj = expandedList.find(p => p.id === activeProjId);
              if (!activeProj) return null;
              const isCompleted = progress.completedProjects.includes(activeProj.id);

              return (
                <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-xl space-y-6 animate-fade-in col-span-1">
                  
                  {/* Header info */}
                  <div className="flex justify-between items-start gap-4 border-b border-slate-850 pb-4">
                    <div>
                      <div className="flex gap-2 mb-2">
                        {activeProj.tools.map(t => (
                          <span key={t} className="bg-cyan-500/10 text-cyan-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-cyan-500/20">
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-sans font-black text-base text-white leading-snug">{activeProj.title}</h3>
                    </div>

                    <button
                      onClick={() => toggleProjectCompletion(activeProj.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-400/10 border-emerald-500/35 text-emerald-450'
                          : 'bg-[#0F172A] hover:bg-[#0A101F] border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {isCompleted ? '✓ Completed' : 'Mark Completed'}
                    </button>
                  </div>

                  {/* Summary */}
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-slate-500 uppercase text-[9px] tracking-wider leading-none">Summary Objective:</p>
                    <p className="text-slate-300 leading-relaxed text-xs">{activeProj.description}</p>
                  </div>

                  {/* Steps list */}
                  <div className="space-y-2 text-xs">
                    <p className="font-bold text-slate-500 uppercase text-[9px] tracking-wider leading-none">Steps to Execute & Build:</p>
                    <ol className="list-decimal pl-4 text-slate-300 space-y-1.5 leading-relaxed">
                      {activeProj.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* Deliverables list */}
                  <div className="p-4 bg-[rgba(34,211,238,0.02)] border border-cyan-500/20 rounded-xl space-y-2 text-xs">
                    <h5 className="font-bold text-white flex items-center gap-2">
                      <CheckCircle2 className="h-4.5 w-4.5 text-cyan-405" /> Professional Deliverables Expected:
                    </h5>
                    <ul className="list-disc pl-4 text-slate-300 space-y-1">
                      {activeProj.deliverables.map((del, i) => (
                        <li key={i}>{del}</li>
                      ))}
                    </ul>
                  </div>

                  {/* CSV snippet helper */}
                  {activeProj.mockDataSnippet && (
                    <div className="space-y-2">
                      <p className="font-bold text-slate-500 uppercase text-[9px] tracking-wider leading-none">Sample CSV Data Preview:</p>
                      <pre className="bg-slate-900 p-3.5 rounded-xl font-mono text-[10px] text-emerald-405 overflow-x-auto select-all shadow-inner border border-slate-850">
                        {activeProj.mockDataSnippet}
                      </pre>
                      <p className="text-[10px] text-slate-500 italic font-mono leading-none">
                        Copy sample values to draft local Excel tests.
                      </p>
                    </div>
                  )}

                  {/* Helpful resource alerts */}
                  <div className="p-3.5 bg-[#0F172A]/70 rounded-xl border border-slate-800/80 flex gap-2 text-xs text-slate-400 items-start">
                    <Sparkles className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-[11px]">
                      Strive to build this on your local machine using Excel sheets. Document your cleaning process in a markdown document, take screenshots of your dashboards, and upload them as portfolio assets to your GitHub!
                    </p>
                  </div>

                </div>
              );
            })()
          ) : (
            <div className="h-48 rounded-2xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center text-slate-500 font-sans text-center bg-[#1E293B]/40">
              <p>Select a project from the left layout panel to load specific blueprints.</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
