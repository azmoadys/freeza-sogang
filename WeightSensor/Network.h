#ifndef _H_NET_
#define _H_NET_

#include "secret.h" 
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>

class Network{
  private:
    const char* ssid     = STASSID;
    const char* password = STAPSK;
    IPAddress ip;
    ESP8266WiFiMulti WiFiMulti;
    
    
  public:
    Network();
    ~Network();
    void begin();
    int SendWeight(int ID, float weight);
    int SendWarning(int ID);
};

#endif
