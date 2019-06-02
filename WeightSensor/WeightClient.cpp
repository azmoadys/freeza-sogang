#include "WeightClient.h"

WeightClient::WeightClient(){
  }

void WeightClient::begin(byte dout, byte pd_sck, int AnalogPin){
  Serial.print("calibration_factor_0 : ");
  Serial.println(calibration_factor_0);
  
  scale.begin(dout, pd_sck);
  Serial.println("HX711 begun.");
  delay(500);
  
  scale.set_scale(calibration_factor_0);  //스케일 지정
  scale.tare();  //스케일 설정
  Serial.println("calbration adjusted.");
  delay(500);
  
#if USE_NETWORK
  net.begin();
  Serial.println("network begun.");
  delay(500);
#endif

  prev_weight_0 =scale.get_units();
  delay(500);
  
  fsrAnalogPin = AnalogPin;
  init_weight_1=0;
  init_weight_1 = GetWeight_1();
  delay(500);
  
  }

float WeightClient::GetWeight_0(){
   return scale.get_units();
  }
  
float WeightClient::GetWeight_1(){
  int val=0;
  for (byte i = 0; i < times; i++) {
    val += analogRead(fsrAnalogPin) ;
  }
  return (map((val / times ), 0, 1023, 0, 5000)- init_weight_1)*calibration_factor_1;
  }  

  
void  WeightClient::Send(float weight_0, float weight_1){

  if((abs(prev_weight_0 - weight_0)<threshold_0)  && (abs(prev_weight_1 - weight_1)<threshold_1)){
    prev_weight_1 = weight_1;
    return;
  }
  prev_weight_1 = weight_1;  
  prev_weight_0 = weight_0;
  
  Serial.println("Send");
#if USE_NETWORK
  net.Send(weight_0,weight_1);
#endif
  }
