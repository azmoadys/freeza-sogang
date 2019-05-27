#include "WeightClient.h"

WeightClient::WeightClient(){}

void WeightClient::begin(byte dout, byte pd_sck, int AnalogPin){
  Serial.print("calibration_factor : ");
  Serial.println(calibration_factor);
  scale.begin(dout, pd_sck);
  Serial.println("HX711 begun.");
  delay(500);
  scale.set_scale(calibration_factor);  //스케일 지정
  scale.tare();  //스케일 설정
  Serial.println("calbration adjusted.");
  delay(500);
#if USE_NETWORK
  net.begin();
  Serial.println("network begun.");
  delay(500);
#endif
  fsrAnalogPin = AnalogPin;
 // Serial.println("AnalogPin " + fsrAnalogPin + "." );
  delay(500);
  }

float WeightClient::GetWeight_0(){
   return scale.get_units();
  }
int WeightClient::GetWeight_1(){
  return analogRead(fsrAnalogPin);
  }  
void  WeightClient::Send(float weight_0, int weight_1){
#if USE_NETWORK
  net.Send(weight_0,weight_1);
#endif
  }
