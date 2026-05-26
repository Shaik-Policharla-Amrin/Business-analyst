/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phase, SQLChallenge, InterviewQuestion, Project, CertificationCourse } from './types';

export const BA_PHASES: Phase[] = [
  {
    id: 'p1',
    title: 'Phase 1: Foundations',
    weeksRange: 'Weeks 1–4',
    description: 'Master core SQL commands, standard Excel functions & PivotTables. Work on your first exploratory dataset analysis projects.',
    weeks: [
      {
        weekNum: 1,
        title: 'SQL & Excel Kickoff',
        focus: 'Basic structure, filtering, fundamental cell operations & formulas.',
        subtopics: [
          {
            id: 'w1-s1',
            title: 'SQL Query Basics & Filtering',
            desc: 'Understand how datasets are queried using standard relational operations.',
            tool: 'SQL',
            difficulty: 'Beginner',
            estimatedTime: '4 hours',
            concepts: [
              'Understand relational databases and database schemas',
              'SELECT: Choose specific columns or all (*)',
              'WHERE: Filter rows using logical operators (=, !=, >, <, LIKE, IN)',
              'ORDER BY: Sort results in ASC or DESC order',
              'LIMIT (or TOP): Keep outputs concise and speed up runs',
              'DISTINCT: Identify unique entries in a column'
            ],
            tasks: [
              { id: 'w1-t1', title: 'Basic SQL Select', desc: 'Retrieve passenger ID, name, and age of all survivors from the titanic_survivors table.' },
              { id: 'w1-t2', title: 'Text Filtering', desc: 'Find all Airbnb listings in New York (city) that cost less than 100 per night.' }
            ],
            resources: [
              { name: 'W3Schools SQL Tutorial', url: 'https://www.w3schools.com/sql/', desc: 'Comprehensive guide for beginners.' },
              { name: '100+ SQL Theory Questions', url: 'javascript:void(0)', desc: 'Fundamental SQL review notes.' }
            ]
          },
          {
            id: 'w1-s2',
            title: 'Excel Fundamental Formulas',
            desc: 'Get comfortable with basic cell calculations, absolute and relative references, and elementary functions.',
            tool: 'Excel',
            difficulty: 'Beginner',
            estimatedTime: '5 hours',
            concepts: [
              'Logical formulas: IF, AND, OR, NOT, IFERROR',
              'Arithmetic: SUM, AVERAGE, COUNT, MIN, MAX',
              'Lookups: Introduction to VLOOKUP & XLOOKUP syntax',
              'Cell References: Understanding relative ($A1), absolute ($A$1), and mixed (A$1)'
            ],
            tasks: [
              { id: 'w1-t3', title: 'Logical Checkups', desc: 'Write an IFERROR statement combined with a VLOOKUP to safely fetch passenger classes without crashes.' },
              { id: 'w1-t4', title: 'Survival Summation', desc: 'Calculate the total and average survival rate of titanic records using basic SUM and COUNT components.' }
            ],
            resources: [
              { name: 'MyGreatLearning - Free Excel Beginners Course', url: 'https://www.mygreatlearning.com/academy', desc: 'A 2-hour self-paced introductory course with completion certificates.' }
            ]
          }
        ]
      },
      {
        weekNum: 2,
        title: 'Data Filtering & Joins',
        focus: 'Combining datasets natively in SQL and exploring the magic of Excel PivotTables.',
        subtopics: [
          {
            id: 'w2-s1',
            title: 'SQL Relational Joins',
            desc: 'Learn how to merge data from multiple tables together based on a common key.',
            tool: 'SQL',
            difficulty: 'Beginner',
            estimatedTime: '5 hours',
            concepts: [
              'INNER JOIN: Match records present in both tables',
              'LEFT JOIN & RIGHT JOIN: Keep all records from one side, fill misses with NULL',
              'FULL OUTER JOIN: Bring matching and unmatching rows from both sets',
              'Aliase naming (e.g. SELECT p.name FROM passengers p)'
            ],
            tasks: [
              { id: 'w2-t1', title: 'Merging Employee Data', desc: 'Join employee tables with their performance scores to identify top-performing business units.' }
            ],
            resources: [
              { name: 'Mode SQL Joins Guide', url: 'javascript:void(0)', desc: 'Visual models of different join types.' }
            ]
          },
          {
            id: 'w2-s2',
            title: 'Excel PivotTables 101',
            desc: 'Unleash the power of summary statistics. Sift through thousands of rows instantly without writing a single formula.',
            tool: 'Excel',
            difficulty: 'Beginner',
            estimatedTime: '6 hours',
            concepts: [
              'Understanding structured source requirements (no blank rows, unique headers)',
              'Creating PivotTables and navigating Rows, Columns, Values, and Filters',
              'Customizing Pivot Format: Number formatting, tabular layouts, styles',
              'Adding Slicers and Timelines for interactive, executive filtering dashboards'
            ],
            tasks: [
              { id: 'w2-t2', title: 'Airbnb Summary', desc: 'Analyze Airbnb listing trends: Pivot average price and listing counts per room type per city.' }
            ],
            resources: [
              { name: 'Microsoft PivotTable Support Docs', url: 'https://support.microsoft.com', desc: 'Very helpful official step-by-step documentation.' }
            ]
          }
        ]
      },
      {
        weekNum: 3,
        title: 'Aggregations & Data Viz',
        focus: 'Grouping records dynamically to compute aggregates and turning data tables into clear, logical charts.',
        subtopics: [
          {
            id: 'w3-s1',
            title: 'SQL Aggregation & Grouping',
            desc: 'Summarize attributes using arithmetic processes grouped by segment categories.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '5 hours',
            concepts: [
              'GROUP BY: Split data into logical buckets prior to computation',
              'HAVING: Filter group results (MUST run after GROUP BY list, unlike WHERE)',
              'Functions: COUNT, SUM, AVG, MIN, MAX combined with category splits'
            ],
            tasks: [
              { id: 'w3-t1', title: 'Average Revenues', desc: 'Extract average revenues and sum units sold per iPhone model from the sales dataset.' }
            ],
            resources: [
              { name: 'SQLBolt Lesson on Aggregations', url: 'https://sqlbolt.com', desc: 'Interactive sandbox lessons.' }
            ]
          },
          {
            id: 'w3-s2',
            title: 'Foundational Chart Designs',
            desc: 'Familiarize yourself with different chart purposes and customize their styling for maximum professional clarity.',
            tool: 'Data Viz',
            difficulty: 'Beginner',
            estimatedTime: '5 hours',
            concepts: [
              'Visual types: Bar Charts (comparisons), Line Graphs (trends), Scatter Plots (correlation)',
              'Visual hygiene: Erase unnecessary chart borders, remove redundant legends, use high-contrast text',
              'Double Axis: Learn how and when to feature a secondary axis safely without misleading'
            ],
            tasks: [
              { id: 'w3-t2', title: 'Clean iPhone Sales Graph', desc: 'Create a clean combo bar-line chart depicting iPhone units sold and cumulative revenue trends.' }
            ],
            resources: [
              { name: 'Maven Analytics Data Playground', url: 'javascript:void(0)', desc: 'Excellent source of free clean datasets.' }
            ]
          }
        ]
      },
      {
        weekNum: 4,
        title: 'Subqueries & Advanced Lookups',
        focus: 'Tackle multi-layered logical requests with nestled SQL subqueries and complex INDEX-MATCH formulas.',
        subtopics: [
          {
            id: 'w4-s1',
            title: 'SQL Subqueries',
            desc: 'Write queries embedded within another query statement to compute intermediate criteria.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '6 hours',
            concepts: [
              'Nested queries inside the WHERE clause',
              'EXISTS, IN, NOT IN conditional sets, returning lists of records',
              'Correlated subqueries: Outer query matches against inner iterations'
            ],
            tasks: [
              { id: 'w4-t1', title: 'Subquery Filter', desc: 'Extract passengers who paid above-average passenger fares.' }
            ],
            resources: [
              { name: 'W3Schools SQL Subqueries', url: 'https://www.w3schools.com/sql/sql_subquery.asp' }
            ]
          },
          {
            id: 'w4-s2',
            title: 'Excel INDEX-MATCH & Advanced Lookups',
            desc: 'Achieve reliable double-sided search functions with index and matching methodologies.',
            tool: 'Excel',
            difficulty: 'Intermediate',
            estimatedTime: '6 hours',
            concepts: [
              'INDEX: Specify rows and columns to pinpoint dynamic grid values',
              'MATCH: Pinpoint the exact index number a search term is located',
              'INDEX & MATCH combined: Outperform VLOOKUPs lack of leftward lookup queries',
              'Text arrays and Date offsets inside search tools'
            ],
            tasks: [
              { id: 'w4-t2', title: 'Flexible Index', desc: 'Structure an INDEX-MATCH equation returning client names from an ID in an arbitrary column.' }
            ],
            resources: [
              { name: 'Simplilearn - Introduction to MS Excel', url: 'https://www.simplilearn.com', desc: 'A 7-hour self-paced course covering intermediate lookups with certificates.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p2',
    title: 'Phase 2: Intermediate Mastery',
    weeksRange: 'Weeks 5–8',
    description: 'Learn analytical Window Functions in SQL, Power Query for automated data cleansing, and strategic dashboard modeling with Pivot Charts.',
    weeks: [
      {
        weekNum: 5,
        title: 'Union Joins & Custom Tables',
        focus: 'Appreciate advanced table merging and formatting clean dashboard elements.',
        subtopics: [
          {
            id: 'w5-s1',
            title: 'SQL Set Operations',
            desc: 'Append datasets vertically using relational set operant techniques.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '4 hours',
            concepts: [
              'UNION: Combine and deduplicate records on equal table shapes',
              'UNION ALL: Append all rows instantly, bypassing deduplication checks for speed',
              'INTERSECT / EXCEPT: Identify shared or differing rows'
            ],
            tasks: [
              { id: 'w5-t1', title: 'Political Votes Appending', desc: 'Create a combined consolidated view of votes across disparate states using UNION ALL.' }
            ],
            resources: [
              { name: 'LearnSQL union tutorials', url: 'javascript:void(0)' }
            ]
          },
          {
            id: 'w5-s2',
            title: 'Advanced Pivot Tables',
            desc: 'Deepen pivot tables formatting, calculated fields, and multi-tier formatting.',
            tool: 'Excel',
            difficulty: 'Intermediate',
            estimatedTime: '6 hours',
            concepts: [
              'Summarize values as % of Row Total, % of Column Total, or Running Difference',
              'Inserting Calculated Fields: Inject equations straight inside Pivot controls',
              'Advanced conditional formatting: Use custom data bars with hidden text'
            ],
            tasks: [
              { id: 'w5-t2', title: 'Calculated Commissions', desc: 'Add a custom Calculated Field yielding a 15% commission rate based on gross product sales.' }
            ],
            resources: [
              { name: 'ExcelJet Pivot Table Guides', url: 'javascript:void(0)', desc: 'Concise visual tips.' }
            ]
          }
        ]
      },
      {
        weekNum: 6,
        title: 'SQL Window Functions',
        focus: 'Compute complex ranking, partitioning, and cumulative metrics with window functions.',
        subtopics: [
          {
            id: 'w6-s1',
            title: 'SQL Window Functions',
            desc: 'Run calculations across a specific set of rows that are related to the current row without grouping.',
            tool: 'SQL',
            difficulty: 'Advanced',
            estimatedTime: '7 hours',
            concepts: [
              'OVER & PARTITION BY: Define the group scopes of computations',
              'ROW_NUMBER: Give unique integers to rows',
              'RANK vs DENSE_RANK: How tied values are assigned ranking integers',
              'LAG & LEAD: Access records before or after the current item'
            ],
            tasks: [
              { id: 'w6-t1', title: 'Department Rankings', desc: 'Rank employees within their department by salary using DENSE_RANK.' }
            ],
            resources: [
              { name: 'PostgreSQL Window Functions Tutorial', url: 'https://www.postgresql.org/docs/current/tutorial-window.html' }
            ]
          },
          {
            id: 'w6-s2',
            title: 'Advanced Array Formulas',
            desc: 'Manipulate lists of items with powerful new dynamic array formulas.',
            tool: 'Excel',
            difficulty: 'Advanced',
            estimatedTime: '5 hours',
            concepts: [
              'Dynamic Spill Ranges (& symbol indicators)',
              'FILTER: Filter lists on parameters natively with formula calculations',
              'SORT & UNIQUE: Clean up lists of inputs and sort records alphabetically'
            ],
            tasks: [
              { id: 'w6-t2', title: 'Spill List Sorting', desc: 'Combine UNIQUE and SORT to produce a dynamic alphabetically sorted list of active departments.' }
            ],
            resources: [
              { name: 'W3Schools Excel Formulas', url: 'https://www.w3schools.com/excel/' }
            ]
          }
        ]
      },
      {
        weekNum: 7,
        title: 'CTEs & Power Query Basics',
        focus: 'Write highly readable queries with CTEs and construct repeatable data pipelines via Power Query.',
        subtopics: [
          {
            id: 'w7-s1',
            title: 'Common Table Expressions (CTEs)',
            desc: 'Structure clean complex queries utilizing reusable temporary tables.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '6 hours',
            concepts: [
              'WITH statement: Declare named temporary relational structures',
              'CTEs vs Subqueries: Improve logic readability dramatically',
              'Recursive CTE syntax (hierarchical employee mappings)'
            ],
            tasks: [
              { id: 'w7-t1', title: 'Average Salary With CTE', desc: 'Define a CTE retrieving average salaries per department, and fetch records earning above their average.' }
            ],
            resources: [
              { name: 'LearnSQL CTE Guide', url: 'javascript:void(0)' }
            ]
          },
          {
            id: 'w7-s2',
            title: 'Power Query Fundamentals',
            desc: 'Extract, Transform, and Load (ETL) messy source records into pristine spreadsheets easily.',
            tool: 'Excel',
            difficulty: 'Intermediate',
            estimatedTime: '6 hours',
            concepts: [
              'Connecting Excel to data folders or CSV source files',
              'Promoting headers, changing column types, removing nulls without typing formulas',
              'Unpivoting wide tables into long database architectures'
            ],
            tasks: [
              { id: 'w7-t2', title: 'Pipeline Cleaning', desc: 'Unpivot 12 monthly columns into unified Month-Value rows via Power Query.' }
            ],
            resources: [
              { name: 'Microsoft Power Query Documentation', url: 'https://learn.microsoft.com/en-us/power-query/' }
            ]
          }
        ]
      },
      {
        weekNum: 8,
        title: 'SQL Parsing & Interactive Dashboards',
        focus: 'Surgical string manipulations alongside interactive Excel dashboarding setups.',
        subtopics: [
          {
            id: 'w8-s1',
            title: 'String, Date & Time Queries',
            desc: 'Extract sub-parts of text and handle timezone dates natively in databases.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '5 hours',
            concepts: [
              'TRIM, UPPER, LOWER, LEFT, RIGHT, SUBSTR text functions',
              'COALESCE: Provide fallback options for NULL values',
              'DATEADD, DATEDIFF, EXTRACT parts (YEAR, MONTH)'
            ],
            tasks: [
              { id: 'w8-t1', title: 'Parsing Email IDs', desc: 'Normalize customer names by removing excess whitespaces and converting them to uppercase.' }
            ],
            resources: [
              { name: 'SQL string functions cheat sheet', url: 'javascript:void(0)' }
            ]
          },
          {
            id: 'w8-s2',
            title: 'Excel Dashboard Orchestration',
            desc: 'Unify slicers, dynamic KPIs, and Pivot Charts to construct a reporting layout for executives.',
            tool: 'Excel',
            difficulty: 'Advanced',
            estimatedTime: '7 hours',
            concepts: [
              'Connecting Slicers across multiple PivotTables using Report Connections',
              'Formulating high-contrast KPI cards using Excel text shapes linked to formulas',
              'Designing visual hierarchy with proper margins, clean headings, and modern muted gray gridlines'
            ],
            tasks: [
              { id: 'w8-t2', title: 'Full Sales Dashboard', desc: 'Construct a dashboard containing 3 KPI blocks, a slicer, and an interactive trend line.' }
            ],
            resources: [
              { name: 'Alison - Business Analysis Fundamentals (Free Course)', url: 'https://alison.com', desc: 'Excellent free foundational course detailing business presentation standards.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p3',
    title: 'Phase 3: Applied Analytics',
    weeksRange: 'Weeks 9–12',
    description: 'Construct advanced conditional aggregations using CASE WHEN, design interactive Power BI/Tableau reports, and analyze customer attrition forecasts.',
    weeks: [
      {
        weekNum: 9,
        title: 'SQL Case Expressions & Modelling',
        focus: 'Implement logical branching natively inside databases while mastering forecasting models.',
        subtopics: [
          {
            id: 'w9-s1',
            title: 'SQL CASE WHEN Clauses',
            desc: 'Construct conditional calculations directly inside select queries.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '5 hours',
            concepts: [
              'CASE WHEN: Multi-scenario IF/THEN evaluations in database tables',
              'Binning numerical attributes (e.g., placing Age into Kid, Adult, Senior buckets)',
              'Conditional aggregations (SUM CASE WHEN to pivot items vertically)'
            ],
            tasks: [
              { id: 'w9-t1', title: 'Age Group Binning', desc: 'Build an age categorization column where records under 18 -> Youth, 18-60 -> Adult, 60+ -> Senior.' }
            ],
            resources: [
              { name: 'SQL CASE statement guide', url: 'javascript:void(0)' }
            ]
          },
          {
            id: 'w9-s2',
            title: 'Predictive Excel Models',
            desc: 'Use regression tools to model trends and forecast business metrics.',
            tool: 'Excel',
            difficulty: 'Advanced',
            estimatedTime: '6 hours',
            concepts: [
              'Plotting scatter plots, adding linear trendlines and showing R-squared metrics',
              'FORECAST.LINEAR & TREND functions for forecasting metrics',
              'Using Excel Analysis ToolPak add-in for regressions output reports'
            ],
            tasks: [
              { id: 'w9-t2', title: 'Predict Housing Valuations', desc: 'Evaluate house prices using square feet dimensions as an explanatory factor to output regression coefficients.' }
            ],
            resources: [
              { name: 'Kaggle Datasets Hub', url: 'https://www.kaggle.com', desc: 'Resource for free clean housing datasets.' }
            ]
          }
        ]
      },
      {
        weekNum: 10,
        title: 'Data Quality & Business BI',
        focus: 'Clean up bad data and introduce modern BI visualization setups (Power BI & Tableau).',
        subtopics: [
          {
            id: 'w10-s1',
            title: 'Database Cleaning & Integrity',
            desc: 'Fix broken records, dedup databases, and standardise schema formats.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '5 hours',
            concepts: [
              'NULL values replacement via COALESCE or CASE WHEN',
              'Identifying duplicate rows via ROW_NUMBER() ranking duplicates',
              'Validating integrity across primary field constraints'
            ],
            tasks: [
              { id: 'w10-t1', title: 'Deduplicating Sales Rows', desc: 'Select only the latest sale record when duplicate transactions are recorded for a single client.' }
            ],
            resources: [
              { name: 'DB cleaning practices', url: 'javascript:void(0)' }
            ]
          },
          {
            id: 'w10-s2',
            title: 'Modern BI Systems (Tableau & Power BI)',
            desc: 'Move past spreadsheets into BI engines to create cross-filtering visual reports.',
            tool: 'Power BI',
            difficulty: 'Intermediate',
            estimatedTime: '7 hours',
            concepts: [
              'Connecting BI software to live SQL database queries',
              'The power of cross-filtering (clicking a bar chart filters all elements automatically)',
              'Creating simple DAX metrics or Calculated Fields'
            ],
            tasks: [
              { id: 'w10-t2', title: 'Interactive Territory Map', desc: 'Build an interactive country visual filter updating revenue charts instantly upon section clicks.' }
            ],
            resources: [
              { name: 'Coursera Microsoft Professional Certificate', url: 'https://www.coursera.org', desc: 'Great professional certificate that can be audited for free.' }
            ]
          }
        ]
      },
      {
        weekNum: 11,
        title: 'Scenarios & Multi-Table Joins',
        focus: 'Test hypothetical business scenarios and merge extensive databases to evaluate business questions.',
        subtopics: [
          {
            id: 'w11-s1',
            title: 'Multi-Table SQL Joins',
            desc: 'Chain multiple JOIN statements together to bridge insights together.',
            tool: 'SQL',
            difficulty: 'Intermediate',
            estimatedTime: '6 hours',
            concepts: [
              'Joining three or more tables concurrently',
              'Understanding join ordering and its impact on performance',
              'Avoiding Cartesian products (errors caused by joining non-unique tables)'
            ],
            tasks: [
              { id: 'w11-t1', title: 'Complete Customer Profiling', desc: 'Connect Customers table, Orders table, and Items table to list top purchased product names per client.' }
            ],
            resources: [
              { name: 'SQL Join Sandbox', url: 'javascript:void(0)' }
            ]
          },
          {
            id: 'w11-s2',
            title: 'What-If & Scenario Planning',
            desc: 'Use simulation systems in Excel to construct flexible budget scenarios.',
            tool: 'Excel',
            difficulty: 'Advanced',
            estimatedTime: '6 hours',
            concepts: [
              'Goal Seek: Work backwards from a sales target to calculate the required units to sell',
              'Scenario Manager: Switch between Optimistic, Neutral, and Pessimistic parameters instantly',
              'Data Tables (1 & 2 Variable sensitivity grids)'
            ],
            tasks: [
              { id: 'w11-t2', title: 'Target Margin Goal Seek', desc: 'Identify the exact retail price required to achieve a 40% margin on a set assembly cost.' }
            ],
            resources: [
              { name: 'Microsoft Excel Szenario tutorials', url: 'javascript:void(0)' }
            ]
          }
        ]
      },
      {
        weekNum: 12,
        title: 'Query Optimization & Power Pivot',
        focus: 'Understand how database indexes work, optimize slow queries, and handle millions of rows in Excel using Power Pivot.',
        subtopics: [
          {
            id: 'w12-s1',
            title: 'SQL Performance & Indexes',
            desc: 'Optimize database schemas and speed up read requests on large scale databases.',
            tool: 'SQL',
            difficulty: 'Advanced',
            estimatedTime: '6 hours',
            concepts: [
              'EXPLAIN: Read execution plans to audit bottle-necks',
              'Indexes (B-Tree, Hash): Speed up search queries enormously',
              'Avoiding nested SELECT queries when simple JOINs suffice'
            ],
            tasks: [
              { id: 'w12-t1', title: 'Query Performance Audit', desc: 'Convert an inefficient nested subquery into an efficient JOIN with filtering indexes.' }
            ],
            resources: [
              { name: 'Use The Index, Luke!', url: 'https://use-the-index-luke.com' }
            ]
          },
          {
            id: 'w12-s2',
            title: 'Excel Power Pivot (Data Models)',
            desc: 'Establish database schemas directly inside spreadsheets and bypass row limitations entirely.',
            tool: 'Excel',
            difficulty: 'Advanced',
            estimatedTime: '7 hours',
            concepts: [
              'Enabling the Power Pivot Add-in and adding sheets straight into the Data Model',
              'Creating relationships between tables (Foreign and Primary keys) inside Excel',
              'Intro to DAX (Data Analysis Expressions): Writing basic equations like CALCULATE, RELATED'
            ],
            tasks: [
              { id: 'w12-t2', title: 'Spreadsheet Relational Table', desc: 'Establish links between Sales Sheet and Customer Sheet without VLOOKUP.' }
            ],
            resources: [
              { name: 'Kaggle Datasets Hub', url: 'https://www.kaggle.com' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'p4',
    title: 'Phase 4: Capstone & Integration',
    weeksRange: 'Weeks 13–16',
    description: 'Synthesize everything learned into portfolio-quality projects, mock-interview practice, and resume building.',
    weeks: [
      {
        weekNum: 13,
        title: 'Data Storytelling & Capstone Prep',
        focus: 'Transform statistical figures into a convincing presentation layout, and start drafting your portfolio.',
        subtopics: [
          {
            id: 'w13-s1',
            title: 'Technical Presentation Skills',
            desc: 'Present quantitative insights convincingly. Understand how to design cards, highlight key numbers, and present to clients.',
            tool: 'BA Core',
            difficulty: 'Advanced',
            estimatedTime: '6 hours',
            concepts: [
              'Reducing visual noise (removing legends, borders, gray grids)',
              'Creating clear titles that tell the insight (e.g., \"Sales increased 15% due to marketing promotion\" instead of \"Sales trend\")',
              'Structuring a BA project presentation: Situation, Analysis, Solution, Value Delivery'
            ],
            tasks: [
              { id: 'w13-t1', title: 'Build Presentation Outline', desc: 'Draft a 5-slide outline explaining how an automated pipeline saves 20 hours a week.' }
            ],
            resources: [
              { name: 'BA Interview Presentation Guide', url: 'javascript:void(0)', desc: 'Excellent tutorials and tips on presentation and interviews.' }
            ]
          }
        ]
      },
      {
        weekNum: 14,
        title: 'Project Portfolio Sprint',
        focus: 'Wrap up and polish your main portfolio projects in SQL & Excel to stand out in applications.',
        subtopics: [
          {
            id: 'w14-s1',
            title: 'Portfolio & Capstone Projects',
            desc: 'Organize your SQL worksheets, Excel dashboards, and BI reports into a central repository.',
            tool: 'Agile/Scrum',
            difficulty: 'Advanced',
            estimatedTime: '8 hours',
            concepts: [
              'Writing high-quality Git README documents explaining your analysis process',
              'How to upload and showcase interactive Excel/Power BI dashboards on the web',
              'Translating technical work to business outcomes on resumes'
            ],
            tasks: [
              { id: 'w14-t1', title: 'GitHub Repo Setup', desc: 'Create a GitHub repository detailing data cleaning paths, database models, and dashboard screenshots.' }
            ],
            resources: [
              { name: 'Data.World', url: 'https://data.world' }
            ]
          }
        ]
      },
      {
        weekNum: 15,
        title: 'Deep Interview Preparation',
        focus: 'Review common Business Analyst technical and soft skill questions under strict mock pressure.',
        subtopics: [
          {
            id: 'w15-s1',
            title: 'Technical & Case Study Practice',
            desc: 'Review SQL theory, Excel lookups, and business modeling techniques.',
            tool: 'BA Core',
            difficulty: 'Advanced',
            estimatedTime: '8 hours',
            concepts: [
              'Quick response strategies for SQL theory questions',
              'Solving case-study questions in real-time (e.g., market expansion, revenue decline)',
              'Writing clear answers to technical questions'
            ],
            tasks: [
              { id: 'w15-t1', title: 'Practice Case Study', desc: 'Explain how you would investigate a sudden 15% drop in product sales margin.' }
            ],
            resources: [
              { name: '100+ SQL Theory Questions', url: 'javascript:void(0)' }
            ]
          }
        ]
      },
      {
        weekNum: 16,
        title: 'Careers & Networking Launch',
        focus: 'Draft your resume, polish your LinkedIn presence, and start applying.',
        subtopics: [
          {
            id: 'w16-s1',
            title: 'Resume & Job Networking',
            desc: 'Align your resume with actual BA job requirements and establish a professional presence.',
            tool: 'BA Core',
            difficulty: 'Advanced',
            estimatedTime: '6 hours',
            concepts: [
              'Updating your resume to feature action-oriented metrics (e.g., \"Optimized queries, saving 4 hours daily\")',
              'How to structure a professional LinkedIn post summarizing your 16-week learning journey',
              'Submitting applications with targeted cover letters'
            ],
            tasks: [
              { id: 'w16-t1', title: 'Craft Career Summary', desc: 'Draft a short, impact-oriented summary for your resume and LinkedIn bio.' }
            ],
            resources: [
              { name: 'Forbes Staffing Agencies Guide', url: 'javascript:void(0)' }
            ]
          }
        ]
      }
    ]
  }
];

export const SQL_CHALLENGES: SQLChallenge[] = [
  {
    id: 'sql-c1',
    title: 'Select Active Titanic Survivors',
    difficulty: 'Beginner',
    description: 'Retrieve the Name, Age, and Ticket Fare of all passengers who survived (survived = 1) and are older than 30 years from the `titanic_survivors` dataset, sorted by Fare descending.',
    schemaDesc: 'Table `titanic_survivors` (passenger_id INT, name VARCHAR, survived INT, age INT, pclass INT, fare DECIMAL, gender VARCHAR)',
    tableData: [
      { passenger_id: 1, name: 'Owen Harris', survived: 0, age: 22, pclass: 3, fare: 7.25, gender: 'male' },
      { passenger_id: 2, name: 'Florence Cumings', survived: 1, age: 38, pclass: 1, fare: 71.28, gender: 'female' },
      { passenger_id: 3, name: 'Laina Heikkinen', survived: 1, age: 26, pclass: 3, fare: 7.92, gender: 'female' },
      { passenger_id: 4, name: 'Jacques Futrelle', survived: 1, age: 35, pclass: 1, fare: 53.10, gender: 'female' },
      { passenger_id: 5, name: 'William Henry', survived: 0, age: 35, pclass: 3, fare: 8.05, gender: 'male' },
      { passenger_id: 6, name: 'James McCarthy', survived: 1, age: 54, pclass: 1, fare: 51.86, gender: 'male' },
      { passenger_id: 7, name: 'Elizabeth Lure', survived: 1, age: 41, pclass: 1, fare: 134.50, gender: 'female' }
    ],
    targetSchema: ['name', 'age', 'fare'],
    correctQueryPattern: /SELECT\s+(name,\s*age,\s*fare|passenger_id|gender|pclass|\*)\s*FROM\s+titanic_survivors\s+WHERE\s+survived\s*=\s*1\s+AND\s+age\s*>\s*30/i,
    sampleCorrectQuery: 'SELECT name, age, fare FROM titanic_survivors WHERE survived = 1 AND age > 30 ORDER BY fare DESC',
    hints: [
      'Filter for survived = 1 and age > 30 using AND.',
      'Order by the fare field in descending order (DESC).'
    ],
    testCases: [
      { query: 'SELECT name, age, fare FROM titanic_survivors WHERE survived = 1 AND age > 30 ORDER BY fare DESC', shouldPass: true, expectedOutputRowsCount: 4 }
    ]
  },
  {
    id: 'sql-c2',
    title: 'High-Value Airbnb Rentals',
    difficulty: 'Intermediate',
    description: 'Fetch our listings in San Francisco or New York with a price above 150 per night and room_type being Entire home/apt. Sort by price ascending.',
    schemaDesc: 'Table `airbnb_listings` (id INT, name VARCHAR, city VARCHAR, price INT, minimum_nights INT, room_type VARCHAR, availability_365 INT)',
    tableData: [
      { id: 101, name: 'Cozy Greenwich Studio', city: 'New York', price: 120, minimum_nights: 2, room_type: 'Entire home/apt', availability_365: 120 },
      { id: 102, name: 'Premium Downtown Loft', city: 'San Francisco', price: 250, minimum_nights: 3, room_type: 'Entire home/apt', availability_365: 90 },
      { id: 103, name: 'Charming Soho Flat', city: 'New York', price: 180, minimum_nights: 1, room_type: 'Entire home/apt', availability_365: 45 },
      { id: 104, name: 'Bright Mission Flat', city: 'San Francisco', price: 160, minimum_nights: 2, room_type: 'Private room', availability_365: 15 },
      { id: 105, name: 'Luxury Madison Penthouse', city: 'New York', price: 320, minimum_nights: 5, room_type: 'Entire home/apt', availability_365: 200 }
    ],
    targetSchema: ['name', 'city', 'price', 'room_type'],
    correctQueryPattern: /WHERE\s+price\s*>\s*150/i,
    sampleCorrectQuery: "SELECT name, city, price, room_type FROM airbnb_listings WHERE price > 150 AND room_type = 'Entire home/apt' AND (city = 'New York' OR city = 'San Francisco') ORDER BY price ASC",
    hints: [
      "Check the field filters: price > 150, room_type = 'Entire home/apt'.",
      "Combine the constraints with AND. Filter city names using IN ('New York', 'San Francisco') or OR."
    ],
    testCases: [
      { query: "SELECT name, city, price, room_type FROM airbnb_listings WHERE price > 150 AND room_type = 'Entire home/apt' ORDER BY price ASC", shouldPass: true, expectedOutputRowsCount: 3 }
    ]
  },
  {
    id: 'sql-c3',
    title: 'Aggregate iPhone Sales by Region',
    difficulty: 'Intermediate',
    description: 'Count the total transactions, total units sold, and total revenue across each Region. Group by Region and order by total revenue descending.',
    schemaDesc: 'Table `iphone_sales` (sale_id INT, model VARCHAR, region VARCHAR, units_sold INT, revenue_thousands DECIMAL, sale_date VARCHAR)',
    tableData: [
      { sale_id: 1, model: 'iPhone 15', region: 'North America', units_sold: 120, revenue_thousands: 120.5, sale_date: '2026-05-01' },
      { sale_id: 2, model: 'iPhone 15 Pro', region: 'Europe', units_sold: 80, revenue_thousands: 96.0, sale_date: '2026-05-02' },
      { sale_id: 3, model: 'iPhone 15', region: 'Europe', units_sold: 95, revenue_thousands: 95.5, sale_date: '2026-05-02' },
      { sale_id: 4, model: 'iPhone 14', region: 'North America', units_sold: 150, revenue_thousands: 112.0, sale_date: '2026-05-03' },
      { sale_id: 5, model: 'iPhone 15 Pro', region: 'Asia-Pacific', units_sold: 210, revenue_thousands: 252.0, sale_date: '2026-05-04' }
    ],
    targetSchema: ['region', 'total_sales', 'total_units', 'total_revenue'],
    correctQueryPattern: /GROUP\s+BY\s+region/i,
    sampleCorrectQuery: 'SELECT region, COUNT(*) AS total_sales, SUM(units_sold) AS total_units, SUM(revenue_thousands) AS total_revenue FROM iphone_sales GROUP BY region ORDER BY total_revenue DESC',
    hints: [
      'Use SUM(units_sold) and SUM(revenue_thousands).',
      'Remember the GROUP BY region statement.'
    ],
    testCases: [
      { query: 'SELECT region, SUM(units_sold) AS total_units FROM iphone_sales GROUP BY region', shouldPass: true, expectedOutputRowsCount: 3 }
    ]
  },
  {
    id: 'sql-c4',
    title: 'Department Salary Benchmarks',
    difficulty: 'Advanced',
    description: 'Find all employees from the `hr_employees` table details who earn more than the average salary of their respective department.',
    schemaDesc: 'Table `hr_employees` (employee_id INT, name VARCHAR, department VARCHAR, performance_score INT, attrition VARCHAR, salary INT)',
    tableData: [
      { employee_id: 1, name: 'Alice Smith', department: 'Sales', performance_score: 4, attrition: 'No', salary: 75000 },
      { employee_id: 2, name: 'Bob Johnson', department: 'Sales', performance_score: 3, attrition: 'Yes', salary: 50000 },
      { employee_id: 3, name: 'Clara Oswald', department: 'Engineering', performance_score: 5, attrition: 'No', salary: 110000 },
      { employee_id: 4, name: 'Danny DeVito', department: 'Engineering', performance_score: 4, attrition: 'No', salary: 85000 },
      { employee_id: 5, name: 'Eva Long', department: 'Marketing', performance_score: 5, attrition: 'No', salary: 65000 },
      { employee_id: 6, name: 'Frank Miller', department: 'Marketing', performance_score: 2, attrition: 'Yes', salary: 42000 }
    ],
    targetSchema: ['name', 'department', 'salary'],
    correctQueryPattern: /(SELECT\s+AVG\s*\(\s*salary\s*\)\s*FROM\s+hr_employees|JOIN)/i,
    sampleCorrectQuery: 'SELECT name, department, salary FROM hr_employees e1 WHERE salary > (SELECT AVG(salary) FROM hr_employees e2 WHERE e2.department = e1.department)',
    hints: [
      'This requires a correlated subquery comparing salary to department averages.',
      'Or you can construct an INNER JOIN with a temporary average-by-department table.'
    ],
    testCases: [
      { query: 'SELECT name FROM hr_employees e1 WHERE salary > (SELECT AVG(salary) FROM hr_employees e2 WHERE e2.department = e1.department)', shouldPass: true, expectedOutputRowsCount: 3 }
    ]
  }
];

export const MOCK_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Role & Process Fundamentals',
    question: 'What is Business Analysis?',
    answer: 'Business Analysis is the practice of identifying business needs, analyzing complex problems, and proposing logical solutions that deliver tangible value to stakeholders. It acts as the bridge connecting strategic business objectives with technological implementations.'
  },
  {
    id: 2,
    category: 'Role & Process Fundamentals',
    question: 'Who is a Business Analyst?',
    answer: 'A Business Analyst acts as an information liaison and process facilitator between business departments and the technical/engineering teams, ensuring user requirements are captured, validated, documented, and delivered successfully.'
  },
  {
    id: 3,
    category: 'Role & Process Fundamentals',
    question: 'Define the main responsibilities of a Business Analyst.',
    answer: `The primary responsibilities of a BA include:\n1. Requirements elicitation, analysis, and comprehensive documentation.\n2. Facilitating effective stakeholder communication and consensus-building.\n3. Creating precise business process models and workflows.\n4. Analyzing quantitative data to extract actionable business insights.\n5. Supporting User Acceptance Testing (UAT) and validating the final solution.`
  },
  {
    id: 4,
    category: 'Role & Process Fundamentals',
    question: 'What is the difference between a Business Analyst and a Data Analyst?',
    answer: 'A Business Analyst (BA) focuses primarily on business requirements, high-level processes, functional workflows, and scoping strategic solutions. A Data Analyst (DA) is generally more technical, deep-diving into structured datasets to identify trends, clean data, compile statistical distributions, and write machine-learning algorithms to inform specific analytical questions.'
  },
  {
    id: 5,
    category: 'Role & Process Fundamentals',
    question: 'What are the key steps in the business analysis process?',
    answer: 'The typical business analysis lifecycle includes:\n1. Identifying business needs, constraints, and project opportunities.\n2. Eliciting requirements via stakeholder workshops/interviews.\n3. Analyzing, refining, and documenting requirements.\n4. Managing requirements validation and alignment with stakeholders.\n5. Leading solution testing, validation, and post-deployment reviews.'
  },
  {
    id: 6,
    category: 'Role & Process Fundamentals',
    question: 'How do you identify business needs?',
    answer: 'Business needs are identified through targeted stakeholder interviews, collaborative design workshops, comprehensive root-cause analysis (such as the 5 Whys), current-state reviews, and measuring performance bottlenecks in existing operations.'
  },
  {
    id: 7,
    category: 'Role & Process Fundamentals',
    question: 'How do you document business requirements?',
    answer: 'Requirements are written down in structured documents, such as:\n- BRD (Business Requirements Document) - high-level business goals.\n- FRD/FRS (Functional Requirements Document/Specification) - exact system behaviors.\n- SRS (System Requirements Specification) - technical prerequisites.\n- Agile User Stories with explicit Gherkin-style Acceptance Criteria.'
  },
  {
    id: 8,
    category: 'Role & Process Fundamentals',
    question: 'What is a Requirement Traceability Matrix (RTM)?',
    answer: 'An RTM is a tabular grid mapping requirements back to business objectives and forward to specific test cases. It guarantees that every single requirement is verified during testing and that no feature creep with undocumented elements occurs.'
  },
  {
    id: 9,
    category: 'Role & Process Fundamentals',
    question: 'What is Gap Analysis?',
    answer: 'Gap Analysis is the comparative process of analyzing a business\'s current operational state (\"As-Is\") against its target state (\"To-Be\"), highlighting the systems, data parameters, or workforce gaps that must be closed to achieve the target.'
  },
  {
    id: 10,
    category: 'Role & Process Fundamentals',
    question: 'Explain Critical Path Analysis and Feasibility study.',
    answer: 'Critical Path Analysis identifies the absolute sequence of dependent tasks that dictates the minimum completion timeline of a project. A Feasibility Study assesses whether a solution is viable across Technical, Operational, Financial (ROI/NPV), Schedule, and Legal parameters.'
  },
  {
    id: 11,
    category: 'Tools, Techniques & Modeling',
    question: 'Name common Business Analyst tools.',
    answer: 'Standard BA applications include JIRA and Confluence for task tracking and documentation; MS Visio and Lucidchart for process mapping; SQL for querying database records; and BI tools like Tableau, Power BI, or Excel for dashboards and aggregations.'
  },
  {
    id: 12,
    category: 'Tools, Techniques & Modeling',
    question: 'What is SWOT analysis?',
    answer: 'SWOT stands for Strengths, Weaknesses, Opportunities, and Threats. It is a strategic tool used to evaluate a company\'s internal operational capabilities against external industry competitors and market parameters.'
  },
  {
    id: 13,
    category: 'Tools, Techniques & Modeling',
    question: 'What is MOST analysis?',
    answer: 'MOST analysis is an internal goal-alignment tool structured into four parts:\n- Mission: The ultimate aim and overview of the business.\n- Objectives: Quantifiable, time-bound targets (SMART goals).\n- Strategy: The overarching operational plan selected to reach goals.\n- Tactics: The daily actions and tasks executed to carry out strategies.'
  },
  {
    id: 14,
    category: 'Tools, Techniques & Modeling',
    question: 'What is STEER analysis?',
    answer: 'STEER is a framework used to outline macro-environmental factors impacting projects:\n- Socio-cultural (client demographics, trends)\n- Technological (availability of core systems)\n- Economic (GDP, budgets)\n- Ecological (sustainability directives)\n- Regulatory/Legal (compliance, KYC, GDPR)'
  },
  {
    id: 15,
    category: 'Tools, Techniques & Modeling',
    question: 'What are use case / flow diagrams?',
    answer: 'A Use Case describes actor-to-system interactions to achieve a unified goal. A Flow Diagram maps out step-by-step processes, outlining normal paths, alternative sequences (secondary routes), and exception paths (error recovery pipelines).'
  },
  {
    id: 16,
    category: 'Tools, Techniques & Modeling',
    question: 'Which modeling techniques do you use?',
    answer: 'BAs frequently use UML (Unified Modeling Language) diagrams, BPMN (Business Process Model and Notation) swimlanes for process mapping, ERD (Entity Relationship Diagrams) for data models, and wireframes for UI mockups.'
  },
  {
    id: 17,
    category: 'Tools, Techniques & Modeling',
    question: 'How do you prioritize requirements?',
    answer: 'Requirements are organized using frameworks like MoSCoW (Must have, Should have, Could have, Won\'t have), quantitative value-vs-complexity prioritization scoring grids, and direct stakeholder voting consensus workshops.'
  },
  {
    id: 18,
    category: 'Tools, Techniques & Modeling',
    question: 'How do you perform requirements elicitation?',
    answer: 'Requirements elicitation is performed through visual workshops, structured interviews with key users, surveys/questionnaires to capture broad feedback, direct on-the-job observation, and reviewing legacy documentation.'
  },
  {
    id: 19,
    category: 'Tools, Techniques & Modeling',
    question: 'What modeling experience do you have typically?',
    answer: 'BAs commonly create BPMN process flowcharts, actor-system UML use-case maps, high-level block designs, and rapid wireframe mockups to coordinate development tasks.'
  },
  {
    id: 20,
    category: 'Tools, Techniques & Modeling',
    question: 'What documents have you created in projects?',
    answer: 'Standard documentation include Business Case proposals, detailed Business Requirements Documents (BRD), User Acceptance Testing guides, user stories, and Change Request assessments.'
  },
  {
    id: 21,
    category: 'Technical & Data Skills',
    question: 'What is the value of analytical reporting?',
    answer: 'Analytical reporting aggregates structured figures to discover deep organizational trends, establish performance indicators, and inform strategic decisions, though accuracy remains constrained by underlying data cleanliness.'
  },
  {
    id: 22,
    category: 'Technical & Data Skills',
    question: 'What is your SQL experience?',
    answer: 'Comfortable with querying, writing subqueries, CTEs for query legibility, INNER/LEFT joins, and grouping (GROUP BY/HAVING) to extract and validate business metrics independently from IT.'
  },
  {
    id: 23,
    category: 'Technical & Data Skills',
    question: 'What is your BI tools experience?',
    answer: 'Experience with Power BI and Tableau for designing interactive reporting layouts, along with advanced Excel formulas (PivotTables, INDEX-MATCH, SUMIFS, and XLOOKUP) for rapid data analysis.'
  },
  {
    id: 24,
    category: 'Technical & Data Skills',
    question: 'How do you approach a new data analysis task?',
    answer: 'I follow a structured methodology:\n1. Define concrete business objectives and KPIs first.\n2. Elicit and extract the required source records.\n3. Clean, normalize, and handle empty database fields.\n4. Analyze trends and test statistical hypothesis.\n5. Design interactive visualizations. \n6. Interpret and present actionable recommendations.'
  },
  {
    id: 25,
    category: 'Technical & Data Skills',
    question: 'What is data modeling?',
    answer: 'Data modeling defines the logical and physical structures of database platforms. It uses ERD (Entity-Relationship Diagrams) to define entities, attributes, primary/foreign keys, and data relationships (one-to-many, many-to-many).'
  },
  {
    id: 26,
    category: 'Technical & Data Skills',
    question: 'How do you ensure data quality?',
    answer: 'By instituting validation rules at input levels, executing automated data-cleansing scripts (trimming spaces, handling nulls), performing periodic database reconciliation audits, and setting up strict key constraints.'
  },
  {
    id: 27,
    category: 'Technical & Data Skills',
    question: 'Explain what KPIs are.',
    answer: 'KPIs (Key Performance Indicators) are measurable, high-level strategic targets (like customer churn rate, gross sales, or average issue resolution times) used to track how effectively a company is delivering on its goals.'
  },
  {
    id: 28,
    category: 'Technical & Data Skills',
    question: 'How do you measure project success?',
    answer: 'Success is measured by confirming whether the solution achieves the original business case objectives, maintains high stakeholder satisfaction metrics, stays within budget limits, and delivers expected ROI or operating-cost reduction.'
  },
  {
    id: 29,
    category: 'Technical & Data Skills',
    question: 'Explain database querying versus documenting.',
    answer: 'Querying uses SQL or ETL pipelines to extract specific metrics from databases to validate ideas. Documenting translates that logic into requirements, helping engineering teams build reliable, reproducible workflows.'
  },
  {
    id: 30,
    category: 'Technical & Data Skills',
    question: 'How do you choose between BI tools?',
    answer: 'Selection is driven by existing systems (e.g., Microsoft Power BI for Office 365 environments vs. Tableau for deep explorations), user license costs, database scale, and user training.'
  },
  {
    id: 31,
    category: 'Behavioral & Stakeholder Management',
    question: 'How do you work with a difficult stakeholder?',
    answer: 'I practice active listening to hear their concerns directly, speak objectively with clear data, seek to understand their hidden concerns, find win-win compromises, and escalate to project sponsors only when a standstill threatens the roadmap.'
  },
  {
    id: 32,
    category: 'Behavioral & Stakeholder Management',
    question: 'Tell me about a time you advised against a stakeholder’s action (STAR).',
    answer: 'S: Client wanted to build a redundant customer reporting dashboard manually.\nT: I had to evaluate development effort versus client utility.\nA: I pulled development hour costs ($25k estimate) and showed Excel reports could easily be automated via Power Query instead.\nR: The client agreed, dropping the custom feature and saving 3 weeks of engineering work.'
  },
  {
    id: 33,
    category: 'Behavioral & Stakeholder Management',
    question: 'How do you handle conflicting opinions between different stakeholders?',
    answer: 'I hold collaborative alignment workshops, list core business values, present clear data, map potential solutions to business goals, and use prioritization frameworks like MoSCoW to help focus the discussion.'
  },
  {
    id: 34,
    category: 'Behavioral & Stakeholder Management',
    question: 'Tell me about a challenging stakeholder situation.',
    answer: 'I worked with an operations lead who completely resisted automated billing. Instead of forcing it, I sat down with them, mapped out how many hours they spent correcting manual typos, and demonstrated how the system would save them time. They became a strong champion for the project.'
  },
  {
    id: 35,
    category: 'Behavioral & Stakeholder Management',
    question: 'How do you communicate technical concepts to non-technical stakeholders?',
    answer: 'I use clear visual flowcharts, point to real analogies, avoid engineering jargon, and frame every technical choice around its business outcomes (e.g. \"database index\" -> \"an book-index allowing faster loading pages\").'
  },
  {
    id: 36,
    category: 'Behavioral & Stakeholder Management',
    question: 'Explain your approach to team collaboration.',
    answer: 'I maintain open communication through daily standups, clear shared backlog charts, and transparent Confluence documentation so everyone is aligned on deliverables.'
  },
  {
    id: 37,
    category: 'Behavioral & Stakeholder Management',
    question: 'How do you handle scope creep?',
    answer: 'I enforce a formal change-control process. When a stakeholder requests a new feature, I document its impact on budget and schedule, and present those trade-offs to the steering committee for a decision.'
  },
  {
    id: 38,
    category: 'Behavioral & Stakeholder Management',
    question: 'What is your daily routine as a Business Analyst?',
    answer: 'My day usually starts with morning engineering standups, followed by active requirements elicitation sessions, writing user stories, updating traceability matrices, and analyzing performance numbers.'
  },
  {
    id: 39,
    category: 'Behavioral & Stakeholder Management',
    question: 'How do you handle changing project requirements mid-stream?',
    answer: 'I assess the impact on current tasks, raise trade-offs with the product owner, update our Agile backlog priorities, and communicate the updated plan clearly to developers.'
  },
  {
    id: 40,
    category: 'Behavioral & Stakeholder Management',
    question: 'What is your change management approach?',
    answer: 'I use a structured framework: mapping stakeholders early, setting up communication plans, running training sessions before launch, and choosing phased rollouts to ensure high adoption rates.'
  },
  {
    id: 41,
    category: 'Scenario, Leadership & Strategy',
    question: 'Describe a highly successful project you participated in.',
    answer: 'I helped digitize a manual customer enrollment flow, reducing average onboarding times from 5 days to 20 minutes and driving a 30% increase in new accounts.'
  },
  {
    id: 42,
    category: 'Scenario, Leadership & Strategy',
    question: 'Tell me about a time you persuaded someone to change their view (STAR).',
    answer: 'S: Team leads wanted to purchase an expensive ERP system.\nT: I had to evaluate the actual business need versus the software cost.\nA: I mapped our custom requirements, proving our current tools met 90% of our needs with minor updates.\nR: The company opted for the in-house updates, saving $150,000 in software fees.'
  },
  {
    id: 43,
    category: 'Scenario, Leadership & Strategy',
    question: 'How did you handle presenting flawed data?',
    answer: 'I proactively took responsibility, corrected my analysis, sent updated reports to the stakeholders, and set up a stronger double-validation checklist for future presentations.'
  },
  {
    id: 44,
    category: 'Scenario, Leadership & Strategy',
    question: 'Explain your User Acceptance Testing (UAT) approach.',
    answer: 'I write clear, comprehensive test cases, guide focus groups of actual users, track testing progress in JIRA, and manage bug fixes prior to final sign-off.'
  },
  {
    id: 45,
    category: 'Scenario, Leadership & Strategy',
    question: 'What is your competency and experience level in testing?',
    answer: 'Experienced in organizing UAT workshops, writing user test cases, verifying data feeds, logging clear bug reports, and ensuring requirements match final deliverables.'
  },
  {
    id: 46,
    category: 'Scenario, Leadership & Strategy',
    question: 'How do you assess project feasibility and risk?',
    answer: 'I map out technical spikes, calculate return-on-investment, evaluate operational steps, and maintain updated project risk logs with clear mitigation plans.'
  },
  {
    id: 47,
    category: 'Scenario, Leadership & Strategy',
    question: 'What does enterprise analysis / business architecture mean?',
    answer: 'It is the strategic alignment of all IT projects with high-level business capabilities and values, ensuring everything we build fits our long-term goals.'
  },
  {
    id: 48,
    category: 'Scenario, Leadership & Strategy',
    question: 'Give an example of an initiative that you aligned with strategic goals.',
    answer: 'I proposed automating our KYC compliance checks, aligning perfectly with our company goals to reduce compliance risk while improving customer satisfaction.'
  },
  {
    id: 49,
    category: 'Scenario, Leadership & Strategy',
    question: 'How do you support solution validation in production?',
    answer: 'I run post-implementation review workshops, inspect database logs, monitor user adoption metrics, and ensure outstanding issues are resolved.'
  },
  {
    id: 50,
    category: 'Scenario, Leadership & Strategy',
    question: 'Explain leadership in a Business Analyst role.',
    answer: 'Leadership is about building alignment, coordinating cross-functional teams, driving decisions with clear data, and keeping everyone focused on delivering value.'
  }
];

export const BA_PROJECTS: Project[] = [
  {
    id: 'proj-zomato',
    title: 'Zomato Delivery Data Analysis',
    difficulty: 'Intermediate',
    tools: ['Python', 'SQL', 'Data Viz'],
    description: 'Analyze online foods delivery data to optimize timing pipelines and isolate areas with high order volume density.',
    deliverables: [
      'Interactive geo-heatmap displaying delivery bottlenecks',
      'Calculated busy intervals and avg delivery delays mapped per location sector'
    ],
    steps: [
      'Preprocess shipping datetimes, computing differences inside Pandas.',
      'Group counts by restaurant nodes, outlining order spikes.',
      'Generate a Seaborn or Matplotlib chart summarizing customer satisfaction ranks.'
    ],
    mockDataSnippet: `Restaurant_ID,Restaurant_Name,City,Average_Cost_for_two,Has_Table_booking,Aggregate_rating,Votes\n901,Zomato Palace,New Delhi,450,No,4.2,210\n902,Biryani Express,Kolkata,320,Yes,3.8,95\n903,Sweet Delight,Mumbai,250,No,4.5,145`
  },
  {
    id: 'proj-airbnb',
    title: 'Airbnb Listings Explorer & Pricing Modeller',
    difficulty: 'Beginner',
    tools: ['SQL', 'Excel', 'Data Viz'],
    description: 'Structure custom Excel Pivot Tables evaluating airbnb listing prices, assessing metrics against location and room layouts.',
    deliverables: [
      'Fully interactive Excel workbook featuring Slicers filtering cities and price ranges',
      'Comprehensive report outlining supply counts and optimal price targets'
    ],
    steps: [
      'Import Airbnb CSV into Excel, applying TRIM and LOWER strings conversions.',
      'Insert Pivot Table aggregating average nightly price and minimum booking nights.',
      'Build clustered columns representing average prices by room tier.'
    ],
    mockDataSnippet: `id,name,host_id,neighbourhood,latitude,longitude,room_type,price,minimum_nights,availability_365\n1012,Quiet Williamsburg Apt,4301,Brooklyn,40.71,-73.95,Entire home/apt,140,2,110\n1015,Sunny Bushwick Loft,1205,Brooklyn,40.69,-73.92,Private room,65,1,34\n1019,Manhattan Luxury Studio,8891,Manhattan,40.75,-73.98,Entire home/apt,220,3,180`
  },
  {
    id: 'proj-iphone',
    title: 'iPhone Global Sales trends Visualizer',
    difficulty: 'Beginner',
    tools: ['Excel', 'Data Viz'],
    description: 'Track model sales across four global regions, highlighting product margins.',
    deliverables: [
      'Dynamic stacked area chart mapping regional product splits monthly',
      'Goal-Seek calculator assessing optimal stock units to achieve sales quotas'
    ],
    steps: [
      'Normalize multi-currency sales reports into unified USD balances.',
      'Aggregate product sales categories inside an Excel dashboard.',
      'Create standard margin-variance reports comparing models performance.'
    ]
  },
  {
    id: 'proj-uber',
    title: 'Uber Trips Data Analysis',
    difficulty: 'Intermediate',
    tools: ['SQL', 'Python', 'Data Viz'],
    description: 'Identify vehicle pickup densities and high-demand times across NYC boroughs.',
    deliverables: [
      'Heatmap of hourly user request counts',
      'Calculated average trip distances and fare revenues across boroughs'
    ],
    steps: [
      'Clean timestamp fields inside Python / SQL.',
      'Identify localized high-volume passenger pickup zones.',
      'Plot trip metrics comparing weekday rushes versus weekend peaks.'
    ]
  },
  {
    id: 'proj-election',
    title: 'Indian Election Data Analysis',
    difficulty: 'Intermediate',
    tools: ['SQL', 'Tableau'],
    description: 'Isolate seat majorities, vote shares, and regional swing dynamics across constituencies.',
    deliverables: [
      'Tableau geographical map displaying constituency majority parties',
      'Distribution breakdown charts of narrow margin victories (< 500 votes)'
    ],
    steps: [
      'Join demographic voting registers with candidate outcomes.',
      'Query party-wise victory majorities and total regional vote shares.',
      'Build a Tableau dashboard displaying swing district stats.'
    ]
  },
  {
    id: 'proj-churn',
    title: 'Telecom Customer Churn Predictor',
    difficulty: 'Advanced',
    tools: ['Python', 'SQL', 'Power BI'],
    description: 'Segment clients at high risk of cancelation using engagement history records.',
    deliverables: [
      'Power BI tracking layout showing active customer churn rates',
      'Segmentation of risk factors (e.g. tenure, contract type)'
    ],
    steps: [
      'Use SQL CASE expressions to bin customer tenures into risk categories.',
      'Build a correlation model of customer support calls to cancellation rates.',
      'Publish a BI dashboard outlining high-risk customers.'
    ]
  },
  {
    id: 'proj-market-basket',
    title: 'Market Basket Association Discovery',
    difficulty: 'Advanced',
    tools: ['SQL', 'Python'],
    description: 'Analyze transactions to identify high-affinity product pairings for promotional retail campaigns.',
    deliverables: [
      'Comprehensive listing of frequent item pairings sorted with lift/support scores',
      'Proposed design shelf configurations for associated items'
    ],
    steps: [
      'Perform self-joins on items lists within identical transactions.',
      'Sum count frequencies of combinations and calculate association lifts.',
      'Translate statistical listings into retail shelf-plan layouts.'
    ]
  },
  {
    id: 'proj-housing',
    title: 'Real Estate Price Predictions & Regression',
    difficulty: 'Advanced',
    tools: ['Excel', 'Data Viz'],
    description: 'Calculate property price factors using housing area scales and location factors.',
    deliverables: [
      'Excel sheets featuring regression results reports',
      'Predictive model forecasting property prices'
    ],
    steps: [
      'Clean real-estate spreadsheets using Power Query.',
      'Run regression analyses via the Excel Analysis ToolPak.',
      'Plot residual errors charts analyzing variance factors.'
    ]
  },
  {
    id: 'proj-covid',
    title: 'Global Pandemic Metrics Tracker',
    difficulty: 'Advanced',
    tools: ['SQL', 'Tableau', 'Data Viz'],
    description: 'Query and chart global case metrics, infection speeds, and cumulative outcomes.',
    deliverables: [
      'Global spatial report displaying infection dynamics',
      'Bar races showing weekly changes in global statistics'
    ],
    steps: [
      'Query daily rolling case percentages using Window Functions.',
      'Join metrics sheets with population count estimates.',
      'Design interactive dashboard tabs in Tableau showing cases per capita.'
    ]
  }
];

export const FREE_COURSES: CertificationCourse[] = [
  {
    id: 'cert-coursera',
    provider: 'Coursera (Audit Mode)',
    title: 'Microsoft Business Analyst Professional Certificate',
    duration: '2-3 Months (Self-paced)',
    isFreeCert: false, // Audit is free, cert requires payment
    url: 'https://www.coursera.org',
    benefits: [
      'Learn standard Microsoft corporate analytics',
      'Full access to all video lessons and readings for free via \"Audit Course\" options',
      'Professional curriculum structured by Microsoft subject matter experts'
    ]
  },
  {
    id: 'cert-upgrad',
    provider: 'upGrad',
    title: 'Free Business Analyst Course with Certification',
    duration: '4 Hours (Self-paced)',
    isFreeCert: true,
    url: 'https://www.upgrad.com',
    benefits: [
      '100% free with no credit card required',
      'Covers Excel fundamentals, wireframing, and SQL basics',
      'Provides a verified digital certificate on completion'
    ]
  },
  {
    id: 'cert-simplilearn',
    provider: 'Simplilearn',
    title: 'Introduction to MS Excel / CBAP Foundational Training',
    duration: '7 Hours (Excel) / Aligned with CBAP syllabus',
    isFreeCert: true,
    url: 'https://www.simplilearn.com',
    benefits: [
      'Free 90-day access to complete the learning dashboard',
      'Includes introductory certifications on completion',
      'Strong theoretical alignment with standard CCBA syllabus'
    ]
  },
  {
    id: 'cert-alison',
    provider: 'Alison',
    title: 'Business Analysis Fundamentals',
    duration: '6-8 Hours',
    isFreeCert: true, // Course is free, basic digital cert option exists
    url: 'https://alison.com',
    benefits: [
      'Clear, accessible modules detailing requirements elicitation and modeling',
      'Comprehensive tests to verify knowledge retention',
      'Free learning access to BA process models'
    ]
  },
  {
    id: 'cert-w3schools',
    provider: 'W3Schools',
    title: 'Excel & SQL Interactive Tutorial Tracks',
    duration: 'Self-paced checklists',
    isFreeCert: false,
    url: 'https://www.w3schools.com',
    benefits: [
      'Excellent completely free coding playground and reading modules',
      'Use "My Learning" dashboard programs to track progress',
      'Dozens of quick quiz tests to check comprehension'
    ]
  }
];
