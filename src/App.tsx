/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SQLPlayground from './components/SQLPlayground';
import ExcelHelper from './components/ExcelHelper';
import InterviewPrep from './components/InterviewPrep';
import ProjectsHub from './components/ProjectsHub';
import NotesSection from './components/NotesSection';
import CertificationsTab from './components/CertificationsTab';
import DataAnalystResources from './components/DataAnalystResources';
import { UserProgress } from './types';
import { BA_PHASES } from './data';

const STORAGE_KEY = 'ba_roadmap_personal_tracker_state';
const BACKUP_STORAGE_KEY = 'veeraj_ba_roadmap_platform_state';

const defaultProgress: UserProgress = {
  completedSubtopics: [],
  bookmarkedSubtopics: [],
  revisionSubtopics: [],
  notes: {},
  completedProjects: [],
  completedCertifications: [],
  starredInterviewQuestions: [],
  streakCount: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  dailyGoalProgress: {
    date: new Date().toISOString().split('T')[0],
    subtopicsGoal: 2,
    subtopicsCompleted: 0,
    sqlGoal: 1,
    sqlCompleted: 0
  },
  sqlSolvedChallenges: [],
  subtopicStatuses: {},
  completedDataAnalystResources: []
};

export default function App() {
  const [activeTab, setActiveTab] = React.useState<string>('dashboard');
  const [progress, setProgress] = React.useState<UserProgress>(() => {
    try {
      let stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        stored = localStorage.getItem(BACKUP_STORAGE_KEY);
      }
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure properties exist
        return {
          ...defaultProgress,
          ...parsed,
          dailyGoalProgress: parsed.dailyGoalProgress || defaultProgress.dailyGoalProgress,
          notes: parsed.notes || {},
          subtopicStatuses: parsed.subtopicStatuses || {},
          completedDataAnalystResources: parsed.completedDataAnalystResources || []
        };
      }
    } catch (e) {
      console.error('Error fallback reading localStorage', e);
    }
    return defaultProgress;
  });

  // Keep localStorage in sync
  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error writing to localStorage', e);
    }
  }, [progress]);

  // Handle active streak calculation
  React.useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== todayStr) {
      let nextStreak = progress.streakCount;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (progress.lastActiveDate === yesterdayStr) {
        // Active streak continues
        nextStreak = nextStreak + 1;
      } else {
        // Reset or default back to 3
        nextStreak = 3;
      }

      setProgress(prev => ({
        ...prev,
        streakCount: nextStreak,
        lastActiveDate: todayStr,
        dailyGoalProgress: {
          date: todayStr,
          subtopicsGoal: 2,
          subtopicsCompleted: 0,
          sqlGoal: 1,
          sqlCompleted: 0
        }
      }));
    }
  }, []);

  // Compute calculated statistics
  const totalSubtopics = BA_PHASES.flatMap(p => p.weeks).flatMap(w => w.subtopics).length;
  const overallProgressPercent = Math.min(
    100,
    Math.round(
      ((progress.completedSubtopics.length + 
        progress.completedProjects.length + 
        progress.completedCertifications.length + 
        progress.sqlSolvedChallenges.length +
        (progress.completedDataAnalystResources?.length || 0)) / 
        (totalSubtopics + 13 + 5 + 4 + 17)) * 100
    )
  );

  return (
    <div className="flex h-screen bg-[#0F172A] text-slate-100 overflow-hidden font-sans">
      
      {/* Sidebar Navigation Panel */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        progressPercent={overallProgressPercent}
        streakCount={progress.streakCount}
      />

      {/* Main Study workspace panel container */}
      <main className="flex-1 overflow-y-auto bg-[#0A101F]">
        {activeTab === 'dashboard' && (
          <Dashboard 
            progress={progress} 
            setProgress={setProgress} 
            onNavigateToSql={() => setActiveTab('sql-playground')}
          />
        )}
        {activeTab === 'sql-playground' && (
          <SQLPlayground 
            progress={progress} 
            setProgress={setProgress} 
          />
        )}
        {activeTab === 'excel-formulas' && (
          <ExcelHelper />
        )}
        {activeTab === 'interview-prep' && (
          <InterviewPrep 
            progress={progress} 
            setProgress={setProgress} 
          />
        )}
        {activeTab === 'ba-projects' && (
          <ProjectsHub 
            progress={progress} 
            setProgress={setProgress} 
          />
        )}
        {activeTab === 'certifications' && (
          <CertificationsTab 
            progress={progress} 
            setProgress={setProgress} 
          />
        )}
        {activeTab === 'da-resources' && (
          <DataAnalystResources 
            progress={progress} 
            setProgress={setProgress} 
          />
        )}
        {activeTab === 'bookmarks-notes' && (
          <NotesSection 
            progress={progress} 
            setProgress={setProgress} 
          />
        )}
      </main>

    </div>
  );
}

