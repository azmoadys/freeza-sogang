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

int Network::SendWeight(int id, float weight){

#if USE_NETWORK
WiFiClient client;
if (!client.connect("54.180.115.85", 3000)) {
      Serial.println("connection failed. waiting for 5 sec...");
      delay(5000);
      return 0;
    }
   String request = "GET /get_data?";
   request +="SID=";
   request +=id;   
   request +="&WEIGHT=";
   request +=weight;   
  request += " HTTP/1.1\nHost: 54.180.115.85\nConnection: close\n\n"; 
   client.print(request); 
   client.stop();
   Serial.print(id);
   Serial.println(" Send");
   delay(100);
   #endif   
   return 1;
}
int Network::SendWarning(int id){
  
}
