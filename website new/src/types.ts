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
}

export interface SystemSettings {
  lowThreshold: number;
  highThreshold: number;
  energyTariff: number;
  nominalPower: number;
  selectedTariffProfile: 'Standard' | 'Noapte (Redus)' | 'Eco Plus';
}

export interface TelemetryPoint {
  time: string;
  temp: number;
  humidity: number;
  consumption: number; // in Wh or kWh
}

export type ActiveTab = 'dashboard' | 'history' | 'settings';
