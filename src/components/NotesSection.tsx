/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BookOpen, 
  BookMarked, 
  RefreshCw, 
  Download, 
  Trash2, 
  Info,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { UserProgress } from '../types';
import { BA_PHASES } from '../data';

interface NotesSectionProps {
  progress: UserProgress;
  setProgress: (prevProgress: any) => void;
}

export default function NotesSection({ progress, setProgress }: NotesSectionProps) {
  const [activeSegment, setActiveSegment] = React.useState<'bookmarks' | 'revisions' | 'all-notes'>('all-notes');

  // Utility to locate subtopic details by ID
  const findSubtopic = (subId: string) => {
    return BA_PHASES.flatMap(p => p.weeks)
      .flatMap(w => w.subtopics)
      .find(s => s.id === subId);
  };

  const clearNote = (subId: string) => {
    if (confirm('Are you sure you want to delete this study note?')) {
      setProgress((prev: any) => {
        const updatedNotes = { ...prev.notes };
        delete updatedNotes[subId];
        return { ...prev, notes: updatedNotes };
      });
    }
  };

  const removeBookmark = (subId: string) => {
    setProgress((prev: any) => ({
      ...prev,
      bookmarkedSubtopics: prev.bookmarkedSubtopics.filter((id: string) => id !== subId)
    }));
  };

  const removeRevision = (subId: string) => {
    setProgress((prev: any) => ({
      ...prev,
      revisionSubtopics: prev.revisionSubtopics.filter((id: string) => id !== subId)
    }));
  };

  const downloadAllNotesAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(progress.notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "BA_Roadmap_Study_Notes.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Get lists
  const bookmarkedItems = progress.bookmarkedSubtopics.map(id => findSubtopic(id)).filter(Boolean);
  const revisionItems = progress.revisionSubtopics.map(id => findSubtopic(id)).filter(Boolean);
  const notedItems = Object.entries(progress.notes).map(([id, text]) => ({
    subtopic: findSubtopic(id),
    text,
    id
  })).filter(x => x.subtopic);

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-slate-100 animate-fade-in">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-sans font-black tracking-tight text-white flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-cyan-400" /> Notes & Revision Hub
          </h2>
          <p className="text-xs text-slate-400">
            View saved study concepts, bookmarked lessons, and organize your revision agenda for core modules.
          </p>
        </div>

        {notedItems.length > 0 && (
          <button 
            onClick={downloadAllNotesAsJson}
            className="px-4 py-2 border border-slate-800 hover:border-slate-700 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 transition cursor-pointer hover:text-white"
          >
            <Download className="h-4 w-4 text-cyan-400" /> Export Notes (JSON)
          </button>
        )}
      </div>

      {/* Internal Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-1">
        <button
          onClick={() => setActiveSegment('all-notes')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSegment === 'all-notes' 
              ? 'bg-cyan-500/10 text-cyan-400 border-b-2 border-cyan-500 font-extrabold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          My Study Notes ({notedItems.length})
        </button>
        <button
          onClick={() => setActiveSegment('bookmarks')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSegment === 'bookmarks' 
              ? 'bg-cyan-500/10 text-cyan-400 border-b-2 border-cyan-500 font-extrabold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Bookmarked Lessons ({bookmarkedItems.length})
        </button>
        <button
          onClick={() => setActiveSegment('revisions')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
            activeSegment === 'revisions' 
              ? 'bg-cyan-500/10 text-cyan-400 border-b-2 border-cyan-500 font-extrabold' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Revision agenda ({revisionItems.length})
        </button>
      </div>

      {/* SEGMENT 1: All saved notes */}
      {activeSegment === 'all-notes' && (
        <div className="space-y-4">
          {notedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {notedItems.map(({ subtopic, text, id }) => {
                if (!subtopic) return null;
                return (
                  <div key={id} className="bg-[#1E293B] rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4 flex flex-col justify-between animate-fade-in">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-[9px] font-mono font-bold bg-[#0F172A] text-cyan-400 px-2 py-0.5 rounded text-left uppercase border border-slate-800">
                            {subtopic.tool} — {subtopic.difficulty}
                          </span>
                          <h4 className="text-xs font-bold text-white mt-2 font-sans">{subtopic.title}</h4>
                        </div>
                        
                        <button 
                          onClick={() => clearNote(id)}
                          className="p-1.5 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition"
                          title="Delete note"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-500 font-mono italic leading-none border-t border-slate-800 pt-2">Saved concept note:</p>
                      <blockquote className="text-xs text-slate-300 italic font-mono bg-[#0F172A]/80 rounded-xl p-3 border-l-4 border-cyan-500 overflow-y-auto max-h-[140px] whitespace-pre-wrap">
                        {text}
                      </blockquote>
                    </div>

                    <div className="text-[10px] text-slate-500 font-mono italic text-right pt-2">
                      Auto-saved in browser database
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-64 rounded-2xl border-2 border-dashed border-slate-800 bg-[#1E293B]/40 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <FileText className="h-10 w-10 text-slate-550" />
              <h4 className="text-sm font-bold text-slate-300">No notes written down yet</h4>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                As you study weeks throughout the roadmap, you can type down formulas, SQL structures, and custom summaries in the dashboard's "Study Notes" textarea. They will display collectively here!
              </p>
            </div>
          )}
        </div>
      )}

      {/* SEGMENT 2: Bookmarked Lessons */}
      {activeSegment === 'bookmarks' && (
        <div className="space-y-4">
          {bookmarkedItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarkedItems.map((sub) => {
                if (!sub) return null;
                return (
                  <div key={sub.id} className="bg-[#1E293B] rounded-xl border border-slate-800 p-4 shadow-lg hover:border-slate-700 transition flex items-start justify-between gap-4 animate-fade-in">
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono font-bold bg-[#0F172A] text-cyan-405 px-2 py-0.5 rounded border border-slate-800">
                          {sub.tool}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">{sub.difficulty}</span>
                      </div>
                      <h4 className="text-xs font-bold text-white">{sub.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">{sub.desc}</p>
                    </div>

                    <button 
                      onClick={() => removeBookmark(sub.id)}
                      className="text-xs text-slate-500 hover:text-red-400 font-bold shrink-0 cursor-pointer font-mono"
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-64 rounded-2xl border-2 border-dashed border-slate-800 bg-[#1E293B]/40 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <BookMarked className="h-10 w-10 text-slate-555" />
              <h4 className="text-sm font-bold text-slate-300 border-none">No bookmarked lessons</h4>
              <p className="text-xs text-slate-550 max-w-sm leading-relaxed">
                Click the bookmark badge inside the roadmap subtopic header cards to add items hereto this dashboard.
              </p>
            </div>
          )}
        </div>
      )}

      {/* SEGMENT 3: Revision agenda list */}
      {activeSegment === 'revisions' && (
        <div className="space-y-4">
          {revisionItems.length > 0 ? (
            <div className="space-y-3">
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/25 flex gap-2.5 text-xs text-amber-400 max-w-2xl animate-fade-in">
                <Info className="h-4.5 w-4.5 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Active Recall revision list:</strong> It is highly recommended to practice these modules every 3-5 days. Check them off once revision exercises are compiled!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {revisionItems.map((sub) => {
                  if (!sub) return null;
                  return (
                    <div key={sub.id} className="bg-[#1E293B] rounded-xl border border-slate-800 p-4 shadow-lg hover:border-slate-750 transition flex items-start justify-between gap-4 animate-fade-in">
                      <div className="space-y-1.5 flex-1 pr-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono font-bold bg-[#0F172A] text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                            {sub.tool}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500">{sub.difficulty} • Est: {sub.estimatedTime}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white">{sub.title}</h4>
                        <p className="text-[11px] text-slate-400 leading-normal line-clamp-1">{sub.desc}</p>
                      </div>

                      <button 
                        onClick={() => removeRevision(sub.id)}
                        className="text-xs text-emerald-400 hover:bg-emerald-500/15 px-2.5 py-1 rounded bg-emerald-500/10 font-bold border border-emerald-500/20 shrink-0 cursor-pointer font-mono"
                      >
                        Re-Checked ✓
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="h-64 rounded-2xl border-2 border-dashed border-slate-800 bg-[#1E293B]/40 flex flex-col items-center justify-center text-center p-6 space-y-2">
              <RefreshCw className="h-10 w-10 text-slate-550" />
              <h4 className="text-sm font-bold text-slate-300">No revision agenda scheduled</h4>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Add tricky modules to your active revision agenda by clicking the recycle logo icon in the active subtopic header card displays.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
