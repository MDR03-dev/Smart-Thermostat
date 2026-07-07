import { useState } from 'react';

const Settings = ({ sursa, handleSursaChange, putere, setPutere, pret, setPret }) => {
  const [pragInf, setPragInf] = useState(19.5);
  const [pragSup, setPragSup] = useState(22.5);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(''), 2000);
    }, 1200);
  };

  return (
    <main className="flex-1 md:ml-64 min-h-screen">
      <div className="pt-24 pb-12 px-container-padding max-w-4xl mx-auto space-y-stack-lg">
        <form className="space-y-stack-lg" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg">
            
            {/* Hysteresis Settings Card */}
            <div className="bg-surface-card p-stack-lg rounded-xl card-shadow border border-outline-variant hover:border-primary transition-colors group">
              <div className="flex items-center gap-stack-md mb-stack-lg">
                <div className="bg-primary-fixed p-3 rounded-lg text-primary">
                  <span className="material-symbols-outlined">thermostat</span>
                </div>
                <h4 className="text-headline-md text-primary">Setări Sistem (Histerezis)</h4>
              </div>
              
              <div className="space-y-stack-lg">
                <div className="space-y-2">
                  <label className="block text-label-md text-on-surface-variant" htmlFor="low-threshold">Prag inferior (Pornire încălzire)</label>
                  <div className="relative">
                    <input 
                      id="low-threshold"
                      type="number" step="0.1" value={pragInf} onChange={e => setPragInf(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none pr-12" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">°C</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant px-1 italic">Sistemul va porni automat sub această valoare.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-label-md text-on-surface-variant" htmlFor="high-threshold">Prag superior (Oprire încălzire)</label>
                  <div className="relative">
                    <input 
                      id="high-threshold"
                      type="number" step="0.1" value={pragSup} onChange={e => setPragSup(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none pr-12" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">°C</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant px-1 italic">Sistemul va opri încălzirea când atinge această valoare.</p>
                </div>
              </div>
            </div>

            {/* Financial Settings Card */}
            <div className="bg-surface-card p-stack-lg rounded-xl card-shadow border border-outline-variant hover:border-secondary transition-colors group">
              <div className="flex items-center gap-stack-md mb-stack-lg">
                <div className="bg-secondary-fixed p-3 rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h4 className="text-headline-md text-primary">Configurare Financiară</h4>
              </div>
              
              <div className="space-y-stack-lg">
                <div className="space-y-2">
                  <label className="block text-label-md text-on-surface-variant" htmlFor="energy-source">Sursă Energie</label>
                  <select 
                    id="energy-source"
                    value={sursa} onChange={handleSursaChange}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none appearance-none"
                  >
                    <option value="Gaz">Gaz (Metan)</option>
                    <option value="Electric">Electric (C.T.)</option>
                    <option value="AC">AC (Răcire)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-label-md text-on-surface-variant" htmlFor="energy-tariff">Tarif Energie (Lei/kWh)</label>
                  <div className="relative">
                    <input 
                      id="energy-tariff"
                      type="number" step="0.01" value={pret} onChange={e => setPret(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none pr-12" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">Lei</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant px-1 italic">Folosit pentru calcularea costurilor lunare estimate.</p>
                </div>

                <div className="space-y-2">
                  <label className="block text-label-md text-on-surface-variant" htmlFor="nominal-power">Putere Nominală Echipament (W)</label>
                  <div className="relative">
                    <input 
                      id="nominal-power"
                      type="number" step="0.5" value={putere} onChange={e => setPutere(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 text-on-surface focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none pr-12" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">W</span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant px-1 italic">Puterea de consum maximă a sistemului de climatizare.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Eco Banner */}
          <div className="bg-surface-container-high p-stack-md rounded-xl flex flex-col md:flex-row items-center justify-between gap-stack-md border-l-4 border-status-eco">
            <div className="flex items-center gap-stack-md">
              <span className="material-symbols-outlined text-status-eco" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              <div>
                <p className="text-label-md text-primary font-bold">Optimizare Eco-Smart</p>
                <p className="text-label-sm text-on-surface-variant">Setările actuale economisesc aproximativ 12% energie față de luna trecută.</p>
              </div>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Status</span>
              <p className="font-bold text-status-eco">OPTIMIZAT</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-stack-lg flex justify-end">
            <button 
              type="submit" 
              disabled={saveStatus === 'saving'}
              className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold flex items-center justify-center gap-stack-md shadow-lg active:scale-[0.98] transition-all hover:brightness-110 ${
                saveStatus === 'saved' 
                  ? 'bg-status-eco text-white' 
                  : saveStatus === 'saving'
                    ? 'bg-primary/80 text-on-primary pointer-events-none'
                    : 'bg-primary text-on-primary'
              }`}
            >
              <span className={`material-symbols-outlined ${saveStatus === 'saving' ? 'animate-spin' : ''}`}>
                {saveStatus === 'saved' ? 'check_circle' : saveStatus === 'saving' ? 'refresh' : 'save'}
              </span>
              {saveStatus === 'saved' ? 'Configurație Salvată' : saveStatus === 'saving' ? 'Se salvează...' : 'Salvează Configurarea'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Settings;
