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
  ChefHat, 
  Wifi,
  Circle
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedRoomId: 'living-room' | 'kitchen';
  setSelectedRoomId: (roomId: 'living-room' | 'kitchen') => void;
  isSystemOnline: boolean;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  selectedRoomId,
  setSelectedRoomId,
  isSystemOnline,
}: SidebarProps) {
  return (
    <nav className="hidden md:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-64 p-4 bg-slate-50 dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-colors z-40">
      
      {/* System Status Block */}
      <div className={`px-3 py-4 border-b mb-4 rounded-xl transition-all ${
        isSystemOnline 
          ? 'border-status-eco/20 bg-status-eco/5' 
          : 'border-on-error-container/20 bg-error-container/10'
      }`}>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          System Status
        </p>
        <div className={`mt-1.5 flex items-center gap-2 ${isSystemOnline ? 'text-status-eco' : 'text-on-error-container'}`}>
          <span className="relative flex h-2.5 w-2.5">
            {isSystemOnline && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-eco opacity-75"></span>
            )}
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isSystemOnline ? 'bg-status-eco' : 'bg-on-error-container'}`}></span>
          </span>
          <span className="text-lg font-bold text-slate-800 dark:text-slate-200">
            {isSystemOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Main Sections Navigation */}
      <div className="flex flex-col gap-1 flex-grow">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer active:translate-x-0.5 ${
            activeTab === 'dashboard'
              ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm shadow-secondary-container/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-sm font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer active:translate-x-0.5 ${
            activeTab === 'history'
              ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm shadow-secondary-container/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-sm font-medium">Istoric &amp; KPI</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left cursor-pointer active:translate-x-0.5 ${
            activeTab === 'settings'
              ? 'bg-secondary-container text-on-secondary-container font-semibold shadow-sm shadow-secondary-container/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm font-medium">Setări &amp; Financiar</span>
        </button>

        {/* Room Filtering header */}
        <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 px-3 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Încăperi
          </span>
          <span className="text-[9px] bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono">
            Active: 2
          </span>
        </div>

        {/* Room items selection */}
        <button
          onClick={() => {
            setSelectedRoomId('living-room');
            setActiveTab('dashboard'); // Switch to dashboard to see immediate changes
          }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer active:translate-x-0.5 mt-1 ${
            selectedRoomId === 'living-room' && activeTab === 'dashboard'
              ? 'bg-primary/10 text-primary dark:text-sky-300 font-semibold'
              : selectedRoomId === 'living-room'
              ? 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Home className="w-4 h-4 text-slate-400" />
          <span className="text-xs">Living Room</span>
          {selectedRoomId === 'living-room' && (
            <span className="ml-auto w-1.5 h-1.5 bg-status-heating rounded-full animate-pulse" />
          )}
        </button>

        <button
          onClick={() => {
            setSelectedRoomId('kitchen');
            setActiveTab('dashboard'); // Switch to dashboard to see immediate changes
          }}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left cursor-pointer active:translate-x-0.5 ${
            selectedRoomId === 'kitchen' && activeTab === 'dashboard'
              ? 'bg-primary/10 text-primary dark:text-sky-300 font-semibold'
              : selectedRoomId === 'kitchen'
              ? 'text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 font-medium'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <ChefHat className="w-4 h-4 text-slate-400" />
          <span className="text-xs">Kitchen</span>
          {selectedRoomId === 'kitchen' && (
            <span className="ml-auto w-1.5 h-1.5 bg-status-heating rounded-full animate-pulse" />
          )}
        </button>
      </div>

      {/* Footer metadata inside sidebar */}
      <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-800 px-3">
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <Wifi className="w-3.5 h-3.5 text-status-eco" />
          <span>Local Broker: 192.168.1.15</span>
        </div>
        <p className="text-[9px] text-slate-400 mt-1">Lumina Home v1.4.0</p>
      </div>
    </nav>
  );
}
