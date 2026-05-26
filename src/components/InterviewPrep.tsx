/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  HelpCircle, 
  MessageSquare, 
  MessageCircle, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Info, 
  Award,
  BookOpen,
  Bookmark
} from 'lucide-react';
import { MOCK_INTERVIEW_QUESTIONS } from '../data';
import { UserProgress } from '../types';

interface InterviewPrepProps {
  progress: UserProgress;
  setProgress: (prevProgress: any) => void;
}

export default function InterviewPrep({ progress, setProgress }: InterviewPrepProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>('All');
  const [currentCardIdx, setCurrentCardIdx] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);

  // Behavioral Evaluation box states
  const [activeBehavioralId, setActiveBehavioralId] = React.useState<number>(32); // STAR STAR Q
  const [userTypedResponse, setUserTypedResponse] = React.useState('');
  const [evaluationFeedback, setEvaluationFeedback] = React.useState<{
    score: number;
    hasSituation: boolean;
    hasTask: boolean;
    hasAction: boolean;
    hasResult: boolean;
    tips: string[];
  } | null>(null);

  // Filter questions based on selected categories
  const categories = [
    'All',
    'Role & Process Fundamentals',
    'Tools, Techniques & Modeling',
    'Technical & Data Skills',
    'Behavioral & Stakeholder Management',
    'Scenario, Leadership & Strategy'
  ];

  const filteredQuestions = selectedCategory === 'All' 
    ? MOCK_INTERVIEW_QUESTIONS 
    : MOCK_INTERVIEW_QUESTIONS.filter(q => q.category === selectedCategory);

  // Ensure idx is inside boundaries
  const activeQuestion = filteredQuestions[currentCardIdx] || filteredQuestions[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCardIdx((prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  const toggleStarQuestion = (qId: number) => {
    const isStarred = progress.starredInterviewQuestions.includes(qId);
    let updated = [...progress.starredInterviewQuestions];
    if (isStarred) {
      updated = updated.filter(id => id !== qId);
    } else {
      updated.push(qId);
    }
    setProgress((prev: any) => ({ ...prev, starredInterviewQuestions: updated }));
  };

  // Behavioral validation analyzer
  const evaluateBehavioralResponse = () => {
    const text = userTypedResponse.trim().toLowerCase();
    
    if (text.length < 50) {
      setEvaluationFeedback({
        score: 2,
        hasSituation: false,
        hasTask: false,
        hasAction: false,
        hasResult: false,
        tips: ['Please write a full explanation. Professional answers should be at least 50-100 words.']
      });
      return;
    }

    // Heuristics checks
    const hasS = text.includes('situation') || text.includes('client wanted') || text.includes('problem') || text.includes('background') || text.includes('project was');
    const hasT = text.includes('task') || text.includes('had to') || text.includes('assess') || text.includes('evaluate') || text.includes('responsib');
    const hasA = text.includes('action') || text.includes('presented') || text.includes('i checked') || text.includes('i proposed') || text.includes('proposed') || text.includes('demonstrated') || text.includes('i made') || text.includes('action');
    const hasR = text.includes('result') || text.includes('saved') || text.includes('outcome') || text.includes('resulted') || text.includes('%') || text.includes('$') || text.includes('gained') || text.includes('dropped');

    let points = 1;
    if (hasS) points += 2;
    if (hasT) points += 2;
    if (hasA) points += 2.5;
    if (hasR) points += 2.5;

    const parsedTips: string[] = [];
    if (!hasS) parsedTips.push("Introduce your background/metrics more clearly using 'Situation:' keywords.");
    if (!hasT) parsedTips.push("Identify the explicit metric task and what you had to solve directly ('Task:').");
    if (!hasA) parsedTips.push("Include action-oriented verbs showing exactly WHAT you built or proposed ('Action:').");
    if (!hasR) parsedTips.push("Quantify the value saved (e.g., 'saved $10,000' or 'saved 3 weeks duration') to nail the deliverables ('Result:').");

    setEvaluationFeedback({
      score: Math.min(10, points),
      hasSituation: hasS,
      hasTask: hasT,
      hasAction: hasA,
      hasResult: hasR,
      tips: parsedTips.length > 0 ? parsedTips : ['Excellent response! Complete STAR layout resolved perfectly. File this in your interview notepad!']
    });
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-slate-100">
      
      {/* Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-sans font-black tracking-tight text-white flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-cyan-400 animate-pulse" /> 50 Mock Interview flashcards
        </h2>
        <p className="text-xs text-slate-400">
          Review 50 business and technical interview questions compiled directly from actual hiring audits. Bookmark card decks for revision.
        </p>
      </div>

      {/* Category Horizontal scroll list */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-700 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentCardIdx(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
              selectedCategory === cat 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/35' 
                : 'bg-slate-800/40 text-slate-450 hover:bg-slate-800 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column: Card Deck Arena */}
        <div className="lg:col-span-7 space-y-4">
          {filteredQuestions.length > 0 && activeQuestion ? (
            <div className="space-y-4">
              
              {/* Card Deck indicators */}
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                <span>Category: <strong className="text-cyan-400 font-sans font-extrabold">{activeQuestion.category}</strong></span>
                <span className="font-bold text-slate-500">Card {currentCardIdx + 1} of {filteredQuestions.length}</span>
              </div>

              {/* FLIP CARD STYLING */}
              <div 
                onClick={() => setIsFlipped(!isFlipped)}
                className={`min-h-[260px] rounded-2xl border p-7 shadow-sm transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:scale-[1.01] ${
                  isFlipped 
                    ? 'bg-cyan-500/5 border-cyan-500/30 shadow-inner' 
                    : 'bg-[#1E293B] border-slate-700 hover:border-slate-600'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-slate-400">
                    <span className="font-mono text-[10px] bg-[#0F172A] text-cyan-400 px-2 py-0.5 rounded font-bold border border-slate-800">
                      Q#{activeQuestion.id}
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // prevent flipping trigger
                        toggleStarQuestion(activeQuestion.id);
                      }}
                      className="p-1 rounded hover:bg-slate-800 transition"
                      title="Star this question for study list review"
                    >
                      <Star className={`h-4.5 w-4.5 ${
                        progress.starredInterviewQuestions.includes(activeQuestion.id) 
                          ? 'fill-amber-400 text-amber-500 font-bold' 
                          : 'text-slate-500'
                      }`} />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white font-sans leading-snug">
                    {activeQuestion.question}
                  </h3>

                  {isFlipped && (
                    <div className="text-xs text-slate-350 mt-4 leading-relaxed border-t border-slate-800 pt-4 whitespace-pre-line animate-fade-in font-sans">
                      <p className="font-extrabold text-cyan-400 mb-1.5 uppercase font-mono tracking-wider text-[10px]">Reference Sample Answer:</p>
                      {activeQuestion.answer}
                    </div>
                  )}
                </div>

                <div className="text-right text-[10px] text-slate-500 font-mono italic mt-4 pt-2 border-t border-dashed border-slate-800">
                  {isFlipped ? 'Click card again to hide reference answer 🔄' : 'Click card anywhere to expand reference answer 🔄'}
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrev}
                  className="px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition duration-150 flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </button>
                
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-extrabold rounded-xl text-xs transition duration-150 flex items-center gap-1.5 shadow-[0_0_10px_rgba(34,211,238,0.3)] cursor-pointer"
                >
                  Next Card <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="h-48 text-center flex flex-col items-center justify-center p-4 text-slate-400 italic">
              No matching questions found under this category.
            </div>
          )}
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-sm space-y-5 animate-fade-in">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-cyan-400" /> Behavioral Answer Assessor
            </h3>
            
            <p className="text-xs text-slate-400 leading-normal">
              Pick a behavioral question below, type out your own STAR structured answer, and compile constructive feedback instantly.
            </p>

            <div className="space-y-4">
              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block">Behavioral Target Template:</label>
                <select 
                  value={activeBehavioralId}
                  onChange={(e) => {
                    const idVal = parseInt(e.target.value, 10);
                    setActiveBehavioralId(idVal);
                    // Prepopulate based on selection
                    if (idVal === 32) {
                      setUserTypedResponse(`Situation: A client requested a manual billing dashboard feature estimated to cost $25k in dev time.\nTask: Assess the ROI of building this feature compared to using standard tools.\nAction: I investigated our requirements, automated the reports in Excel Power Query, and presented it as a free alternative.\nResult: Save the client $25,000 and 3 weeks of redundance work.`);
                    } else {
                      setUserTypedResponse(`Situation: \nTask: \nAction: \nResult: `);
                    }
                    setEvaluationFeedback(null);
                  }}
                  className="w-full px-3 py-2 bg-[#0F172A] border border-slate-800 text-white rounded-xl text-xs outline-none focus:ring-1 focus:ring-cyan-500"
                >
                  <option value={32}>Q#32: Advised against a stakeholders redundant action</option>
                  <option value={34}>Q#34: Resisting automated billing alignment</option>
                  <option value={42}>Q#42: Persuaded someone to change strategic product views</option>
                </select>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-505 uppercase text-[9px] tracking-wider block">My Response Draft (STAR Template):</label>
                <textarea
                  value={userTypedResponse}
                  onChange={(e) => setUserTypedResponse(e.target.value)}
                  placeholder="Situation:\nTask:\nAction:\nResult:"
                  rows={6}
                  className="w-full p-3 border border-slate-800 rounded-xl bg-[#0F172A] focus:bg-[#0A101F] text-white text-xs font-mono focus:ring-1 focus:ring-cyan-500 outline-none leading-relaxed"
                />
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                <button
                  onClick={() => {
                    setUserTypedResponse('');
                    setEvaluationFeedback(null);
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-300 font-mono font-bold cursor-pointer"
                >
                  Clear Sheet
                </button>
                <button
                  onClick={evaluateBehavioralResponse}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-bold text-xs transition duration-150 flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  Audit Answers Quality 🤖
                </button>
              </div>

              {/* Evaluation outputs */}
              {evaluationFeedback && (
                <div className="bg-[#0F172A] rounded-xl p-4 border border-slate-800 text-xs space-y-3 animate-fade-in">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="font-bold text-slate-350">Audit Metric:</span>
                    <span className="font-mono font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">
                      Score: {evaluationFeedback.score} / 10
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-mono">
                    <div className={`p-1.5 rounded-lg border ${evaluationFeedback.hasSituation ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      [S] Block
                    </div>
                    <div className={`p-1.5 rounded-lg border ${evaluationFeedback.hasTask ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      [T] Block
                    </div>
                    <div className={`p-1.5 rounded-lg border ${evaluationFeedback.hasAction ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      [A] Block
                    </div>
                    <div className={`p-1.5 rounded-lg border ${evaluationFeedback.hasResult ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      [R] Block
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <p className="font-extrabold text-[10px] uppercase text-cyan-400 font-mono tracking-wider">Constructive Feedback & Tips:</p>
                    <ul className="list-disc pl-4 space-y-1 text-slate-400 text-[11px] leading-relaxed">
                      {evaluationFeedback.tips.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
