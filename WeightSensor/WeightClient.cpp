#include "WeightClient.h"

WeightClient::WeightClient(){
  last_abandoned = 0;
  flag_zero = false;
  inited = false;
  }
WeightClient::~WeightClient(){
	delete s1,s2;

}

void WeightClient::begin(byte dout, byte pd_sck, int AnalogPin){
  Serial.print("calibration_factor_1 : ");
  Serial.println(calibration_factor_1);
  
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
  scale.set_scale(calibration_factor_1);  //스케일 지정
  scale.tare();  //스케일 설정
  Serial.println("calbration adjusted.");
  delay(500);
  
#if USE_NETWORK
  net.begin();
  Serial.println("network begun.");
  delay(500);
#endif

  prev_weight_1 =scale.GetWeight_1();
  delay(500);
  
  fsrAnalogPin = AnalogPin;
  prev_weight_2 = GetWeight_2();
  delay(500);
  
  s1 = new Sensor(1,threshold_1,prev_weight_1,dur_zero);
  s2 = new Sensor(2,threshold_2,prev_weight_2,dur_zero);
  
  Serial.println("Initialization Completed.");
  }

float WeightClient::GetWeight_1(){
   return scale.get_units();
  }
  
float WeightClient::GetWeight_2(){
  int val=0;
  for (byte i = 0; i < times; i++) {
    val += analogRead(fsrAnalogPin) ;
  }
  return (map((val / times ), 0, 1023, 0, 5000)- init_weight_2)*calibration_factor_2;
  }  

  
void  WeightClient::Send(float weight_1, float weight_2){
   int ret_1=0,ret_2=0;
   
   /*** 로드 셀 ***/
   ret_1 = s1.Check_LoadCell(weight_1);
   SwitchReturn(ret_1,weight_1);
	
  /*** FSR ***/
  ret_2 = s2.Check_FSR(weight_2);
  SwitchReturn(ret_2,weight_1);

  delay(5000);
}


  void WeightClient::SwtichReturn(int ret,int val,int led_send,int led_zero){
   switch(ret){
	   case 1:
      net.SendWeight(1,val);
  		break;	   
		case -1:
  		net.SendWeight(1,-1);
  		digitalWrite(led_send,HIGH);
   		delay(1000);
		  digitalWrite(led_zero,LOW);
		  delay(1000);
		break;
		default:
	}

  }