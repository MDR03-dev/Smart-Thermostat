/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Zap, 
  Plus, 
  Minus, 
  Flame, 
  Snowflake, 
  Home, 
  Footprints, 
  Moon, 
  DollarSign,
  TrendingDown,
  Info
} from 'lucide-react';
import { RoomState, SystemSettings } from '../types';

interface DashboardTabProps {
  activeRoom: RoomState;
  updateActiveRoom: (updated: Partial<RoomState>) => void;
  settings: SystemSettings;
  updateSettings: (updated: Partial<SystemSettings>) => void;
}

export default function DashboardTab({
  activeRoom,
  updateActiveRoom,
  settings,
  updateSettings,
}: DashboardTabProps) {
  // Determine if climatization is actively working
  const isHeatingActive = activeRoom.mode === 'heating' && activeRoom.currentTemp < activeRoom.setpoint;
  const isCoolingActive = activeRoom.mode === 'cooling' && activeRoom.currentTemp > activeRoom.setpoint;
  const isDeviceOn = isHeatingActive || isCoolingActive;

  // Real-time fluctuating power draw simulation
  const [powerVariance, setPowerVariance] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDeviceOn) {
        // Fluctuate around nominal power slightly for ultra-realism
        setPowerVariance(Math.floor(Math.random() * 30) - 15);
      } else {
        setPowerVariance(Math.floor(Math.random() * 4) - 2);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isDeviceOn]);

  const instantPower = isDeviceOn 
    ? Math.max(100, settings.nominalPower + powerVariance) 
    : Math.max(5, 18 + powerVariance);

  const currentAmperes = (instantPower / 230).toFixed(2);

  // Dynamic estimated monthly cost based on Tariff profile & Power
  let baseCost = 14.50;
  if (settings.selectedTariffProfile === 'Standard') {
    baseCost = 18.20;
  } else if (settings.selectedTariffProfile === 'Noapte (Redus)') {
    baseCost = 11.10;
  }
  // Slightly adjust cost based on the current setpoint to make it look responsive
  const costMultiplier = Math.max(0.6, 1 + (activeRoom.setpoint - 22.5) * 0.15);
  const estimatedCost = (baseCost * costMultiplier).toFixed(2);

  // Handler for setting temperatures
  const adjustSetpoint = (amount: number) => {
    const updatedSetpoint = parseFloat((activeRoom.setpoint + amount).toFixed(1));
    updateActiveRoom({ setpoint: updatedSetpoint });
  };

  // Handler for scenario selection
  const handleScenarioChange = (scenario: 'home' | 'away' | 'night') => {
    let targetSetpoint = activeRoom.setpoint;
    if (scenario === 'home') targetSetpoint = 22.5;
    else if (scenario === 'away') targetSetpoint = 17.0;
    else if (scenario === 'night') targetSetpoint = 20.0;

    updateActiveRoom({ 
      scenario, 
      setpoint: targetSetpoint,
      // Default cooling/heating based on room selection
      mode: activeRoom.id === 'kitchen' && scenario === 'away' ? 'cooling' : 'heating'
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Live Data Header Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="live-telemetry-row">
        
        {/* Temperature Card */}
        <div className="glass-card p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 dark:border-slate-800/60 border-l-4 border-l-status-heating bg-white dark:bg-slate-900 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <span className="p-2.5 rounded-xl bg-tertiary-fixed text-status-heating dark:bg-status-heating/20 flex items-center justify-center">
              <Thermometer className="w-5 h-5" />
            </span>
            <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Sensor {activeRoom.name}
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-5xl font-extrabold text-primary dark:text-white tracking-tight">
              {activeRoom.currentTemp.toFixed(1)}
            </span>
            <span className="text-xl font-bold text-slate-400">°C</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-heating animate-pulse" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Ideal: {settings.lowThreshold}°C - {settings.highThreshold}°C
            </p>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="glass-card p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 dark:border-slate-800/60 border-l-4 border-l-status-cooling bg-white dark:bg-slate-900 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <span className="p-2.5 rounded-xl bg-secondary-fixed text-secondary dark:bg-status-cooling/20 flex items-center justify-center">
              <Droplets className="w-5 h-5 text-status-cooling" />
            </span>
            <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Umiditate Aer
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-5xl font-extrabold text-primary dark:text-white tracking-tight">
              {activeRoom.humidity}
            </span>
            <span className="text-xl font-bold text-slate-400">%</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-status-cooling animate-pulse" />
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Zonă de confort optimă
            </p>
          </div>
        </div>

        {/* Energy Card */}
        <div className="glass-card p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 dark:border-slate-800/60 border-l-4 border-l-status-eco bg-white dark:bg-slate-900 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <span className={`p-2.5 rounded-xl flex items-center justify-center transition-colors ${
              isDeviceOn 
                ? 'bg-status-heating/10 text-status-heating animate-pulse' 
                : 'bg-status-eco/10 text-status-eco'
            }`}>
              <Zap className="w-5 h-5" />
            </span>
            <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase">
              Consum Instant
            </span>
          </div>
          <div className="mt-4 flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-primary dark:text-white tracking-tight">
                {instantPower}
              </span>
              <span className="text-xl font-bold text-slate-400">W</span>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1">
              {currentAmperes} A @ 230V
            </span>
          </div>
        </div>

      </div>

      {/* Control climă and sidebar scenarios row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Thermostat Climate Control Wheel Widget */}
        <div className="lg:col-span-7 glass-card p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex flex-col items-center justify-between relative overflow-hidden transition-all hover:border-primary/20">
          <div className={`absolute top-0 left-0 w-full h-1.5 transition-colors ${
            isDeviceOn ? 'bg-status-heating animate-pulse' : 'bg-slate-200 dark:bg-slate-800'
          }`} />

          <div className="w-full flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-primary dark:text-white">
              Control Climă - {activeRoom.name}
            </h3>
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
              isDeviceOn 
                ? 'bg-status-heating/10 text-status-heating' 
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
            }`}>
              {isDeviceOn ? 'Echipament Activ' : 'Inactiv (Standby)'}
            </span>
          </div>

          {/* Thermostat dial ring */}
          <div className="relative w-60 h-60 md:w-64 md:h-64 flex items-center justify-center bg-slate-50 dark:bg-slate-950/40 rounded-full border border-slate-100 dark:border-slate-800 shadow-inner">
            
            {/* Dashed outer ring that rotates if active */}
            <div className={`absolute inset-4 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center ${
              isDeviceOn ? 'animate-[spin_40s_linear_infinite]' : ''
            }`}>
              <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-slate-300 dark:border-slate-700" />
            </div>

            {/* Main Value layout */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Setpoint
              </span>
              <div className="text-5xl font-black text-primary dark:text-white tracking-tight mt-1">
                {activeRoom.setpoint.toFixed(1)}
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                ° Celsius
              </span>
            </div>

            {/* Floating Minus/Plus adjustment controls */}
            <button 
              onClick={() => adjustSetpoint(-0.5)}
              className="absolute left-3 w-12 h-12 bg-white dark:bg-slate-800 shadow-lg rounded-full flex items-center justify-center text-primary dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-90 border border-slate-100 dark:border-slate-700 cursor-pointer transition-all"
              title="Scade prag setpoint"
            >
              <Minus className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => adjustSetpoint(0.5)}
              className="absolute right-3 w-12 h-12 bg-primary dark:bg-sky-500 shadow-lg rounded-full flex items-center justify-center text-white hover:bg-slate-800 dark:hover:bg-sky-600 active:scale-90 cursor-pointer transition-all"
              title="Crește prag setpoint"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Quick mode toggler */}
          <div className="mt-6 flex gap-4 w-full">
            <button 
              onClick={() => updateActiveRoom({ mode: 'cooling' })}
              className={`flex-1 py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeRoom.mode === 'cooling'
                  ? 'bg-secondary-container text-on-secondary-container shadow-sm border border-secondary-container'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Snowflake className="w-4 h-4" />
              Răcire
            </button>
            <button 
              onClick={() => updateActiveRoom({ mode: 'heating' })}
              className={`flex-1 py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeRoom.mode === 'heating'
                  ? 'bg-status-heating text-white shadow-md shadow-status-heating/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Flame className="w-4 h-4" />
              Încălzire
            </button>
          </div>

        </div>

        {/* Right Scenarios & Financial Quick Widget */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Scenarios Preset Block */}
          <div className="glass-card p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex flex-col gap-4">
            <h3 className="font-bold text-lg text-primary dark:text-white">Scenarii</h3>
            
            <div className="flex flex-col gap-2">
              
              <button 
                onClick={() => handleScenarioChange('home')}
                className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
                  activeRoom.scenario === 'home'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.01]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  <span className="font-bold text-sm">Acasă</span>
                </div>
                {activeRoom.scenario === 'home' ? (
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">Activ</span>
                ) : (
                  <span className="text-[10px] text-slate-400">22.5 °C</span>
                )}
              </button>

              <button 
                onClick={() => handleScenarioChange('away')}
                className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
                  activeRoom.scenario === 'away'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.01]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Footprints className="w-5 h-5" />
                  <span className="font-bold text-sm">Plecat</span>
                </div>
                {activeRoom.scenario === 'away' ? (
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">Activ</span>
                ) : (
                  <span className="text-[10px] text-slate-400">17.0 °C</span>
                )}
              </button>

              <button 
                onClick={() => handleScenarioChange('night')}
                className={`flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer ${
                  activeRoom.scenario === 'night'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.01]'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5" />
                  <span className="font-bold text-sm">Noapte</span>
                </div>
                {activeRoom.scenario === 'night' ? (
                  <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded-full font-semibold">Activ</span>
                ) : (
                  <span className="text-[10px] text-slate-400">20.0 °C</span>
                )}
              </button>

            </div>
          </div>

          {/* Quick Financial Summary Sidebar */}
          <div className="glass-card p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] border border-slate-200/60 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-secondary" />
              <h3 className="font-bold text-lg text-primary dark:text-white">Analiză Financiară</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800/50">
                <p className="text-xs text-slate-400 font-medium">Cost estimat curent (Lună)</p>
                <p className="text-3xl font-black text-primary dark:text-white mt-1">
                  {estimatedCost} Lei
                </p>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-bold block mb-1">
                  Profil Tarifar
                </label>
                <select 
                  value={settings.selectedTariffProfile}
                  onChange={(e) => updateSettings({ selectedTariffProfile: e.target.value as any })}
                  className="w-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-none rounded-xl text-sm py-2.5 px-3 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                >
                  <option value="Standard">Standard</option>
                  <option value="Noapte (Redus)">Noapte (Redus)</option>
                  <option value="Eco Plus">Eco Plus</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-status-eco text-xs font-semibold">
                <TrendingDown className="w-4 h-4 animate-bounce" />
                <span>Cu 12% mai puțin față de luna trecută</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
