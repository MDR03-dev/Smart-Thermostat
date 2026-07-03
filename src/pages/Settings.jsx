import React, { useState } from 'react';

const Settings = ({ sursa, handleSursaChange, putere, setPutere, pret, setPret }) => {
  const [pragInf, setPragInf] = useState(19.5);
  const [pragSup, setPragSup] = useState(22.5);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setSaveStatus('SALVAT');
    setTimeout(() => setSaveStatus(''), 3000);
    // Here we would actually save to Firebase config/ if needed
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
                <h4 className="font-headline-md text-headline-md text-primary">Setări Sistem (Histerezis)</h4>
              </div>
              
              <div className="space-y-stack-lg">
                <div className="space-y-2">
                  <label className="block font-label-md text-on-surface">Prag inferior (Pornire încălzire)</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" value={pragInf} onChange={e => setPragInf(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md text-on-surface font-body-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">°C</span>
                  </div>
                  <p className="text-label-sm text-text-secondary italic">Sistemul va porni automat sub această valoare.</p>
                </div>

                <div className="space-y-2">
                  <label className="block font-label-md text-on-surface">Prag superior (Oprire încălzire)</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" value={pragSup} onChange={e => setPragSup(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md text-on-surface font-body-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all outline-none" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">°C</span>
                  </div>
                  <p className="text-label-sm text-text-secondary italic">Sistemul va opri încălzirea când atinge această valoare.</p>
                </div>
              </div>
            </div>

            {/* Financial Settings Card */}
            <div className="bg-surface-card p-stack-lg rounded-xl card-shadow border border-outline-variant hover:border-secondary transition-colors group">
              <div className="flex items-center gap-stack-md mb-stack-lg">
                <div className="bg-secondary-container p-3 rounded-lg text-on-secondary-container">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-primary">Configurare Financiară</h4>
              </div>
              
              <div className="space-y-stack-lg">
                <div className="space-y-2">
                  <label className="block font-label-md text-on-surface">Sursă Energie</label>
                  <select 
                    value={sursa} onChange={handleSursaChange}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md text-on-surface font-body-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none appearance-none"
                  >
                    <option value="Gaz">Gaz (Metan)</option>
                    <option value="Electric">Electric (C.T.)</option>
                    <option value="AC">AC (Răcire)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block font-label-md text-on-surface">Tarif Energie (Lei/kWh)</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.01" value={pret} onChange={e => setPret(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md text-on-surface font-body-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">Lei</span>
                  </div>
                  <p className="text-label-sm text-text-secondary italic">Folosit pentru calcularea costurilor lunare estimate.</p>
                </div>

                <div className="space-y-2">
                  <label className="block font-label-md text-on-surface">Putere Nominală Echipament (kW)</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.5" value={putere} onChange={e => setPutere(Number(e.target.value))}
                      className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-md text-on-surface font-body-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">kW</span>
                  </div>
                  <p className="text-label-sm text-text-secondary italic">Puterea de consum maximă a sistemului de climatizare.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-status-eco/10 border-l-4 border-status-eco p-stack-md rounded-r-lg flex justify-between items-center">
            <div className="flex items-center gap-stack-md">
              <span className="material-symbols-outlined text-status-eco">eco</span>
              <div>
                <h5 className="font-label-md font-bold text-on-surface">Optimizare Eco-Smart</h5>
                <p className="text-label-sm text-text-secondary">Setările actuale economisesc aproximativ 12% energie față de luna trecută.</p>
              </div>
            </div>
            <span className="text-xs font-bold text-status-eco tracking-widest uppercase">
              STATUS<br/>OPTIMIZAT
            </span>
          </div>

          <div className="flex justify-end pt-stack-md">
            <button type="submit" className="bg-primary text-on-primary px-8 py-4 rounded-xl font-headline-md text-headline-md flex items-center gap-stack-md hover:bg-primary-container hover:text-white transition-colors shadow-lg active:scale-95">
              <span className="material-symbols-outlined">save</span>
              {saveStatus === 'SALVAT' ? 'Salvat cu succes' : 'Salvează Configurarea'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Settings;
