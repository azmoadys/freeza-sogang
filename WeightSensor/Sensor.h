#ifndef _H_SENSOR_
#define _H_SENSOR_

#define SEC 1000

class Sensor {
private:
  int id;
//flag  
  bool is_init;
  bool flag_zero;
// parameter 
  float threshold;
  float prev_weight;
 // times
 unsigned long last_abandoned;
 unsigned long first_abandoned;
 unsigned long dur_zero = 13;
public:
  Sensor(int _id,float _threshold,  unsigned long _dur_zero):
  id(_id),
  is_init(false),
  flag_zero(false),
  threshold(_threshold),
  last_abandoned(0),
  prev_weight(0),
  dur_zero(_dur_zero)
  {
    
  };

int Check_LoadCell(float weight){
/******************************************************************/
     String t="";
     t+=weight;
     t+=" ";
     t+=prev_weight;
     Serial.println(t);
   if(is_init && weight < threshold){
      //이미 zero 측정중.
      if(flag_zero){
        last_abandoned =  millis();
        // 몇 초까지 기다릴것인가.
        if(last_abandoned - first_abandoned> dur_zero * SEC)
        { 
          // 초기화 - 경고는 한번만
          is_init = false;          
          flag_zero = false;
          prev_weight = weight;
          // weight < threshold && abandonded_duration > durataion
		      return -1; 
	       }
       }
	  // 일단 대기
      else{
        flag_zero = true;
        first_abandoned = millis();
      }
      
   }
   //변화량 체크
  // delta_weight < threshold  
  else if(abs(prev_weight - weight)<threshold){
    flag_zero = false;
    prev_weight = weight;
    return 0; 
  // 유의미한 변화량일 경우.
  // delta_weight > threshold  
   }else{
    flag_zero = false;
    is_init = true;
    prev_weight = weight;
    return 1;
   }
  }
};
#endif
