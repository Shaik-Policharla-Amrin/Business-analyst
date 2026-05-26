/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Database, 
  Play, 
  CheckCircle, 
  HelpCircle, 
  Terminal, 
  RefreshCw, 
  Info,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { SQL_CHALLENGES } from '../data';
import { runSimulatedSqlQuery } from '../utils/sqlSimulator';
import { UserProgress } from '../types';

interface SQLPlaygroundProps {
  progress: UserProgress;
  setProgress: (prevProgress: any) => void;
}

export default function SQLPlayground({ progress, setProgress }: SQLPlaygroundProps) {
  const [activeChallengeIdx, setActiveChallengeIdx] = React.useState(0);
  const [sqlQuery, setSqlQuery] = React.useState(
    'SELECT * FROM titanic_survivors WHERE survived = 1 LIMIT 5'
  );
  
  // Results structures
  const [queryColumns, setQueryColumns] = React.useState<string[]>([]);
  const [queryRows, setQueryRows] = React.useState<any[]>([]);
  const [sqlError, setSqlError] = React.useState<string | null>(null);
  const [hasExecuted, setHasExecuted] = React.useState(false);
  
  // Checking success
  const [isChallengeSuccess, setIsChallengeSuccess] = React.useState(false);
  const [expandedTable, setExpandedTable] = React.useState<string | null>('titanic_survivors');

  const challenge = SQL_CHALLENGES[activeChallengeIdx];

  const loadStarterCode = (tableName: string) => {
    setSqlQuery(`SELECT * FROM ${tableName} LIMIT 5`);
    setSqlError(null);
    setHasExecuted(false);
    setIsChallengeSuccess(false);
  };

  const loadChallengeStarter = () => {
    if (activeChallengeIdx === 0) {
      setSqlQuery('SELECT name, age, fare FROM titanic_survivors WHERE survived = 1 AND age > 30 ORDER BY fare DESC');
    } else if (activeChallengeIdx === 1) {
      setSqlQuery("SELECT name, city, price, room_type FROM airbnb_listings WHERE price > 150 AND room_type = 'Entire home/apt' AND city = 'New York'");
    } else if (activeChallengeIdx === 2) {
      setSqlQuery('SELECT region, COUNT(*) AS total_sales, SUM(units_sold) AS total_units, SUM(revenue_thousands) AS total_revenue FROM iphone_sales GROUP BY region');
    } else {
      setSqlQuery('SELECT name, department, salary FROM hr_employees e1 WHERE salary > (SELECT AVG(salary) FROM hr_employees e2 WHERE e2.department = e1.department)');
    }
    setSqlError(null);
    setHasExecuted(false);
    setIsChallengeSuccess(false);
  };

  const executeQuery = () => {
    setSqlError(null);
    setIsChallengeSuccess(false);
    setHasExecuted(true);

    const result = runSimulatedSqlQuery(sqlQuery);
    if (result.error) {
      setSqlError(result.error);
      setQueryColumns([]);
      setQueryRows([]);
      return;
    }

    setQueryColumns(result.columns);
    setQueryRows(result.rows);

    // Test with correct challenge criteria
    const normalizedQuery = sqlQuery.replace(/\s+/g, ' ').trim().toLowerCase();
    let isQueryValid = false;

    // Check query using challenge pattern
    if (challenge.correctQueryPattern.test(sqlQuery)) {
      isQueryValid = true;
    } else if (normalizedQuery.includes(challenge.sampleCorrectQuery.replace(/\s+/g, ' ').trim().toLowerCase())) {
      isQueryValid = true;
    } else if (result.rows.length === challenge.testCases[0].expectedOutputRowsCount) {
      // Approximate validation based on row counts matches
      isQueryValid = true;
    }

    if (isQueryValid && !result.error && result.rows.length > 0) {
      setIsChallengeSuccess(true);
      
      // Mark as solved inside global stats state
      if (!progress.sqlSolvedChallenges.includes(challenge.id)) {
        const todayStr = new Date().toISOString().split('T')[0];
        const dailyGoal = { ...progress.dailyGoalProgress };
        
        if (dailyGoal.date === todayStr) {
          dailyGoal.sqlCompleted = Math.min(1, dailyGoal.sqlCompleted + 1);
        } else {
          dailyGoal.date = todayStr;
          dailyGoal.sqlCompleted = 1;
        }

        setProgress((prev: any) => ({
          ...prev,
          sqlSolvedChallenges: [...prev.sqlSolvedChallenges, challenge.id],
          dailyGoalProgress: dailyGoal
        }));
      }
    }
  };

  const handleChallengeChange = (idx: number) => {
    setActiveChallengeIdx(idx);
    setIsChallengeSuccess(false);
    setHasExecuted(false);
    setSqlError(null);
    
    // Auto-set starter code matching correct table
    const targetTable = idx === 0 ? 'titanic_survivors' : idx === 1 ? 'airbnb_listings' : idx === 2 ? 'iphone_sales' : 'hr_employees';
    setSqlQuery(`SELECT * FROM ${targetTable} LIMIT 5`);
  };

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-slate-100">
      
      {/* Page Header */}
      <div className="space-y-1 animate-fade-in">
        <h2 className="text-2xl font-sans font-black tracking-tight text-white flex items-center gap-2">
          <Terminal className="h-6 w-6 text-cyan-400 animate-pulse" /> SQL Interactive Sandbox
        </h2>
        <p className="text-xs text-slate-400">
          Query mock schemas directly inside your browser. Solve structured database problems matching corporate BA interviews.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Hand: Schema definitions and Challenges Picker */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Active Tables explorer */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <Database className="h-4 w-4 text-cyan-400" /> Database Relational Schema
            </h3>
            
            <div className="space-y-2">
              {['titanic_survivors', 'airbnb_listings', 'iphone_sales', 'hr_employees'].map((table) => {
                const isOpen = expandedTable === table;
                return (
                  <div key={table} className="border border-slate-700 rounded-lg overflow-hidden text-xs">
                    <button 
                      onClick={() => setExpandedTable(isOpen ? null : table)}
                      className="w-full flex items-center justify-between px-3 py-2 bg-slate-800/40 hover:bg-slate-800 text-left font-mono font-bold text-slate-300 cursor-pointer"
                    >
                      <span>{table}</span>
                      <span className="text-[10px] text-slate-500">
                        {isOpen ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                      </span>
                    </button>

                    {isOpen && (
                      <div className="p-3 bg-[#0F172A] space-y-2 font-mono text-[11px] text-slate-400 max-h-[160px] overflow-y-auto border-t border-slate-700">
                        <div className="border-b border-dashed border-slate-800 pb-2">
                          <p className="font-extrabold text-[10px] uppercase text-cyan-400 mb-1">Columns:</p>
                          {table === 'titanic_survivors' && 'passenger_id, name, survived (0/1), age, pclass (1-3), fare, gender'}
                          {table === 'airbnb_listings' && 'id, name, city, price, minimum_nights, room_type, availability_365'}
                          {table === 'iphone_sales' && 'sale_id, model, region, units_sold, revenue_thousands, sale_date'}
                          {table === 'hr_employees' && 'employee_id, name, department, performance_score (1-5), attrition, salary'}
                        </div>
                        <div className="flex justify-between items-center">
                          <button 
                            onClick={() => loadStarterCode(table)}
                            className="text-cyan-400 hover:underline text-[9px] font-bold"
                          >
                            Generate SELECT Starter
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Practice Challenges picker list */}
          <div className="bg-[#1E293B] rounded-xl border border-slate-700 p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest flex items-center gap-2">
              <Award className="h-4 w-4 text-emerald-450" /> Interview Coding Challenges
            </h3>
            
            <div className="space-y-2">
              {SQL_CHALLENGES.map((ch, idx) => {
                const isSolvedVal = progress.sqlSolvedChallenges.includes(ch.id);
                const isActive = activeChallengeIdx === idx;

                return (
                  <button
                    key={ch.id}
                    onClick={() => handleChallengeChange(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left transition duration-150 flex items-start gap-3 cursor-pointer ${
                      isActive 
                        ? 'border-cyan-500 bg-cyan-500/10' 
                        : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className={`h-5 w-5 rounded-md flex items-center justify-center border text-[10px] shrink-0 mt-0.5 ${
                      isSolvedVal 
                        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                        : 'bg-slate-850 text-slate-500 border-slate-800'
                    }`}>
                      {isSolvedVal ? '✓' : idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-200">{ch.title}</h4>
                      <p className="text-[10px] text-zinc-500 font-mono mt-0.5 uppercase tracking-wider">{ch.difficulty}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Hand: Query Input box and Executions summary */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Challenge Specification card */}
          <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span className="text-[10px] font-bold font-mono bg-cyan-500/15 text-cyan-400 border border-cyan-500/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Challenge #{activeChallengeIdx + 1}
                </span>
                <h3 className="text-base font-bold text-white mt-2">{challenge.title}</h3>
              </div>
              
              {progress.sqlSolvedChallenges.includes(challenge.id) && (
                <div className="flex items-center gap-1 text-emerald-450 bg-emerald-500/15 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-500/20">
                  <CheckCircle className="h-3.5 w-3.5" /> Solved
                </div>
              )}
            </div>

            <p className="text-xs text-slate-350 leading-relaxed font-sans bg-[#0F172A] p-3 rounded-lg border border-slate-800">
              {challenge.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-slate-400">
              <div className="space-y-1">
                <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider">Schema Focus:</p>
                <p className="text-[11px] bg-[#0F172A] px-2 py-1.5 rounded text-amber-400 border border-slate-800">{challenge.schemaDesc}</p>
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-400 uppercase text-[9px] tracking-wider font-sans">Elicited Columns Required:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {challenge.targetSchema.map((col, index) => (
                    <span key={index} className="bg-slate-800 text-slate-300 border border-slate-700/50 px-2 py-0.5 rounded text-[10px]">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hint & Starter toggler */}
            <div className="flex items-center gap-3 pt-1 text-xs">
              <button
                onClick={loadChallengeStarter}
                className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-550/10 font-bold bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-[11px] cursor-pointer"
              >
                Autoload Answer Key / Starter Query 🔑
              </button>
              <span className="text-slate-700">|</span>
              <div className="text-slate-450 text-[11px] italic gap-1.5 flex items-center">
                <Info className="h-3.5 w-3.5 text-slate-500 inline" /> Hint: {challenge.hints[0]}
              </div>
            </div>
          </div>

          {/* SQL Editor card */}
          <div className="bg-[#1E293B] rounded-2xl p-5 border border-slate-700 shadow-lg space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-455 border-b border-slate-700 pb-3">
              <span className="font-mono text-cyan-400 font-semibold">SQL Terminal Workspace</span>
              <button 
                onClick={() => setSqlQuery(`SELECT * FROM ${activeChallengeIdx === 0 ? 'titanic_survivors' : activeChallengeIdx === 1 ? 'airbnb_listings' : activeChallengeIdx === 2 ? 'iphone_sales' : 'hr_employees'} LIMIT 3`)}
                className="hover:text-white flex items-center gap-1 font-semibold"
                title="Reset editor code"
              >
                <RefreshCw className="h-3 w-3" /> Reset
              </button>
            </div>

            <textarea
              value={sqlQuery}
              onChange={(e) => setSqlQuery(e.target.value)}
              className="w-full h-36 font-mono text-sm bg-slate-950 text-emerald-400 p-4 border border-slate-800 rounded-xl focus:border-cyan-500 outline-none resize-none leading-relaxed"
              spellCheck="false"
            />

            <div className="flex justify-between items-center bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/40">
              <span className="text-[11px] text-slate-500 italic font-mono">
                Supports SELECT, WHERE filters, GROUP BY aggregates, ORDER BY and LIMIT.
              </span>
              <button
                onClick={executeQuery}
                className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 rounded-xl font-bold text-xs transition duration-150 flex items-center gap-2 cursor-pointer border border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]"
              >
                <Play className="h-3.5 w-3.5 fill-slate-900 text-slate-900" /> Execute Code
              </button>
            </div>
          </div>

          {/* Results outputs */}
          {hasExecuted && (
            <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-sm space-y-4 animate-fade-in">
              
              {/* Challenge Success Banner */}
              {isChallengeSuccess ? (
                <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 flex items-center gap-3.5 mb-2">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                    🏆
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-emerald-450">Challenge Solved Successfully!</h4>
                    <p className="text-xs text-emerald-500 mt-0.5">
                      Your query successfully computed the required relational outcomes. This challenge is registered as solved.
                    </p>
                  </div>
                </div>
              ) : (
                !sqlError && (
                  <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4 flex items-center gap-3 mb-2 text-xs text-amber-400">
                    <Info className="h-4 w-4 shrink-0 font-sans" />
                    <p>
                      Query compiled successfully, but standard variables didn't fully resolve the challenge. Check columns or filter conditions to solve!
                    </p>
                  </div>
                )
              )}

              {/* Compilation standard error */}
              {sqlError ? (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 font-mono text-xs text-red-400 space-y-1">
                  <p className="font-extrabold uppercase">Compilation Error:</p>
                  <p>{sqlError}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-sans">Compiler Outputs Dataset</h4>
                    <span className="text-[10px] text-cyan-400 font-mono bg-[#0F172A] border border-slate-800 px-2 py-0.5 rounded">
                      {queryRows.length} rows returned
                    </span>
                  </div>

                  <div className="border border-slate-700 rounded-xl overflow-hidden max-h-[250px] overflow-y-auto">
                    <table className="w-full text-left font-mono text-[11px] border-collapse bg-[#1E293B]">
                      <thead className="bg-[#0F172A] text-slate-300 sticky top-0 border-b border-slate-800 text-[10px] uppercase font-bold">
                        <tr>
                          {queryColumns.map((col) => (
                            <th key={col} className="px-4 py-2.5">
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800 text-slate-300">
                        {queryRows.length > 0 ? (
                          queryRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-800/40 transition">
                              {queryColumns.map((col) => (
                                <td key={col} className="px-4 py-2.5 max-w-[200px] truncate">
                                  {row[col] !== null && row[col] !== undefined ? String(row[col]) : 'NULL'}
                                </td>
                              ))}
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={queryColumns.length || 1} className="px-4 py-8 text-center text-slate-500">
                              Query returned 0 rows.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
