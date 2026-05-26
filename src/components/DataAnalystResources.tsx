import React from 'react';
import { 
  Compass, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap, 
  Search, 
  Check, 
  Layers, 
  Lightbulb, 
  Award,
  Clock,
  Compass as RoadmapIcon
} from 'lucide-react';
import { UserProgress } from '../types';

interface DataAnalystResourcesProps {
  progress: UserProgress;
  setProgress: (prevProgress: any) => void;
}

interface DAResource {
  id: string;
  category: string;
  title: string;
  provider: string;
  url: string;
  desc: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estTime: string;
  skillsCovered: string[];
}

const DATA_ANALYST_RESOURCES: DAResource[] = [
  // 1. Spreadsheets
  {
    id: 'da-res-excel-trump',
    category: 'Excel & Spreadsheets',
    title: 'TrumpExcel Free Online Course',
    provider: 'TrumpExcel',
    url: 'https://trumpexcel.com/learn-excel/',
    desc: 'An structured 26-module video series covering Excel formulas, data cleaning, arrays, charts, and macro automation.',
    difficulty: 'Beginner',
    estTime: '12 Hours',
    skillsCovered: ['Lookup Functions', 'IF Functions', 'Pivot Tables', 'Data Validation']
  },
  {
    id: 'da-res-excel-easy',
    category: 'Excel & Spreadsheets',
    title: 'Excel Easy Interactive Guides',
    provider: 'Excel Easy',
    url: 'https://www.excel-easy.com/',
    desc: 'Visual, crisp walkthroughs of Excel formatting, pivot charts, analysis toolpak, and simple examples for every feature.',
    difficulty: 'Beginner',
    estTime: '6 Hours',
    skillsCovered: ['Keyboard Shortcuts', 'Formulas', 'Chart Creation', 'What-If-Analysis']
  },
  {
    id: 'da-res-excel-chandoo',
    category: 'Excel & Spreadsheets',
    title: 'Chandoo Pivot Tables Masterclass',
    provider: 'Chandoo',
    url: 'https://chandoo.org/wp/excel-pivot-tables/',
    desc: 'Deep-dive into pivot table structures, slices, custom calculated fields, and multi-sourced dashboards.',
    difficulty: 'Intermediate',
    estTime: '4 Hours',
    skillsCovered: ['Slicers', 'Calculated Columns', 'Multi-source Pivots']
  },

  // 2. Mathematics & Statistics
  {
    id: 'da-res-stats-khan',
    category: 'Mathematics & Statistics',
    title: 'College Statistics and Probability',
    provider: 'Khan Academy',
    url: 'https://www.khanacademy.org/math/statistics-probability',
    desc: 'Accredited modular track on descriptive stats, dispersion, conditional probability, z-scores, t-distributions, and sampling.',
    difficulty: 'Beginner',
    estTime: '20 Hours',
    skillsCovered: ['Hypothesis Testing', 'Central Limit Theorem', 'Probability Theory']
  },
  {
    id: 'da-res-stats-quest',
    category: 'Mathematics & Statistics',
    title: 'StatQuest Analytics & ML Basics',
    provider: 'StatQuest with Josh Starmer',
    url: 'https://www.youtube.com/@statquest',
    desc: 'Famous visual explanations. Teaches p-values, linear regression, ANOVA, and data distributions step-by-step.',
    difficulty: 'Intermediate',
    estTime: '15 Hours',
    skillsCovered: ['Linear Regression', 'p-values', 'Statistical Power', 'R-Squared']
  },
  {
    id: 'da-res-stats-openintro',
    category: 'Mathematics & Statistics',
    title: 'OpenIntro Statistics Textbook',
    provider: 'OpenIntro (Free Edition)',
    url: 'https://www.openintro.org/book/os/',
    desc: 'Completely free open-source college textbook utilizing practical datasets and clean math formulas.',
    difficulty: 'Advanced',
    estTime: '30 Hours',
    skillsCovered: ['Confidence Intervals', 'ANOVA', ' Chi-Square Testing', 'Inferences']
  },

  // 3. Relational Databases & SQL
  {
    id: 'da-res-sql-selectstar',
    category: 'Relational Databases (SQL)',
    title: 'Select Star SQL (Interactive!)',
    provider: 'Select Star SQL',
    url: 'https://selectstarsql.com/',
    desc: 'An interactive book where you run query commands on real-world datasets directly in your browser. Perfect visual flow.',
    difficulty: 'Beginner',
    estTime: '5 Hours',
    skillsCovered: ['Select Statements', 'Inner/Left Joins', 'Group By', 'Aggregate Functions']
  },
  {
    id: 'da-res-sql-bolt',
    category: 'Relational Databases (SQL)',
    title: 'SQLBolt Guided Sandbox',
    provider: 'SQLBolt',
    url: 'https://sqlbolt.com/',
    desc: 'Short interactive sandbox lessons with immediate live evaluations covering database modifications and queries.',
    difficulty: 'Beginner',
    estTime: '4 Hours',
    skillsCovered: ['Subqueries', 'Insert/Delete', 'Table Creation', 'Joins']
  },
  {
    id: 'da-res-sql-mode',
    category: 'Relational Databases (SQL)',
    title: 'Mode Analytics Advanced SQL Tutorial',
    provider: 'Mode Analytics',
    url: 'https://mode.com/sql-tutorial/',
    desc: 'Excellent professional guides teaching Window Functions, subqueries, CTEs, self-joins, and database performance tips.',
    difficulty: 'Intermediate',
    estTime: '8 Hours',
    skillsCovered: ['Window Functions', 'CTEs', 'Subqueries', 'JSON Parsing']
  },

  // 4. BI & Data Visualization Tools
  {
    id: 'da-res-viz-tableau',
    category: 'Data viz & Business Intelligence',
    title: 'Tableau Public Quick-Start Kits',
    provider: 'Tableau Public',
    url: 'https://public.tableau.com/en-us/s/resources',
    desc: 'Official webinars, sample datasets, visual guides, and starter worksheets to publish beautiful online portfolios.',
    difficulty: 'Beginner',
    estTime: '10 Hours',
    skillsCovered: ['Calculated Fields', 'Dashboards Layout', 'Visual Encoded Charts']
  },
  {
    id: 'da-res-viz-powerbi',
    category: 'Data viz & Business Intelligence',
    title: 'Power BI Guided Curriculum',
    provider: 'Microsoft Learn',
    url: 'https://learn.microsoft.com/en-us/power-bi/guided-learning/',
    desc: 'Structured learning modules for DAX, data modeling, Power Query transformations, and dashboard deployments.',
    difficulty: 'Intermediate',
    estTime: '14 Hours',
    skillsCovered: ['DAX Formulas', 'Power Query M Language', 'Relationships Modeling']
  },
  {
    id: 'da-res-viz-looker',
    category: 'Data viz & Business Intelligence',
    title: 'Looker Studio Core Training',
    provider: 'Google Workspaces',
    url: 'https://support.google.com/looker-studio/answer/6290237',
    desc: 'Quick sheets to build dashboards connected live to Google Sheets, BigQuery, and Google Analytics without code.',
    difficulty: 'Beginner',
    estTime: '3 Hours',
    skillsCovered: ['Live Connections', 'Scorecard Metrics', 'Scheduled Emails']
  },

  // 5. Programming (Python/R)
  {
    id: 'da-res-prog-py4e',
    category: 'Programming (Python/R)',
    title: 'Python for Everybody (PY4E)',
    provider: 'Dr. Charles Severance',
    url: 'https://www.py4e.com/',
    desc: 'Free lectures, video tutorials, and autograders starting from raw basics up to handling standard JSON, XML, and SQL in Python.',
    difficulty: 'Beginner',
    estTime: '25 Hours',
    skillsCovered: ['Python loops', 'Web Scraping', 'API Interactions', 'Dictionaries']
  },
  {
    id: 'da-res-prog-kaggle',
    category: 'Programming (Python/R)',
    title: 'Kaggle Learn Pandas Course',
    provider: 'Kaggle',
    url: 'https://www.kaggle.com/learn/pandas',
    desc: 'Extremely fast, hands-on notebooks to master indexing, grouping, merging, and typing on massive CSV dataframes.',
    difficulty: 'Intermediate',
    estTime: '4 Hours',
    skillsCovered: ['Pandas Dataframes', 'Grouping & Sorting', 'Handling Missing Values']
  },
  {
    id: 'da-res-prog-seaborn',
    category: 'Programming (Python/R)',
    title: 'Matplotlib & Seaborn Tutorials',
    provider: 'Seaborn Official docs',
    url: 'https://seaborn.pydata.org/tutorial.html',
    desc: 'Practical workbook examples for distribution plots, pairplots, regression lines, heatmaps, and styling palettes.',
    difficulty: 'Intermediate',
    estTime: '5 Hours',
    skillsCovered: ['Data Visualizations', 'Heatmaps', 'Color Map palettes', 'Faceting']
  },

  // 6. Version Control & Data Prep
  {
    id: 'da-res-vc-git',
    category: 'Version Control & Data Prep',
    title: 'Git Immersion Interactive',
    provider: 'Git Immersion',
    url: 'https://gitimmersion.com/',
    desc: 'A guided tour through the fundamentals of Git, stepping you through commits, branches, merges, and rollbacks.',
    difficulty: 'Beginner',
    estTime: '4 Hours',
    skillsCovered: ['Git Commit', 'Git Log', 'Branching', 'Merge Conflicts']
  },
  {
    id: 'da-res-vc-cookbook',
    category: 'Version Control & Data Prep',
    title: 'Pandas Official Cookbook',
    provider: 'Pandas Org',
    url: 'https://pandas.pydata.org/pandas-docs/stable/user_guide/cookbook.html',
    desc: 'Handy recipes and code snippets to solve frequent real-world data preparation, cleaning, and time-series aggregation tasks.',
    difficulty: 'Advanced',
    estTime: '8 Hours',
    skillsCovered: ['Outliers Removal', 'Timestamp Parsing', 'Deduplication']
  }
];

const CATEGORIES = [
  'All Skills',
  'Excel & Spreadsheets',
  'Mathematics & Statistics',
  'Relational Databases (SQL)',
  'Data viz & Business Intelligence',
  'Programming (Python/R)',
  'Version Control & Data Prep'
];

export default function DataAnalystResources({ progress, setProgress }: DataAnalystResourcesProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All Skills');

  const completedList = progress.completedDataAnalystResources || [];

  const toggleResourceCompleted = (id: string) => {
    let updated = [...completedList];
    if (updated.includes(id)) {
      updated = updated.filter(currId => currId !== id);
    } else {
      updated.push(id);
    }
    setProgress((prev: any) => ({
      ...prev,
      completedDataAnalystResources: updated
    }));
  };

  const filteredResources = DATA_ANALYST_RESOURCES.filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          res.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.skillsCovered.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Skills' || res.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const completionPercent = DATA_ANALYST_RESOURCES.length > 0 
    ? Math.round((completedList.length / DATA_ANALYST_RESOURCES.length) * 100) 
    : 0;

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-slate-100 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-850 p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute inset-0 bg-cyan-500/5 mix-blend-overlay pointer-events-none" />
        <div className="relative z-10 space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="h-3 w-3 animate-pulse" /> roadmap.sh Reference Hub
          </div>
          <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white">
            Data Analyst Companion Track
          </h2>
          <p className="text-xs md:text-sm text-slate-350 leading-relaxed">
            Curated directly in alignment with the official <a href="https://roadmap.sh/data-analyst" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline inline-flex items-center gap-0.5 font-bold">roadmap.sh Data Analyst path <ExternalLink className="h-3 w-3 inline" /></a>. Build up your technical domain knowledge, check off courses, and reference these verified resources for Excel, Stats, SQL, and Python.
          </p>
        </div>

        {/* Integration Progress widget */}
        <div className="w-full md:w-auto shrink-0 bg-[#0F172A]/90 rounded-2xl p-5 border border-slate-800 flex items-center gap-4 relative md:min-w-[220px]">
          <div className="h-12 w-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/25 shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest block">Resource Progress</span>
            <span className="text-lg font-mono font-extrabold text-white">{completedList.length} / {DATA_ANALYST_RESOURCES.length}</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-cyan-500 h-full rounded-full transition-all duration-300" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Resource Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        
        {/* Search Input */}
        <div className="relative md:col-span-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search data analyst skills..."
            className="w-full pl-10 pr-4 py-2 bg-[#1E293B] border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30 transition shadow-inner font-sans"
          />
        </div>

        {/* Categories Scroller */}
        <div className="md:col-span-2 flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-sans font-bold uppercase tracking-wider whitespace-nowrap border transition duration-150 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-900 border-cyan-500 shadow-md'
                  : 'bg-[#1E293B] border-slate-800 text-slate-400 hover:text-slate-205 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Resources Result Listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.length > 0 ? (
          filteredResources.map((res) => {
            const isCompleted = completedList.includes(res.id);

            return (
              <div 
                key={res.id}
                className={`bg-[#1E293B] rounded-2xl border border-slate-800/85 p-5 shadow-md flex flex-col justify-between hover:border-slate-700 transition duration-150 relative ${
                  isCompleted ? 'border-emerald-500/25 bg-[#1E293B]/90' : ''
                }`}
              >
                {/* Content */}
                <div className="space-y-3.5">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[8px] font-mono font-bold bg-[#0F172A] border border-slate-800 text-cyan-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          {res.category}
                        </span>
                        <span className="text-[8px] font-mono font-extrabold bg-[#0F172A] text-slate-400 px-1.5 py-0.5 rounded">
                          {res.provider}
                        </span>
                      </div>
                      <h3 className="text-sm font-sans font-black text-white tracking-tight mt-2.5">
                        {res.title}
                      </h3>
                    </div>

                    {/* Progress Toggle */}
                    <button
                      onClick={() => toggleResourceCompleted(res.id)}
                      className={`h-7 w-7 rounded-lg border flex items-center justify-center transition cursor-pointer shrink-0 ${
                        isCompleted 
                          ? 'bg-emerald-500 border-emerald-500 text-slate-950 font-extrabold'
                          : 'bg-[#0F172A] border-slate-800 hover:border-emerald-500/30 hover:text-emerald-400 text-slate-500'
                      }`}
                      title={isCompleted ? 'Completed' : 'Mark Completed'}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-350 leading-relaxed">
                    {res.desc}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {res.skillsCovered.map((skill, index) => (
                      <span 
                        key={index} 
                        className="text-[9px] font-mono text-slate-400 bg-[#0F172A]/70 px-2 py-0.5 rounded border border-slate-800/60"
                      >
                        ⚡ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="pt-4 mt-4 border-t border-slate-800/60 flex justify-between items-center text-[10px] font-mono">
                  <div className="flex gap-3 text-slate-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-slate-550" /> {res.estTime}
                    </span>
                    <span>•</span>
                    <span className={`font-bold uppercase tracking-wider ${
                      res.difficulty === 'Beginner' ? 'text-emerald-400' :
                      res.difficulty === 'Intermediate' ? 'text-cyan-400' : 'text-amber-500'
                    }`}>
                      {res.difficulty}
                    </span>
                  </div>

                  <a
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 p-1 bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/15 text-cyan-400 hover:text-cyan-350 rounded-lg text-[10px] font-mono font-bold transition"
                  >
                    Launch Course <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

              </div>
            );
          })
        ) : (
          <div className="col-span-full py-12 text-center text-slate-550 space-y-2">
            <Compass className="h-10 w-10 text-slate-700 mx-auto animate-spin" />
            <p className="text-xs font-mono">No matching roadmap.sh resources found.</p>
          </div>
        )}
      </div>

      {/* Learning Wisdom Tips Footer */}
      <div className="bg-[#1E293B] rounded-2xl border border-slate-800 p-5 flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="h-10 w-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
          <Lightbulb className="h-5 w-5 fill-amber-500/10 animate-bounce" />
        </div>
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-white font-sans uppercase tracking-wider text-amber-400">Data Analyst Pro Tips:</h4>
          <p className="text-xs text-slate-350 leading-relaxed">
            The transition from a pure Business Analyst to a Data Analyst is heavily dependent on **SQL database execution and statistical analytical models**. Start with the Khan Academy College Stats tutorial and Select Star SQL to quickly build data engineering muscles.
          </p>
        </div>
      </div>

    </div>
  );
}
