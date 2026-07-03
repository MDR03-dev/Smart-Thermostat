# Reproiectare Majoră - Lumina Home Dashboard (3 Pagini)

Acest plan detaliază migrarea de la dashboard-ul curent (Single Page, Dark Theme) la noul design "Lumina Home" (Light Theme, 3 pagini distincte), integrând logica Firebase și InfluxDB existentă.

## User Review Required

> [!WARNING]
> **Schimbare completă de Design:** Acest proces va înlocui total tema actuală (Dark Mode, interfață unificată) cu noul design (Light Theme, meniu lateral, 3 pagini). Vrei să păstrăm vreo componentă veche, sau mergem 100% pe vizualurile noi pe care le-ai trimis?
> **Navigație:** Fiind o aplicație mică, propun să folosim un sistem de navigație simplu bazat pe stări (`activeTab`), fără a instala biblioteci suplimentare precum `react-router-dom`. E în regulă?

## Proposed Changes

Vom împărți aplicația monolitică în componente reutilizabile și vom configura Tailwind v4.

---

### Configurare și Layout

#### [MODIFY] [index.css](file:///c:/Users/MDR/Documents/frontend-termostat/src/index.css)
- Adăugarea paletei masive de culori și a variabilelor de design trimise prin `<script id="tailwind-config">` folosind sintaxa modernă `@theme` specifică Tailwind v4.
- Includerea fonturilor Google (Inter) și a iconițelor Material Symbols.

#### [NEW] [Layout.jsx](file:///c:/Users/MDR/Documents/frontend-termostat/src/components/Layout.jsx)
- Construirea barei superioare (TopAppBar).
- Construirea meniului lateral (SideNavBar) care va gestiona schimbarea tab-urilor (Dashboard, Istoric, Setări).

#### [MODIFY] [App.jsx](file:///c:/Users/MDR/Documents/frontend-termostat/src/App.jsx)
- Extragerea structurii vizuale. `App.jsx` va deveni un orchestrator care:
  1. Menține state-ul pentru tab-ul activ (`activeTab`).
  2. Inițiază conexiunile cu Firebase și InfluxDB (pentru a nu pierde datele la schimbarea paginilor).
  3. Randează `Layout.jsx` și injectează una din cele 3 pagini în interior.

---

### Pagini

#### [NEW] [Dashboard.jsx](file:///c:/Users/MDR/Documents/frontend-termostat/src/pages/Dashboard.jsx)
- Traducerea HTML-ului din fisierul `home`.
- Integrarea afișajelor pentru Temperatură (Interior), Umiditate, Consum Instant.
- Integrarea "Control Climă" (roata cu setpoint, butoanele +/-).
- Integrarea butoanelor Răcire/Încălzire care vor lansa acțiunile de comutare a releelor în Firebase (logica duală).
- Integrarea Scenariilor și a Sidebar-ului financiar.
- Micul grafic "Istoric 24h" din josul paginii.

#### [NEW] [History.jsx](file:///c:/Users/MDR/Documents/frontend-termostat/src/pages/History.jsx)
- Traducerea HTML-ului din fisierul `istoric kpi`.
- KPI-urile de top (Temp Medie, Consum Total, Timp Funcționare) vor fi alimentate de variabilele din statul global (`stats` din `App.jsx`).
- Înlocuirea graficului SVG simulat (Evoluție Temp & Umiditate) cu o instanță reală de `Recharts`, legată de `historyData` din InfluxDB.
- Construirea "Consum Energie / Oră" (barchart-ul) folosind `Recharts`.

#### [NEW] [Settings.jsx](file:///c:/Users/MDR/Documents/frontend-termostat/src/pages/Settings.jsx)
- Traducerea HTML-ului din fisierul `setari si financiar`.
- Legarea form-urilor la state-urile pentru Histerezis (urmează a fi create în Firebase `config/`), Tarif Energie, și Putere Echipament.
- Butonul "Salvează Configurarea" care va scrie în Firebase RTDB (zona `config/`).

## Verification Plan

### Manual Verification
1. Verificarea funcționării corecte a link-urilor din meniul lateral (trecerea fluidă între cele 3 pagini).
2. Verificarea butoanelor de Control Climă din Dashboard -> trebuie să aprindă/stingă releele în Firebase.
3. Vizitarea tab-ului `Istoric & KPI` -> graficul trebuie să deseneze corect datele din InfluxDB.
4. Vizitarea tab-ului `Setări` -> modificarea și salvarea parametrilor.
5. Vom face un nou deployment pe Firebase Hosting la finalizarea implementării.
