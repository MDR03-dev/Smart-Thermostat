/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 w-full h-16 z-50 flex justify-between items-center px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-primary/5 text-primary">
          <Sun className="w-6 h-6 animate-spin-slow text-status-heating" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-status-eco rounded-full border-2 border-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
          </span>
        </div>
        <div>
          <h1 className="text-xs md:text-sm font-bold text-primary dark:text-white leading-tight max-w-[280px] md:max-w-xl transition-all">
            Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale
          </h1>
          <p className="text-[9px] text-slate-400 font-medium uppercase tracking-wider hidden md:block">
            Sistem Inteligent de Optimizare Energetică & Histerezis Dinamic
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-status-eco/10 text-status-eco text-xs font-semibold rounded-full border border-status-eco/25">
          <ShieldCheck className="w-3.5 h-3.5" />
          Securizat
        </div>
      </div>
    </header>
  );
}
