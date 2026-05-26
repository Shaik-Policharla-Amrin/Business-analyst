/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface QueryResult {
  columns: string[];
  rows: Record<string, string | number | null>[];
  error?: string;
}

// Global data maps based on the datasets inside data.ts
import { SQL_CHALLENGES } from '../data';

const tablesPool: Record<string, Record<string, string | number>[]> = {
  titanic_survivors: SQL_CHALLENGES[0].tableData,
  airbnb_listings: SQL_CHALLENGES[1].tableData,
  iphone_sales: SQL_CHALLENGES[2].tableData,
  hr_employees: SQL_CHALLENGES[3].tableData
};

export function runSimulatedSqlQuery(query: string): QueryResult {
  const normQuery = query.replace(/\s+/g, ' ').trim();
  if (!normQuery) {
    return { columns: [], rows: [], error: 'Please enter a SQL query.' };
  }

  // Basic validation check
  if (!normQuery.toUpperCase().startsWith('SELECT')) {
    return { columns: [], rows: [], error: 'Simulated engine currently only supports SELECT statements.' };
  }

  // Extract TABLE NAME
  const fromMatch = normQuery.match(/FROM\s+([a-zA-Z_0-9]+)/i);
  if (!fromMatch) {
    return { columns: [], rows: [], error: 'Syntax Error: Missing FROM clause.' };
  }

  const tableName = fromMatch[1].toLowerCase();
  const sourceRows = tablesPool[tableName];
  if (!sourceRows) {
    return {
      columns: [],
      rows: [],
      error: `Table "${tableName}" not found. Available tables: ${Object.keys(tablesPool).join(', ')}`
    };
  }

  try {
    // 1. EXTRACT COLUMNS TO SELECT
    const selectMatch = normQuery.match(/SELECT\s+(.*?)\s+FROM/i);
    if (!selectMatch) {
      return { columns: [], rows: [], error: 'Syntax Error: Query must start with SELECT <columns> FROM' };
    }
    const columnsStr = selectMatch[1].trim();

    // 2. EXTRACT WHERE CLAUSE
    let filteredRows = [...sourceRows];
    const whereMatch = normQuery.match(/WHERE\s+(.*?)(?:GROUP\s+BY|ORDER\s+BY|LIMIT|$)/i);
    if (whereMatch) {
      const whereCondition = whereMatch[1].trim();
      filteredRows = applyWhereFilter(filteredRows, whereCondition);
    }

    // 3. EXTRACT GROUP BY
    const groupByMatch = normQuery.match(/GROUP\s+BY\s+([a-zA-Z_0-9]+)/i);
    let finalRows: Record<string, string | number | null>[] = [];
    let columnsList: string[] = [];

    if (groupByMatch) {
      const groupCol = groupByMatch[1].trim();
      finalRows = applyGroupBy(filteredRows, groupCol, columnsStr);
      columnsList = Object.keys(finalRows[0] || {});
    } else {
      // Regular Select (or simple overall aggregation without group by)
      const isOverallAggregation = /\b(SUM|AVG|COUNT|MAX|MIN)\b/i.test(columnsStr);
      if (isOverallAggregation) {
        finalRows = [calculateOverallAggregation(filteredRows, columnsStr)];
        columnsList = Object.keys(finalRows[0] || {});
      } else {
        // Simple projection
        if (columnsStr === '*') {
          columnsList = Object.keys(sourceRows[0] || {});
          finalRows = filteredRows;
        } else {
          columnsList = columnsStr.split(',').map(s => s.trim().split(/\s+as\s+/i)[0].trim().split(/\s+/)[0]);
          finalRows = filteredRows.map(row => {
            const projected: Record<string, string | number | null> = {};
            columnsList.forEach(col => {
              // Find matching prop (ignore case)
              const matchedKey = Object.keys(row).find(k => k.toLowerCase() === col.toLowerCase());
              projected[col] = matchedKey ? row[matchedKey] : null;
            });
            return projected;
          });
        }
      }
    }

    // 4. APPLY ORDER BY
    const orderByMatch = normQuery.match(/ORDER\s+BY\s+([a-zA-Z_0-9]+)(?:\s+(ASC|DESC))?/i);
    if (orderByMatch && finalRows.length > 0) {
      const orderColName = orderByMatch[1].trim();
      const orderDir = (orderByMatch[2] || 'ASC').toUpperCase();

      finalRows.sort((a, b) => {
        // Find property name ignoring case
        const keyA = Object.keys(a).find(k => k.toLowerCase() === orderColName.toLowerCase()) || orderColName;
        const keyB = Object.keys(b).find(k => k.toLowerCase() === orderColName.toLowerCase()) || orderColName;

        const valA = a[keyA];
        const valB = b[keyB];

        if (valA === null || valA === undefined) return 1;
        if (valB === null || valB === undefined) return -1;

        if (typeof valA === 'number' && typeof valB === 'number') {
          return orderDir === 'DESC' ? valB - valA : valA - valB;
        }
        return orderDir === 'DESC'
          ? String(valB).localeCompare(String(valA))
          : String(valA).localeCompare(String(valB));
      });
    }

    // 5. APPLY LIMIT
    const limitMatch = normQuery.match(/LIMIT\s+(\d+)/i);
    if (limitMatch) {
      const limitVal = parseInt(limitMatch[1], 10);
      finalRows = finalRows.slice(0, limitVal);
    }

    return {
      columns: columnsList.filter(c => c && !c.includes('(')), // filter out raw aggregations that may fail key checking
      rows: finalRows
    };
  } catch (err: any) {
    return { columns: [], rows: [], error: `Query execution error: ${err.message}` };
  }
}

// Basic Where Clause Parser
function applyWhereFilter(rows: Record<string, string | number>[], condition: string): Record<string, string | number>[] {
  // Translate common simple conditions: column = 'value', column > value, survived = 1, age > 30, price > 150
  // Handle multiple AND conditions
  const conditions = condition.split(/\s+AND\s+/i);

  return rows.filter(row => {
    return conditions.every(cond => {
      // Check for operators: =, >, <, !=, <=, >=, LIKE
      const opMatch = cond.match(/([a-zA-Z_0-9]+)\s*(=|>|<|!=|>=|<=|LIKE)\s*(.*)/i);
      if (!opMatch) return true;

      const col = opMatch[1].trim();
      const op = opMatch[2].trim();
      let rawVal = opMatch[3].trim();

      // Find actual key from row case-insensitively
      const actualKey = Object.keys(row).find(k => k.toLowerCase() === col.toLowerCase());
      if (!actualKey) return false;

      const rowVal = row[actualKey];

      // Remove single/double quotes around comparison values
      if ((rawVal.startsWith("'") && rawVal.endsWith("'")) || (rawVal.startsWith('"') && rawVal.endsWith('"'))) {
        rawVal = rawVal.substring(1, rawVal.length - 1);
      }

      const numRowVal = Number(rowVal);
      const numCompVal = Number(rawVal);

      if (op === '=') {
        if (!isNaN(numRowVal) && !isNaN(numCompVal) && rawVal.trim() !== '') {
          return numRowVal === numCompVal;
        }
        return String(rowVal).toLowerCase() === rawVal.toLowerCase();
      }
      if (op === '!=') {
        return String(rowVal).toLowerCase() !== rawVal.toLowerCase();
      }
      if (op === '>') {
        return numRowVal > numCompVal;
      }
      if (op === '<') {
        return numRowVal < numCompVal;
      }
      if (op === '>=') {
        return numRowVal >= numCompVal;
      }
      if (op === '<=') {
        return numRowVal <= numCompVal;
      }
      if (op === 'LIKE') {
        // Replace % wildcards with standard regex patterns
        const regexStr = rawVal.replace(/%/g, '.*');
        const regex = new RegExp(`^${regexStr}$`, 'i');
        return regex.test(String(rowVal));
      }

      return true;
    });
  });
}

// Basic Group By parser
function applyGroupBy(rows: Record<string, string | number>[], groupCol: string, columnsStr: string): Record<string, string | number>[] {
  // Find actual grouping key in rows
  const sampleRow = rows[0];
  if (!sampleRow) return [];

  const actualGroupKey = Object.keys(sampleRow).find(k => k.toLowerCase() === groupCol.toLowerCase());
  if (!actualGroupKey) throw new Error(`GROUP BY item "${groupCol}" is not a valid column.`);

  // Groups map
  const groups: Record<string, Record<string, string | number>[]> = {};
  rows.forEach(row => {
    const val = String(row[actualGroupKey]);
    if (!groups[val]) groups[val] = [];
    groups[val].push(row);
  });

  // Parse projection: what aggregates were requested? (e.g., avg(price), sum(units_sold), count(*))
  const selectItems = columnsStr.split(',').map(s => s.trim());

  return Object.entries(groups).map(([groupVal, groupedRows]) => {
    const outputRow: Record<string, string | number> = {
      [groupCol]: isNaN(Number(groupVal)) ? groupVal : Number(groupVal)
    };

    selectItems.forEach(item => {
      // Skip the group column itself if it is in the projection list
      if (item.toLowerCase() === groupCol.toLowerCase()) return;

      const aggMatch = item.match(/(SUM|AVG|COUNT|MAX|MIN)\s*\(\s*(.*?)\s*\)(?:\s+as\s+([a-zA-Z_0-9]+))?/i);
      if (aggMatch) {
         const op = aggMatch[1].toUpperCase();
         const targetCol = aggMatch[2].trim();
         const alias = aggMatch[3]?.trim() || `${op.toLowerCase()}_${targetCol.replace('*', 'rows')}`;

         let calculatedVal = 0;
         if (op === 'COUNT') {
           calculatedVal = groupedRows.length;
         } else {
           const actualTargetKey = Object.keys(sampleRow).find(k => k.toLowerCase() === targetCol.toLowerCase());
           if (actualTargetKey) {
             const vals = groupedRows.map(r => Number(r[actualTargetKey])).filter(v => !isNaN(v));
             if (op === 'SUM') {
               calculatedVal = vals.reduce((sum, v) => sum + v, 0);
             } else if (op === 'AVG') {
               calculatedVal = vals.length ? vals.reduce((sum, v) => sum + v, 0) / vals.length : 0;
               calculatedVal = Math.round(calculatedVal * 100) / 100; // round to 2 decimals
             } else if (op === 'MAX') {
               calculatedVal = Math.max(...vals);
             } else if (op === 'MIN') {
               calculatedVal = Math.min(...vals);
             }
           }
         }
         outputRow[alias] = calculatedVal;
      }
    });

    return outputRow;
  });
}

function calculateOverallAggregation(rows: Record<string, string | number>[], columnsStr: string): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  if (rows.length === 0) return result;

  const selectItems = columnsStr.split(',').map(s => s.trim());
  selectItems.forEach(item => {
    const aggMatch = item.match(/(SUM|AVG|COUNT|MAX|MIN)\s*\(\s*(.*?)\s*\)(?:\s+as\s+([a-zA-Z_0-9]+))?/i);
    if (aggMatch) {
      const op = aggMatch[1].toUpperCase();
      const targetCol = aggMatch[2].trim();
      const alias = aggMatch[3]?.trim() || `${op.toLowerCase()}_${targetCol.replace('*', 'rows')}`;

      let calculatedVal = 0;
      if (op === 'COUNT') {
        calculatedVal = rows.length;
      } else {
        const actualTargetKey = Object.keys(rows[0]).find(k => k.toLowerCase() === targetCol.toLowerCase());
        if (actualTargetKey) {
          const vals = rows.map(r => Number(r[actualTargetKey])).filter(v => !isNaN(v));
          if (op === 'SUM') {
            calculatedVal = vals.reduce((sum, v) => sum + v, 0);
          } else if (op === 'AVG') {
            calculatedVal = vals.length ? vals.reduce((sum, v) => sum + v, 0) / vals.length : 0;
            calculatedVal = Math.round(calculatedVal * 100) / 100;
          } else if (op === 'MAX') {
            calculatedVal = Math.max(...vals);
          } else if (op === 'MIN') {
            calculatedVal = Math.min(...vals);
          }
        }
      }
      result[alias] = calculatedVal;
    }
  });

  return result;
}
