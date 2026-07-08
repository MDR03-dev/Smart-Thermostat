# Graph Report - .  (2026-07-08)

## Corpus Check
- Corpus is ~4,558 words - fits in a single context window. You may not need a graph.

## Summary
- 53 nodes · 57 edges · 7 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- UI Components & Pages
- Package Configuration
- Firebase & Authentication
- Build & Lint Tooling
- Application Dependencies

## God Nodes (most connected - your core abstractions)
1. `scripts` - 5 edges
2. `firebase` - 2 edges
3. `App()` - 2 edges
4. `Layout()` - 2 edges
5. `db` - 2 edges
6. `auth` - 2 edges
7. `Dashboard()` - 2 edges
8. `History()` - 2 edges
9. `Settings()` - 2 edges
10. `private` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (7 total, 0 thin omitted)

### Community 0 - "UI Components & Pages"
Cohesion: 0.22
Nodes (7): App(), client, queryApi, Layout(), Dashboard(), History(), Settings()

### Community 1 - "Package Configuration"
Cohesion: 0.20
Nodes (9): name, private, scripts, build, dev, lint, preview, type (+1 more)

### Community 2 - "Firebase & Authentication"
Cohesion: 0.22
Nodes (6): firebase, AuthContext, app, auth, db, firebaseConfig

### Community 3 - "Build & Lint Tooling"
Cohesion: 0.20
Nodes (10): devDependencies, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, @types/react, @types/react-dom (+2 more)

### Community 4 - "Application Dependencies"
Cohesion: 0.25
Nodes (8): dependencies, @influxdata/influxdb-client, lucide-react, react, react-dom, recharts, tailwindcss, @tailwindcss/vite

## Knowledge Gaps
- **29 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+24 more)
  These have ≤1 connection - possible missing edges or undocumented components.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Application Dependencies` to `Package Configuration`, `Firebase & Authentication`?**
  _High betweenness centrality (0.590) - this node is a cross-community bridge._
- **Why does `firebase` connect `Firebase & Authentication` to `Application Dependencies`?**
  _High betweenness centrality (0.465) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Build & Lint Tooling` to `Package Configuration`?**
  _High betweenness centrality (0.305) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _29 weakly-connected nodes found - possible documentation gaps or missing edges._