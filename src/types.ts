/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface RoomState {
  id: 'living-room' | 'kitchen';
  name: string;
  currentTemp: number;
  humidity: number;
  setpoint: number;
  mode: 'cooling' | 'heating';
  scenario: 'home' | 'away' | 'night';
  scenarioSetpoints: {
    home: { heating: number; cooling: number };
    away: { heating: number; cooling: number };
    night: { heating: number; cooling: number };
  };
}

export interface SystemSettings {
  hysteresis: number;
  energyTariff: number;
  nominalPowerHeating: number;
  nominalPowerCooling: number;
  selectedTariffProfile: 'Standard' | 'Noapte (Redus)' | 'Eco Plus';
}

export interface TelemetryPoint {
  time: string;
  temp: number;
  humidity: number;
  consumption: number; // in Wh or kWh
}

export type ActiveTab = 'dashboard' | 'history' | 'settings';
