#include "HX711.h"
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>


LiquidCrystal_I2C lcd(0x27, 16, 2);

//WIFI STUFF
const char* ssid     = "iphonet";
const char* password = "alehiphop";
String host = "http://localhost";
String port = "3000";
int tryToConnectToWifiForThisLongMilliseconds = 30000;

//BUTTONS
int onOffBtn = 16;
int tareBtn = 5;
int onOffBtnState = 0;
int onOffBtnStateOld = 0;
int tareBtnState = 0;
bool dataSendOn = false;

float lastOnOffSentMillis = 0;

float ifChangeIsNotMoreThanThisValueDoNotSend = 0.01f;
float ifLessThanThisValueDoNotEvenBother = 0.01;

//TICKER/TIMER STUFF
//Ticker blinker;

//SCALE STUFF
HX711 scale(4, 0);
float calibration_factor =  -12500;
float currentWeightFromScale = 0;
float lastWeightFromScale = 0;
float previousMillis = 0;

String lcdPrint = "SKALA";

void setup() {
  //SERIAL
  Serial.begin(115200);
  Serial.println("hey ");
  //END SERIAL


  //BUTTONS
  pinMode(onOffBtn, INPUT);
  pinMode(tareBtn, INPUT); 
  //END BUTTONS

  //LCD
  Wire.begin(12, 14);
  lcd.begin();
  lcd.home();
  lcd.setCursor(7, 0);
  lcd.print(lcdPrint);
  //END LCD

  //SCALE
  scale.set_scale();
  scale.tare();
  //END SCALE

  //WIFI CONNECT
  WiFi.begin(ssid, password);
  lcd.setCursor(0, 1);
  lcd.print("Connecting to wifi");
  int lcdii = 4;
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    lcd.setCursor(8, 2);
    if(lcdii%4==0) lcd.print('|');
    else if(lcdii%4==1) lcd.print('/');
    else if(lcdii%4==2) lcd.print('-');
    else lcd.print('\\');
    lcdii++;
    tryToConnectToWifiForThisLongMilliseconds -= 500;
    if(tryToConnectToWifiForThisLongMilliseconds == 0) break;
    
  }
  Serial.println("");
  Serial.println("WiFi connected");
  //END WIFI CONNECT



 

}

void loop() {

  //GET WEIGHT FROM SCALE
  currentWeightFromScale = getWeightFromScale();
  Serial.print(currentWeightFromScale); Serial.println(" kg ");

  
  lcdPrint = String(currentWeightFromScale);
  lcd.setCursor(0, 2);
  lcd.print("Weight: " + lcdPrint + " kg ");


  //SEND BUTTON ON OFF
  onOffBtnState=digitalRead(onOffBtn); // put your main code here, to run repeatedly:
  if(onOffBtnState != onOffBtnStateOld){
    onOffBtnStateOld = onOffBtnState;
    if (onOffBtnState == HIGH) dataSendOn = !dataSendOn;
    if(dataSendOn){
      if(millis() - lastOnOffSentMillis > 2000){
        sendOnState();
        lastOnOffSentMillis = millis();
        Serial.println("sent on state");
       }
    }
    else{
      if(millis() - lastOnOffSentMillis > 2000){
        sendOffState();
        lastOnOffSentMillis = millis();
        Serial.println("sent off state");
      }
    }
  }

  if(dataSendOn){
    lcd.setCursor(0, 3);
    lcd.print("Sending data      ");
  }
  else{
    lcd.setCursor(0, 3);
    lcd.print("Not sending data  ");
  }
  //END SEND BUTTON ON OFF


   //TARE BUTTON TRIGGER
    tareBtnState = digitalRead(tareBtn);
    if(tareBtnState == 1) {
    scale.tare();
    Serial.println("TARED");
    }
   //END TARE BUTTON TRIGGER
   
  //Serial.print("last weight: "); Serial.print(lastWeightFromScale); Serial.print(" Current: "); Serial.println(currentWeightFromScale);
  if(fabs(lastWeightFromScale-currentWeightFromScale) < ifLessThanThisValueDoNotEvenBother){
    //Serial.println("Not getting in"); 
    previousMillis = millis();
  } 
  if(millis() - previousMillis > 5000){
    //Serial.println(millis());
    if(dataSendOn) sendIfCorrect();
    //if(fabs(lastWeightFromScale-currentWeightFromScale) > 0.1f){
    //lastWeightFromScale = currentWeightFromScale;    
    previousMillis = millis();
  }

  delay(1000);


}

float getWeightFromScale(){

  scale.set_scale(calibration_factor); // Adjusts calibration based on above defined calibration number
  // Serial.print("Reading: ");
  // Serial.print(scale.get_units(), 1);
  // Serial.print(" kg "); // Alter as required
  // Serial.println("");
  currentWeightFromScale = (scale.get_units());
  return currentWeightFromScale;
}

void sendIfCorrect(){
  Serial.println("sent weight");
  //Serial.println(lastWeightFromScale);
  //Serial.println(currentWeightFromScale);
  if(fabs(lastWeightFromScale-currentWeightFromScale) > ifChangeIsNotMoreThanThisValueDoNotSend){ 
    Serial.println("Sent");
    lastWeightFromScale = currentWeightFromScale;
    //WiFiClient client;
    HTTPClient http;
    http.begin(host+":"+port+"/scale");
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST("{\"weight\": \"" + String(currentWeightFromScale) + "\", \"scaleId\": \"4\"}");
    Serial.println(httpCode);
    http.end();
  }
}

void sendOnState(){
  HTTPClient http;
    http.begin(host+":"+port+"/scale/button");
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST("{\"status\": \"ON\", \"scaleId\": \"4\"}"); // + "ON" + "\", \"scaleId\": \"4\"}");
    Serial.println(httpCode);
    http.end();
    lastOnOffSentMillis = millis();
}

void sendOffState(){
  
    HTTPClient http;
    http.begin(host+":"+port+"/scale/button");
    http.addHeader("Content-Type", "application/json");

    int httpCode = http.POST("{\"status\": \"OFF\", \"scaleId\": \"4\"}");
    Serial.println(httpCode);
    http.end();
    lastOnOffSentMillis = millis();
  
}