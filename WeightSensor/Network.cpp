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

void Network::Send(float weight){
  /*
  if (!client.connect(AWS_host, AWS_port)) {
      Serial.println("connection failed. waiting for 5 sec...");
      delay(5000);
      return;
    }
    
    String request = AWS_msg;
    request +=temper;
    request +="&seq=";
    request += String(seq);
    request +="&ip=";
    request +=ip.toString();
    //client.print(request);
    client.print(String("GET ") + request + " HTTP/1.1\r\n" +
               "Host: " + AWS_host + "\r\n" + 
               "Connection: close\r\n\r\n");

   
  Serial.println(request);
  client.stop();
   */
   String request = "/log?{<Json>}";
   //request +="&seq=";
   //request += String(seq);
   request +=weight;
   request +="&ip=";
   request +=ip.toString();
   Serial.println("Sending " + request);
  }
