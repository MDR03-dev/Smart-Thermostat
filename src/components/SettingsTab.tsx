/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Coins, 
  ShieldAlert, 
  Leaf, 
  Save, 
  RefreshCw, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { SystemSettings } from '../types';

interface SettingsTabProps {
  settings: SystemSettings;
  updateSettings: (updated: Partial<SystemSettings>) => void;
}

export default function SettingsTab({
  settings,
  updateSettings,
}: SettingsTabProps) {
  // Local form states to avoid sluggish keypresses
  const [hysteresis, setHysteresis] = useState<number>(settings.hysteresis);
  const [energyTariff, setEnergyTariff] = useState<number>(settings.energyTariff);
  const [nominalPowerHeating, setNominalPowerHeating] = useState<number>(settings.nominalPowerHeating);
  const [nominalPowerCooling, setNominalPowerCooling] = useState<number>(settings.nominalPowerCooling);
  const [selectedTariff, setSelectedTariff] = useState<'Standard' | 'Noapte (Redus)' | 'Eco Plus'>(settings.selectedTariffProfile);

  // Visual button saving states
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Form logical validations
    if (hysteresis <= 0 || energyTariff <= 0 || nominalPowerHeating <= 0 || nominalPowerCooling <= 0) {
      setErrorMsg('Toate valorile introduse trebuie să fie pozitive.');
      return;
    }

    // Trigger saving simulation micro-interaction
    setSaveState('saving');
    
    setTimeout(() => {
      // Save globally
      updateSettings({
        hysteresis,
        energyTariff,
        nominalPowerHeating,
        nominalPowerCooling,
        selectedTariffProfile: selectedTariff,
      });
      
      setSaveState('saved');

      setTimeout(() => {
        setSaveState('idle');
      }, 2000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Settings Form Wrapper */}
      <form onSubmit={handleSubmit} className="space-y-6" id="settings-form">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Hysteresis Configuration Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-primary/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary-fixed text-primary p-3 rounded-xl dark:bg-slate-800 dark:text-sky-400">
                  <span className="font-bold text-sm">Hyst</span>
                </div>
                <h4 className="font-bold text-lg text-primary dark:text-white">
                  Setări Sistem (Histerezis)
                </h4>
              </div>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
                    Valoare Histerezis
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.1"
                      value={hysteresis}
                      onChange={(e) => setHysteresis(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-primary focus:outline-none transition-all pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                      °C
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    Diferența de temperatură față de țintă la care sistemul comută starea.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Configuration Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-secondary/20 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary-fixed text-on-secondary-container p-3 rounded-xl dark:bg-slate-800 dark:text-status-cooling">
                  <Coins className="w-5 h-5 text-secondary dark:text-status-cooling" />
                </div>
                <h4 className="font-bold text-lg text-primary dark:text-white">
                  Configurare Financiară
                </h4>
              </div>

              <div className="space-y-5">
                {/* Energy Tariff */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
                    Tarif Energie (Lei/kWh)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      step="0.01"
                      value={energyTariff}
                      onChange={(e) => setEnergyTariff(parseFloat(e.target.value) || 0)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-secondary focus:outline-none transition-all pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                      Lei
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    Folosit pentru calcularea costurilor lunare estimate.
                  </p>
                </div>

                {/* Nominal Power Heating */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
                    Putere Nominală Centrală (W)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={nominalPowerHeating}
                      onChange={(e) => setNominalPowerHeating(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-secondary focus:outline-none transition-all pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                      W
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    Puterea de consum la încălzire.
                  </p>
                </div>

                {/* Nominal Power Cooling */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-500 dark:text-slate-400">
                    Putere Nominală Sistem Aer Condiționat (W)
                  </label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={nominalPowerCooling}
                      onChange={(e) => setNominalPowerCooling(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-sm font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-secondary focus:outline-none transition-all pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                      W
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    Puterea de consum la răcire.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Validation Errors container */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-error-container text-on-error-container border border-red-200 flex items-center gap-3 text-xs font-semibold animate-shake">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Summary Info Card / Eco-Smart layout banner */}
        <div className="bg-slate-100 dark:bg-slate-800/40 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 border-l-4 border-status-eco">
          <div className="flex items-center gap-3">
            <Leaf className="w-5 h-5 text-status-eco animate-pulse shrink-0" />
            <div>
              <p className="font-bold text-sm text-primary dark:text-white">
                Optimizare Eco-Smart
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Setările actuale economisesc aproximativ 12% energie față de luna trecută.
              </p>
            </div>
          </div>
          
          <div className="text-right hidden md:block">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">
              Status
            </span>
            <p className="font-black text-status-eco text-sm">OPTIMIZAT</p>
          </div>
        </div>

        {/* Action Button Container */}
        <div className="flex justify-end pt-2">
          <button 
            type="submit"
            disabled={saveState === 'saving'}
            className={`w-full md:w-auto px-12 py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer ${
              saveState === 'saving'
                ? 'bg-slate-400 text-white cursor-not-allowed opacity-80'
                : saveState === 'saved'
                ? 'bg-status-eco text-white shadow-status-eco/25'
                : 'bg-primary text-white hover:brightness-110 active:scale-[0.98]'
            }`}
          >
            {saveState === 'idle' && (
              <>
                <Save className="w-5 h-5" />
                Salvează Configurarea
              </>
            )}
            
            {saveState === 'saving' && (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Se salvează...
              </>
            )}

            {saveState === 'saved' && (
              <>
                <CheckCircle className="w-5 h-5 animate-bounce" />
                Configurație Salvată
              </>
            )}
          </button>
        </div>

      </form>

    </div>
  );
}
