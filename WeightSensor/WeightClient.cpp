#include "WeightClient.h"

WeightClient::WeightClient(){
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
  /*****************************/
  pinMode(led_send_1,OUTPUT);
  digitalWrite(led_send_1,LOW);
  
  Serial.println("led_send begun.");

  delay(500);
     /*****************************/
  pinMode(led_zero_1,OUTPUT);
  digitalWrite(led_zero_1,LOW);
 
  Serial.println("led_zero begun.");
  
  delay(500);
   /*****************************/
  scale.set_scale(calibration_factor_1);  //스케일 지정
  scale.tare();  //스케일 설정
  Serial.println("calbration adjusted.");
  delay(500);
  
#if USE_NETWORK
  net.begin();
  Serial.println("network begun.");
  delay(500);
#endif
  fsrAnalogPin = AnalogPin;

  s1 = new Sensor(1,threshold_1,dur_zero);
  s2 = new Sensor(2,threshold_2,dur_zero);

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
   ret_1 = s1->Check_LoadCell(weight_1);
   SwitchReturn_1(ret_1,weight_1,led_send_1,led_zero_1);
	
  /*** FSR ***/
  ret_2 = s2->Check_LoadCell(weight_2);
  SwitchReturn_2(ret_2,weight_2,led_send_1,led_zero_1);

  delay(DELAY);
}

void WeightClient::SwitchReturn_1(int ret,int val,int led_send,int led_zero){
   switch(ret){
	   case 1:
      net.SendWeight(1,val);
      digitalWrite(led_send,HIGH);
       delay(1000);
      digitalWrite(led_send,LOW);
  		break;	   
		case -1:
  		net.SendWeight(1,-1);
  		digitalWrite(led_zero,HIGH);
   		delay(1000);
		  digitalWrite(led_zero,LOW);
		break;
		default:
    break;
	}
}

void WeightClient::SwitchReturn_2(int ret,int val,int led_send,int led_zero){
   switch(ret){
     case 1:
      net.SendWeight(2,val);
      digitalWrite(led_send,HIGH);
      delay(300);
      digitalWrite(led_send,LOW);
      delay(200);
      digitalWrite(led_send,HIGH);
      delay(500);
      digitalWrite(led_send,LOW);
      break;     
    case -1:
      net.SendWeight(2,-1);
      digitalWrite(led_zero,HIGH);
      delay(300);
      digitalWrite(led_zero,LOW);
      delay(200);
      digitalWrite(led_zero,HIGH);
      delay(500);
      digitalWrite(led_zero,LOW);
    break;
    default:
    break;
  }
}
