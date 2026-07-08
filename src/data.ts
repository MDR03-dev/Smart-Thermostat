/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { RoomState, SystemSettings, TelemetryPoint } from './types';

export const initialRooms: RoomState[] = [
  {
    id: 'living-room',
    name: 'Living Room',
    currentTemp: 23.4,
    humidity: 48,
    setpoint: 22.5,
    mode: 'heating',
    scenario: 'home',
    scenarioSetpoints: {
      home: { heating: 22.5, cooling: 24.0 },
      away: { heating: 17.0, cooling: 28.0 },
      night: { heating: 20.0, cooling: 25.0 }
    }
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    currentTemp: 21.8,
    humidity: 53,
    setpoint: 21.0,
    mode: 'cooling',
    scenario: 'home',
    scenarioSetpoints: {
      home: { heating: 21.0, cooling: 23.0 },
      away: { heating: 16.0, cooling: 27.0 },
      night: { heating: 19.0, cooling: 24.0 }
    }
  }
];

export const initialSettings: SystemSettings = {
  lowThreshold: 19.5,
  highThreshold: 22.5,
  energyTariff: 0.80,
  nominalPower: 2000,
  selectedTariffProfile: 'Eco Plus'
};

export const livingRoomHistory: TelemetryPoint[] = [
  { time: '00:00', temp: 21.2, humidity: 47, consumption: 0.15 },
  { time: '02:00', temp: 20.8, humidity: 47, consumption: 0.10 },
  { time: '04:00', temp: 20.5, humidity: 48, consumption: 0.08 },
  { time: '06:00', temp: 21.0, humidity: 48, consumption: 0.25 },
  { time: '08:00', temp: 22.1, humidity: 49, consumption: 0.40 },
  { time: '10:00', temp: 22.8, humidity: 49, consumption: 0.45 },
  { time: '12:00', temp: 23.2, humidity: 50, consumption: 0.50 },
  { time: '14:00', temp: 23.5, humidity: 49, consumption: 0.85 }, // peak
  { time: '16:00', temp: 23.1, humidity: 48, consumption: 0.60 },
  { time: '18:00', temp: 22.7, humidity: 47, consumption: 0.55 },
  { time: '20:00', temp: 22.4, humidity: 46, consumption: 0.45 },
  { time: '22:00', temp: 21.9, humidity: 46, consumption: 0.30 },
  { time: 'Acum', temp: 23.4, humidity: 48, consumption: 0.20 }
];

export const kitchenHistory: TelemetryPoint[] = [
  { time: '00:00', temp: 20.5, humidity: 51, consumption: 0.12 },
  { time: '02:00', temp: 20.1, humidity: 52, consumption: 0.08 },
  { time: '04:00', temp: 19.8, humidity: 52, consumption: 0.05 },
  { time: '06:00', temp: 20.3, humidity: 53, consumption: 0.30 },
  { time: '08:00', temp: 21.5, humidity: 54, consumption: 0.65 },
  { time: '10:00', temp: 21.9, humidity: 54, consumption: 0.35 },
  { time: '12:00', temp: 22.8, humidity: 55, consumption: 0.90 }, // cooking peak
  { time: '14:00', temp: 22.2, humidity: 53, consumption: 0.40 },
  { time: '16:00', temp: 21.7, humidity: 52, consumption: 0.30 },
  { time: '18:00', temp: 23.1, humidity: 55, consumption: 1.10 }, // dinner peak
  { time: '20:00', temp: 22.5, humidity: 54, consumption: 0.70 },
  { time: '22:00', temp: 21.3, humidity: 53, consumption: 0.40 },
  { time: 'Acum', temp: 21.8, humidity: 53, consumption: 0.25 }
];
