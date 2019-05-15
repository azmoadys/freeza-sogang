#include "HX711.h"

#define Clk  12 //D6
#define Dout 13 //D7

float calibration_factor =671.4;

HX711  scale(Dout, Clk);

void setup() {
  Serial.begin(115200);
  Serial.print("calibration_factor : ");
  Serial.println(calibration_factor);
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
