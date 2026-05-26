/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  FileSpreadsheet, 
  HelpCircle, 
  Calculator, 
  Layers, 
  BarChart4, 
  Check, 
  RotateCcw,
  Sparkles,
  Info 
} from 'lucide-react';

export default function ExcelHelper() {
  const [activeTab, setActiveTab] = React.useState<'formulas' | 'pivots' | 'charts'>('formulas');
  
  // Formulas Simulator State
  const [selectedFormula, setSelectedFormula] = React.useState('XLOOKUP');
  const [paramValue, setParamValue] = React.useState('103');
  const [formulaResult, setFormulaResult] = React.useState<string | number>('');

  // Sourced row dataset
  const mockSheetRows = [
    { ID: '101', Name: 'James Miller', Department: 'Engineering', Salary: 105000, Region: 'North' },
    { ID: '102', Name: 'Ravi Verma', Department: 'Sales', Salary: 65000, Region: 'West' },
    { ID: '103', Name: 'Amrin Policharla', Department: 'Marketing', Salary: 72000, Region: 'South' },
    { ID: '104', Name: 'Karthik Nair', Department: 'Engineering', Salary: 115000, Region: 'North' },
    { ID: '105', Name: 'Sarah Jenkins', Department: 'Sales', Salary: 78000, Region: 'East' }
  ];

  // Interactive Pivot Simulator State
  const [pivotRowField, setPivotRowField] = React.useState<'Department' | 'Region'>('Department');
  const [pivotValueField, setPivotValueField] = React.useState<'Count' | 'SumSalary' | 'AvgSalary'>('AvgSalary');

  // Trigger formula calculations
  const calculateFormulaResult = () => {
    const inputVal = paramValue.trim();
    if (selectedFormula === 'XLOOKUP' || selectedFormula === 'VLOOKUP') {
      const match = mockSheetRows.find(r => r.ID === inputVal);
      if (!match) return setFormulaResult('#N/A (ID not found)');
      return setFormulaResult(`${match.Name} (${match.Department}, $${match.Salary.toLocaleString()})`);
    }

    if (selectedFormula === 'SUMIFS') {
      // Sum salaries where department matches param
      const matches = mockSheetRows.filter(r => r.Department.toLowerCase() === inputVal.toLowerCase());
      if (matches.length === 0) return setFormulaResult(0);
      const sum = matches.reduce((acc, r) => acc + r.Salary, 0);
      return setFormulaResult(`$${sum.toLocaleString()}`);
    }

    if (selectedFormula === 'IF') {
      // IF salary > param, evaluate "Above Benchmark" else "Standard"
      const threshold = parseFloat(inputVal) || 80000;
      const count = mockSheetRows.filter(r => r.Salary > threshold).length;
      return setFormulaResult(`${count} employees earn more than $${threshold.toLocaleString()}`);
    }

    if (selectedFormula === 'LEN') {
      return setFormulaResult(inputVal.length);
    }

    return setFormulaResult('');
  };

  React.useEffect(() => {
    calculateFormulaResult();
  }, [selectedFormula, paramValue]);

  // Generate simulated pivot output
  const getPivotResults = () => {
    const summary: Record<string, { count: number; sum: number }> = {};
    mockSheetRows.forEach(row => {
      const gKey = row[pivotRowField];
      if (!summary[gKey]) {
        summary[gKey] = { count: 0, sum: 0 };
      }
      summary[gKey].count += 1;
      summary[gKey].sum += row.Salary;
    });

    return Object.entries(summary).map(([key, val]) => {
      let finalVal: string | number = '';
      if (pivotValueField === 'Count') finalVal = val.count;
      else if (pivotValueField === 'SumSalary') finalVal = `$${val.sum.toLocaleString()}`;
      else finalVal = `$${Math.round(val.sum / val.count).toLocaleString()}`;

      return { key, val: finalVal };
    });
  };

  const currentPivotData = getPivotResults();

  // Excel checklists in data models
  const formulaExplanationList = [
    { name: 'XLOOKUP / VLOOKUP', cat: 'Lookup & Reference', syntax: '=XLOOKUP(lookup_value, lookup_array, return_array)', use: 'Fetch department values using employee serial codes instantly.' },
    { name: 'COUNTIFS', cat: 'Statistical', syntax: '=COUNTIFS(criteria_range1, criteria1, ...)', use: 'Identify how many entries are in "High Risk" categories.' },
    { name: 'SUMIFS', cat: 'Statistical', syntax: '=SUMIFS(sum_range, criteria_range1, criteria1, ...)', use: 'Calculate cumulative revenue totals across regional limits.' },
    { name: 'IF / IFERROR', cat: 'Logical', syntax: '=IFERROR(value, value_if_error)', use: 'Gracefully fall back with clean text options when lookups fail.' },
    { name: 'INDEX & MATCH', cat: 'Lookup & Reference', syntax: '=INDEX(array, MATCH(val, range, 0))', use: 'Performs premium double-sided matrices lookup.' },
    { name: 'TRIM & LEFT/MID/RIGHT', cat: 'Text Manipulation', syntax: '=TRIM(text)', use: 'Deduplicate excessive spaces in messy incoming data pipelines.' }
  ];

  const pivotChecklist = {
    basics: [
      'Structured sources (unique column headers, zero blank rows)',
      'Dragging rows, headers, and values inside field lists',
      'Configuring Number Formats inside Pivot values properties',
      'Utilizing Slicers linked to multiple pivot connections reports'
    ],
    advanced: [
      'Inserting Custom Calculated FieldsStraight inside active reports',
      'Formatting percentages based on Row or Column grand totals',
      'Using conditional data bars with transparent numeric text overlays'
    ]
  };

  const chartChecklist = [
    { title: 'Scatter Plots & Trendlines', use: 'Perform quick correlation and prediction modeling metrics.' },
    { title: 'Pareto & Histograms', use: 'Distribute issues using frequency limits (80-20 principle).' },
    { title: 'Line Curves & Trend projections', use: 'Highlight multi-year sales margins trajectories.' },
    { title: 'Waterfall & Funnels', use: 'Measure step-by-step conversion drops or income changes.' }
  ];

  return (
    <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-slate-100">
      
      {/* Title block */}
      <div className="space-y-1">
        <h2 className="text-2xl font-sans font-black tracking-tight text-white flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6 text-cyan-400" /> Excel Sandbox & Viz Lab
        </h2>
        <p className="text-xs text-slate-400">
          Master the essential formulas, pivot structures, and custom data charts utilized by business leaders in high-stake presentations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-1">
        <button
          onClick={() => setActiveTab('formulas')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'formulas' 
              ? 'bg-[#1E293B] text-cyan-400 border-[#1E293B] border-b-2 font-black shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          20 Core Formulas
        </button>
        <button
          onClick={() => setActiveTab('pivots')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'pivots' 
              ? 'bg-[#1E293B] text-cyan-400 border-[#1E293B] border-b-2 font-black shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          PivotTable Playground
        </button>
        <button
          onClick={() => setActiveTab('charts')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'charts' 
              ? 'bg-[#1E293B] text-cyan-400 border-[#1E293B] border-b-2 font-black shadow-sm' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Data Visualization Rules
        </button>
      </div>

      {activeTab === 'formulas' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Formula Simulator Workspace */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-sm space-y-4 animate-fade-in">
              <h3 className="text-sm font-bold text-slate-200 tracking-tight flex items-center gap-2">
                <Calculator className="h-4.5 w-4.5 text-cyan-400" /> Interactive Formula Builder
              </h3>
              
              <div className="border border-slate-700 rounded-xl overflow-hidden">
                <div className="bg-[#0F172A] px-4 py-2 border-b border-slate-800 font-mono text-[10px] text-slate-450">
                  Target Sheet Workspace Model
                </div>
                <table className="w-full text-left font-mono text-[11px] border-collapse bg-[#1E293B]">
                  <thead>
                    <tr className="bg-[#0F172A] text-slate-400 border-b border-slate-800">
                      <th className="px-4 py-2 font-bold w-12">Col A (ID)</th>
                      <th className="px-4 py-2 font-bold">Col B (Name)</th>
                      <th className="px-4 py-2 font-bold">Col C (Dept)</th>
                      <th className="px-4 py-2 font-bold text-right">Col D (Salary)</th>
                      <th className="px-4 py-2 font-bold text-right">Col E (Region)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    {mockSheetRows.map((row) => (
                      <tr key={row.ID} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-2 bg-slate-800/40 font-bold text-slate-200">{row.ID}</td>
                        <td className="px-4 py-2">{row.Name}</td>
                        <td className="px-4 py-2">{row.Department}</td>
                        <td className="px-4 py-2 text-right">${row.Salary.toLocaleString()}</td>
                        <td className="px-4 py-2 text-right">{row.Region}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Input Controller block */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#0F172A] p-4 rounded-xl border border-slate-800">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">1. Choose Excel Formula:</label>
                  <select 
                    value={selectedFormula}
                    onChange={(e) => {
                      setSelectedFormula(e.target.value);
                      if (e.target.value === 'SUMIFS') setParamValue('Engineering');
                      else if (e.target.value === 'IF') setParamValue('80000');
                      else if (e.target.value === 'LEN') setParamValue('Business Analyst');
                      else setParamValue('103');
                    }}
                    className="w-full px-3 py-2 bg-[#1E293B] border border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500 text-white"
                  >
                    <option value="XLOOKUP">XLOOKUP (Lookup Code)</option>
                    <option value="VLOOKUP">VLOOKUP (Exact ID Match)</option>
                    <option value="SUMIFS">SUMIFS (Sum salaries per Department)</option>
                    <option value="IF">IF Function (Count Salaries above benchmark)</option>
                    <option value="LEN">LEN (Character lengths count)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">2. Parameter Input:</label>
                  <input
                    type="text"
                    value={paramValue}
                    onChange={(e) => setParamValue(e.target.value)}
                    placeholder="E.g., 103, Engineering, 80000"
                    className="w-full px-3 py-2 bg-[#1E293B] border border-slate-700 text-white rounded-lg text-xs outline-none focus:ring-1 focus:ring-cyan-500 font-mono"
                  />
                </div>
              </div>

              {/* Output Formula code simulation screen */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-white space-y-2">
                <div className="flex justify-between text-[10px] text-cyan-400 font-semibold">
                  <span>Excel Equation Bar</span>
                  <span>Calculated Result</span>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <p className="text-emerald-400 font-bold">
                    {selectedFormula === 'XLOOKUP' && `=XLOOKUP("${paramValue}", A2:A6, B2:B6)`}
                    {selectedFormula === 'VLOOKUP' && `=VLOOKUP("${paramValue}", A2:E6, 2, FALSE)`}
                    {selectedFormula === 'SUMIFS'   && `=SUMIFS(D2:D6, C2:C6, "${paramValue}")`}
                    {selectedFormula === 'IF'       && `=COUNTIF(D2:D6, ">${paramValue}")`}
                    {selectedFormula === 'LEN'      && `=LEN("${paramValue}")`}
                  </p>
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded font-bold">
                    {typeof formulaResult === 'number' ? formulaResult : String(formulaResult)}
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Core Formulas syllabus card listing */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-widest leading-none">
                Essential 20 Formula Syllabus
              </h3>
              
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {formulaExplanationList.map((form) => (
                  <div key={form.name} className="p-3 bg-[#0F172A] border border-slate-800 rounded-xl space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-cyan-400">{form.name}</span>
                      <span className="text-[9px] font-mono font-bold bg-cyan-500/10 text-cyan-405 px-1.5 py-0.5 rounded">
                        {form.cat}
                      </span>
                    </div>
                    <code className="text-[10px] text-amber-400 block bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/15">
                      {form.syntax}
                    </code>
                    <p className="text-[11px] text-slate-350 leading-normal">{form.use}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'pivots' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          
          {/* Interactive Pivot Simulator */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-200 tracking-tight flex items-center gap-2">
                <Layers className="h-4.5 w-4.5 text-cyan-400 animate-pulse" /> Interactive Pivot Board
              </h3>
              <p className="text-xs text-slate-400 leading-normal">
                Choose a dimensional field and aggregate values metric to dynamically compile structured tables without formulas.
              </p>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-4 bg-[#0F172A] p-4 rounded-xl border border-slate-800 text-xs text-slate-200">
                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block">Rows Group Filter:</span>
                  <div className="flex gap-2">
                    {['Department', 'Region'].map((col) => (
                      <button
                        key={col}
                        onClick={() => setPivotRowField(col as any)}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer border ${
                          pivotRowField === col 
                            ? 'bg-cyan-500 text-slate-900 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.3)]' 
                            : 'bg-[#1E293B] text-slate-300 border-slate-700 hover:text-white'
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block">Values Metric (∑):</span>
                  <select
                    value={pivotValueField}
                    onChange={(e) => setPivotValueField(e.target.value as any)}
                    className="w-full px-2 py-1.5 bg-[#1E293B] border border-slate-700 rounded-lg text-xs outline-none text-white focus:ring-1 focus:ring-cyan-500"
                  >
                    <option value="Count">Row Count (Records count)</option>
                    <option value="SumSalary">Sum(Salary) Total</option>
                    <option value="AvgSalary">Average(Salary)</option>
                  </select>
                </div>
              </div>

              {/* Compiled Pivot Output */}
              <div className="border border-slate-700 rounded-xl overflow-hidden">
                <div className="bg-[#0F172A] px-4 py-2 border-b border-slate-800 text-[10px] text-slate-300 font-mono font-bold flex justify-between">
                  <span>Pivot Dimension ({pivotRowField})</span>
                  <span>Metric Output ({pivotValueField})</span>
                </div>
                <table className="w-full text-left font-mono text-[11px] border-collapse bg-[#1E293B] text-slate-300">
                  <tbody className="divide-y divide-slate-800">
                    {currentPivotData.map((item, index) => (
                      <tr key={index} className="hover:bg-slate-800/40 transition">
                        <td className="px-4 py-2.5 font-bold text-slate-200">{item.key}</td>
                        <td className="px-4 py-2.5 text-right font-bold text-cyan-400">{item.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/20 flex gap-2 text-xs text-cyan-400 items-start">
                <Info className="h-4 w-4 shrink-0 text-cyan-450 mt-0.5" />
                <p className="leading-relaxed">
                  Notice how modifying the Rows dimension immediately pivots the salary aggregates automatically, similar to Excel Pivot designs.
                </p>
              </div>

            </div>
          </div>

          {/* Pivot Table checklists */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-white tracking-tight">Pivot Tables Checklist</h3>
              
              <div className="space-y-4 text-xs font-sans">
                <div>
                  <h4 className="font-extrabold text-cyan-400 uppercase text-[10px] tracking-widest mb-2">
                    Pivot Tables 101 Basics
                  </h4>
                  <ul className="space-y-2">
                    {pivotChecklist.basics.map((itm, idx) => (
                      <li key={idx} className="flex gap-2 items-center text-slate-300 bg-[#0F172A] p-2.5 rounded-lg border border-slate-800">
                        <div className="h-4 w-4 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-[10px]">
                          ✓
                        </div>
                        <span>{itm}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-extrabold text-amber-400 uppercase text-[10px] tracking-widest mb-2">
                    Formatting & Calculated Metrics
                  </h4>
                  <ul className="space-y-2">
                    {pivotChecklist.advanced.map((itm, idx) => (
                      <li key={idx} className="flex gap-2 items-center text-slate-300 bg-[#0F172A] p-2.5 rounded-lg border border-slate-800">
                        <div className="h-4 w-4 rounded bg-amber-500/15 text-amber-500 border border-amber-500/20 flex items-center justify-center text-[10px]">
                          ⭐
                        </div>
                        <span>{itm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {activeTab === 'charts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          
          {/* Chart categories card */}
          <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-200 tracking-tight flex items-center gap-2">
              <BarChart4 className="h-4.5 w-4.5 text-cyan-400" /> Essential Visual Chart Suite
            </h3>
            <p className="text-xs text-slate-400 leading-normal">
              A Business Analyst chooses charts programmatically based on the question being asked. Never default to simple pie charts.
            </p>

            <div className="grid grid-cols-1 gap-2">
              {chartChecklist.map((ch, idx) => (
                <div key={idx} className="p-3.5 bg-[#0F172A] rounded-xl border border-slate-800 text-xs text-slate-350">
                  <p className="font-bold text-cyan-400">{ch.title}</p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">{ch.use}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Hygiene / Customization guide */}
          <div className="bg-[#1E293B] rounded-2xl border border-slate-700 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-cyan-400" /> Executive Customization Rules
            </h3>
            
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                <p className="font-bold text-emerald-400 text-xs">Rule 1: Erase the Grid Noise</p>
                <p className="text-[11px] text-emerald-500">
                  Always mute back gridlines by setting their opacity to 10% or erasing them completely. This preserves focus on the data curve series directly.
                </p>
              </div>

              <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl space-y-1">
                <p className="font-bold text-cyan-400 text-xs">Rule 2: Humanize Titles</p>
                <p className="text-[11px] text-cyan-300">
                  Never write titles of raw variables (e.g., "sales monthly variance"). Use literal summaries of the metric outcomes directly (e.g., "Monthly sales grew 15% due to product promotions").
                </p>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl space-y-1">
                <p className="font-bold text-amber-400 text-xs">Rule 3: Secondary Axis Precautions</p>
                <p className="text-[11px] text-amber-500">
                  Only implement secondary axes if representing correlating dimensions (like units and gross revenue) and make sure to explicitly color code text corresponding to separate columns.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
