
#include "WeightClient.h"

#define Clk  12 //D6
#define Dout 13 //D7
#define Ain A0

WeightClient wc;

void setup() {
  Serial.begin(115200);
  wc.begin(Dout,Clk,Ain);
  delay(500);
  Serial.println('WeightClient Initialized');
}

void loop() {
  float weight_0 = wc.GetWeight_0();
  int weight_1 = wc.GetWeight_1();
  Serial.print("loadcell_0 : ");
  Serial.print(weight_0);
  Serial.println(" g");
   Serial.print("loadcell_1 : ");
   Serial.println(weight_1);
   delay(100);
   Serial.println(analogRead(Ain));
  wc.Send(weight_0,weight_1);
  delay(3000);
}
