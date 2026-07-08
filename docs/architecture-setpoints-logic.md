# Arhitectura și Logica Setpoint-urilor (Termostat)

Acest document descrie felul în care aplicația gestionează pragurile termice (setpoints) în funcție de scenariu (Acasă, Plecat, Noapte) și de modul selectat (Încălzire, Răcire), precum și corelarea acestora cu comportamentul hardware (histerezis).

## 1. Structura Datelor (State)

Interfața web a abandonat folosirea unui singur setpoint global în favoarea unei matrice per cameră, unde se rețin temperaturile preferate independent. În structura `RoomState` (definită în `src/types.ts`), regăsim obiectul `scenarioSetpoints`:

```typescript
export interface RoomState {
  // ... restul variabilelor (currentTemp, humidity, mode, scenario)
  setpoint: number; // Pragul termic activ, trimis către Firebase
  scenarioSetpoints: {
    home: { heating: number; cooling: number };
    away: { heating: number; cooling: number };
    night: { heating: number; cooling: number };
  };
}
```

### De ce această structură?
Dacă utilizatorul setează 20°C pentru Încălzire pe profilul "Acasă", apoi comută pe Răcire și setează 23°C, platforma va salva ambele valori. La o viitoare comutare între moduri sau între scenarii, va fi reactivat exact pragul dorit, fără ca setările să se suprascrie neintenționat.

## 2. Fluxul Logic în UI (`DashboardTab.tsx` & `App.tsx`)

Aplicația folosește funcția centrală de state `updateActiveRoom`. Când are loc o modificare, următoarele acțiuni se declanșează:

- **La apăsarea butoanelor (+ / -) pentru setpoint**: 
  Setarea curentă din `activeRoom.setpoint` este ajustată și suprascrisă direct și în interiorul `scenarioSetpoints[scenariu_curent][mod_curent]`.

- **La schimbarea scenariului (ex: Acasă -> Noapte)**:
  Sistemul citește noua valoare din memorie: `activeRoom.scenarioSetpoints.night[mod_curent]` și o încarcă în `activeRoom.setpoint`.

- **La schimbarea modului (ex: Încălzire -> Răcire)**:
  Sistemul citește valoarea memorată: `activeRoom.scenarioSetpoints[scenariu_curent].cooling` și o încarcă în `activeRoom.setpoint`.

- **Sincronizarea cu Firebase (`App.tsx`)**:
  De fiecare dată când `activeRoom.setpoint` sau `activeRoom.scenario` se modifică, interfața web face un push (`set()`) direct către Firebase (în nodurile `commands/target_temp` și respectiv `config/scenariu_activ`).

## 3. Logica Hardware (Histerezis)

Aplicația Web **nu** trimite direct semnale on/off către relee pe baza temperaturii curente, ci trimite strict **target_temp**. Responsabilitatea controlului fizic cade în sarcina microcontrolerului, folosind logica de *histerezis*.

Pentru exemplificare, dacă avem o valoare a histerezisului de `H`:

- **Modul Încălzire (Heating)**:
  - Dacă utilizatorul a setat pragul (target_temp) la **20°C**.
  - Releul pentru încălzire va primi semnalul să **pornească** centrala când temperatura senzorului scade sub **20°C - H**.
  - Releul se va **opri** în momentul în care temperatura a atins **20°C + H**.

- **Modul Răcire (Cooling)**:
  - Dacă utilizatorul a setat pragul la **23°C**.
  - Releul pentru răcire (ex: AC) va **porni** când temperatura depășește **23°C + H**.
  - Releul se va **opri** după ce camera a fost răcită la **23°C - H**.

> Această arhitectură permite decuplarea interfeței (care e strict responsabilă cu afișarea și stocarea preferințelor pe mai multe axe de profil/mod) de logica fizică de menținere a climei.
