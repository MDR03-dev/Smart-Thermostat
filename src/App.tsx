/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { InfluxDB } from '@influxdata/influxdb-client';
import { db } from './firebase';
import { ref, onValue, set } from 'firebase/database';
import { ActiveTab, RoomState, SystemSettings } from './types';
import { initialRooms, initialSettings } from './data';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import DashboardTab from './components/DashboardTab';
import HistoryTab from './components/HistoryTab';
import SettingsTab from './components/SettingsTab';

export default function App() {
  // Navigation states
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [selectedRoomId, setSelectedRoomId] = useState<'living-room' | 'kitchen'>('living-room');

  // Rooms and global settings state with LocalStorage synchronization
  const [rooms, setRooms] = useState<RoomState[]>(() => {
    const stored = localStorage.getItem('lumina_rooms');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.map((r: any) => ({
          ...r,
          scenarioSetpoints: r.scenarioSetpoints || initialRooms.find(i => i.id === r.id)?.scenarioSetpoints
        }));
      } catch (e) {
        console.error('Failed to parse lumina_rooms', e);
      }
    }
    return initialRooms;
  });

  const [settings, setSettings] = useState<SystemSettings>(() => {
    const stored = localStorage.getItem('lumina_settings');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse lumina_settings', e);
      }
    }
    return initialSettings;
  });

  // Save states to LocalStorage on modification
  useEffect(() => {
    localStorage.setItem('lumina_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('lumina_settings', JSON.stringify(settings));
  }, [settings]);

  // Find active room data
  const activeRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  // InfluxDB Online Status Check
  const [isSystemOnline, setIsSystemOnline] = useState(false);

  useEffect(() => {
    const INFLUX_URL = 'https://eu-central-1-1.aws.cloud2.influxdata.com';
    const INFLUX_TOKEN = '44TLeCBk3T1eHUuW7uaGzwnkKSn4LWPYRFWyMatsEh1CT43M5UO8hWGWWKYzfz5dnGrnaeNsGz4RmbL_6b1X2Q==';
    const INFLUX_ORG = '6be1262abdf57cf9';
    const INFLUX_BUCKET = 'Student';

    const checkOnlineStatus = async () => {
      try {
        const client = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
        const queryApi = client.getQueryApi(INFLUX_ORG);
        const fluxQuery = `from(bucket: "${INFLUX_BUCKET}")
          |> range(start: -5m)
          |> filter(fn: (r) => r._measurement == "termostat")
          |> last()`;
        
        let hasData = false;
        await new Promise<void>((resolve, reject) => {
          queryApi.queryRows(fluxQuery, {
            next() { hasData = true; },
            error(error) { reject(error); },
            complete() { resolve(); },
          });
        });
        setIsSystemOnline(hasData);
      } catch (err) {
        setIsSystemOnline(false);
      }
    };
    
    checkOnlineStatus();
    const interval = setInterval(checkOnlineStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  // === Firebase Listeners ===
  useEffect(() => {
    const refs = {
      t: ref(db, 'nod2/temperatura'),
      h: ref(db, 'nod2/umiditate'),
      tt: ref(db, 'commands/target_temp'),
      sa: ref(db, 'config/scenariu_activ')
    };

    const unsubT = onValue(refs.t, snap => {
      if (snap.exists()) {
        setRooms(prev => prev.map(r => r.id === 'living-room' ? { ...r, currentTemp: snap.val() } : r));
      }
    });
    
    const unsubH = onValue(refs.h, snap => {
      if (snap.exists()) {
        setRooms(prev => prev.map(r => r.id === 'living-room' ? { ...r, humidity: snap.val() } : r));
      }
    });

    const unsubTT = onValue(refs.tt, snap => {
      if (snap.exists()) {
        setRooms(prev => prev.map(r => r.id === 'living-room' ? { ...r, setpoint: snap.val() } : r));
      }
    });

    const unsubSA = onValue(refs.sa, snap => {
      if (snap.exists()) {
        const scenarioVal = snap.val().toLowerCase() === 'acasă' ? 'home' : 
                            snap.val().toLowerCase() === 'plecat' ? 'away' : 
                            snap.val().toLowerCase() === 'noapte' ? 'night' : 'home';
        setRooms(prev => prev.map(r => r.id === 'living-room' ? { ...r, scenario: scenarioVal } : r));
      }
    });

    return () => {
      unsubT(); unsubH(); unsubTT(); unsubSA();
    };
  }, []);

  // Helper handler to update active room state and Firebase if needed
  const updateActiveRoom = (updatedFields: Partial<RoomState>) => {
    setRooms(prevRooms => 
      prevRooms.map(r => r.id === selectedRoomId ? { ...r, ...updatedFields } : r)
    );

    // Sync to Firebase if it's the living room (main node)
    if (selectedRoomId === 'living-room') {
      if (updatedFields.setpoint !== undefined) {
        set(ref(db, 'commands/target_temp'), updatedFields.setpoint);
      }
      if (updatedFields.scenario !== undefined) {
        const scenarioMap: Record<string, string> = {
          home: 'Acasă',
          away: 'Plecat',
          night: 'Noapte'
        };
        set(ref(db, 'config/scenariu_activ'), scenarioMap[updatedFields.scenario] || 'Acasă');
      }
    }
  };

  // Helper handler to update settings state
  const updateSettings = (updatedFields: Partial<SystemSettings>) => {
    setSettings(prevSettings => ({ ...prevSettings, ...updatedFields }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Sticky Header */}
      <Header />

      {/* Main Viewport Shell */}
      <div className="pt-16 pb-20 md:pb-0 flex-grow flex">
        
        {/* Desktop Left Sidebar Drawer */}
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          selectedRoomId={selectedRoomId}
          setSelectedRoomId={setSelectedRoomId}
          isSystemOnline={isSystemOnline}
        />

        {/* Main Workspace Stage Canvas */}
        <main className="flex-grow md:ml-64 p-4 md:p-8 overflow-x-hidden min-h-[calc(100vh-64px)]">
          <div className="max-w-5xl mx-auto">
            
            {/* Header / Intro section with active room identifier */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/50 dark:border-slate-800/50 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                  Spațiu selectat: <span className="text-primary dark:text-sky-400">{activeRoom.name}</span>
                </span>
                <h2 className="text-xl md:text-2xl font-black text-primary dark:text-white tracking-tight">
                  {activeTab === 'dashboard' && 'Panou de Control Climatizare'}
                  {activeTab === 'history' && 'Analiză Istoric Telemetrie'}
                  {activeTab === 'settings' && 'Parametrizare Histerezis & Costuri'}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 w-fit">
                <span className="w-2 h-2 rounded-full bg-status-eco animate-pulse" />
                Scenario: <span className="text-primary dark:text-white capitalize">{activeRoom.scenario}</span>
              </div>
            </div>

            {/* Render Tab Views Dynamically */}
            {activeTab === 'dashboard' && (
              <DashboardTab 
                activeRoom={activeRoom}
                updateActiveRoom={updateActiveRoom}
                settings={settings}
                updateSettings={updateSettings}
                isSystemOnline={isSystemOnline}
              />
            )}

            {activeTab === 'history' && (
              <HistoryTab activeRoom={activeRoom} />
            )}

            {activeTab === 'settings' && (
              <SettingsTab 
                settings={settings}
                updateSettings={updateSettings}
              />
            )}

          </div>
        </main>

      </div>

      {/* Mobile Bottom Navigation Menu Bar */}
      <MobileNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
      />

    </div>
  );
}
