
#include "HX711.h"
#include "Network.h"

#define Clk  12 //D6
#define Dout 13 //D7



float calibration_factor =671.4;
HX711  scale(Dout, Clk);
Network net;

void setup() {
  Serial.begin(115200);
  
  Serial.print("calibration_factor : ");
  Serial.println(calibration_factor);
  scale.begin(Dout, Clk);
  delay(500);
  scale.set_scale(calibration_factor);  //스케일 지정
  scale.tare();  //스케일 설정

  
  delay(500);
  net.begin();
delay(500);
}

void loop() {
  float weight = scale.get_units();
  Serial.print(weight);
  Serial.println(" g");
  net.Send();
  delay(1000);
}
