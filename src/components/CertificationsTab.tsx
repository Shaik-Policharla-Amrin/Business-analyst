/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Award, 
  BookMarked, 
  ExternalLink, 
  CheckCircle, 
  Sparkles, 
  Info,
  Clock
} from 'lucide-react';
import { FREE_COURSES } from '../data';
import { UserProgress } from '../types';

interface CertificationsTabProps {
  progress: UserProgress;
  setProgress: (prevProgress: any) => void;
}

export default function CertificationsTab({ progress, setProgress }: CertificationsTabProps) {
  
  const toggleCourseEnrollment = (courseId: string) => {
    const isCompleted = progress.completedCertifications.includes(courseId);
    let updated = [...progress.completedCertifications];
    if (isCompleted) {
      updated = updated.filter(id => id !== courseId);
    } else {
      updated.push(courseId);
    }
    setProgress((prev: any) => ({ ...prev, completedCertifications: updated }));
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-slate-100 animate-fade-in">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-sans font-black tracking-tight text-white flex items-center gap-2">
          <Award className="h-6 w-6 text-cyan-400" /> Free BA Certifications Hub
        </h2>
        <p className="text-xs text-slate-400">
          Gain professional credentials by auditing standard curriculum tutorials. Click resources below, enroll for free, and record your credentials achievements.
        </p>
      </div>

      {/* Guide Banner */}
      <div className="p-4 bg-cyan-500/5 border border-cyan-500/25 rounded-xl flex gap-3 text-xs text-slate-300 max-w-2xl leading-relaxed">
        <Info className="h-4.5 w-4.5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-extrabold text-cyan-400 mb-1 font-mono uppercase tracking-wider text-[10px]">How to access these courses for completely free:</p>
          <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
            <li>For Coursera: Search the course name, and click the small "Audit Course" link on the bottom left of the payment popup to unlock all lectures without fees.</li>
            <li>For Alison, Simplilearn, and upGrad: Create free basic accounts to unlock video resources and digital checkmarks.</li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FREE_COURSES.map((course) => {
          const isCompleted = progress.completedCertifications.includes(course.id);
          
          return (
            <div 
              key={course.id} 
              className={`bg-[#1E293B] rounded-2xl border border-slate-800 p-5 shadow-lg space-y-4 flex flex-col justify-between transition hover:border-slate-700 ${
                isCompleted ? 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.05)] bg-[#1E293B]/90' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-[9px] font-mono font-bold bg-[#0F172A] text-cyan-400 px-2 py-0.5 rounded uppercase tracking-wider border border-slate-800">
                      {course.provider}
                    </span>
                    <h3 className="text-xs font-bold text-white mt-2 font-sans leading-snug">
                      {course.title}
                    </h3>
                  </div>
                  
                  <button 
                    onClick={() => toggleCourseEnrollment(course.id)}
                    className={`h-6 w-6 rounded-md border flex items-center justify-center text-xs transition cursor-pointer ${
                      isCompleted 
                        ? 'bg-emerald-500 border-emerald-500 text-white font-bold animate-pulse' 
                        : 'bg-[#0F172A] hover:bg-emerald-500/10 hover:text-emerald-400 border-slate-800 text-slate-550'
                    }`}
                  >
                    ✓
                  </button>
                </div>

                <div className="flex gap-2 text-[10px] text-slate-500 font-mono">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                  <span>•</span>
                  <span>{course.isFreeCert ? 'Free Digital Cert' : 'Cert Upgrade Optional'}</span>
                </div>

                <div className="space-y-1 pt-1">
                  <p className="font-extrabold text-[8px] uppercase tracking-widest text-slate-500 font-mono">Curriculum Highlights:</p>
                  <ul className="text-[11px] text-slate-300 space-y-1 list-disc pl-4 leading-relaxed">
                    {course.benefits.slice(0, 3).map((benefit, bIdx) => (
                      <li key={bIdx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <a 
                  href={course.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-350 hover:underline font-bold"
                >
                  Go to Enrollment page <ExternalLink className="h-3 w-3" />
                </a>

                {isCompleted && (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/25 font-mono">
                    Completed
                  </span>
                )}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
