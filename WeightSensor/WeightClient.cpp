#include "WeightClient.h"

WeightClient::WeightClient(){
  last_abandoned = 0;
  flag_zero = false;
  inited = false;
  }

void WeightClient::begin(byte dout, byte pd_sck, int AnalogPin){
  Serial.print("calibration_factor_0 : ");
  Serial.println(calibration_factor_0);
  
  scale.begin(dout, pd_sck);
  Serial.println("HX711 begun.");
  delay(500);
  pinMode(led_send,OUTPUT);
  digitalWrite(led_send,LOW);
  Serial.println("led_send begun.");
  delay(500);
  pinMode(led_zero,OUTPUT);
  digitalWrite(led_zero,LOW);
  Serial.println("led_zero begun.");
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
   int ret_0=0,ret_1=0;
   /*** 로드 셀 ***/
  // 잠시 빼어둔거 체크
  if(inited && weight_0 < zero_0){
      //이미 zero 측정중.
      if(flag_zero){
        last_abandoned =  millis();
        // 몇 초까지 기다릴것인가.
        if(last_abandoned - first_abandoned> dur_zero * SEC)
        { Serial.println(last_abandoned - first_abandoned);
          digitalWrite(led_zero,HIGH);
          delay(1000);
          digitalWrite(led_zero,LOW);
          delay(1000);
          first_abandoned = last_abandoned;
          
        }
       }
      else{
        flag_zero = true;
        first_abandoned = millis();
      }
      
   }
   //변화량 체크
   else if(abs(prev_weight_0 - weight_0)<threshold_0){
    flag_zero = false;
   }else{
    flag_zero = false;
    inited = true;
    ret_0 = net.SendWeight(1,weight_0);
   }
   prev_weight_0 = weight_0;

   /*** FSR ***/
  if(abs(prev_weight_1 - weight_1)<threshold_1){
    prev_weight_1 = weight_1;
  }
  else{
    ret_1 = net.SendWeight(2,weight_1);
    prev_weight_1 = weight_1; 
  }
  
  if(ret_1 || ret_0){
    digitalWrite(led_send,HIGH);
    delay(1000);
    digitalWrite(led_send,LOW);
    delay(1000);
  }
}
