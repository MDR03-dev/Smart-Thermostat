/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { InfluxDB } from '@influxdata/influxdb-client';
import { 
  TrendingDown, 
  TrendingUp, 
  Clock, 
  Cpu, 
  Calendar,
  Leaf, 
  FileText, 
  Download,
  Info,
  Droplets,
  Zap
} from 'lucide-react';
import { TelemetryPoint, RoomState } from '../types';
import { livingRoomHistory, kitchenHistory } from '../data';

interface HistoryTabProps {
  activeRoom: RoomState;
}

type Period = 'ultima_ora' | 'azi' | 'saptamana' | 'luna';

export default function HistoryTab({ activeRoom }: HistoryTabProps) {
  const [period, setPeriod] = useState<Period>('ultima_ora');
  const [hoveredPoint, setHoveredPoint] = useState<TelemetryPoint | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [activeHistory, setActiveHistory] = useState<TelemetryPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // InfluxDB Setup
  const INFLUX_URL = 'https://eu-central-1-1.aws.cloud2.influxdata.com';
  const INFLUX_TOKEN = '44TLeCBk3T1eHUuW7uaGzwnkKSn4LWPYRFWyMatsEh1CT43M5UO8hWGWWKYzfz5dnGrnaeNsGz4RmbL_6b1X2Q==';
  const INFLUX_ORG = '6be1262abdf57cf9';
  const INFLUX_BUCKET = 'Student';

  const fetchInfluxData = useCallback(async () => {
    setIsLoading(true);
    const client = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
    const queryApi = client.getQueryApi(INFLUX_ORG);
    
    let range = '-24h';
    let window = '2h';
    if (period === 'ultima_ora') { range = '-1h'; window = '2m'; }
    if (period === 'saptamana') { range = '-7d'; window = '12h'; }
    if (period === 'luna') { range = '-30d'; window = '2d'; }

    const fluxQuery = `from(bucket: "${INFLUX_BUCKET}")
      |> range(start: ${range})
      |> filter(fn: (r) => r._measurement == "termostat")
      |> filter(fn: (r) => r._field == "temperatura" or r._field == "umiditate" or r._field == "incalzire_on")
      |> aggregateWindow(every: ${window}, fn: mean, createEmpty: false)
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")`;

    const fetchedData: TelemetryPoint[] = [];

    try {
      await new Promise<void>((resolve, reject) => {
        queryApi.queryRows(fluxQuery, {
          next(row, tableMeta) {
            const o = tableMeta.toObject(row);
            const time = new Date(o._time).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
            fetchedData.push({
              time: time,
              temp: parseFloat((o.temperatura || 20).toFixed(1)),
              humidity: Math.round(o.umiditate || 50),
              consumption: parseFloat(((o.incalzire_on || 0) * 1.5).toFixed(2)) // 1.5kWh if full hour
            });
          },
          error(error) {
            console.error(error);
            reject(error);
          },
          complete() {
            resolve();
          },
        });
      });
      // Fallback if no data (scos fallback-ul fals pentru a vedea datele reale)
      setActiveHistory(fetchedData);
    } catch (e) {
      console.error('Error fetching InfluxDB', e);
      setActiveHistory([]);
    } finally {
      setIsLoading(false);
    }
  }, [period, activeRoom.id]);

  useEffect(() => {
    fetchInfluxData();
  }, [fetchInfluxData]);

  // Dynamic KPI aggregates based on active history
  const averageTemp = activeHistory.length > 0 ? (activeHistory.reduce((sum, p) => sum + p.temp, 0) / activeHistory.length).toFixed(1) : "0.0";
  const totalConsumption = activeHistory.reduce((sum, p) => sum + p.consumption, 0).toFixed(1);
  
  // Calculate operating hours dynamically
  const operatingPoints = activeHistory.filter(p => p.consumption > 0).length;
  const hoursPerPoint = period === 'ultima_ora' ? (2/60) : period === 'azi' ? 2 : period === 'saptamana' ? 12 : 48;
  const totalHours = operatingPoints * hoursPerPoint;
  const activeOperatingHours = `${totalHours}h 0m`;

  // Client-side report generator download handler - Made inactive per user request
  const downloadReport = () => {
    alert('Funcționalitatea de descărcare PDF este momentan inactivă.');
  };

  // SVG dimensions for coordinates mapping
  const svgWidth = 800;
  const svgHeight = 200;
  
  // Calculate SVG polyline path for Temperature
  const getTempPath = () => {
    const minT = activeHistory.length > 0 ? Math.min(...activeHistory.map(p => p.temp)) - 1 : 18;
    const maxT = activeHistory.length > 0 ? Math.max(...activeHistory.map(p => p.temp)) + 1 : 26;
    const points = activeHistory.map((p, idx) => {
      const x = (idx / (activeHistory.length - 1)) * svgWidth;
      // invert y (0 at top, svgHeight at bottom)
      const y = svgHeight - 20 - ((p.temp - minT) / (maxT - minT)) * (svgHeight - 40);
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  // Area under Temperature curve
  const getTempAreaPath = () => {
    const minT = activeHistory.length > 0 ? Math.min(...activeHistory.map(p => p.temp)) - 1 : 18;
    const maxT = activeHistory.length > 0 ? Math.max(...activeHistory.map(p => p.temp)) + 1 : 26;
    const points = activeHistory.map((p, idx) => {
      const x = (idx / (activeHistory.length - 1)) * svgWidth;
      const y = svgHeight - 20 - ((p.temp - minT) / (maxT - minT)) * (svgHeight - 40);
      return `${x},${y}`;
    });
    return `0,${svgHeight} ` + points.join(' ') + ` ${svgWidth},${svgHeight}`;
  };

  // Calculate SVG path for Humidity
  const getHumidityPath = () => {
    const minH = activeHistory.length > 0 ? Math.min(...activeHistory.map(p => p.humidity)) - 5 : 30;
    const maxH = activeHistory.length > 0 ? Math.max(...activeHistory.map(p => p.humidity)) + 5 : 70;
    const points = activeHistory.map((p, idx) => {
      const x = (idx / (activeHistory.length - 1)) * svgWidth;
      const y = svgHeight - 20 - ((p.humidity - minH) / (maxH - minH)) * (svgHeight - 40);
      return `${x},${y}`;
    });
    return points.join(' ');
  };

  return (
    <div className="space-y-6">
      
      {/* Title & Timeframe Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-extrabold text-2xl md:text-3xl text-primary dark:text-white tracking-tight">
            Istoric &amp; KPI
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Analiza performanței climatice smart Lumina pentru <span className="font-bold text-primary dark:text-sky-300">{activeRoom.name}</span>
          </p>
        </div>

        {/* Timeframe Selector Button Group */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit self-start sm:self-center border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setPeriod('ultima_ora')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === 'ultima_ora' 
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            Ultima Oră
          </button>
          <button 
            onClick={() => setPeriod('azi')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === 'azi' 
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            Azi
          </button>
          <button 
            onClick={() => setPeriod('saptamana')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === 'saptamana' 
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            Săptămână
          </button>
          <button 
            onClick={() => setPeriod('luna')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              period === 'luna' 
                ? 'bg-white dark:bg-slate-900 text-primary dark:text-white shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
            }`}
          >
            Lună
          </button>
        </div>
      </header>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1: Temperature */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-start justify-between transition-all hover:translate-y-[-2px]">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              {period === 'azi' ? 'Temperatura medie azi' : period === 'saptamana' ? 'Temp medie săptămână' : 'Temp medie lună'}
            </p>
            <h3 className="text-4xl font-extrabold text-primary dark:text-white mt-2 tracking-tight">
              {averageTemp}°C
            </h3>
            <div className="flex items-center gap-1 mt-3 text-status-eco text-xs font-bold">
              <TrendingDown className="w-4 h-4" />
              <span>-0.4°C față de intervalul trecut</span>
            </div>
          </div>
          <div className="bg-primary-fixed p-3 rounded-xl text-primary dark:bg-slate-800 dark:text-sky-400">
            <span className="font-bold text-lg">°C</span>
          </div>
        </div>

        {/* KPI 2: Total Consumption */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-start justify-between border-l-4 border-l-status-cooling transition-all hover:translate-y-[-2px]">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              {period === 'azi' ? 'Consum total azi' : period === 'saptamana' ? 'Consum săptămână' : 'Consum total lună'}
            </p>
            <h3 className="text-4xl font-extrabold text-primary dark:text-white mt-2 tracking-tight">
              {totalConsumption} kWh
            </h3>
            <div className="flex items-center gap-1 mt-3 text-status-heating text-xs font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>+12% vs. media de bază</span>
            </div>
          </div>
          <div className="bg-secondary-fixed p-3 rounded-xl text-secondary dark:bg-slate-800 dark:text-status-cooling">
            <Zap className="w-5 h-5 text-secondary dark:text-status-cooling" />
          </div>
        </div>

        {/* KPI 3: Running Time */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex items-start justify-between transition-all hover:translate-y-[-2px]">
          <div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Timp funcționare climatizare
            </p>
            <h3 className="text-4xl font-extrabold text-primary dark:text-white mt-2 tracking-tight">
              {activeOperatingHours}
            </h3>
            <div className="flex items-center gap-1 mt-3 text-slate-500 dark:text-slate-400 text-xs font-medium">
              <Clock className="w-4 h-4" />
              <span>Sistem inteligent activ</span>
            </div>
          </div>
          <div className="bg-tertiary-fixed p-3 rounded-xl text-tertiary dark:bg-slate-800 dark:text-status-heating">
            <Clock className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Interactive Charts Matrix Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Line Spline Chart: Temp & Humidity Correlation */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <h4 className="font-bold text-lg text-primary dark:text-white">
                Evoluție Temperatură &amp; Umiditate
              </h4>
              <p className="text-slate-400 text-xs font-medium">
                Corelație telemetrică în timp real
              </p>
            </div>
            
            {/* Chart Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-primary dark:bg-sky-400" />
                <span className="text-slate-600 dark:text-slate-400">Temp (°C)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-status-cooling" />
                <span className="text-slate-600 dark:text-slate-400">Umiditate (%)</span>
              </div>
            </div>
          </div>

          {/* Spline Chart Stage */}
          <div className="relative flex-grow min-h-[220px] bg-slate-50/50 dark:bg-slate-950/20 rounded-xl p-4 border border-slate-100 dark:border-slate-800/40">
            
            {/* Spline SVG */}
            <svg 
              className="w-full h-full min-h-[180px] overflow-hidden" 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="tempGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" stopColor="#1A2B4B" stopOpacity="0.15"></stop>
                  <stop offset="100%" stopColor="#1A2B4B" stopOpacity="0"></stop>
                </linearGradient>
              </defs>

              {/* Grid Horizontal Guide lines */}
              <line stroke="#f1f4f6" strokeWidth="1" x1="0" x2={svgWidth} y1="0" y2="0" className="dark:stroke-slate-800/60"></line>
              <line stroke="#f1f4f6" strokeWidth="1" x1="0" x2={svgWidth} y1="50" y2="50" className="dark:stroke-slate-800/60"></line>
              <line stroke="#f1f4f6" strokeWidth="1" x1="0" x2={svgWidth} y1="100" y2="100" className="dark:stroke-slate-800/60"></line>
              <line stroke="#f1f4f6" strokeWidth="1" x1="0" x2={svgWidth} y1="150" y2="150" className="dark:stroke-slate-800/60"></line>
              <line stroke="#f1f4f6" strokeWidth="1" x1="0" x2={svgWidth} y1="200" y2="200" className="dark:stroke-slate-800/60"></line>

              {/* Temperature Filled Spline Spline Area */}
              <path 
                d={`M 0,${svgHeight} L ${getTempPath()} L ${svgWidth},${svgHeight} Z`} 
                fill="url(#tempGradient)"
              />
              
              {/* Temperature Spline line */}
              <polyline 
                fill="none" 
                stroke="#1A2B4B" 
                strokeWidth="3.5" 
                points={getTempPath()}
                className="dark:stroke-sky-400 transition-all duration-300"
              />

              {/* Humidity Dotted line */}
              <polyline 
                fill="none" 
                stroke="#00BCD4" 
                strokeWidth="2" 
                strokeDasharray="5,5" 
                points={getHumidityPath()}
                className="transition-all duration-300"
              />

              {/* Dynamic hovered item guide dot */}
              {hoveredIndex !== null && (
                <>
                  {/* Vertical rule line */}
                  <line 
                    x1={(hoveredIndex / (activeHistory.length - 1)) * svgWidth} 
                    y1="0" 
                    x2={(hoveredIndex / (activeHistory.length - 1)) * svgWidth} 
                    y2={svgHeight} 
                    stroke="#94a3b8" 
                    strokeWidth="1.5" 
                    strokeDasharray="3,3"
                  />
                  {/* Glowing Temp Circle */}
                  <circle 
                    cx={(hoveredIndex / (activeHistory.length - 1)) * svgWidth} 
                    cy={svgHeight - 20 - ((activeHistory[hoveredIndex].temp - (Math.min(...activeHistory.map(p => p.temp)) - 1)) / ((Math.max(...activeHistory.map(p => p.temp)) + 1) - (Math.min(...activeHistory.map(p => p.temp)) - 1))) * (svgHeight - 40)} 
                    r="6" 
                    fill="#1A2B4B" 
                    stroke="#ffffff" 
                    strokeWidth="2"
                    className="dark:fill-sky-400"
                  />
                  {/* Glowing Humidity Circle */}
                  <circle 
                    cx={(hoveredIndex / (activeHistory.length - 1)) * svgWidth} 
                    cy={svgHeight - 20 - ((activeHistory[hoveredIndex].humidity - (Math.min(...activeHistory.map(p => p.humidity)) - 5)) / ((Math.max(...activeHistory.map(p => p.humidity)) + 5) - (Math.min(...activeHistory.map(p => p.humidity)) - 5))) * (svgHeight - 40)} 
                    r="6" 
                    fill="#00BCD4" 
                    stroke="#ffffff" 
                    strokeWidth="2"
                  />
                </>
              )}
            </svg>

            {/* Transparent hover triggers overlay */}
            <div className="absolute inset-0 flex">
              {activeHistory.map((p, idx) => (
                <div 
                  key={idx}
                  onMouseEnter={() => {
                    setHoveredPoint(p);
                    setHoveredIndex(idx);
                  }}
                  onMouseLeave={() => {
                    setHoveredPoint(null);
                    setHoveredIndex(null);
                  }}
                  className="flex-1 h-full cursor-pointer"
                  title={`Vizualizează telemetria de la ${p.time}`}
                />
              ))}
            </div>

            {/* Beautiful floating HTML Tooltip */}
            {hoveredPoint && (
              <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white text-xs px-3.5 py-2 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 backdrop-blur-md pointer-events-none z-30">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold block uppercase tracking-wider">Timp</span>
                  <p className="font-bold">{hoveredPoint.time}</p>
                </div>
                <div className="h-6 w-[1px] bg-slate-700" />
                <div>
                  <span className="text-[9px] text-status-heating font-bold block uppercase tracking-wider">Temp</span>
                  <p className="font-bold text-slate-100">{hoveredPoint.temp.toFixed(1)}°C</p>
                </div>
                <div className="h-6 w-[1px] bg-slate-700" />
                <div>
                  <span className="text-[9px] text-status-cooling font-bold block uppercase tracking-wider">Umiditate</span>
                  <p className="font-bold text-slate-100">{hoveredPoint.humidity}%</p>
                </div>
              </div>
            )}

          </div>

          {/* Horizontal labels */}
          <div className="flex justify-between mt-3 px-2">
            {activeHistory.map((h, i) => {
              // Show max ~6 labels to prevent overcrowding
              const step = Math.max(1, Math.floor(activeHistory.length / 5));
              const isVisible = i % step === 0 || i === activeHistory.length - 1;
              return (
                <span 
                  key={i} 
                  className={`text-[10px] ${
                    hoveredIndex === i 
                      ? 'text-primary dark:text-sky-300 font-extrabold' 
                      : 'text-slate-400 font-semibold'
                  } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                >
                  {h.time}
                </span>
              );
            })}
          </div>

        </div>

        {/* Hourly energy bar chart */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/60 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          
          <div className="mb-4">
            <h4 className="font-bold text-lg text-primary dark:text-white">
              Consum Energie / Oră
            </h4>
            <p className="text-slate-400 text-xs font-medium">
              Distribuție consum HVAC pe intervale
            </p>
          </div>

          {/* Bar Chart Bars Container */}
          <div className="h-44 flex items-end justify-between gap-1.5 px-1 bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-xl border border-slate-100 dark:border-slate-800/40">
            {activeHistory.map((p, idx) => {
              // Map consumption (max around 1.2 kWh) to height
              const maxC = period === 'azi' ? 1.2 : period === 'saptamana' ? 8 : 35;
              const barHeight = `${Math.min(100, Math.max(10, (p.consumption / maxC) * 100))}%`;
              const isPeak = p.time === '14:00' || p.time === '18:00';

              return (
                <div 
                  key={idx}
                  className="flex-1 flex flex-col items-center h-full justify-end group/bar relative"
                >
                  {/* Tooltip on bar hover */}
                  <div className="absolute bottom-full mb-1 bg-slate-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/bar:opacity-100 pointer-events-none transition-opacity z-10 whitespace-nowrap">
                    {p.consumption} kWh
                  </div>

                  {/* The actual colored bar */}
                  <div 
                    style={{ height: barHeight }}
                    className={`w-full rounded-t-lg transition-all duration-500 cursor-pointer ${
                      isPeak
                        ? 'bg-primary dark:bg-sky-500 hover:brightness-110'
                        : 'bg-secondary-fixed text-secondary hover:bg-slate-300 dark:hover:bg-slate-700'
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Consum Alert summary */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-primary dark:text-white">Vârf de consum HVAC</span>
              <span className="bg-error-container text-on-error-container px-2 py-0.5 rounded text-[10px] font-bold">
                {activeRoom.id === 'living-room' ? '14:00 - 15:00' : '18:00 - 19:00'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-normal">
              Aparatele climatice din {activeRoom.name === 'Kitchen' ? 'bucătărie' : 'living'} au generat vârful principal de cerere energetică astăzi.
            </p>
          </div>

        </div>

      </div>

      {/* Quick Action / PDF Downloader */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Eco saving summary box */}
        <div className="bg-primary dark:bg-slate-950 text-white p-5 rounded-2xl shadow-md border border-slate-800 flex items-center gap-5">
          <div className="p-3.5 bg-white/10 rounded-full text-status-eco">
            <Leaf className="w-8 h-8 animate-pulse text-status-eco" />
          </div>
          <div>
            <h5 className="font-extrabold text-base md:text-lg">Impact Ecologic</h5>
            <p className="text-xs text-slate-300 leading-normal mt-1">
              Astăzi ați economisit echivalentul a <span className="font-bold text-status-eco">1.2 kg de CO2</span> în atmosferă prin algoritmul inteligent de control al Histerezisului.
            </p>
          </div>
        </div>

        {/* Weekly Report triggers */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-slate-400" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Fișier local</span>
              <p className="text-sm font-bold text-primary dark:text-white">
                Raport de performanță energetică (.txt)
              </p>
            </div>
          </div>
          
          <button 
            onClick={downloadReport}
            className="flex items-center gap-2 bg-primary dark:bg-sky-600 hover:brightness-110 active:scale-95 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            Descarcă PDF
          </button>
        </div>

      </div>

    </div>
  );
}
