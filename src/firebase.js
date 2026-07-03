import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "smartthermostat-7a31d",
  appId: "1:706463134328:web:efba457e4eac31d002338d",
  databaseURL: "https://smartthermostat-7a31d-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "smartthermostat-7a31d.firebasestorage.app",
  apiKey: "AIzaSyByxd-e833-dEP7IFkxFK6YcMbOq90cU1E",
  authDomain: "smartthermostat-7a31d.firebaseapp.com",
  messagingSenderId: "706463134328",
  measurementId: "G-K4M5PKQYH3",
  projectNumber: "706463134328"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const db = getDatabase(app);

// Initialize Auth
const auth = getAuth(app);

export { app, db, auth };
