#include "WeightClient.h"

#define Clk  12 //D6
#define Dout 13 //D7
#define Ain A0

WeightClient wc;

void setup() {
  Serial.begin(115200);
  wc.begin(Dout, Clk, Ain);
  delay(500);
  Serial.println("WeightClient Initialized");
}

void loop() {
  float weight_1 = wc.GetWeight_1();
  float weight_2 = wc.GetWeight_2();

  Serial.print("LoadCell : ");
  Serial.print(weight_1);
  Serial.println(" g");
  Serial.print("FSR : ");
  Serial.println(weight_2);
  delay(500);

  wc.Send(weight_1, weight_2);
}
