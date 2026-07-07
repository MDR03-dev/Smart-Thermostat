import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCw, AlertCircle } from 'lucide-react';

const History = ({ stats, historyData, timeRange, setTimeRange, influxLoading, costCalculat }) => {
  return (
    <main className="flex-1 md:ml-64 p-container-padding overflow-y-auto bg-background h-screen">
      <div className="max-w-7xl mx-auto pb-stack-lg">
        <header className="mb-stack-lg flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h1 className="text-headline-lg text-primary">Istoric &amp; KPI</h1>
            <p className="text-text-secondary text-body-md">Analiza performanței sistemului smart Lumina</p>
          </div>
          <div className="flex gap-2 bg-surface-container p-1 rounded-lg self-start md:self-end">
            <button 
              onClick={() => setTimeRange('-24h')}
              className={`px-4 py-1.5 rounded-md text-label-md transition-colors ${timeRange === '-24h' ? 'bg-surface-container-lowest shadow-sm font-bold text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Azi
            </button>
            <button 
              onClick={() => setTimeRange('-7d')}
              className={`px-4 py-1.5 rounded-md text-label-md transition-colors ${timeRange === '-7d' ? 'bg-surface-container-lowest shadow-sm font-bold text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Săptămână
            </button>
            <button 
              onClick={() => setTimeRange('-30d')}
              className={`px-4 py-1.5 rounded-md text-label-md transition-colors ${timeRange === '-30d' ? 'bg-surface-container-lowest shadow-sm font-bold text-primary' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            >
              Lună
            </button>
          </div>
        </header>

        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-stack-lg">
          {/* KPI 1: Temperatura Medie */}
          <div className="glass-card p-container-padding rounded-xl lift-effect shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-label-md mb-2">Temperatura medie {timeRange === '-24h' ? 'azi' : 'perioadă'}</p>
              <h3 className="text-[40px] text-primary leading-none font-semibold">{stats.avgTemp.toFixed(1)}°C</h3>
              <div className="flex items-center gap-1 mt-3 text-status-eco text-label-sm">
                <span className="material-symbols-outlined text-[16px]">trending_down</span>
                Optimizat
              </div>
            </div>
            <div className="bg-primary-fixed p-3 rounded-xl text-primary">
              <span className="material-symbols-outlined text-[32px]">thermostat</span>
            </div>
          </div>

          {/* KPI 2: Consum Total */}
          <div className="glass-card p-container-padding rounded-xl lift-effect shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-start justify-between border-l-4 border-l-status-cooling">
            <div>
              <p className="text-text-secondary text-label-md mb-2">Cost estimat {timeRange === '-24h' ? 'azi' : 'perioadă'}</p>
              <h3 className="text-[40px] text-primary leading-none font-semibold">{costCalculat.toFixed(1)} Lei</h3>
              <div className="flex items-center gap-1 mt-3 text-status-heating text-label-sm">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                Analiză tarif
              </div>
            </div>
            <div className="bg-secondary-fixed p-3 rounded-xl text-secondary">
              <span className="material-symbols-outlined text-[32px]">bolt</span>
            </div>
          </div>

          {/* KPI 3: Timp Functionare */}
          <div className="glass-card p-container-padding rounded-xl lift-effect shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex items-start justify-between">
            <div>
              <p className="text-text-secondary text-label-md mb-2">Timp funcționare</p>
              <h3 className="text-[40px] text-primary leading-none font-semibold">
                {stats.tOnMinutes >= 60 ? `${Math.floor(stats.tOnMinutes/60)}h ${Math.round(stats.tOnMinutes%60)}m` : `${Math.round(stats.tOnMinutes)}m`}
              </h3>
              <div className="flex items-center gap-1 mt-3 text-text-secondary text-label-sm">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                Sistem activ continuu
              </div>
            </div>
            <div className="bg-tertiary-fixed p-3 rounded-xl text-tertiary">
              <span className="material-symbols-outlined text-[32px]">avg_time</span>
            </div>
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          
          {/* Line Chart: Temperature & Humidity Evolution */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-container-padding shadow-sm border border-outline-variant flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-stack-lg">
              <div>
                <h4 className="text-headline-md text-primary">Evoluție Temperatură &amp; Umiditate</h4>
                <p className="text-text-secondary text-label-sm">
                  {timeRange === '-24h' ? 'Ultimele 24 de ore' : timeRange === '-7d' ? 'Ultimele 7 zile' : 'Ultimele 30 de zile'}
                </p>
              </div>
            </div>
            
            <div className="flex-1 relative w-full mt-4 min-h-[300px]">
              {influxLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-primary gap-2">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                  <span className="text-sm font-medium">Se încarcă datele din InfluxDB...</span>
                </div>
              ) : historyData.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-text-secondary gap-2">
                  <AlertCircle className="w-8 h-8" />
                  <span className="text-sm font-medium">Nu există date pe acest interval.</span>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" vertical={false} />
                    <XAxis dataKey="time" stroke="#64748B" fontSize={11} tickLine={false} dy={10} minTickGap={30} />
                    <YAxis yAxisId="left" domain={['dataMin - 1', 'dataMax + 1']} stroke="#1A2B4B" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis yAxisId="right" orientation="right" domain={['dataMin - 5', 'dataMax + 5']} stroke="#00BCD4" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e0e3e5', borderRadius: '8px', color: '#181c1e', fontSize: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                    />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#44474e' }}/>
                    <Line yAxisId="left" type="monotone" dataKey="temperatura" stroke="#1A2B4B" strokeWidth={3} dot={false} activeDot={{ r: 6 }} name="Temp (°C)" />
                    <Line yAxisId="right" type="monotone" dataKey="umiditate" stroke="#00BCD4" strokeWidth={2} strokeDasharray="5 5" dot={false} activeDot={{ r: 6 }} name="Umiditate (%)" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Bar Chart: Energy Consumption by Hour */}
          <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-container-padding shadow-sm border border-outline-variant flex flex-col min-h-[400px]">
            <div className="mb-stack-lg">
              <h4 className="text-headline-md text-primary">Consum Energie / Oră</h4>
              <p className="text-text-secondary text-label-sm">Distribuție pe intervale</p>
            </div>
            <div className="flex-1 flex items-end justify-between gap-2 px-1">
              <div className="flex-1 bg-surface-container-high rounded-t-full hover:bg-secondary transition-colors" style={{ height: '40%' }}></div>
              <div className="flex-1 bg-surface-container-high rounded-t-full hover:bg-secondary transition-colors" style={{ height: '35%' }}></div>
              <div className="flex-1 bg-surface-container-high rounded-t-full hover:bg-secondary transition-colors" style={{ height: '25%' }}></div>
              <div className="flex-1 bg-secondary-fixed rounded-t-full hover:bg-secondary transition-colors" style={{ height: '65%' }}></div>
              <div className="flex-1 bg-secondary-fixed rounded-t-full hover:bg-secondary transition-colors" style={{ height: '90%' }}></div>
              <div className="flex-1 bg-secondary-fixed rounded-t-full hover:bg-secondary transition-colors" style={{ height: '75%' }}></div>
              <div className="flex-1 bg-primary rounded-t-full" style={{ height: '55%' }}></div>
              <div className="flex-1 bg-surface-container-high rounded-t-full hover:bg-secondary transition-colors" style={{ height: '45%' }}></div>
              <div className="flex-1 bg-surface-container-high rounded-t-full hover:bg-secondary transition-colors" style={{ height: '30%' }}></div>
              <div className="flex-1 bg-surface-container-high rounded-t-full hover:bg-secondary transition-colors" style={{ height: '50%' }}></div>
            </div>
            <div className="mt-stack-lg border-t border-outline-variant pt-stack-md">
              <div className="flex justify-between items-center">
                <span className="text-label-md font-bold text-primary">Vârf de consum</span>
                <span className="bg-error-container text-on-error-container px-2 py-1 rounded text-label-sm font-bold">14:00 - 15:00</span>
              </div>
              <p className="text-label-sm text-text-secondary mt-2">Electrocasnicele din bucătărie au generat 40% din cererea de astăzi.</p>
            </div>
          </div>

        </div>

        {/* Bottom Section: Impact Ecologic + Raport PDF */}
        <div className="mt-stack-lg grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Ecological Impact Card */}
          <div className="bg-on-primary-container text-on-primary p-6 rounded-xl flex items-center gap-6">
            <div className="p-4 bg-white/10 rounded-full">
              <span className="material-symbols-outlined text-[40px]">eco</span>
            </div>
            <div>
              <h5 className="text-headline-md">Impact Ecologic</h5>
              <p className="text-body-md opacity-80">Astăzi ați economisit echivalentul a 1.2kg de CO2 prin optimizarea încălzirii.</p>
            </div>
          </div>

          {/* Weekly Report Banner */}
          <div className="bg-surface p-container-padding rounded-xl border border-dashed border-outline flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-text-secondary">description</span>
              <span className="text-label-md text-text-primary">Raport săptămânal disponibil</span>
            </div>
            <button className="text-primary font-bold text-label-md flex items-center gap-1 hover:underline">
              Descarcă PDF
              <span className="material-symbols-outlined text-[18px]">download</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
};

export default History;
