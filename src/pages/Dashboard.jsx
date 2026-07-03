import React from 'react';

const Dashboard = ({ 
  currentTemp, currentHumidity, targetTemp, handleAdjustSetpoint,
  relay1Status, relay1Command, handleToggleRelay1,
  relay2Status, relay2Command, handleToggleRelay2,
  scenariuActiv, handleApplyPreset,
  costCalculat
}) => {
  const isRelay1Pending = relay1Command !== relay1Status;
  const isRelay2Pending = relay2Command !== relay2Status;

  // Visual classes for dynamic temp colors
  const getTempColorClass = (temp) => {
    if (temp > 24) return 'text-status-heating';
    if (temp < 20) return 'text-status-cooling';
    return 'text-primary';
  };

  return (
    <main className="flex-1 md:ml-64 p-container-padding overflow-y-auto bg-background h-screen">
      <div className="max-w-7xl mx-auto space-y-stack-lg">
        
        {/* Live Data Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Temp Card */}
          <div className="glass-card p-stack-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-status-heating">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-status-heating bg-tertiary-fixed p-base rounded-lg">thermometer</span>
              <span className="text-label-sm text-on-surface-variant font-medium">Interior</span>
            </div>
            <div className="mt-stack-md flex items-baseline gap-base">
              <span className="font-display-temp text-display-temp text-primary">
                {currentTemp !== null ? currentTemp.toFixed(1) : '--'}
              </span>
              <span className="font-headline-md text-headline-md text-on-surface-variant">°C</span>
            </div>
            <p className="text-label-sm text-on-surface-variant mt-stack-sm">Ideal: 22°C - 24°C</p>
          </div>
          
          {/* Humidity Card */}
          <div className="glass-card p-stack-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-status-cooling">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-status-cooling bg-secondary-fixed p-base rounded-lg" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
              <span className="text-label-sm text-on-surface-variant font-medium">Umiditate</span>
            </div>
            <div className="mt-stack-md flex items-baseline gap-base">
              <span className="font-display-temp text-display-temp text-primary">
                {currentHumidity !== null ? currentHumidity.toFixed(1) : '--'}
              </span>
              <span className="font-headline-md text-headline-md text-on-surface-variant">%</span>
            </div>
            <p className="text-label-sm text-on-surface-variant mt-stack-sm">Zonă de confort optimă</p>
          </div>
          
          {/* Energy Card */}
          <div className="glass-card p-stack-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] border-l-4 border-status-eco">
            <div className="flex justify-between items-start">
              <span className="material-symbols-outlined text-status-eco bg-status-eco/10 p-base rounded-lg">bolt</span>
              <span className="text-label-sm text-on-surface-variant font-medium">Consum Instant</span>
            </div>
            <div className="mt-stack-md flex flex-col">
              <div className="flex items-baseline gap-base">
                <span className="font-display-temp text-display-temp text-primary">
                  {relay1Status ? '824' : relay2Status ? '1200' : '5'}
                </span>
                <span className="font-headline-md text-headline-md text-on-surface-variant">W</span>
              </div>
              <span className="text-label-sm font-bold text-on-surface-variant">
                {relay1Status ? '3.65' : relay2Status ? '5.20' : '0.02'} A
              </span>
            </div>
          </div>
        </div>

        {/* Control & Scenarios Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
          
          {/* Temp Control Widget */}
          <div className="lg:col-span-7 glass-card p-stack-lg rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 opacity-50 ${relay1Status ? 'bg-status-heating' : relay2Status ? 'bg-status-cooling' : 'bg-surface-variant'}`}></div>
            <h3 className="font-headline-md text-headline-md text-primary mb-stack-lg self-start">Control Climă</h3>
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Circular Progress Visual */}
              <div className="absolute inset-0 rounded-full border-[12px] border-surface-container flex items-center justify-center">
                <div className={`absolute inset-[-4px] rounded-full border-[2px] border-dashed border-outline-variant ${relay1Status || relay2Status ? 'animate-[spin_60s_linear_infinite]' : ''}`}></div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center transition-transform">
                <span className="text-label-md text-on-surface-variant font-bold uppercase tracking-widest">Setpoint</span>
                <div className={`font-display-temp text-display-temp transition-colors ${getTempColorClass(targetTemp)}`}>
                  {targetTemp.toFixed(1)}
                </div>
                <span className="text-headline-md text-on-surface-variant">° Celsius</span>
              </div>
              
              {/* Floating Buttons */}
              <button onClick={() => handleAdjustSetpoint(-0.5)} className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-16 h-16 bg-surface-card shadow-xl rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-90 border border-outline-variant">
                <span className="material-symbols-outlined text-3xl">remove</span>
              </button>
              <button onClick={() => handleAdjustSetpoint(0.5)} className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-16 h-16 bg-primary shadow-xl rounded-full flex items-center justify-center text-white hover:bg-primary-container transition-all active:scale-90">
                <span className="material-symbols-outlined text-3xl">add</span>
              </button>
            </div>
            
            <div className="mt-stack-lg flex gap-gutter w-full">
              <button 
                onClick={handleToggleRelay2}
                className={`flex-1 py-stack-md rounded-lg font-bold transition-all flex items-center justify-center gap-base border border-transparent ${isRelay2Pending ? 'bg-amber-100 text-amber-700 animate-pulse border-amber-300' : relay2Status ? 'bg-status-cooling text-white shadow-lg' : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'}`}
              >
                <span className="material-symbols-outlined">ac_unit</span>
                {isRelay2Pending ? 'Așteptare...' : 'Răcire'}
              </button>
              <button 
                onClick={handleToggleRelay1}
                className={`flex-1 py-stack-md rounded-lg font-bold transition-all flex items-center justify-center gap-base border border-transparent ${isRelay1Pending ? 'bg-amber-100 text-amber-700 animate-pulse border-amber-300' : relay1Status ? 'bg-status-heating text-white shadow-lg' : 'bg-surface-container-high text-on-surface hover:bg-surface-variant'}`}
              >
                <span className="material-symbols-outlined" style={relay1Status ? { fontVariationSettings: "'FILL' 1" } : {}}>leak_remove</span>
                {isRelay1Pending ? 'Așteptare...' : 'Încălzire'}
              </button>
            </div>
          </div>
          
          {/* Scenarios & Finance */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            {/* Scenarios Section */}
            <div className="glass-card p-stack-lg rounded-xl shadow-sm flex flex-col gap-stack-md flex-1">
              <h3 className="font-headline-md text-headline-md text-primary">Scenarii</h3>
              <div className="flex flex-col gap-stack-sm h-full justify-between">
                <button 
                  onClick={() => handleApplyPreset("Acasă", 22.0, 24.0)} 
                  className={`flex items-center justify-between p-stack-md rounded-lg shadow-sm transition-all ${scenariuActiv === 'Acasă' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}
                >
                  <div className="flex items-center gap-stack-md">
                    <span className="material-symbols-outlined" style={scenariuActiv === 'Acasă' ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
                    <span className="font-bold">Acasă</span>
                  </div>
                  {scenariuActiv === 'Acasă' && <span className="text-xs bg-white/20 px-base py-1 rounded-full">Activ</span>}
                </button>
                <button 
                  onClick={() => handleApplyPreset("Plecat", 16.0, 28.0)}
                  className={`flex items-center justify-between p-stack-md rounded-lg shadow-sm transition-all ${scenariuActiv === 'Plecat' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}
                >
                  <div className="flex items-center gap-stack-md">
                    <span className="material-symbols-outlined" style={scenariuActiv === 'Plecat' ? { fontVariationSettings: "'FILL' 1" } : {}}>directions_run</span>
                    <span className="font-bold">Plecat</span>
                  </div>
                  {scenariuActiv === 'Plecat' && <span className="text-xs bg-white/20 px-base py-1 rounded-full">Activ</span>}
                </button>
                <button 
                  onClick={() => handleApplyPreset("Noapte", 19.5, 25.0)}
                  className={`flex items-center justify-between p-stack-md rounded-lg shadow-sm transition-all ${scenariuActiv === 'Noapte' ? 'bg-primary text-white shadow-lg scale-[1.02]' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'}`}
                >
                  <div className="flex items-center gap-stack-md">
                    <span className="material-symbols-outlined" style={scenariuActiv === 'Noapte' ? { fontVariationSettings: "'FILL' 1" } : {}}>bedtime</span>
                    <span className="font-bold">Noapte</span>
                  </div>
                  {scenariuActiv === 'Noapte' && <span className="text-xs bg-white/20 px-base py-1 rounded-full">Activ</span>}
                </button>
              </div>
            </div>
            
            {/* Financial Sidebar */}
            <div className="glass-card p-stack-lg rounded-xl shadow-sm border border-outline-variant bg-surface-container-lowest">
              <div className="flex items-center gap-base mb-stack-md">
                <span className="material-symbols-outlined text-on-secondary-container">payments</span>
                <h3 className="font-headline-md text-headline-md text-primary">Analiză Financiară</h3>
              </div>
              <div className="space-y-stack-md">
                <div className="bg-surface-container p-stack-md rounded-lg">
                  <p className="text-label-sm text-on-surface-variant">Cost estimat curent (Lună)</p>
                  <p className="text-headline-lg text-primary font-black">{costCalculat ? costCalculat.toFixed(2) : '0.00'} Lei</p>
                </div>
                <div className="flex items-center gap-base text-status-eco">
                  <span className="material-symbols-outlined text-sm">trending_down</span>
                  <span className="text-xs font-medium">Sistem optimizat ECO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
