const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="bg-background text-on-background min-h-screen">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-container-padding h-16 bg-surface dark:bg-inverse-surface shadow-sm border-b border-outline-variant">
        <div className="flex items-center gap-stack-md">
          <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-3xl">flare</span>
          <h1 className="text-sm font-bold text-primary dark:text-inverse-primary leading-tight max-w-[250px]">
            Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale
          </h1>
        </div>
      </header>

      <div className="flex pt-16 min-h-screen overflow-hidden pb-16 md:pb-0">
        {/* SideNavBar (Desktop) */}
        <nav className="hidden md:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-64 p-base bg-surface-container-low dark:bg-surface-container-lowest border-r border-outline-variant transition-all z-40">
          <div className="px-base py-stack-lg border-b border-outline-variant mb-stack-md">
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">System Status</p>
            <div className="mt-stack-sm flex items-center gap-base text-status-eco">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
              <span className="text-headline-md font-bold">Online</span>
            </div>
          </div>
          <div className="flex flex-col gap-base flex-grow">
            {/* Section 1: Dashboard */}
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-stack-md p-stack-md rounded-lg transition-all active:translate-x-1 w-full text-left cursor-pointer ${activeTab === 'dashboard' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
              <span className="font-label-md">Dashboard</span>
            </button>
            
            {/* Section 2: Istoric & KPI */}
            <button 
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-stack-md p-stack-md rounded-lg transition-all active:translate-x-1 w-full text-left cursor-pointer ${activeTab === 'history' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'history' ? { fontVariationSettings: "'FILL' 1" } : {}}>query_stats</span>
              <span className="font-label-md">Istoric &amp; KPI</span>
            </button>
            
            {/* Section 3: Setări & Financiar */}
            <button 
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-stack-md p-stack-md rounded-lg transition-all active:translate-x-1 w-full text-left cursor-pointer ${activeTab === 'settings' ? 'bg-secondary-container text-on-secondary-container font-bold' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              <span className="material-symbols-outlined" style={activeTab === 'settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings_suggest</span>
              <span className="font-label-md">Setări &amp; Financiar</span>
            </button>
            
            <div className="mt-stack-lg pt-stack-lg border-t border-outline-variant opacity-50 px-base">
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Încăperi</span>
            </div>
            <a className="flex items-center gap-stack-md p-stack-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:translate-x-1" href="#">
              <span className="material-symbols-outlined text-sm">weekend</span>
              <span className="font-label-md text-sm">Living Room</span>
            </a>
            <a className="flex items-center gap-stack-md p-stack-md text-on-surface-variant hover:bg-surface-container-high rounded-lg transition-all active:translate-x-1" href="#">
              <span className="material-symbols-outlined text-sm">kitchen</span>
              <span className="font-label-md text-sm">Kitchen</span>
            </a>
          </div>
        </nav>
        
        {/* Main Content Area */}
        {children}
      </div>

      {/* BottomNavBar (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface shadow-lg px-container-padding h-16 flex items-center justify-between z-50 border-t border-outline-variant">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'dashboard' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined" style={activeTab === 'dashboard' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
          <span className="text-[10px] font-medium">Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'history' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined" style={activeTab === 'history' ? { fontVariationSettings: "'FILL' 1" } : {}}>query_stats</span>
          <span className="text-[10px] font-medium">Climat</span>
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center gap-1 ${activeTab === 'settings' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
        >
          <span className="material-symbols-outlined" style={activeTab === 'settings' ? { fontVariationSettings: "'FILL' 1" } : {}}>settings</span>
          <span className="text-[10px] font-medium">Setări</span>
        </button>
        <button 
          className="flex flex-col items-center justify-center gap-1 text-on-surface-variant cursor-not-allowed opacity-50"
        >
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] font-medium">Profil</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
