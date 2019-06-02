#include "Network.h"

Network::Network(){
  }
Network::~Network(){
  }
  
void Network::begin(){
   WiFi.mode(WIFI_STA);
  WiFiMulti.addAP(ssid, password);

  Serial.println();
  Serial.print("Wait for WiFi... ");

  while (WiFiMulti.run() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  ip = WiFi.localIP();
  Serial.println("IP address: ");
  Serial.println(ip);
  }

void Network::Send(float weight_0, int weight_1){
WiFiClient client;
if (!client.connect("54.180.115.85", 3000)) {
      Serial.println("connection failed. waiting for 5 sec...");
      delay(5000);
      return;
    }
   String request = "GET /get_data?";
   request +="SID=1&WEIGHT=";
   request +=weight_0;   
  request += " HTTP/1.1\nHost: 54.180.115.85\nConnection: close\n\n"; 
   client.print(request); 
   //Serial.println(request);
   delay(100);
  request = "GET /get_data?";
   request +="SID=2&WEIGHT=";
   request +=weight_1;   
  request += " HTTP/1.1\nHost: 54.180.115.85\nConnection: close\n\n"; 
   client.print(request); 
   Serial.println("sending http request");
  client.stop();
}
