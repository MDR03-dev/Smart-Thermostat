#include <Arduino.h>
#include <Wire.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <FirebaseESP32.h>
#include <Adafruit_SHT31.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// ---------------------------
// WiFi Configuration
// ---------------------------
// ÎNLOCUIEȘTE CU DATELE TALE:
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
// Hardware Instances
// ---------------------------
Adafruit_SHT31 sht31 = Adafruit_SHT31();

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

unsigned long lastUpdate = 0;
const unsigned long UPDATE_INTERVAL = 3000; // 3 secunde pentru afisaj si baze de date

void setup() {
  Serial.begin(115200);
  
  // Initialize I2C pe pinii conectati fizic (SDA = 22, SCL = 23)
  Wire.begin(22, 23);

  // Initialize OLED (Adresa I2C 0x3C)
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("Eroare la alocarea SSD1306!"));
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(WHITE);
  display.setCursor(0, 0);
  display.println("Booting Smart Home...");
  display.display();

  // Initialize SHT31 (Adresa I2C 0x44)
  if (!sht31.begin(0x44)) {
    Serial.println("SHT31 nu a fost gasit!");
    display.println("SHT31 eroare!");
    display.display();
  } else {
    display.println("SHT31 OK");
    display.display();
  }

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  display.println("Conn WiFi...");
  display.display();
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.println("Connected to Wi-Fi");

  // Initialize Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  if (millis() - lastUpdate >= UPDATE_INTERVAL) {
    lastUpdate = millis();

    // Verificare conexiune WiFi și reconectare
    if (WiFi.status() != WL_CONNECTED) {
      Serial.println("Conexiune WiFi pierduta. Reconectare...");
      WiFi.reconnect();
    }

    // 1. Citește SHT31
    float t = sht31.readTemperature();
    float h = sht31.readHumidity();

    if (!isnan(t)) {
      Serial.print("Temp: "); Serial.print(t); Serial.println(" C");
      Serial.print("Hum: "); Serial.print(h); Serial.println(" %");

      // 2. Actualizează Ecranul OLED
      display.clearDisplay();
      display.setTextSize(2);
      display.setCursor(0, 0);
      display.print("T: "); display.print(t, 1); display.println("C");
      display.print("H: "); display.print(h, 1); display.println("%");
      
      display.setTextSize(1);
      display.setCursor(0, 50);
      if(WiFi.status() == WL_CONNECTED) {
        display.println("WiFi: CONECTAT");
      } else {
        display.println("WiFi: EROARE!");
      }
      display.display();

      // 3. Trimite datele în Firebase (Realtime Database)
      if (Firebase.ready()) {
        Firebase.setFloat(fbdo, "/nod2/temperatura", t);
        Firebase.setFloat(fbdo, "/nod2/umiditate", h);
      }

      // 4. Trimite datele în InfluxDB (prin HTTP POST Line Protocol)
      if(WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(influx_url);
        http.addHeader("Authorization", influx_token);
        http.addHeader("Content-Type", "text/plain");

        // Format: measurement,tag=valoare field=valoare
        String payload = "termostat,node=nod2 temperatura=" + String(t) + ",umiditate=" + String(h);
        int httpResponseCode = http.POST(payload);
        
        if(httpResponseCode > 0) {
          Serial.print("InfluxDB HTTP Code: ");
          Serial.println(httpResponseCode);
        } else {
          Serial.print("Eroare la trimiterea InfluxDB: ");
          Serial.println(httpResponseCode);
        }
        http.end();
      }
    } else {
      Serial.println("Eroare la citirea din SHT31!");
    }
  }
}
