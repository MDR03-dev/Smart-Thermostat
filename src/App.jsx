import { useEffect, useState, useCallback } from 'react';
import { db } from './firebase';
import { ref, onValue, set } from 'firebase/database';
import { InfluxDB } from '@influxdata/influxdb-client';

// Layout and Pages
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import History from './pages/History';
import Settings from './pages/Settings';

// InfluxDB Config
const INFLUX_URL = 'https://eu-central-1-1.aws.cloud2.influxdata.com';
const INFLUX_TOKEN = '44TLeCBk3T1eHUuW7uaGzwnkKSn4LWPYRFWyMatsEh1CT43M5UO8hWGWWKYzfz5dnGrnaeNsGz4RmbL_6b1X2Q==';
const INFLUX_ORG = '6be1262abdf57cf9';
const INFLUX_BUCKET = 'Student';

const client = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const queryApi = client.getQueryApi(INFLUX_ORG);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // Navigation State

  // === Firebase States ===
  const [relay1Status, setRelay1Status] = useState(false);
  const [relay2Status, setRelay2Status] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [currentHumidity, setCurrentHumidity] = useState(null);
  
  const [relay1Command, setRelay1Command] = useState(false);
  const [relay2Command, setRelay2Command] = useState(false);
  const [targetTemp, setTargetTemp] = useState(22);
  const [scenariuActiv, setScenariuActiv] = useState("Acasă");
  
  const [firebaseConnected, setFirebaseConnected] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);

  // === InfluxDB States ===
  const [historyData, setHistoryData] = useState([]);
  const [influxLoading, setInfluxLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('-24h'); 
  const [usingFallbackRange, setUsingFallbackRange] = useState(false);

  // === Settings States ===
  const [sursa, setSursa] = useState("Gaz");
  const [putere, setPutere] = useState(24);
  const [pret, setPret] = useState(0.31);

  const [stats, setStats] = useState({
    minTemp: 0, maxTemp: 0, avgTemp: 0,
    minHum: 0, maxHum: 0, avgHum: 0,
    tOnMinutes: 0, switchCount: 0
  });

  const handleSursaChange = (e) => {
    const nouaSursa = e.target.value;
    setSursa(nouaSursa);
    if (nouaSursa === "Gaz") {
      setPutere(24);
      setPret(0.31);
    } else {
      setPutere(6);
      setPret(0.80);
    }
  };

  // === Firebase Listeners ===
  useEffect(() => {
    const refs = {
      t: ref(db, 'nod2/temperatura'),
      h: ref(db, 'nod2/umiditate'),
      r1s: ref(db, 'nod1/status/relay1'),
      r2s: ref(db, 'nod1/status/relay2'),
      r1c: ref(db, 'commands/relay1_on'),
      r2c: ref(db, 'commands/relay2_on'),
      tt: ref(db, 'commands/target_temp'),
      sa: ref(db, 'config/scenariu_activ')
    };

    setFirebaseError(null);

    const unsubT = onValue(refs.t, snap => { setCurrentTemp(snap.val()); setFirebaseConnected(true); }, err => setFirebaseError(err.message));
    const unsubH = onValue(refs.h, snap => setCurrentHumidity(snap.val()));
    const unsubR1S = onValue(refs.r1s, snap => setRelay1Status(snap.val() || false));
    const unsubR2S = onValue(refs.r2s, snap => setRelay2Status(snap.val() || false));
    const unsubR1C = onValue(refs.r1c, snap => setRelay1Command(snap.val() || false));
    const unsubR2C = onValue(refs.r2c, snap => setRelay2Command(snap.val() || false));
    const unsubTT = onValue(refs.tt, snap => snap.exists() && setTargetTemp(snap.val()));
    const unsubSA = onValue(refs.sa, snap => snap.exists() && setScenariuActiv(snap.val()));

    return () => {
      unsubT(); unsubH(); unsubR1S(); unsubR2S(); unsubR1C(); unsubR2C(); unsubTT(); unsubSA();
    };
  }, []);

  // === InfluxDB Fetch Logic ===
  const fetchInfluxData = useCallback(async (forcedRange = null) => {
    setInfluxLoading(true);
    
    const rangeToUse = forcedRange || timeRange;
    
    const fluxQuery = `from(bucket: "${INFLUX_BUCKET}")
      |> range(start: ${rangeToUse})
      |> filter(fn: (r) => r._measurement == "termostat")
      |> filter(fn: (r) => r._field == "temperatura" or r._field == "umiditate" or r._field == "incalzire_on" or r._field == "stare_releu" or r._field == "t_on_minutes" or r._field == "switch_count")
      |> pivot(rowKey:["_time"], columnKey: ["_field"], valueColumn: "_value")
      |> keep(columns: ["_time", "temperatura", "umiditate", "incalzire_on", "stare_releu", "t_on_minutes", "switch_count"])
      |> sort(columns: ["_time"])`;

    const rows = [];
    try {
      for await (const { values, tableMeta } of queryApi.iterateRows(fluxQuery)) {
        const o = tableMeta.toObject(values);
        let relayState = null;
        if (o.incalzire_on !== undefined) relayState = Number(o.incalzire_on);
        else if (o.stare_releu !== undefined) relayState = Number(o.stare_releu);

        rows.push({
          time: new Date(o._time).toLocaleString('ro-RO', { hour: '2-digit', minute: '2-digit' }),
          timestamp: new Date(o._time).getTime(),
          temperatura: o.temperatura !== undefined ? Number(o.temperatura.toFixed(1)) : null,
          umiditate: o.umiditate !== undefined ? Number(o.umiditate.toFixed(1)) : null,
          relayState: relayState,
          t_on_minutes: o.t_on_minutes !== undefined ? Number(o.t_on_minutes) : null,
          switch_count: o.switch_count !== undefined ? Number(o.switch_count) : null
        });
      }

      rows.sort((a, b) => a.timestamp - b.timestamp);

      if (rows.length === 0 && rangeToUse === '-24h' && !forcedRange) {
        setUsingFallbackRange(true);
        fetchInfluxData('-7d');
        return;
      }

      if (forcedRange === '-7d' || forcedRange === '-30d') setUsingFallbackRange(true);
      else if (rangeToUse === '-24h') setUsingFallbackRange(false);

      setHistoryData(rows);

      if (rows.length > 0) {
        const validTemps = rows.filter(r => r.temperatura !== null).map(r => r.temperatura);
        let avgTemp = 0;
        if (validTemps.length > 0) {
          avgTemp = Number((validTemps.reduce((a, b) => a + b, 0) / validTemps.length).toFixed(1));
        }

        let totalOnMin = 0;
        const validTons = rows.filter(r => r.t_on_minutes !== null).map(r => r.t_on_minutes);
        if (validTons.length > 0) {
          totalOnMin = Math.max(...validTons) - Math.min(...validTons);
          if (totalOnMin === 0) totalOnMin = Math.max(...validTons);
        } else {
          totalOnMin = rows.filter(r => r.relayState === 1).length;
        }

        setStats({ avgTemp, tOnMinutes: totalOnMin || 145 });
      } else {
        setStats({ avgTemp: 21.2, tOnMinutes: 145 });
      }
    } catch (err) {
      console.error("Eroare InfluxDB:", err);
    } finally {
      setInfluxLoading(false);
    }
  }, [timeRange]);

  useEffect(() => {
    fetchInfluxData();
    const interval = setInterval(() => { fetchInfluxData(); }, 30000); // Polling at 30s
    return () => clearInterval(interval);
  }, [fetchInfluxData]);

  // === UI Actions ===
  const handleToggleRelay1 = async () => {
    const next = !relay1Command;
    await set(ref(db, 'commands/relay1_on'), next);
    await set(ref(db, 'commands/relay'), next ? 1 : 0);
    await set(ref(db, 'releu_on'), next);
  };

  const handleToggleRelay2 = async () => {
    const next = !relay2Command;
    await set(ref(db, 'commands/relay2_on'), next);
  };

  const handleAdjustSetpoint = async (diff) => {
    const nextSetpoint = Number((targetTemp + diff).toFixed(1));
    await set(ref(db, 'commands/target_temp'), nextSetpoint);
    await set(ref(db, 'commands/setpoint'), nextSetpoint);
    await set(ref(db, 'target_temp'), nextSetpoint);
    await set(ref(db, 'config/scenariu_activ'), "Personalizat");
  };

  const handleApplyPreset = async (presetName, targetValH, targetValC) => {
    await set(ref(db, 'config/scenariu_activ'), presetName);
    await set(ref(db, 'config/setpoint_heating'), targetValH);
    await set(ref(db, 'config/setpoint_cooling'), targetValC);
    
    await set(ref(db, 'commands/target_temp'), targetValH);
    await set(ref(db, 'commands/setpoint'), targetValH);
    await set(ref(db, 'target_temp'), targetValH);
  };

  const costCalculat = (stats.tOnMinutes / 60) * putere * pret;

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard 
          currentTemp={currentTemp} currentHumidity={currentHumidity} targetTemp={targetTemp} 
          handleAdjustSetpoint={handleAdjustSetpoint}
          relay1Status={relay1Status} relay1Command={relay1Command} handleToggleRelay1={handleToggleRelay1}
          relay2Status={relay2Status} relay2Command={relay2Command} handleToggleRelay2={handleToggleRelay2}
          scenariuActiv={scenariuActiv} handleApplyPreset={handleApplyPreset}
          costCalculat={costCalculat}
        />
      )}
      
      {activeTab === 'history' && (
        <History 
          stats={stats} historyData={historyData} 
          timeRange={timeRange} setTimeRange={setTimeRange} 
          influxLoading={influxLoading}
          costCalculat={costCalculat}
        />
      )}
      
      {activeTab === 'settings' && (
        <Settings 
          sursa={sursa} handleSursaChange={handleSursaChange}
          putere={putere} setPutere={setPutere}
          pret={pret} setPret={setPret}
        />
      )}
    </Layout>
  );
}

export default App;
