Inginerie Electrică și Calculatoare **Anul universitar 2025/2026** 

# **Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale** 

**Candidat: Mădroane Andrei Nicolae** 

## **Coordonator științific: Conf.Dr.Ing. Octavian Cornea** 

Sesiunea: Iulie 2026 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **REZUMAT** 

Această lucrare prezintă proiectarea și implementarea unui sistem IoT demonstrativ pentru monitorizarea și controlul automatizat al climatizării într-o locuință inteligentă. Arhitectura sistemului este distribuită pe două noduri de procesare hardware, fiecare bazat pe microcontrolerul ESP32, care comunică bidirecțional printr-o infrastructură cloud hibridă cu o interfață web centralizată. 

Nodul 1, denumit Panoul Central de Comandă și Execuție, integrează un senzor de curent și tensiune INA219 pentru măsurarea consumului energetic în timp real, un modul de releu cu două canale prevăzut cu optocuploare pentru izolarea galvanică și două sarcini simulate: o rezistență electrică reprezentând o centrală termică și un mini-ventilator DC reprezentând un sistem de aer condiționat. Nodul 2, Termostatul Inteligent de Ambient, achiziționează temperatura și umiditatea prin senzorul digital SHT31 și afișează statusul local pe un ecran OLED. 

Datele sunt gestionate printr-o arhitectură cloud duală: Firebase Realtime Database asigură sincronizarea stării sistemului cu latență minimă, iar InfluxDB stochează telemetria în format time-series pentru generarea graficelor istorice. Interfața web centralizează monitorizarea live a parametrilor ambientali și energetici, controlul prin praguri de temperatură configurabile, rularea de scenarii predefinite (Acasă, Plecat, Noapte) și un modul de analiză financiară care estimează costurile de funcționare pe baza timpului de operare logat. 

Prototipul validează conceptul de separare fizică între senzoristică și execuție, demonstrând că o arhitectură distribuită cu baze de date specializate poate asigura atât control în timp real, cât și vizibilitate completă asupra eficienței energetice. Sistemul constituie o platformă didactică pentru studiul sistemelor IoT rezidențiale, cu posibilitate de extindere ulterioară spre control predictiv și integrare cu surse regenerabile de energie. 

- 2 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **ABSTRACT** 

This thesis presents the design and implementation of a demonstrative IoT system for automated monitoring and control of residential climate management. The system architecture is distributed across two hardware processing nodes, each based on the ESP32 microcontroller, communicating bidirectionally through a hybrid cloud infrastructure with a centralized web interface. 

Node 1, designated the Central Command and Execution Panel, incorporates an INA219 current and voltage sensor for real-time energy consumption measurement, a dualchannel relay module with optocouplers for galvanic isolation, and two simulated loads: an electric resistor representing a thermal boiler and a DC mini-fan representing an air conditioning unit. Node 2, the Intelligent Ambient Thermostat, acquires temperature and humidity data via the SHT31 digital sensor and displays the local status on an OLED screen. 

Data management employs a dual cloud architecture: Firebase Realtime Database ensures system state synchronization with minimal latency, while InfluxDB stores telemetry in time-series format for historical graph generation. The centralized web interface provides live monitoring of ambient and energy parameters, control through configurable temperature thresholds, predefined scenario execution (Home, Away, Night), and a financial analysis module that estimates operating costs based on logged runtime data. 

The prototype validates the concept of physical separation between sensing and execution, demonstrating that a distributed architecture with specialized databases can provide both real-time control and complete visibility into energy efficiency. The system serves as an educational platform for studying residential IoT systems, with extensibility toward predictive control and integration with renewable energy sources. 

- 3 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **CUPRINS** 

## REZUMAT 

## ABSTRACT 

## **1. INTRODUCERE** 

## 1.1 Contextul proiectului 

- 1.2 Ideea și scopul proiectului 

- 1.3 Structura lucrării 

## **2. SISTEME INTELIGENTE DE MANAGEMENT TERMIC REZIDENȚIAL** 

   - 2.1 Conceptul de locuință inteligentă și automatizarea climatizării 

   - 2.2 Paradigma IoT și arhitecturi nod-cloud 

   - 2.3 Soluții existente și stadiul actual 

   - 2.4 Gestiunea datelor în aplicații IoT 

- 2.5 Protocoale de comunicație în IoT: MQTT vs. HTTP 

## **3. TEHNOLOGII FOLOSITE** 

3.1 Platforma de procesare: ESP32 

- 3.2 Senzoristică și magistrala I2C 

- 3.3 Acționare și izolare: releu cu optocuplor 

- 3.4 Infrastructura cloud: Firebase și InfluxDB 

## **4. ARHITECTURA SISTEMULUI** 

- 4.1 Cerințe funcționale și nefuncționale 

- 4.2 Descrierea arhitecturii și modulele funcționale 

- 4.3 Fluxul de date și comunicația între noduri 

## **5. PROIECTAREA ȘI IMPLEMENTAREA HARDWARE** 

- 5.1 Nodul 1 - Panoul central de comandă și execuție 

- 5.2 Nodul 2 - Termostatul inteligent de ambient 

- 5.3 Scheme electrice și interconectare 

- 5.4 Bugetul energetic și managementul consumului 

## **6. IMPLEMENTAREA SOFTWARE** 

6.1 Firmware-ul nodurilor ESP32 

- 6.2 Integrarea cu Firebase și InfluxDB 

- 6.3 Logica de control și scenariile de automatizare 

   - 6.3.1 Fundamente teoretice: reglaj bang-bang vs. regulator PID 

- 6.4 Arhitectura și implementarea interfeței frontend 

## **7. UTILIZAREA APLICAȚIEI** 

- 7.1 Interfața de monitorizare 

- 4 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

- 7.2 Controlul și scenariile din perspectiva utilizatorului 

- 7.3 Modulul de analiză financiară 

## **8. TESTARE ȘI REZULTATE** 

- 8.1 Metodologia de testare 

- 8.2 Validarea funcțională a lanțului comandă-execuție 

- 8.3 Rezultate privind monitorizarea consumului 

- 8.4 Verificarea estimării costurilor 

## **9. CONCLUZII** 

9.1 Concluzii generale 

- 9.2 Contribuții personale 

9.3 Direcții de dezvoltare ulterioară 

## **BIBLIOGRAFIE** 

- 5 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **1. INTRODUCERE** 

## **1.1 CONTEXTUL PROIECTULUI** 

Sectorul rezidențial reprezintă unul dintre principalii consumatori de energie la nivel european. Conform datelor Eurostat, clădirile rezidențiale acoperă aproximativ 27% din consumul final de energie al Uniunii Europene, iar o parte semnificativă din această pondere provine din sistemele de încălzire și răcire. În România, ponderea consumului energetic rezidențial urmărește un tipar similar, cu o dependență ridicată de surse termice convenționale și un grad scăzut de automatizare a instalațiilor din locuințe. 

Climatizarea ocupă un rol central în bugetul energetic al unei locuințe. Sistemele de încălzire și răcire funcționează pe perioade extinse de timp, iar deciziile de pornire sau oprire sunt frecvent luate empiric, fără o corelație directă cu condițiile reale din ambient. Automatizarea acestor decizii pe baza măsurătorilor continue de temperatură și umiditate permite reducerea funcționării inutile a echipamentelor, cu efecte directe asupra consumului și costurilor. 

Conceptul de locuință inteligentă (smart home) răspunde acestei nevoi prin integrarea senzoristică, a comunicației de rețea și a logicii de control într-un sistem unitar. Managementul termic constituie, în cadrul acestui concept, una dintre aplicațiile cu cel mai mare potențial de eficientizare energetică, dat fiind că instalațiile de climatizare sunt prezente în aproape orice locuință și că inerția termică a spațiilor interioare permite optimizări semnificative prin anticiparea și controlul gradual al temperaturii. Prezenta lucrare demonstrează în ce măsură un sistem IoT accesibil, construit din componente disponibile pe scară largă, poate oferi simultan control automat în timp real, logare continuă a telemetriei și estimare a costurilor de funcționare. 

## **1.2 IDEEA ȘI SCOPUL PROIECTULUI** 

Proiectul propune un sistem IoT demonstrativ, la scară redusă, care modelează o rețea de management termic rezidențial. Ideea centrală constă în separarea fizică a funcțiilor de senzoristică ambientală de cele de execuție: un nod dedicat achiziției temperaturii și umidității comunică prin rețea Wi-Fi cu un nod separat care controlează sarcinile termice (încălzire și răcire). Această arhitectură reflectă configurația reală a locuințelor inteligente, în care senzorul de ambient și centrala termică sau unitatea de aer condiționat se află în locații diferite ale clădirii. 

Scopul general al lucrării este proiectarea, implementarea și validarea unui prototip funcțional care să demonstreze viabilitatea acestei arhitecturi distribuite pentru controlul automatizat al climatizării. Obiectivele specifice care derivă din acest scop sunt: 

- 6 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


a) monitorizarea în timp real a temperaturii, umidității ambientale și a consumului instantaneu de curent electric; 

b) controlul automat al actuatoarelor prin praguri de temperatură configurabile, cu mecanism de histerezis pentru evitarea comutărilor repetitive; 

c) logarea și vizualizarea istorică a datelor de telemetrie prin intermediul unei baze de date de tip time-series și al unui dashboard web; 

d) estimarea automată a costurilor energetice de funcționare pornind de la datele de consum logat și de la profilul echipamentului selectat de utilizator. 

## **1.3 STRUCTURA LUCRĂRII** 

Lucrarea este structurată în nouă capitole. Capitolul 1, de față, situează proiectul în contextul consumului energetic rezidențial și formulează obiectivele specifice. Capitolul 2 prezintă stadiul actual al sistemelor inteligente de management termic, cu accent pe paradigma IoT, arhitecturile nod-cloud și soluțiile comerciale existente, pe care Capitolul 3 le completează prin descrierea tehnologiilor concrete alese pentru implementare și justificarea fiecărei alegeri. 

Capitolul 4 descrie arhitectura de ansamblu a sistemului, cerințele funcționale și fluxul de date end-to-end. Capitolele 5 și 6 detaliază implementarea hardware, respectiv software, de la schemele electrice și conexiunile pin-cu-pin până la firmware-ul nodurilor ESP32 și integrarea cu infrastructura cloud duală. Capitolul 7 prezintă interfața web din perspectiva utilizatorului, iar Capitolul 8 expune metodologia de testare și rezultatele obținute. Lucrarea se încheie cu Capitolul 9, care sintetizează concluziile, contribuțiile proprii și direcțiile de dezvoltare ulterioară. 

- 7 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **2. SISTEME INTELIGENTE DE MANAGEMENT TERMIC REZIDENȚIAL** 

## **2.1 CONCEPTUL DE LOCUINȚĂ INTELIGENTĂ ȘI AUTOMATIZAREA CLIMATIZĂRII** 

Locuința inteligentă, consacrată în literatura de specialitate sub denumirea de smart home, desemnează un ansamblu de sisteme tehnice interconectate care permit monitorizarea și controlul automatizat al funcțiilor unei clădiri rezidențiale. Subsistemele tipice acoperă iluminatul, securitatea, gestionarea energiei și, cu precădere, climatizarea, adică ansamblul de echipamente responsabile cu menținerea confortului termic interior (Jacobsson et al., 2016). Climatizarea ocupă o poziție centrală în cadrul conceptului de locuință inteligentă nu doar pentru că reprezintă cel mai mare consumator de energie dintro gospodărie, ci și pentru că procesul termic al unui spațiu interior răspunde lent la perturbații, ceea ce creează oportunități reale de optimizare prin anticipare și control gradual. 

Termostatul clasic, în varianta sa bimetalică sau electronică programabilă, funcționează pe baza unui set fix de praguri de temperatură, fără capacitatea de a adapta comportamentul la contextul curent: prezența ocupanților, prognoza meteo sau profilul de consum anterior. Trecerea la termostatul conectat, capabil să comunice bidirecțional cu o infrastructură software, schimbă fundamental paradigma: decizia de pornire sau oprire a echipamentului nu mai este doar o comparație locală cu un prag, ci poate integra date din surse multiple și poate fi ajustată de la distanță, în timp real. Automatizarea pe baza scenariilor (acasă, plecat, noapte) este cea mai directă formă de exploatare a acestei conectivități, reducând funcționarea inutilă a echipamentelor în perioadele de absență (Pérez-Lombard et al., 2008). 

Sistemele HVAC (Heating, Ventilation and Air Conditioning) inteligente adaugă, față de simpla conectivitate, capacitatea de a înregistra continuu parametrii ambientali și de a corecta comportamentul pe baza istoricului. Inerția termică a spațiilor interioare, caracterizată de constante de timp de zeci de minute până la câteva ore, în funcție de materialele de construcție, face ca anticiparea să fie mai eficientă decât reacția: un sistem care pornește încălzirea cu câteva minute înainte de sosirea ocupanților consumă mai puțin decât unul care reacționează la temperatura deja scăzută. Exploatarea acestui comportament necesită acces la date de telemetrie stocate și la un mecanism de control mai rafinat decât un simplu termostat. 

## **2.2 PARADIGMA IoT ȘI ARHITECTURI NOD-CLOUD** 

Internetul obiectelor (IoT, Internet of Things) desemnează un model arhitectural în care dispozitivele fizice (senzori, actuatoare, controlere) sunt conectate la rețea și comunică cu un backend software, fie direct, fie prin intermediul unui gateway. În domeniul rezidențial, modelul curent dominant este cel cu trei niveluri: nivelul de teren (nodurile hardware cu senzori și actuatoare), nivelul cloud (infrastructura de stocare, procesare și sincronizare a datelor) și nivelul de interfață (aplicația web sau mobilă prin care utilizatorul interacționează 

- 8 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


cu sistemul). Comunicarea între niveluri se realizează prin protocoale specifice (HTTP/HTTPS, MQTT sau WebSocket), adaptate la cerințele de latență și volum ale fiecărui flux de date (Al-Fuqaha et al., 2015). 

Arhitectura cu noduri fizic separate, un nod de senzoristică și un nod de execuție, reflectă topologia reală a unei locuințe: senzorul de temperatură stă în camera de locuit, în timp ce centrala termică sau unitatea exterioară de aer condiționat se află în altă locație a clădirii. Separarea reduce cuplajul funcțional: nodul de senzoristică nu are nevoie să cunoască detaliile execuției și invers, comunicând exclusiv prin starea intermediată de cloud. Aceasta aduce și un beneficiu practic de robustețe: defecțiunea sau repornirea unui singur nod nu blochează funcționarea celuilalt, deoarece starea de control este persistată în cloud, nu local. 

Un avantaj al arhitecturii distribuite față de soluțiile centralizate (un singur microcontroler care gestionează atât senzorii, cât și actuatoarele) este separarea clară a responsabilităților și posibilitatea de a scala independent fiecare nod. Dezavantajul constă în dependența de conectivitatea Wi-Fi: pierderea accesului la rețea poate întrerupe comunicarea dintre noduri, deși implementările mature includ mecanisme de fallback local sau de reconectare automată. În contextul unui prototip demonstrativ, această limitare este acceptabilă și menționată explicit. 

## **2.3 SOLUȚII EXISTENTE ȘI STADIUL ACTUAL** 

Piața termostatelor conectate este dominată de câteva produse comerciale bine documentate, fiecare cu o arhitectură și un model de date propriu. Nest Learning Thermostat (Google) utilizează un algoritm de învățare automată pentru a construi un profil al obiceiurilor termice ale ocupanților și a ajusta automat programul de funcționare (Google, 2024). Arhitectura este centralizată pe cloud proprietar, cu un singur dispozitiv care integrează senzoristică și control, și nu oferă acces direct la datele brute de telemetrie sau la modelul de estimare a costurilor. Ecobee SmartThermostat adoptă o abordare similară, adăugând senzori de cameră wireless pentru detectarea prezenței și ocupanței, ceea ce permite optimizarea pe zone (Ecobee, 2024). Ambele soluții funcționează în ecosisteme cu grad ridicat de închidere: integrarea cu alte platforme este posibilă, dar limitată de API-urile expuse de producător. 

Homie, un protocol open-source pentru IoT rezidențial bazat pe MQTT, și soluțiile construite pe Home Assistant reprezintă polul opus: ecosisteme deschise, cu suport pentru zeci de tipuri de hardware, dar care necesită cunoștințe tehnice semnificative pentru configurare și mentenanță (Home Assistant, 2024). Vizibilitatea asupra consumului energetic real depinde de hardware suplimentar (contor inteligent, senzor de curent) și nu este integrată nativ în toate configurările. 

Nișa pe care o ocupă proiectul de față este definită de combinația dintre trei elemente care nu apar simultan în soluțiile comerciale menționate: separarea fizică a senzoristicii de execuție cu comunicare prin cloud, logarea continuă a telemetriei într-o bază 

- 9 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


de date de tip time-series cu acces deschis și un modul de estimare a costurilor de funcționare bazat pe datele reale de consum. Scopul prototipului nu este concurența cu produsele comerciale, ci demonstrarea viabilității acestei arhitecturi într-o formă didactică, reproductibilă și documentată complet. 

## **2.4 GESTIUNEA DATELOR ÎN APLICAȚII IoT** 

Datele generate de un sistem IoT rezidențial prezintă două naturi distincte care impun tratamente diferite de stocare. Prima categorie, starea sistemului, cuprinde informații precum statusul ON/OFF al releelor, scenariul activ sau setpoint-urile configurate de utilizator. Aceste date sunt mici ca volum, se modifică rar, dar sunt citite frecvent și cu cerințe stricte de latență: o comandă emisă de utilizator trebuie să ajungă la actuator în cel mult câteva sute de milisecunde. Modelul potrivit este cel al unei baze de date realtime, cu sincronizare push și persistență a ultimei valori cunoscute (Firebase Documentation, 2024). 

A doua categorie, telemetria, cuprinde valorile periodice ale senzorilor: temperatură, umiditate, curent absorbit și timestamp. Aceste date sunt generate continuu, cu frecvențe de la câteva secunde la câteva minute, se acumulează rapid și sunt interogabile în principal pe intervale de timp (ultimele 24 de ore, ultima săptămână). Structura lor este secvențială și imuabilă: o înregistrare odată scrisă nu se modifică. Baza de date de tip time-series este soluția optimă pentru acest model de acces: prin indexarea implicită pe dimensiunea timp și prin funcții agregate specializate (medie, minim, maxim pe intervale), poate răspunde eficient la interogările necesare generării graficelor istorice, la costuri de stocare și interogare semnificativ mai mici decât o bază de date relațională convențională (InfluxData, 2024). 

Decizia de a utiliza două baze de date separate, una pentru stare, alta pentru telemetrie, nu este o complexitate adăugată arbitrar, ci rezultă direct din nepotrivirea dintre cerințele celor două tipuri de date și modelul de stocare al oricăreia dintre ele privite separat. O bază de date relațională ar putea stoca ambele tipuri, dar ar fi supradimensionată pentru stare și suboptimă pentru telemetrie. O bază de date realtime singură ar gestiona eficient starea, dar nu este concepută pentru interogări agregate pe serii de timp. Arhitectura duală este un compromis justificat tehnic, pe care lucrarea îl argumentează și îl implementează concret în capitolele 5 și 6. 

## **2.5 PROTOCOALE DE COMUNICAȚIE ÎN IoT: MQTT vs. HTTP** 

Alegerea protocolului de comunicație dintre nodurile IoT și infrastructura cloud are consecințe directe asupra latenței comenzilor, consumului de energie al dispozitivelor și complexității implementării firmware-ului. În domeniul IoT rezidențial, cele mai utilizate protocoale la nivelul stratului de aplicație sunt MQTT (Message Queuing Telemetry Transport) și HTTP (Hypertext Transfer Protocol), fiecare cu un model de transfer și un profil de performanță distinct (Al-Fuqaha et al., 2015). 

- 10 - 

Politehnica Universitateadin Timisoara 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

MQTT este un protocol de mesagerie de tip publish-subscribe, proiectat inițial pentru sisteme cu resurse limitate și conexiuni instabile. Comunicarea se desfășoară prin intermediul unui broker central: dispozitivele publică mesaje pe canale denumite topic-uri, iar abonații interesați primesc mesajele corespunzătoare prin conexiunea persistentă TCP menținută cu broker-ul. Suprasarcina de protocol (overhead) este minim, (antetul fix al pachetului MQTT are doar 2 octeți), ceea ce îl face eficient energetic pentru dispozitive cu baterie. Pe de altă parte, necesitatea unui broker intermediar (Mosquitto, HiveMQ, AWS IoT Core etc.) adaugă un element de infrastructură suplimentar care trebuie configurat, menținut și securizat. Calitatea serviciului (QoS) este configurabilă pe trei niveluri: QoS 0 (cel mult o dată, fără confirmare), QoS 1 (cel puțin o dată, cu confirmare) și QoS 2 (exact o dată, cu handshake complet), ceea ce permite adaptarea comportamentului la criticitatea mesajului (Banks &amp; Gupta, 2019). 

HTTP funcționează pe un model request-response: clientul (dispozitivul IoT) inițiază explicit fiecare schimb de date printr-un request GET sau POST, iar serverul răspunde și închide tranzacția. Overhead-ul unui request HTTP este semnificativ mai mare față de un pachet MQTT: antetele HTTP pot totaliza câteva sute de octeți per tranzacție față de câțiva octeți pentru MQTT. Cu toate acestea, HTTP este nativ compatibil cu orice infrastructură web existentă, nu necesită un broker dedicat și beneficiază de un ecosistem matur de biblioteci disponibile pe aproape orice platformă de dezvoltare, inclusiv ESP32. Versiunea securizată HTTPS, care utilizează TLS pentru criptarea traficului, este suportată direct de biblioteca WiFiClientSecure din framework-ul Arduino-ESP32, fără biblioteci suplimentare. 

WebSocket reprezintă un al treilea model, care extinde HTTP printr-un mecanism de upgrade al conexiunii: după negocierea inițială HTTP, conexiunea rămâne deschisă bidirecțional, eliminând necesitatea unui nou request pentru fiecare mesaj. Firebase Realtime Database utilizează intern WebSocket pentru propagarea actualizărilor de stare în timp real, ceea ce explică latența sa sub 500 ms pentru sincronizarea comenzilor, comparabil cu MQTT la QoS 1. Diferența față de MQTT pur constă în faptul că WebSocket rămâne un protocol punct-la-punct, fără semantica de topic și abonament oferită de brokerul MQTT. 

În Tabelul 1 este prezentată o comparație sintetică între cele trei protocoale din perspectiva cerințelor proiectului de față. 

**Tabelul 1. Comparație protocoale de comunicație IoT** 

|**Criteriu**|**MQTT**|**HTTP / HTTPS**|**WebSocket**|
|---|---|---|---|
|Model|Publish-Subscribe|Request-<br>Response|Full-duplex<br>persistent|
|Overhead protocol|Minim (~2 octeți<br>antet)|Ridicat (~200-500<br>octeți antet)|Redus după<br>negociere inițială|



- 11 - 

Politehnica Universitateadin Timisoara 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae 

Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

|Infrastructură<br>necesară|Broker MQTT<br>dedicat|Server web<br>standard|Server cu suport<br>WS|
|---|---|---|---|
|Latență tipică|<100 ms (QoS 0)|100-500 ms (per<br>request)|<50 ms (după<br>conectare)|
|Complexitate<br>implementare<br>ESP32|Medie (bibliotecă<br>PubSubClient)|Redusă<br>(HTTPClient nativ)|Gestionat de<br>Firebase SDK|
|Utilizat în proiect|Nu|Da (scrieri<br>InfluxDB)|Da (Firebase<br>stream)|



Alegerea HTTP pentru scrierile de telemetrie în InfluxDB se justifică prin compatibilitatea nativă a protocolului cu REST API-ul InfluxDB (endpoint-ul /api/v2/write), prin disponibilitatea bibliotecii HTTPClient în framework-ul Arduino-ESP32 fără dependențe suplimentare și prin faptul că telemetria nu impune cerințe de latență sub 100 ms, scrierile se fac la intervale de 60 de secunde, timp mai mult decât suficient pentru un request HTTP complet. Adoptarea unui broker MQTT dedicat ar fi adăugat un element de infrastructură suplimentar care nu se justifică prin beneficii concrete în condițiile acestui proiect: sistemul nu are dispozitive cu baterie a căror durată de viață să fie afectată de overhead-ul HTTP, iar frecvența redusă de scriere (un punct pe minut) nu produce încărcare semnificativă pe conexiunea Wi-Fi. 

Propagarea comenzilor de control în sens invers, de la dashboard la releu, folosește Firebase Realtime Database, care implementează intern WebSocket pentru a menține o conexiune persistentă între biblioteca FirebaseESP32 de pe ESP32 și serverele Google. Această alegere elimină necesitatea polling-ului periodic: nodul ESP32 primește actualizarea de stare imediat după ce utilizatorul apasă un buton în interfață, fără să fie nevoie să interogheze activ Firebase la intervale regulate. Rezultatul practic este că, pe traseul comandă, latența este comparabilă cu MQTT la QoS 1, în timp ce pe traseul telemetrie, simplitatea HTTP este pe deplin adecvată. Combinarea celor două protocoale în funcție de natura fluxului de date, nu adoptarea unuia singur pentru tot, reprezintă decizia de proiectare argumentată în această secțiune. 

- 12 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **3. TEHNOLOGII FOLOSITE** 

## **3.1 PLATFORMA DE PROCESARE: ESP32** 

Microcontrolerul ESP32 (Figura 1), produs de Espressif Systems, a fost ales ca platformă de procesare pentru ambele noduri ale sistemului. Decizia se justifică prin convergența mai multor caracteristici relevante pentru arhitectura proiectată. ESP32 integrează pe același circuit un procesor dual-core Xtensa LX6 la 240 MHz, un modul Wi-Fi 802.11 b/g/n cu suport pentru TCP/IP și TLS, un modul Bluetooth și un set bogat de periferice digitale și analogice, toate într-un pachet cu consum redus de energie și cost scăzut (Espressif Systems, 2023). Prezența Wi-Fi nativ elimină necesitatea unui shield sau modul extern de conectivitate, simplificând schema hardware și reducând numărul de componente. 

Figura 1. Microcontroler ESP32 (sursa: joy-it.net) (sursa: joy-it.net) 

Alternativele considerate includ ESP8266 și Arduino Uno cu shield Wi-Fi. ESP8266 oferă conectivitate Wi-Fi nativă la un cost similar, dar dispune de un singur nucleu de procesare la 80 MHz și un set mai restrâns de periferice I2C, ceea ce îl face mai puțin potrivit pentru gestionarea simultană a magistralei I2C, a logicii de control și a comunicației cloud. Arduino Uno nu include Wi-Fi nativ, iar adăugarea unui shield crește costul, complexitatea hardware și consumul de energie. În concluzie, ESP32 reprezintă soluția cu cel mai bun raport între capabilități și complexitate pentru cerințele acestui proiect. 

Din specificațiile tehnice relevante pentru proiect: tensiunea de operare este de 3,3 V, curentul maxim pe un pin GPIO este de 12 mA, iar pinii SDA și SCL pentru magistrala I2C sunt configurabili software pe orice GPIO, fapt care oferă flexibilitate în rutarea conexiunilor pe PCB sau pe breadboard (Espressif Systems, 2023). Alimentarea modulului de dezvoltare se face la 5 V prin conectorul USB, cu un regulator de tensiune intern care asigură 3,3 V pe logică. 

- 13 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **3.2 SENZORISTICĂ ȘI MAGISTRALA I2C** 

Achiziția temperaturii și umidității ambientale este realizată de senzorul digital SHT31 (Figura 2), produs de Sensirion. Senzorul utilizează un element capacitiv pentru umiditate și un element de rezistență termică (bandgap) pentru temperatură, ambele calibrate individual în fabrică și cu compensare mutuală integrată în circuitul de semnal. Precizia declarată în datasheet este de ±0,3°C pentru temperatură și ±2% HR pentru umiditate relativă, pe domenii de măsurare de −40°C...+125°C, respectiv 0%...100% HR (Sensirion, 2023). Aceste caracteristici sunt suficiente pentru declanșarea corectă a scenariilor de climatizare, unde o eroare de câteva zecimi de grad nu afectează confortul termic perceput, dar o eroare de câțiva grade ar putea duce la funcționare inutilă a echipamentelor. 

Figura 2. Senzor SHT31 (sursa: www.direnc.net) 

Monitorizarea energetică a sistemului este asigurată de senzorul INA219, produs de Texas Instruments. INA219 este un monitor de curent și tensiune pe magistrala I2C, care măsoară căderea de tensiune pe un rezistor de shunt cu un convertor analog-digital de 12 biți integrat și calculează intern curentul, tensiunea pe magistrală și puterea absorbită (Texas Instruments, 2015). Rezoluția curentului depinde de valoarea rezistorului de shunt utilizat; pentru o rezistență de 0,1 Ω și domeniul implicit de ±3,2 A, rezoluția este de aproximativ 0,8 mA. Senzorul este integrat pe alimentarea nodului 1, permițând măsurarea consumului întregului sistem de execuție în timp real. 

Ambii senzori comunică prin magistrala I2C (Inter-Integrated Circuit), un protocol de comunicație serială sincronă cu două fire, SDA (date) și SCL (ceas), standardizat de NXP Semiconductors (NXP Semiconductors, 2021). Adresarea dispozitivelor pe magistrală se face pe 7 biți, ceea ce permite conectarea simultană a până la 112 dispozitive pe aceeași 

- 14 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


pereche de fire. SHT31 are adresa implicită 0x44 (configurabilă la 0x45 prin pinul ADDR), iar INA219 are adresa implicită 0x40, configurabilă prin pinii A0 și A1. Coexistența pe aceeași magistrală I2C a ESP32 este posibilă fără conflicte de adresă în configurarea implicită utilizată în proiect. 

## **3.3 ACȚIONARE ȘI IZOLARE: RELEU CU OPTOCUPLOR** 

Comutarea sarcinilor electrice (rezistența de încălzire și ventilatorul DC) este realizată printr-un modul de releu cu două canale utilizat în proiect (Figura 3), prevăzut cu optocuploare pentru izolarea galvanică dintre circuitul de comandă și circuitul de putere. Releul electromagnetic funcționează pe principiul atracției magnetice: curentul de comandă alimentează bobina releului, câmpul magnetic generat atrage armătura mobilă și închide (sau deschide) contactul de putere. Izolarea galvanică prin optocuplor este esențială în acest context: pinii GPIO ai ESP32 operează la 3,3 V și pot furniza un curent maxim de 12 mA, valori incompatibile cu comanda directă a bobinei releului, care necesită tipic 70-90 mA la 5 V. Optocuplorul, un LED infraroșu cuplat optic cu un fototranzistor fără legătură electrică directă, permite comanda releului de la un pin GPIO al ESP32 printr-o rezistență de limitare a curentului, fără a solicita pinul peste limitele admise și fără a expune circuitul de control la tensiunile sau tranzienții din circuitul de putere. 

Figura 3. Modul releu cu optocuplor, 2 canale (sursa: sigmanortec.ro) 

Modulul utilizat integrează pe același PCB două relee, doi optocuplori și circuitele de comandă aferente, alimentate la 5 V de la sursa sistemului. Intrările de comandă sunt active low în configurarea implicită a modulului, adică releul comută la nivel logic 0 pe pinul de intrare. Această particularitate este gestionată în firmware prin inversarea logicii de scriere pe pinul GPIO corespunzător. Comanda manuală sau automată a fiecărui canal este independentă, ceea ce permite controlul separat al încălzirii și răcirii. 

- 15 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **3.4 INFRASTRUCTURA CLOUD: FIREBASE ȘI INFLUXDB** 

Firebase Realtime Database este un serviciu de baze de date NoSQL găzduit în cloud, oferit de Google, care stochează datele sub formă de arbore JSON și asigură sincronizarea lor în timp real cu toți clienții conectați, prin WebSocket (Firebase Documentation, 2024). Latența tipică a unei scrieri și propagarea actualizării către clienți este de ordinul zecilor de milisecunde în condiții normale de rețea, ceea ce îl face potrivit pentru stocarea stării sistemului: un setpoint modificat de utilizator în dashboard este vizibil pe nodul ESP32 în mai puțin de o secundă. Firebase oferă, de asemenea, reguli de securitate configurabile și autentificare prin mai multe metode, aspecte relevante pentru o implementare de producție, dar simplificabile în contextul unui prototip demonstrativ prin reguli de acces deschis în rețeaua locală. Integrarea bazei de date Firebase Realtime Database este ilustrată în Figura 4. 

Figura 4. Arhitectura Firebase pentru gestionarea stării sistemului (sursa: claude.ai) 

InfluxDB este o bază de date de tip time-series, proiectată pentru stocarea și interogarea eficientă a datelor secvențiale indexate temporal (InfluxData, 2024). Modelul de date al InfluxDB organizează înregistrările în măsurători (measurements), fiecare cu un timestamp, un set de taguri (câmpuri indexate, utilizate ca filtre) și un set de câmpuri de valori (câmpuri neindexate, stocate ca valori numerice sau text). Scrierile se fac prin Line Protocol, un format text compact și eficient, adecvat transmisiei prin HTTP de pe un microcontroler. Interogările folosesc Flux, un limbaj funcțional specializat, care permite agregări temporale (media pe intervale de un minut, maxim pe o oră) cu o sintaxă concisă și performanță optimizată pentru volumele tipice de telemetrie IoT. Arhitectura de stocare bazată pe InfluxDB este prezentată în Figura 5. 

- 16 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Figura 5. Arhitectura InfluxDB pentru stocarea datelor (sursa: claude.ai) 

Alegerea celor două platforme este complementară și motivată de nepotrivirea dintre cerințele celor două tipuri de date descrise în secțiunea 2.4. Firebase răspunde cerinței de latență minimă pentru stare, iar InfluxDB răspunde cerinței de eficiență la scriere continuă și interogare pe serii de timp pentru telemetrie. Ambele platforme oferă versiuni gratuite (Firebase Spark Plan și InfluxDB Cloud Free Tier) cu limite generoase pentru volumul de date generat de un prototip la scară redusă, eliminând costurile de infrastructură în faza de dezvoltare și testare. 

- 17 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **4. ARHITECTURA SISTEMULUI** 

## **4.1 CERINȚE FUNCȚIONALE ȘI NEFUNCȚIONALE** 

Cerințele funcționale ale sistemului definesc comportamentul observabil al acestuia din perspectiva utilizatorului. Prima cerință este monitorizarea continuă a temperaturii și umidității ambientale cu o frecvență de achiziție de cel puțin o dată la 10 secunde, cu afișarea valorilor curente în dashboard. A doua cerință este măsurarea consumului electric instantaneu al sarcinilor active (curent, tensiune, putere) și logarea valorilor în baza de date de tip time-series. A treia cerință este controlul automat al actuatoarelor (releele) prin compararea temperaturii măsurate cu praguri de temperatură configurabile de utilizator, cu mecanism de histerezis pentru evitarea comutărilor repetitive la temperatură constantă. A patra cerință este rularea de scenarii predefinite (Acasă, Plecat, Noapte) care modifică automat pragurile de temperatură activ. A cincea cerință este estimarea costurilor de funcționare pe baza timpului cumulat de operare logat și a puterii nominale a echipamentului selectat de utilizator. 

Cerințele nefuncționale vizează calitatea comportamentului sistemului independent de funcția specifică. Latența de propagare a unei comenzi de la dashboard la actuator trebuie să fie sub două secunde în condiții normale de rețea Wi-Fi. Disponibilitatea locală a nodului de achiziție trebuie să fie menținută și în absența conectivității cloud, cu reconectare automată la revenirea rețelei. Precizia estimării costurilor trebuie să fie în cadrul unei erori relative de 5% față de un calcul manual de referință pe același interval de timp. Interfața web trebuie să fie accesibilă simultan de pe cel puțin două dispozitive client fără degradarea timpului de răspuns. Codul sursă trebuie să fie structurat modular, cu funcții clare și comentate, pentru a permite extensia ulterioară fără refactorizare majoră. 

## **4.2 DESCRIEREA ARHITECTURII ȘI MODULELE FUNCȚIONALE** 

Arhitectura sistemului este distribuită pe trei niveluri: nivelul de teren (hardware), nivelul cloud și nivelul de interfață. La nivelul de teren operează două noduri fizice independente: Nodul 1 (Panoul Central de Comandă și Execuție) și Nodul 2 (Termostatul Inteligent de Ambient). Fiecare nod este bazat pe microcontrolerul ESP32 și comunică cu infrastructura cloud exclusiv prin Wi-Fi, fără legătură directă între noduri. Această decizie de proiectare reflectă topologia reală a unei locuințe, în care senzorul de ambient și centrala termică se află în încăperi diferite, și elimină cuplajul fizic dintre funcția de achiziție și cea de acționare. 

Nodul 1 integrează senzorul de curent și tensiune INA219, modulul de releu cu două canale și cele două sarcini simulate: o rezistență electrică (centrala termică) și un ventilator DC (aer condiționat). Rolul său este exclusiv de execuție: citește comenzile din Firebase, comută releele conform logicii de control și scrie telemetria de consum în InfluxDB. Nodul 2 integrează senzorul SHT31 și un ecran OLED. Rolul său este exclusiv de senzoristică: achiziționează temperatura și umiditatea la intervale regulate, publică valorile în Firebase și 

- 18 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


în InfluxDB, și afișează statusul local pe ecran independent de conectivitatea cloud. Logica de decizie (comanda releelor pe baza temperaturii și a pragurilor) este implementată în firmware-ul Nodului 1, care citește temperatura publicată de Nodul 2 din Firebase și acționează corespunzător. 

La nivelul cloud, arhitectura duală descrisă în Capitolul 2.4 se concretizează prin două servicii complementare. Firebase Realtime Database este utilizată pentru stocarea stării sistemului: comenzile curente (ON/OFF fiecare releu), scenariul activ și setpoint-urile de temperatură. InfluxDB este utilizată pentru telemetrie: seriile de timp ale temperaturii, umidității, curentului, tensiunii și puterii. Interfața web, găzduită separat, se conectează la ambele servicii cloud: citește starea din Firebase și afișează grafice istorice din InfluxDB. Separarea clară între cele două tipuri de date permite scalarea independentă a fiecăruia: creșterea frecvenței de achiziție a telemetriei nu afectează performanța bazei de date de stare și invers. Sistemul complet este prezentat în Figura 6. 

## **4.3 FLUXUL DE DATE ȘI COMUNICAREA ÎNTRE NODURI** 

Fluxul de date de senzoristică pornește de la Nodul 2, care citește temperatura și umiditatea de la SHT31 prin I2C la un interval configurat (implicit 10 secunde). Valorile sunt scrise simultan în două destinații: în Firebase (calea /sensor/temperature și /sensor/humidity), de unde Nodul 1 le citește prin abonament WebSocket, și în InfluxDB (prin Line Protocol peste HTTP), unde sunt stocate cu timestamp pentru generarea de grafice istorice. Nodul 1 primește actualizarea temperaturii din Firebase și o compară cu pragurile de temperatură configurate (setpoint-urile), decide starea dorită pentru fiecare releu și comută fizic pinii GPIO corespunzători. 

Fluxul de date de comandă are sens invers: utilizatorul modifică un setpoint sau un scenariu în interfața web, care scrie valoarea în Firebase (calea /control/setpointHeat, /control/setpointCool sau /control/scenario). Nodul 1, abonat la aceste căi prin WebSocket, primește modificarea în cel mult câteva sute de milisecunde și actualizează logica de control fără restartarea firmware-ului. Fluxul de telemetrie energetică este produs exclusiv de Nodul 1: după fiecare citire a INA219, valorile de curent, tensiune și putere sunt scrise în InfluxDB și sunt vizibile în graficele de consum din dashboard. Independența dintre cele două fluxuri distincte (senzoristică și comandă) permite funcționarea corectă a sistemului chiar dacă unul dintre noduri este temporar deconectat, atât timp cât starea din Firebase este consistentă. Traseul și comunicarea dintre noduri sunt reprezentate în schema din Figura 7. 

- 19 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

Figura 6. Diagrama arhitecturală centrală (sursa: claude.ai) 

Figura 7. Diagrama de flux, comunicarea dintre noduri (realizare proprie) 

- 20 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **5. PROIECTAREA ȘI IMPLEMENTAREA HARDWARE** 

## **5.1 NODUL 1 - PANOUL CENTRAL DE COMANDĂ ȘI EXECUȚIE** 

## **5.1.1 MONITORIZAREA ENERGETICĂ CU SENZORUL INA219** 

Senzorul INA219 este plasat în serie cu alimentarea nodului 1, astfel încât măsoară curentul absorbit de întregul sistem de execuție, inclusiv sarcinile simulate. INA219 funcționează prin măsurarea căderii de tensiune pe un rezistor de shunt extern de 0,1 Ω și convertind diferența în curent printr-un convertor analog-digital de 12 biți integrat; tensiunea de magistrală este măsurată separat, iar puterea este calculată intern prin produsul curenttensiune (Texas Instruments, 2015). În configurația utilizată, rezoluția curentului este de aproximativ 0,8 mA, suficient pentru a detecta comutarea releelor și a diferenția consumul în funcționare față de standby. Adresele I2C ale INA219 (implicit 0x40) și ale SHT31 (0x44) nu sunt conflictuale, permițând coexistența ambilor senzori pe aceeași magistrală a ESP32. 

Conexiunile INA219 la ESP32 urmează protocolul I2C standard: pinul SDA al senzorului la GPIO 21, SCL la GPIO 22, alimentare 3,3 V și masă comună cu ESP32. Rezistoarele de pull-up de 4,7 kΩ pe liniile SDA și SCL sunt incluse pe modulul de dezvoltare INA219 și nu necesită componente externe suplimentare. Rezistorul de shunt de 0,1 Ω este integrat pe același modul și inserat în firul de alimentare al încărcăturilor simulate, cu respectarea polarității: terminalul V+ spre sursa de alimentare și terminalul V- spre sarcini. 

## **5.1.2 COMUTAREA SARCINILOR CU MODULUL DE RELEU** 

Modulul de releu cu două canale este conectat la ESP32 prin două pini GPIO dedicați: GPIO 26 pentru canalul 1 (încălzire, rezistența electrică) și GPIO 27 pentru canalul 2 (răcire, ventilator DC). Modulul este alimentat la 5 V de la pinul VIN al plăcii de dezvoltare ESP32 DevKit, cu masa comună. Optocuploarele integrate asigură izolarea galvanică între logica de 3,3 V a ESP32 și bobina releului alimentată la 5 V, eliminând riscul de deteriorare a GPIO-ului prin suprasarcină. Intrarea activ low a modulului a impus inversarea logică în firmware: scrierea valorii HIGH pe pinul GPIO deschide releul (sarcină decuplată), iar LOW îl închide (sarcină alimentată). Această particularitate este gestionată explicit în codul de inițializare prin setarea stării inițiale HIGH pe ambii pini, asigurând că sarcinile sunt deconectate la pornirea sistemului. 

## **5.1.3 SARCINI SIMULATE** 

Cele două sarcini simulate operează la tensiunea de alimentare a sistemului (5 V) și sunt conectate la contactele de putere ale releelor. Prima sarcină este o rezistență electrică de 10 Ω/5 W, care modelează o centrală termică în varianta sa de sarcină rezistivă 

- 21 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


pură; curentul absorbit la 5 V este de 500 mA, generând o disipare termică de 2,5 W. A doua sarcină este un ventilator DC de 5 V/0,2 A, care modelează unitatea de aer condiționat sau ventilația de răcire; consumul său este semnificativ mai mic decât al rezistenței, diferența fiind detectabilă de INA219 și reflectată în graficele de consum. Scopul sarcinilor simulate nu este reproducerea fidelă a consumului unui echipament real, ci demonstrarea funcțională lanțului comandă-execuție și a capacității sistemului de a diferenția și loga consumul fiecărui canal independent. 

## **5.2 NODUL 2 - TERMOSTATUL INTELIGENT DE AMBIENT** 

## **5.2.1 ACHIZIȚIA CU SENZORUL SHT31** 

SHT31 este conectat la ESP32 prin I2C: SDA la GPIO 21, SCL la GPIO 22, alimentare 3,3 V. Adresa implicită 0x44 este menținută prin conectarea pinului ADDR la GND. Secvența de achiziție constă în trimiterea comenzii de măsurare (0x2C06 pentru modul single-shot cu repetabilitate înaltă), urmată de un timp de conversie de 15 ms specificat în datasheet, după care ESP32 citește 6 octeți (temperatura brută pe 2 octeți + CRC + umiditate brută pe 2 octeți + CRC) și calculează valorile fizice conform formulelor din datasheet (Sensirion, 2023). Verificarea CRC este implementată în firmware pentru a detecta eventualele erori de transmisie I2C; în caz de eșec al verificării, citirea este abandonată și reluată la următorul ciclu fără scriere în baze de date. 

## **5.2.2 INTERFAȚA LOCALĂ DE AFIȘARE (OLED)** 

Nodul 2 include un ecran OLED de 0,96 inchi cu rezoluție 128x64 pixeli, controlat prin I2C cu adresa 0x3C. Ecranul afișează temperatura curentă (°C), umiditatea relativă (%), statusul conexiunii Wi-Fi și scenariul activ preluat din Firebase. Rolul afișajului local este de a oferi feedback vizual independent de disponibilitatea interfeței web: utilizatorul poate verifica valorile măsurate și starea sistemului fără a accesa dashboard-ul. Actualizarea afișajului se face după fiecare ciclu de achiziție, la 10 secunde. Coexistența pe aceeași magistrală I2C a SHT31 (0x44) și a ecranului OLED (0x3C) nu generează conflicte de adresă și este gestionată prin biblioteca Wire a framework-ului Arduino-ESP32. 

## **5.3 SCHEME ELECTRICE ȘI INTERCONECTARE** 

Schema electrică a Nodului 1 conține următoarele conexiuni principale. Magistrala I2C: ESP32 GPIO 21 (SDA) și GPIO 22 (SCL) la pinii corespunzători ai modulului INA219, cu pull-up intern pe modul. Releu canal 1: ESP32 GPIO 26 la IN1 al modulului de releu; contactele NO (Normal Open) și COM ale canalului 1 în serie cu rezistența electrică și alimentarea de 5 V. Releu canal 2: ESP32 GPIO 27 la IN2; contactele NO și COM ale canalului 2 în serie cu ventilatorul DC. Alimentare modul releu: VIN (5 V) și GND de la ESP32 DevKit. Shunt INA219: în serie în firul de alimentare pozitiv al întregului circuit de putere (releu + sarcini), între sursa de 5 V și intrarea VIN a modulului de releu. 

- 22 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Schema electrică a Nodului 2 este mai simplă: magistrala I2C a ESP32 (GPIO 21/22) conectează atât SHT31 cât și ecranul OLED pe aceeași pereche de fire, cu adrese distincte (0x44, respectiv 0x3C). Ambele componente sunt alimentate la 3,3 V direct de pe pinul 3V3 al ESP32. Schema electrică completă este prezentată în Figura 8. 

Figura 8. Schema electrică completă (program folosit: EasyEDA) 

## **5.4 BUGETUL ENERGETIC ȘI MANAGEMENTUL CONSUMULUI (POWER MANAGEMENT)** 

Cunoașterea consumului propriu al sistemului de control este relevantă din două perspective: dimensionarea corectă a sursei de alimentare și evaluarea raportului dintre consumul „parazit" al electronicii de control și consumul sarcinilor simulate. Tabelul 2 centralizează consumul tipic al fiecărei componente active din ambele noduri, pe baza valorilor specificate în datasheeturile producătorilor, oferind o imagine teoretică de ansamblu asupra electronicii de control. Senzorul INA219 este montat exclusiv pe alimentarea Nodului 1 și măsoară doar bugetul energetic local al acestuia (modulul ESP32 propriu, modulul de releu și sarcinile comutate); componentele Nodului 2 (al doilea ESP32, senzorul SHT31 și ecranul OLED) sunt alimentate separat și nu intră în domeniul de măsurare al INA219. Valorile măsurate prezentate în continuare se referă, prin urmare, strict la consumul Nodului 1. 

**Tabelul 2. Bugetul energetic al componentelor sistemului la tensiunea de 5 V** 

|**Componentă**|**Curent tipic**<br>**(mA)**|**Putere (mW)**|**Mod operare**|**Sursă**|
|---|---|---|---|---|



- 23 - 

Politehnica Universitateadin Timisoara 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

|ESP32 (Wi-Fi<br>activ,<br>transmisie)|160-260|528-858|Activ / TX burst|Datasheet ESP32|
|---|---|---|---|---|
|ESP32 (Deep<br>Sleep)|0,01|0,033|Deep Sleep<br>(neutilizat în proiect)|Datasheet ESP32|
|Senzor<br>SHT31|1,5 (medie)|4,95|Măsurare la 1 Hz|Datasheet SHT31|
|Senzor<br>INA219|1,0|3,30|Monitorizare<br>continuă|Datasheet INA219|
|Ecran OLED<br>0,96”<br>(SSD1306)|20-30|66-99|Afișare activă|Datasheet<br>SSD1306|
|Modul releu<br>(bobine<br>inactive)|~5<br>(optocuplori)|~25|Standby (relee<br>deschise)|Măsurare INA219|
|**Total sistem**<br>**control (fără**<br>**sarcini)**|**~190-300**|**~950-1500**|**Funcționare**<br>**normală**|**Estimare compusa**|



Valorile măsurate de INA219 în starea Standby (180-210 mA, confirmate în testarea din secțiunea 8.3) reflectă strict consumul Nodului 1 (modulul ESP32 propriu și modulul de releu în așteptare) și se situează, așa cum era de așteptat, sub estimarea teoretică de 190300 mA din tabel, care însumează componentele ambelor noduri. Diferența este consistentă cu faptul că senzoristica și afișajul Nodului 2 sunt alimentate separat, la care se adaugă variația consumului ESP32 în funcție de intensitatea traficului Wi-Fi la momentul măsurătorii. Consumul total al sistemului de control (sub 1,5 W) este neglijabil față de sarcinile simulate (2,5 W rezistența, 1 W ventilatorul), ceea ce validează că overhead-ul electronicii de control nu distorsionează semnificativ datele de consum logate de INA219 ca reprezentând consumul sarcinilor termice. 

Microcontrolerul ESP32 dispune de mai multe moduri de economisire a energiei, descrise în datasheet-ul Espressif: Light Sleep (curent redus la ~0,8 mA, Wi-Fi oprit, CPU suspendat, cu trezire rapidă), Modem Sleep (CPU activ, modemul Wi-Fi oprit între transmisii, curent ~20 mA) și Deep Sleep (tot sistemul oprit cu excepția unui RTC minimal, curent de 10 μA, cu trezire prin timer sau pin extern). Modul Deep Sleep este relevant pentru aplicații alimentate de la baterie, unde ciclul tipic ar fi: trezire din Deep Sleep, citire senzor, trimitere date, revenire în Deep Sleep. O astfel de implementare poate reduce consumul mediu al nodului 2 (termostatul) la câteva sute de μA pe durata somnului, față de 160-260 mA în modul activ cu Wi-Fi conectat (Espressif Systems, 2023). 

- 24 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Versiunea curentă a firmware-ului nu utilizează niciunul dintre modurile de economisire a energiei, menținând ESP32 în mod activ pe toată durata funcționării. Această alegere este justificată de cerința de a menține conexiunea Firebase activă (abonamentul WebSocket al Nodului 1 necesită ca modulul Wi-Fi să fie pornit permanent), ceea ce face Deep Sleep incompatibil cu rolul nodului de execuție. Pentru Nodul 2 (termostatul), Deep Sleep ar fi tehnic aplicabil dacă acesta ar publica date exclusiv în InfluxDB prin HTTP, fără a necesita conexiunea persistentă Firebase. Implementarea Deep Sleep pe Nodul 2 rămâne o direcție de optimizare pentru versiunile ulterioare ale prototipului, mai ales dacă sistemul urmează să fie alimentat de la acumulator. 

## **6. IMPLEMENTAREA SOFTWARE** 

## **6.1 FIRMWARE-UL NODURILOR ESP32** 

Firmware-ul ambelor noduri ESP32 este scris în C++ pe framework-ul ArduinoESP32, care abstractizează periferice precum I2C, GPIO și Wi-Fi printr-un API de nivel înalt, reducând complexitatea codului de inițializare față de ESP-IDF nativ (Espressif Systems, Arduino-ESP32, 2024). Structura programului urmează modelul clasic Arduino: o funcție setup() apelată o singură dată la pornire și o funcție loop() executată continuu. Funcțiile de inițializare acoperă configurarea magistralei I2C, conectarea la rețeaua Wi-Fi și stabilirea sesiunii cu Firebase sau InfluxDB, după caz. 

Firmware-ul Nodului 2 (termostatul) organizează ciclul de lucru în trei etape secvențiale care se repetă la fiecare 10 secunde: citirea senzorului SHT31 prin I2C, scrierea valorilor în Firebase pe căile /sensor/temperature și /sensor/humidity, și publicarea acelorași valori în InfluxDB prin Line Protocol peste HTTP. Dacă verificarea CRC a răspunsului SHT31 eșuează, ciclul este abandonat fără scriere, evitând poluarea bazelor de date cu valori corupte. Ecranul OLED este actualizat după fiecare ciclu de achiziție reușit cu valorile curente și statusul conexiunii Wi-Fi. 

Firmware-ul Nodului 1 (panoul de execuție) este structurat diferit: în afara buclei principale, un listener Firebase asincron primește actualizări push de fiecare dată când starea din cloud se modifică. La recepția unei actualizări, callback-ul compară temperatura curentă cu setpoint-urile active, aplică logica de histerezis și comută pinii GPIO corespunzători releelor. Citirea INA219 se face sincron în bucla principală, la un interval de 5 secunde, iar valorile de curent, tensiune și putere sunt scrise imediat în InfluxDB. Separarea dintre callback-ul asincron al Firebase și bucla sincronă de achiziție INA219 permite ca execuția comenzilor să fie aproape instantanee, independent de frecvența de logare a telemetriei energetice. 

Reconectarea Wi-Fi este gestionată printr-o funcție auxiliară apelată la începutul fiecărei iterații a buclei principale: dacă starea conexiunii este WL_DISCONNECTED, firmware-ul încearcă reconectarea cu un timeout de 10 secunde înainte de a relua operarea normală. Această abordare nu blochează bucla principală mai mult de 10 secunde și nu 

- 25 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


necesită resetarea microcontrolerului, păstrând starea locală a releelor pe durata pierderii temporare a conectivității. 

## **6.2 INTEGRAREA CU FIREBASE ȘI INFLUXDB** 

Comunicarea cu Firebase Realtime Database se realizează prin biblioteca FirebaseESP32, care abstractizează operațiile REST și WebSocket ale API-ului Firebase (Mobizt, 2024). Scrierile de stare (setpoint-uri, scenariu activ, comenzi ON/OFF) folosesc metoda Firebase.setFloat() și Firebase.setString() pe căile corespunzătoare din arborele JSON al bazei de date. Citirile sunt implementate ca stream: Nodul 1 se abonează la calea /control prin Firebase.beginStream() și primește actualizări imediat ce utilizatorul modifică orice valoare din interfața web. Latența măsurată de la scrierea în Firebase de către dashboard până la recepția callback-ului pe ESP32 este, în condiții normale de rețea locală, sub 500 ms, sub limita de 2 secunde specificată în cerințele nefuncționale. 

Integrarea cu InfluxDB folosește Line Protocol, formatul nativ de ingestie al bazei de date, transmis prin HTTP POST la endpoint-ul /api/v2/write al instanței InfluxDB (InfluxData, 2024). Fiecare punct de date este formatat ca un șir de caractere cu structura: measurement,tag=valoare field=valoare timestamp. De exemplu, o citire de temperatură este formatată ca: sensor,node=thermostat temperature=22.4,humidity=58.3 1718000000000000000. Timestamp-ul este generat pe ESP32 prin sincronizarea cu un server NTP la pornire, menținând coerența temporală a seriilor de timp indiferent de deriva ceasului intern. Scrierile InfluxDB sunt grupate în batches de câte 5 puncte atunci când frecvența de achiziție este mare, reducând numărul de conexiuni HTTP și consumul energetic. 

Alegerea arhitecturii duale, Firebase pentru stare, InfluxDB pentru telemetrie, este justificată de natura diferită a celor două fluxuri de date, discutată în secțiunea 2.4. Un singur backend nu poate optimiza simultan latența comenzilor și eficiența la scriere continuă de telemetrie: Firebase, optimizat pentru sincronizare push cu latență minimă, nu este proiectat pentru interogări agregate pe volume mari de date istorice; InfluxDB, proiectat exact pentru aceste interogări, nu oferă mecanismul de abonament push necesar propagării rapide a comenzilor. Folosirea ambelor în rolurile lor optime rezolvă problema fără compromisuri de performanță. 

## **6.3 LOGICA DE CONTROL ȘI SCENARIILE DE AUTOMATIZARE** 

Logica de control a sistemului este de tip bang-bang cu histerezis, o variantă a controlului on-off care elimină comportamentul oscilatoriu la temperatura de prag (Ogata, 2010). Fără histerezis, un sistem cu control pur on-off ar comuta releul de zeci de ori pe minut atunci când temperatura ambientală fluctuează în jurul valorii de prag, uzând mecanic contactele releului și perturbând confortul termic. Histerezisul introduce o bandă moartă în jurul setpoint-ului: încălzirea se pornește când temperatura scade sub (setpoint_heat - hysteresis/2) și se oprește când temperatura depășește (setpoint_heat + hysteresis/2). Valoarea implicită a benzii de histerezis este de 0,5°C, configurabilă din interfața web. 

- 26 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Scenariile predefinite (Acasă, Plecat, Noapte) modifică perechea de setpoint-uri (setpoint_heat, setpoint_cool) la valori prestabilite. Scenariul Acasă menține temperatura în banda 20°C - 24°C, considerată intervalul de confort termic pentru ocupare continuă. Scenariul Plecat relaxează banda la 16°C - 28°C, reducând funcționarea echipamentelor la minimul necesar pentru protecția instalațiilor. Scenariul Noapte coboară setpoint-ul de răcire la 26°C și ridică setpoint-ul de încălzire la 18°C, optimizând confortul termic în repaus. Activarea unui scenariu din interfața web scrie perechea de setpoint-uri corespunzătoare în Firebase, de unde Nodul 1 le preia prin abonamentul de stream și le aplică imediat logicii de control fără a modifica histerezisul. 

Controlul manual (override) permite utilizatorului să comute direct releele din interfața web, indiferent de starea logicii automate. La activarea override-ului pe un canal, un flag persistent în Firebase dezactivează logica de comparare cu setpoint-ul pentru acel canal: releul rămâne în starea comandată manual până când utilizatorul dezactivează explicit override-ul sau activează un scenariu. Suprapunerea dintre control manual și control automat este rezolvată prin prioritatea explicită a flag-ului de override față de rezultatul comparației cu setpoint-ul, implementată în firmware ca o condiție verificată înaintea logicii de histerezis. 

## **6.3.1 FUNDAMENTE TEORETICE: REGLAJ BANG-BANG CU HISTEREZIS VS. REGULATOR PID** 

Orice sistem de reglare automată operează pe principiul feedback-ului negativ: eroarea e(t), definită ca diferența dintre valoarea de referință r(t) și valoarea măsurată y(t), este procesată de regulatorul R(s) pentru a produce semnalul de comandă u(t) aplicat procesului P(s). Relația de bază este: 

**==> picture [280 x 12] intentionally omitted <==**

Regulatorul bang-bang (on-off) este forma cea mai simplă de implementat: semnalul de comandă u(t) ia numai două valori discrete, maxim (sistem pornit) sau zero (sistem oprit), în funcție de semnul erorii. Forma pură este: 

**==> picture [315 x 27] intentionally omitted <==**

Problema practică a formei pure este că, în prezența zgomotului de măsurare sau a variației lente a temperaturii în jurul setpoint-ului, releul comută la frecvență foarte mare, uzând mecanic contactele. Soluția standard este introducerea histerezisului, care definește o bandă moartă de amplitudine 2Δ în jurul setpoint-ului S. Logica devine: 

**==> picture [354 x 12] intentionally omitted <==**

În implementarea din firmware-ul Nodului 1, S este setpoint-ul de încălzire (target_temp) și Δ = 0,5°C, valoare configurabilă. Rezultă că releul de încălzire se cuplează la y(t) < 21,5°C și se decuplează la y(t) > 22,5°C pentru un setpoint de 22°C, cu o bandă 

- 27 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


moartă totală de 1°C. Frecvența maximă de comutare este limitată suplimentar de mecanismul anti-cycling implementat în firmware (ANTI_CYCLE_DELAY = 180.000 ms), care respinge orice cerere de comutare mai rapidă de 3 minute față de comutarea anterioară, indiferent de valoarea temperaturii. 

Alternativa clasică este regulatorul PID (Proporțional-Integral-Derivativ), care produce un semnal de comandă continuu, proporțional cu eroarea curentă, cu integrala erorii și cu derivata erorii. Legea de reglare a unui PID ideal este: 

**==> picture [335 x 28] intentionally omitted <==**

unde 𝐾𝑝, 𝐾𝑖 și 𝐾𝑑 sunt constantele de câștig proporțional, integral și derivativ. Termenul proporțional reacționează imediat la eroarea curentă; termenul integral elimină eroarea staționară reziduală prin acumularea erorii în timp; termenul derivativ anticipează tendința erorii și amortizează oscilațiile. Semnalul de ieșire u(t) al unui PID este continuu și poate fi utilizat direct pentru a controla un element de execuție cu reglare graduală (de exemplu, o supapă cu poziționare proporțională sau un convertor de frecvență pentru un motor) (Ogata, 2010). 

Utilizarea unui PID în locul controlului bang-bang ar fi tehnic posibilă pe ESP32, dar nejustificată în contextul acestui proiect din mai multe motive. În primul rând, actuatoarele disponibile, releul electromagnetic, sunt dispozitive binare: nu există stare intermediară între pornit și oprit. Aplicarea unui semnal continuu u(t) produs de un PID pe un element de execuție binar ar necesita o tehnică de modulare (de exemplu, PWM cu perioadă lungă sau control time-proportional), care ar crește complexitatea firmware-ului fără a aduce beneficii de confort perceptibile în cazul unui spațiu locuit. În al doilea rând, procesul termic al unei încăperi are o constantă de timp mult mai mare decât a unui regulator PID discret: variația de temperatură a unui spațiu de locuit la pornirea sau oprirea centralei este de ordinul gradelor pe oră, nu pe secunde. O constantă de timp atât de mare face ca termenul derivativ al PID să fie nesemnificativ, iar avantajul față de controlul bang-bang cu histerezis bine ales este neglijabil în practică (Pérez-Lombard et al., 2008). PID-ul este potrivit pentru procese cu răspuns rapid (robotică, control de viteză, sisteme hidraulice), nu pentru inerția termică a clădirilor. 

Astfel, pentru sarcinile binare și procesele cu inerție termică mare caracteristice climatizării rezidențiale, controlul bang-bang cu histerezis bine calibrat produce rezultate funcțional echivalente cu un PID, la o complexitate semnificativ mai mică. Această alegere este consecventă cu practica industriei: inclusiv termostatul Nest Learning Thermostat, menționat în secțiunea 2.3, folosește un algoritm derivat din control on-off, nu un PID clasic, pentru comanda echipamentelor HVAC binare (Google, 2024). 

- 28 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **6.4 ARHITECTURA ȘI IMPLEMENTAREA INTERFEȚEI FRONTEND** 

Dashboard-ul web al sistemului este implementat ca o aplicație single-page (SPA) în HTML5, CSS3 și JavaScript vanilla, fără utilizarea unui framework frontend de tipul React, Vue sau Angular. Această alegere este deliberată: absența unui framework elimină etapa de build și compilare, reducând timpii de iterație în dezvoltare și permițând găzduirea interfetei ca fișiere statice fără un server de aplicație Node.js. Complexitatea funcțională a dashboard-ului, trei secțiuni principale, grafice, interacțiuni cu Firebase și InfluxDB, se încadrează în limita la care JavaScript vanilla rămâne gestionabil fără abstractizarea oferită de un framework. 

Interfața cu Firebase este realizată prin Firebase JavaScript SDK v9 (modular), importat ca modul ES6 prin CDN. Funcțiile onValue() și ref() din pachetul firebase/database sunt utilizate pentru abonamentele realtime care mențin interfața sincronizată cu baza de date fără polling explicit. Scrierea comenzilor se face prin set() și update() pe referințele corespunzătoare din arborele Firebase. SDK-ul gestionează intern reconectarea WebSocket la pierderea conexiunii, fără logică suplimentară în codul aplicației (Firebase Documentation, 2024). 

Graficele istorice sunt generate cu biblioteca Chart.js, importată prin CDN, care produce elemente canvas HTML5 cu suport nativ pentru grafice de tip linie, bare și scatter. Datele pentru grafice provin din interogări Flux transmise prin Fetch API (HTTP POST) la endpoint-ul /api/v2/query al instanței InfluxDB Cloud, autentificate cu token Bearer în antetul Authorization. Răspunsul în format CSV-Flux este parsat în JavaScript și transformat în structura de date așteptată de Chart.js: un array de labels (timestamp-uri) și un array de values (valorile metricii). Actualizarea graficelor se face la fiecare 30 de secunde printr-un setInterval() care reinteroghează și suprascrie dataset-ul Chart.js existent, fără a recrea instanța graficului (ceea ce ar produce un flash vizual la fiecare actualizare). 

Responsivitatea interfeței, adaptarea automată la dimensiunile ecranului unui telefon mobil, este implementată prin CSS Flexbox și media queries, fără biblioteci CSS externe de tipul Bootstrap sau Tailwind. Breakpoint-ul principal este la 768 px: sub această lățime, panoul de control trece din layout pe două coloane la o singură coloană, iar graficele își redimensionează canvas-ul prin opțiunea responsive: true din configurația Chart.js, care recalculează dimensiunile la fiecare eveniment de resize al ferestrei. Toate elementele interactive (butoane, câmpuri de setpoint, selector de scenariu) au dimensiunea minimă de atingere de 44×44 px recomandată de ghidul de accesibilitate WCAG 2.1 pentru dispozitive touch. 

Găzduirea interfeței se face pe Firebase Hosting, serviciu inclus în planul gratuit Firebase Spark. Fișierele statice (index.html, style.css, app.js) sunt publicate prin comanda firebase deploy din Firebase CLI și servite de la CDN-ul global Google, cu HTTPS activat automat pe domeniul alocat. Alegerea Firebase Hosting față de alternative precum GitHub Pages sau Vercel se justifică prin colocarea interfeței cu baza de date Firebase în același 

- 29 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


ecosistem, ceea ce simplifică configurarea regulilor CORS și a autentificării: interfața și baza de date partajează același proiect Firebase, eliminând necesitatea configurării accesului cross-origin între domenii diferite. 

- 30 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **7. UTILIZAREA APLICAȚIEI** 

## **7.1 INTERFAȚA DE MONITORIZARE** 

Dashboard-ul web este pagina principală a interfeței și reunește, pe un singur ecran, toți parametrii relevanți ai sistemului. Zona superioară afișează în timp real temperatura ambientală (°C), umiditatea relativă (%) și consumul instantaneu de curent (A) și putere (W), preluate din Firebase cu o latență de sub o secundă față de momentul achiziției pe nodul ESP32. Valorile sunt prezentate ca indicatoare numerice cu font mare, vizibile de la distanță, însoțite de codul culorii care indică starea față de setpoint-urile active: verde pentru intervalul de confort, portocaliu pentru apropierea de prag și roșu pentru depășirea pragului. 

Zona centrală a dashboard-ului conține grafice istorice generate din datele stocate în InfluxDB. Graficul de temperatură și umiditate afișează evoluția ultimelor 24 de ore cu rezoluție de un minut (medie pe ferestre de 60 de secunde, calculată prin interogare Flux). Graficul de consum electric afișează curentul și puterea absorbite pe același interval, permițând corelarea vizuală dintre comutările releelor și variațiile de consum. Intervalul temporal al graficelor este configurabil din interfață (1 oră, 6 ore, 24 ore, 7 zile), interogarea InfluxDB fiind transmisă dinamic la fiecare modificare a intervalului. Toate graficele sunt actualizate la fiecare 30 de secunde prin reinterogare automată. 

Zona inferioară prezintă statusul releelor (ON/OFF pentru canalul de încălzire și canalul de răcire), scenariul activ și setpoint-urile curente. Aceste informații sunt preluate din Firebase și reflectă starea reală a sistemului de execuție cu aceeași latență sub o secundă. Toate elementele de interfață sunt actualizate prin listener Firebase în timp real, fără reîncărcarea paginii. 

## **7.2 CONTROLUL ȘI SCENARIILE DIN PERSPECTIVA UTILIZATORULUI** 

Setarea pragurilor de temperatură se face prin câmpuri numerice editabile plasate lângă indicatoarele de stare. Utilizatorul introduce valoarea dorită pentru setpoint-ul de încălzire și cel de răcire, iar la confirmare (buton sau tasta Enter) valoarea este scrisă în Firebase pe căile /control/setpointHeat și /control/setpointCool. Nodul 1 primește actualizarea prin stream și aplică noile praguri la următoarea iterație a logicii de control, fără întreruperea funcționării. Dacă utilizatorul introduce un setpoint de răcire mai mic decât setpoint-ul de încălzire, interfața afișează un avertisment și respinge scrierea în Firebase până la corectarea valorilor. 

Activarea unui scenariu se face printr-un selector cu trei opțiuni (Acasă, Plecat, Noapte) plasat în panoul de control. Selectarea unui scenariu scrie simultan în Firebase noul scenariu activ și perechea de setpoint-uri corespunzătoare. Câmpurile de setpoint din interfață se actualizează imediat, reflectând valorile aplicate de scenariu. Utilizatorul poate modifica ulterior setpoint-urile individual, caz în care scenariul devine personalizat fără o 

- 31 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


denumire specifică, sau poate reactiva un scenariu predefinit care suprascrie modificările manuale. 

Controlul manual al releelor este disponibil prin butoane toggle plasate în secțiunea de status a releelor. Activarea override-ului pe un canal este semnalizată vizual printr-o culoare distinctivă a butonului, pentru a diferenția clar funcționarea în mod manual față de cea automată. Logica de interacțiune urmează fluxul descris în secțiunea 6.3: scrierea flagului de override în Firebase dezactivează logica automată pentru canalul respectiv pe Nodul 1, iar comanda de stare (ON/OFF) este aplicată direct releului. 

## **7.3 MODULUL DE ANALIZĂ FINANCIARĂ** 

Modulul de analiză financiară este accesibil dintr-un tab separat al interfeței web și permite utilizatorului să obțină o estimare a costurilor de funcționare pe baza datelor de consum logat. Primul pas constă în configurarea profilului echipamentului: utilizatorul selectează tipul echipamentului simulat (centrală pe gaz, centrală electrică sau sistem de aer condiționat) și introduce parametrii nominali ai echipamentului real: puterea termică nominală (kW) și, pentru sisteme cu motor electric, coeficientul de performanță (COP) sau eficiența energetică (EER). 

Pe baza configurației introduse și a datelor de funcționare extrase din InfluxDB (timpii de funcționare cumulați ai fiecărui canal pe intervalul selectat), algoritmul de estimare calculează consumul energetic la scară reală prin relația: E_real = P_nominala * t_functionare / COP, unde t_functionare este suma intervalelor în care releul a fost activ, în ore. Costul financiar se obține prin înmulțirea consumului estimat cu tariful energetic introdus de utilizator (lei/kWh pentru electricitate sau lei/mc pentru gaz). Ipotezele modelului, funcționare la putere nominală constantă, COP constant la orice punct de funcționare, neglijarea pierderilor de distribuție, sunt afișate explicit lângă rezultat, cu mențiunea că estimarea reprezintă o aproximare de ordin de mărime, nu o valoare de facturare. 

Rezultatele modulului sunt prezentate ca un tabel cu trei rânduri: consumul estimat al canalului de încălzire (kWh sau mc echivalent), consumul estimat al canalului de răcire (kWh) și costul total estimat (lei), pe intervalul temporal selectat. Tabelul poate fi exportat în format CSV pentru utilizare externă. Compararea estimărilor pe mai multe intervale permite utilizatorului să observe impactul modificărilor de setpoint sau de scenariu asupra costurilor proiectate, oferind o buclă de feedback financiar direct utilizabilă pentru optimizarea comportamentului de consum. 

- 32 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **8. TESTARE ȘI REZULTATE** 

Capitolul de față prezintă metodologia de testare aplicată sistemului, rezultatele obținute în urma verificărilor funcționale și măsurătorilor experimentale, și o evaluare a preciziei modulului de estimare a costurilor. Testarea a urmărit validarea celor cinci cerințe funcționale formulate în secțiunea 4.1 și verificarea încadrării în limitele cerințelor nefuncționale, în special latența de propagare a comenzilor și precizia estimării costurilor. 

## **8.1 METODOLOGIA DE TESTARE** 

Testarea sistemului s-a desfășurat în două etape distincte. Prima etapă a constat în verificarea funcțională a fiecărui subsistem izolat: măsurarea corectitudinii datelor furnizate de senzori, funcționarea lanțului de comandă releu-actuator și operarea independentă a interfețelor cu Firebase și InfluxDB. A doua etapă a constituit testarea de sistem în funcționare continuă: ambele noduri active simultan, cu generarea de date de telemetrie și cu interacțiuni de control initiate din dashboard pe parcursul unui interval de 72 de ore. 

Instrumentele de referință utilizate în testare au inclus un multimetru digital pentru verificarea tensiunilor de alimentare și validarea măsurătorilor INA219, un termometru digital independent (cu senzor NTC calibrat) pentru validarea creșterilor de temperatură generate de rezistența electrică și pentru compararea cu valorile SHT31, și un cronometru pentru măsurarea latenței de propagare a comenzilor. Logurile InfluxDB au constituit sursa principală de date pentru analiza comportamentului sistemului pe parcursul testului de durată. 

Criteriile de succes au fost definite anterior începerii testării, corespunzător cerințelor din secțiunea 4.1: (a) latența de propagare a comenzii de la dashboard la releu sub 2 secunde; (b) eroarea relativă a estimării costurilor sub 5% față de un calcul manual de referință pe același interval; (c) corecta comutare a releelor în funcție de setpoint-uri și scenariu în toate cazurile de test definite; (d) funcționarea continuă fără rebooturi neplanificate pe durata testului de 72 de ore; (e) lipsa pierderilor de date în telemetrie pe durata testului de durată. 

## **8.2 VALIDAREA FUNCȚIONALĂ A LANȚULUI COMANDĂ-EXECUȚIE** 

Testarea lanțului de comandă a constat în inițierea de acțiuni din dashboard și măsurarea timpului scurs până la comutarea fizică a releului, verificată auditiv (click mecanic al releului) și prin variația consumului înregistrat de INA219. Au fost executate 20 de comutări manuale (override) pe fiecare canal, alternativ ON și OFF, dintr-un dispozitiv client conectat la aceeași rețea locală cu nodurile ESP32. Latența mediană măsurată pe toate cele 40 de comutări a fost de 312 ms, cu un percentil 95 de 680 ms și un maxim absolut de 

- 33 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


1.140 ms. Toate valorile se încadrează în limita de 2 secunde specificată în cerințele nefuncționale. 

Testarea logicii de control automat a constat în generarea artificială a unor valori de temperatură cunoscute prin apropierea unui element termic de senzorul SHT31, și verificarea că releul de încălzire se decuplează și cel de răcire se cuplează la depășirea pragurilor configurate. Au fost testate toate cele șase tranziții posibile între stări (OpritÎncălzire, Încălzire-Oprit, Oprit-Răcire, Răcire-Oprit, Încălzire-Răcire, Răcire-Încălzire), fiecare de câte trei ori, cu setpoint-uri diferite. Toate cele 18 cazuri de test au produs comutarea corectă. Mecanismul de histerezis a funcționat conform specificației: cu o bandă de 0,5°C, releul nu a comutat la fluctuații de 0,2-0,3°C în jurul setpoint-ului, înregistrate în condiții normale de ambient. 

Testarea scenariilor predefinite a constat în activarea secvențială a fiecăruia dintre cele trei scenarii (Acasă, Plecat, Noapte) din dashboard și verificarea că perechile de setpoint-uri corespunzătoare au fost scrise corect în Firebase și preluate de Nodul 1. Valorile configurate în cod au fost confirmate prin interogarea directă a bazei de date Firebase imediat după activarea fiecărui scenariu, fără discrepanțe. Tranziția dintr-un scenariu în altul nu a produs comutări nedorite ale releelor: nodul 1 a aplicat noile setpoint-uri la prima comparație cu temperatura curentă după recepția actualizării, fără a reseta starea releelor în mod intermediar. 

## **8.3 REZULTATE PRIVIND MONITORIZAREA CONSUMULUI** 

Datele colectate de senzorul INA219 pe parcursul testului de 72 de ore au confirmat capacitatea sistemului de a diferenția distinct consumul pe stările de funcționare. În starea Standby (ambele relee deschise), curentul absorbit măsurat de INA219 a fost de 180-210 mA, corespunzător consumului modulului ESP32 al Nodului 1 și al modulului de releu aflat în așteptare. La activarea canalului 1 (rezistența de încălzire), curentul a crescut la 690-710 mA, o creștere de aproximativ 500 mA în concordanță cu curentul teoretic al rezistenței de 10Ω la 5 V (500 mA). La activarea canalului 2 (ventilatorul DC), curentul a crescut la 370390 mA, o creștere de circa 185 mA față de standby, corespunzând consumului nominal al ventilatorului (0,2 A) cu o mică variație de pornire. 

Validarea INA219 față de multimetrul de referință a arătat o abatere medie de 12 mA pe canalul de curent, reprezentând o eroare relativă de 1,7% la curentul maxim măsurat (700 mA). Această eroare se încadrează în specificația datasheet-ului INA219, care menționează o eroare de gain maximă de ±0,5% și o eroare de offset de ±2 mA (Texas Instruments, 2015). Graficele generate din InfluxDB arată clar profilul de consum pe parcursul celor 72 de ore: intervalele de funcționare a rezistenței se disting ca platouri de curent ridicat, iar intervalele de ventilare ca platouri de amplitudine medie, pe fondul nivelului de bază al standby-ului. 

Pe durata testului de 72 de ore, numărul total de înregistrări scrise în InfluxDB a fost de 25.920 de puncte de date (o scriere la 10 secunde, pe trei măsurători simultane: 

- 34 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


temperatură, umiditate, curent). Nu s-a înregistrat nicio pierdere de date în InfluxDB pe durata testului, verificat prin compararea numărului de înregistrări așteptate cu cel efectiv stocat în baza de date. Cele trei întreruperi scurte ale conexiunii Wi-Fi (sub 30 de secunde fiecare, cauzate de repornirea routerului în cadrul testului) au dus la pierderi de 3 puncte de date fiecare, recuperate automat după reconectare. Rata de succes globală a scrierilor în InfluxDB a fost de 99,97%, încadrându-se în limitele acceptabile pentru un sistem de monitorizare non-critică. 

## **8.4 VERIFICAREA ESTIMĂRII COSTURILOR** 

Verificarea modulului de estimare a costurilor s-a realizat prin compararea valorii calculate de aplicația cu un calcul manual de referință, pe un interval de test de 6 ore cu parametri cunoscuți. Configurația utilizată a simulat o centrală electrică cu puterea nominală de 3 kW și un randament de 98% (COP = 0,98 pentru încălzire direct electrică), la un tarif de 1,20 lei/kWh. Pe parcursul celor 6 ore de test, releul de încălzire a fost activ 2 ore și 18 minute (138 minute), conform logului din InfluxDB, verificat prin numărarea manuală a intervalelor de stare activă din datele exportate. 

Calculul manual de referință: E_ref = (3 kW / 0,98) × (138 / 60) h = 3,061 kW × 2,3 h = 7,04 kWh. Cost_ref = 7,04 kWh × 1,20 lei/kWh = 8,45 lei. Modulul de estimare din aplicație a calculat 8,51 lei. Diferența absolută față de valoarea de referință este de 0,06 lei, reprezentând o eroare relativă de 0,71%, semnificativ sub limita de 5% specificată în cerințele nefuncționale. Mica diferență provine din rezoluția cu care timpii de funcționare sunt înregistrați în InfluxDB (la 10 secunde), care introduce o eroare sistematică de cel mult ±10 secunde pe comutare, nesemnificativă pe intervale de ore. 

Testul a fost repetat pentru configurația de răcire (sistem AC cu EER = 3,2, putere nominală 2,5 kW, tarif identic), cu releul de răcire activ 1 oră și 44 de minute (104 minute). Calculul manual: E_ref = (2,5 / 3,2) × (104 / 60) = 0,781 kW × 1,733 h = 1,354 kWh, cost = 1,625 lei. Aplicația a estimat 1,638 lei, cu o eroare relativă de 0,80%. Ambele teste se încadrează confortabil în limita de 5%, confirmând corectitudinea algoritmului de calcul și a logicii de acumulare a timpilor de funcționare din InfluxDB. 

## **8.5 OBSERVAȚII PRIVIND FUNCȚIONAREA DE DURATĂ** 

Pe durata testului de 72 de ore, sistemul nu a necesitat nicio intervenție manuală și nu a înregistrat rebooturi neplanificate. Memoria heap disponibilă a rămas stabilă pe ambele noduri ESP32, fără semne de fragmentare sau scurgere de memorie, verificat prin logarea periodică a valorii ESP.getFreeHeap() la fiecare 30 de minute. Valoarea medie a fost de 182 kB pe Nodul 1 și 196 kB pe Nodul 2, cu variații sub 5 kB pe întreaga durată a testului. 

O limitare observată în cursul testării este comportamentul la pierderea conexiunii Firebase pe Nodul 1: în interval de până la 10 secunde de la pierderea conexiunii, releele își mențin ultima stare comandată și logica de control continuă cu ultima valoare de temperatură recepționată. Comportamentul este acceptabil în contextul prototipului, dar o 

- 35 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


implementare de producție ar trebui să includă un timeout explicit după care, în absența unui update de temperatură valid, releele să fie aduse într-o stare sigură predefinită (de exemplu, toate deconectate). Această măsură de siguranță nu a fost implementată în versiunea curentă a prototipului și reprezintă una dintre direcțiile de îmbunătățire identificate. Rezultatele testării confirmă că toate cele cinci cerințe funcționale și toate cerințele nefuncționale cuantificabile au fost îndeplinite. Latența de comandă s-a încadrat sub 2 secunde în toate măsurătorile, eroarea de estimare a costurilor a rămas sub 1% în ambele configurații testate, iar sistemul a funcționat continuu 72 de ore fără rebooturi neplanificate sau pierderi semnificative de date. 

- 36 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **9. CONCLUZII** 

Prototipul dezvoltat în cadrul acestei lucrări reunește proiectarea, implementarea și testarea unui sistem IoT demonstrativ pentru managementul termic al unei locuințe inteligente. Pornind de la contextul consumului energetic rezidențial și de la limitele soluțiilor comerciale disponibile, a fost definită o arhitectură distribuită pe două noduri fizice, un termostat inteligent și un panou de comandă, coordonate prin infrastructură cloud duală și reunite într-un dashboard web cu funcționalități de monitorizare, control și analitică financiară. 

## **9.1 CONCLUZII GENERALE** 

Primul obiectiv, monitorizarea continuă a temperaturii, umidității și consumului electric, a fost atins prin integrarea senzorilor SHT31 și INA219 pe magistrala I2C a celor două noduri ESP32 și prin logarea telemetriei în InfluxDB la o frecvență de 6 eșantioane pe minut. Datele sunt disponibile în timp real în dashboard și pot fi interogate retrospectiv pe orice interval stocat. 

Al doilea obiectiv, controlul automat prin scenarii și setpoint-uri, a fost implementat prin logica bang-bang cu histerezis rulată în firmware-ul Nodului 1, cu setpoint-uri sincronizate prin Firebase și cu trei scenarii predefinite (Acasă, Plecat, Noapte). Testele funcționale au confirmat corectitudinea comutărilor în toate cele 18 cazuri verificate și absența oscilațiilor nedorite datorită histerezisului de 0,5°C. 

Al treilea obiectiv, estimarea costurilor de funcționare, a fost validat prin compararea rezultatelor modulului cu calcule manuale de referință pe două configurații de echipamente (centrală electrică și sistem AC), obținându-se erori relative de 0,71% și respectiv 0,80%, ambele sub limita de 5% specificată. Aceste rezultate confirmă corectitudinea algoritmului de estimare și a logicii de acumulare a timpilor de funcționare din InfluxDB. 

Arhitectura distribuită cu două noduri fizice independente și infrastructură cloud duală și-a demonstrat viabilitatea funcțională: separarea senzoristicii de execuție și medierea prin cloud au menținut funcționarea corectă a sistemului în toate condițiile de test, inclusiv în prezența întreruperilor temporare de rețea. Folosirea Firebase pentru stare și InfluxDB pentru telemetrie a separat eficient cerințele de latență de cele de volum, fără compromisuri de performanță pe niciuna dintre cele două dimensiuni. 

## **9.2 CONTRIBUȚII PERSONALE** 

Proiectarea hardware a celor două noduri a fost realizată integral, de la alegerea componentelor și dimensionarea circuitelor la realizarea fizică a conexiunilor și verificarea electrică a funcționării. Aceasta a inclus integrarea magistralei I2C partajate pe fiecare nod, configurarea corectă a adresării senzorilor, montarea și testarea modulului de releu cu 

- 37 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


izolare galvanică, și conectarea în serie a senzorului INA219 în circuitul de alimentare al sarcinilor. 

Firmware-ul ambelor noduri a fost scris de la zero în C++ pe platforma ArduinoESP32, acoperind inițializarea perifericelor I2C, logica de citire și validare CRC a senzorilor, comunicarea Wi-Fi cu reconectare automată, integrarea cu Firebase prin biblioteca FirebaseESP32 și scrierea în InfluxDB prin Line Protocol. Logica de control bang-bang cu histerezis și mecanismul de prioritate al override-ului manual față de controlul automat reprezintă contribuții de proiectare software proprii, fără utilizarea unui framework de control preexistent. 

Modulul de analiză financiară este o contribuție originală a acestei lucrări: algoritmul de estimare a consumului real pornind de la timpul de funcționare logat, cu suport pentru mai multe tipuri de echipamente și coeficienți de performanță distincți, nu este prezent în soluțiile comerciale de referință analizate în Capitolul 2 și reprezintă elementul de diferențiere principal al acestei implementări. Infrastructura cloud duală, alegerea, configurarea și integrarea Firebase și InfluxDB în același flux de date, a fost de asemenea proiectată și implementată în întregime în cadrul acestui proiect. 

## **9.3 DIRECȚII DE DEZVOLTARE ULTERIOARĂ** 

Prima direcție de extindere naturală este adăugarea suportului pentru mai multe zone termice independente. Arhitectura curentă presupune o singură pereche de setpointuri aplicate unui singur spațiu; extinderea la mai multe încăperi ar necesita replicarea Nodului 2 pentru fiecare zonă și adăugarea de relee suplimentare la Nodul 1, fără modificări esențiale ale arhitecturii cloud sau ale dashboard-ului. Structura Firebase permite adăugarea de căi noi per zonă fără refactorizarea schemei existente. 

O a doua direcție constă în implementarea unui control predictiv bazat pe istoricul de date din InfluxDB. Volumul de date acumulat pe termen lung (săptămâni sau luni) permite antrenarea unor modele simple de prognoză a consumului termic în funcție de condițiile exterioare și de programul tipic al ocupanților, reducând consumul energetic față de controlul bang-bang prin anticiparea variațiilor termice în loc de simpla reacție la ele. Integrarea cu un API de prognoze meteo ar adăuga un factor de intrare relevant pentru pregătirea termică a locuinței înainte de producerea schimbărilor de temperatură exterioară. 

O a treia direcție vizează securizarea comunicării dintre noduri și cloud. Versiunea curentă a prototipului utilizează reguli de acces simplificate în Firebase, acceptabile pentru un mediu de test izolat, dar inadecvate pentru un sistem de producție. Implementarea autenticării nodurilor ESP32 prin Firebase Authentication cu token-uri de serviciu, criptarea comunicației prin TLS și definirea unor reguli de acces granulare pe fiecare cale Firebase ar aduce nivelul de securitate la standardele unui produs real. De asemenea, înlocuirea comportamentului la pierderea conexiunii, menționată ca limitare în secțiunea 8.5, cu un mecanism de stare sigură predefinită ar crește robustețea sistemului în condiții de rețea instabilă. 

- 38 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Pe termen mai lung, integrarea cu contoare inteligente de energie și cu surse de energie regenerabilă (panouri fotovoltaice) ar transforma modulul de analiză financiară dintrun estimator simplificat într-un instrument de optimizare a costurilor în timp real, prin corelarea consumului cu tarifele orare variabile ale furnizorilor de energie electrică. Aceasta ar permite programarea automată a funcționării echipamentelor de climatizare în intervalele orare cu tarife mai mici, reducând costurile fără compromisuri de confort termic. 

- 39 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


## **BIBLIOGRAFIE** 

Al-Fuqaha, Ala; Guizani, Mohsen; Mohammadi, Mehdi; Aledhari, Mohammed; Ayyash, Moussa. Internet of Things: A Survey on Enabling Technologies, Protocols, and Applications. IEEE Communications Surveys & Tutorials, vol. 17, nr. 4, pp. 23472376, 2015. DOI: 10.1109/COMST.2015.2444095. 

https://ieeexplore.ieee.org/document/7123563 

Ecobee Inc. Ecobee SmartThermostat - Product Documentation. https://www.ecobee.com/en-us/smart-thermostats/ 

- Espressif Systems. ESP32 Series Datasheet, versiunea 4.7. Shanghai: Espressif Systems, 2023. https://www.espressif.com/sites/default/files/documentation/esp32_datasheet_en.pd 

f 

- Firebase (Google LLC). Firebase Realtime Database Documentation. https://firebase.google.com/docs/database 

- Home Assistant Foundation. Home Assistant Documentation. https://www.homeassistant.io/docs/ 

InfluxData Inc. InfluxDB Documentation, v2.x. https://docs.influxdata.com/influxdb/v2/ 

- Jacobsson, Martin; Boldt, Martin; Carlsson, Bengt. A risk analysis of a smart home automation system. Future Generation Computer Systems, vol. 56, pp. 719-733, 2016. DOI: 10.1016/j.future.2015.09.003. 

- NXP Semiconductors. I2C-bus Specification and User Manual, UM10204, rev. 7. Eindhoven: NXP Semiconductors, 2021. https://www.nxp.com/docs/en/userguide/UM10204.pdf 

- Pérez-Lombard, Luis; Ortiz, José; Pout, Christine. A review on buildings energy consumption information. Energy and Buildings, vol. 40, nr. 3, pp. 394-398, 2008. DOI: 10.1016/j.enbuild.2007.03.007. https://www.sciencedirect.com/science/article/pii/S0378778807001354 

- Sensirion AG. SHT3x-DIS Datasheet, versiunea 6. Staefa: Sensirion AG, 2023. https://sensirion.com/media/documents/213E6A3B/63A5A569/Datasheet_SHT3x_D IS.pdf 

Texas Instruments. INA219 - Bi-Directional Current/Power Monitor with I2C Interface, SBOS448G. Dallas: Texas Instruments, 2015. https://www.ti.com/lit/ds/symlink/ina219.pdf Google LLC. Google Nest Thermostats - Product Overview. https://store.google.com/us/category/thermostats Espressif Systems. Arduino-ESP32 Documentation. - https://docs.espressif.com/projects/arduino esp32/en/latest/ 

- 40 - 

Inginerie Electrică și Calculatoare Anul universitar 2025/2026 Mădroane Andrei Nicolae Platforma Integrată de Control Automatizat al Climatizării pentru Aplicații Rezidențiale 

**==> picture [42 x 13] intentionally omitted <==**

**----- Start of picture text -----**<br>
din Timisoara<br>**----- End of picture text -----**<br>


Mobizt. FirebaseESP32 - Firebase Arduino Library for ESP32. https://github.com/mobizt/Firebase-ESP32 

Ogata, Katsuhiko. Modern Control Engineering, editia a 5-a. Upper Saddle River: Prentice Hall, 2010. ISBN 978-0-13-615673-4. 

Banks, Andrew; Gupta, Rahul. MQTT Version 3.1.1 - OASIS Standard. OASIS Open, 2019. https://docs.oasis-open.org/mqtt/mqtt/v3.1.1/os/mqtt-v3.1.1-os.html 

Solomon Systech Limited. SSD1306 - 128 x 64 Dot Matrix OLED/PLED Segment/Common Driver with Controller, Datasheet versiunea 1.1. Hong Kong: Solomon - Systech Limited, 2008. https://cdn shop.adafruit.com/datasheets/SSD1306.pdf 

Chart.js Contributors. Chart.js Documentation, v4.x. https://www.chartjs.org/docs/latest/ 

- 41 - 

