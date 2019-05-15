#include "HX711.h"

#define Clk  12 //D6
#define Dout 13 //D7

float calibration_factor =2125;

HX711  scale(Dout, Clk);

void setup() {
  Serial.begin(115200);
  Serial.println("Start");
  scale.begin(Dout, Clk);
  
  delay(500);

    scale.set_scale(calibration_factor);  //스케일 지정
   scale.tare();  //스케일 설정
}


void loop() {

  Serial.print(scale.get_units(), 1);
  Serial.println(" g");
  delay(1000);
}
