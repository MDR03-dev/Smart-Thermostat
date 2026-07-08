#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <FirebaseESP32.h>

// ---------------------------
// WiFi Configuration
// ---------------------------
#define WIFI_SSID "iPhone Madroanee"
#define WIFI_PASSWORD "123456789"

// ---------------------------
// Firebase Configuration
// ---------------------------
#define FIREBASE_HOST "smartthermostat-7a31d-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "AIzaSyByxd-e833-dEP7IFkxFK6YcMbOq90cU1E"

FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// ---------------------------
// InfluxDB Configuration
// ---------------------------
const char* influx_url = "https://eu-central-1-1.aws.cloud2.influxdata.com/api/v2/write?org=6be1262abdf57cf9&bucket=Student&precision=s";
const char* influx_token = "Token 44TLeCBk3T1eHUuW7uaGzwnkKSn4LWPYRFWyMatsEh1CT43M5UO8hWGWWKYzfz5dnGrnaeNsGz4RmbL_6b1X2Q==";

// ---------------------------
// Hardware Pins (Relays)
// ---------------------------
#define RELAY_HEAT 19 // IN1 - Incalzire
#define RELAY_COOL 18 // IN2 - Racire

// ---------------------------
// State Variables
// ---------------------------
float current_temp = 20.0;
float target_temp = 20.0;
float hysteresis = 0.5;

bool heating_on = false;
bool cooling_on = false;

unsigned long lastUpdate = 0;
const unsigned long UPDATE_INTERVAL = 10000; // 10 secunde pentru logare InfluxDB
unsigned long lastFirebasePoll = 0;
const unsigned long FIREBASE_POLL_INTERVAL = 2000;

void updateRelays() {
  // Logica Bang-Bang cu Histerezis
  if (current_temp < (target_temp - hysteresis / 2.0)) {
    heating_on = true;
    cooling_on = false;
  } else if (current_temp > (target_temp + hysteresis / 2.0)) {
    heating_on = false;
    cooling_on = true; // Dacă se dorește și răcire automată
  } else {
    // În banda moartă (deadband), menținem starea anterioară pentru a preveni comutările frecvente
    if (heating_on && current_temp >= target_temp) heating_on = false;
    if (cooling_on && current_temp <= target_temp) cooling_on = false;
  }

  // Releele sunt ACTIVE LOW (LOW = pornit, HIGH = oprit)
  digitalWrite(RELAY_HEAT, heating_on ? LOW : HIGH);
  digitalWrite(RELAY_COOL, cooling_on ? LOW : HIGH);
}

void setup() {
  Serial.begin(115200);

  // Initializare pini relee
  pinMode(RELAY_HEAT, OUTPUT);
  pinMode(RELAY_COOL, OUTPUT);
  
  // Stare initiala oprita (HIGH = oprit pentru module active-low)
  digitalWrite(RELAY_HEAT, HIGH);
  digitalWrite(RELAY_COOL, HIGH);

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("\nConnected to Wi-Fi");

  // Initialize Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // Verificare si reconectare WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi pierdut. Reconectare...");
    WiFi.reconnect();
  }

  // Citire valori din Firebase la intervale regulate
  if (millis() - lastFirebasePoll >= FIREBASE_POLL_INTERVAL) {
    lastFirebasePoll = millis();

    if (Firebase.ready()) {
      if (Firebase.getFloat(fbdo, "/nod2/temperatura")) {
        current_temp = fbdo.floatData();
      }
      
      if (Firebase.getFloat(fbdo, "/commands/target_temp")) {
        target_temp = fbdo.floatData();
      }

      // Actualizam releele în funcție de noile date
      updateRelays();
    }
  }

  // Trimitere telemetrie estimata (fara INA219) catre InfluxDB
  if (millis() - lastUpdate >= UPDATE_INTERVAL) {
    lastUpdate = millis();

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(influx_url);
      http.addHeader("Authorization", influx_token);
      http.addHeader("Content-Type", "text/plain");

      // Payload Line Protocol (Measurement: termostat, Tags: node=nod1)
      // Trimitem 1 sau 0 pentru incalzire și target-ul curent
      String payload = "termostat,node=nod1 incalzire_on=" + String(heating_on ? 1 : 0) + ",setpoint_c=" + String(target_temp);
      
      int httpResponseCode = http.POST(payload);
      if (httpResponseCode > 0) {
        Serial.print("InfluxDB HTTP Code: ");
        Serial.println(httpResponseCode);
      } else {
        Serial.print("Eroare la trimiterea InfluxDB: ");
        Serial.println(httpResponseCode);
      }
      http.end();
    }
  }
}
