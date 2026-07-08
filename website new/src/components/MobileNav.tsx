/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  Settings, 
  Home, 
  ChefHat 
} from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedRoomId: 'living-room' | 'kitchen';
  setSelectedRoomId: (roomId: 'living-room' | 'kitchen') => void;
}

export default function MobileNav({
  activeTab,
  setActiveTab,
  selectedRoomId,
  setSelectedRoomId,
}: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-lg px-6 h-16 flex items-center justify-between z-50 transition-colors">
      
      {/* Dashboard Nav Button */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 cursor-pointer ${
          activeTab === 'dashboard'
            ? 'text-primary dark:text-sky-400 font-bold'
            : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[10px]">Dashboard</span>
      </button>

      {/* History Nav Button */}
      <button
        onClick={() => setActiveTab('history')}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 cursor-pointer ${
          activeTab === 'history'
            ? 'text-primary dark:text-sky-400 font-bold'
            : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'
        }`}
      >
        <Activity className="w-5 h-5" />
        <span className="text-[10px]">Istoric</span>
      </button>

      {/* Room Quick Switcher */}
      <button
        onClick={() => {
          setSelectedRoomId(selectedRoomId === 'living-room' ? 'kitchen' : 'living-room');
          setActiveTab('dashboard'); // Jump to dashboard to see the active room
        }}
        className="flex flex-col items-center justify-center gap-0.5 flex-1 text-slate-500 dark:text-slate-400 hover:text-primary transition-all relative cursor-pointer"
      >
        <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
          {selectedRoomId === 'living-room' ? (
            <Home className="w-4 h-4 text-status-heating" />
          ) : (
            <ChefHat className="w-4 h-4 text-status-cooling" />
          )}
        </div>
        <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">
          {selectedRoomId === 'living-room' ? 'Living' : 'Kitchen'}
        </span>
        <span className="absolute top-1.5 right-6 w-2 h-2 bg-status-heating rounded-full animate-ping" />
      </button>

      {/* Settings Nav Button */}
      <button
        onClick={() => setActiveTab('settings')}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 cursor-pointer ${
          activeTab === 'settings'
            ? 'text-primary dark:text-sky-400 font-bold'
            : 'text-slate-400 dark:text-slate-500 font-medium hover:text-slate-600'
        }`}
      >
        <Settings className="w-5 h-5" />
        <span className="text-[10px]">Setări</span>
      </button>

    </nav>
  );
}
