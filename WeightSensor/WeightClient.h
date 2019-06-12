#define USE_NETWORK false

#include "HX711.h"
#include "Network.h"
#include "Sensor.h"

#define DELAY 1000

class WeightClient{

private:
Network net;
HX711  scale;
int fsrAnalogPin;

Sensor * s1,*s2;

/* 무게 측정 */
const float calibration_factor_1=671.4;
const float calibration_factor_2=0.66;
const int times = 24;
// threshold for sensor 0, unit is gram.

const float threshold_1 = 30;
const float threshold_2 = 50;
int init_weight_2;

const unsigned long dur_zero = 13;

const int led_send_1 = 10; // SD3
// SD2 : 9 - GPIO9 is internally used to control the flash memory.  [https://github.com/esp8266/Arduino/issues/1446]
const int led_zero_1 = 4; //D2

const int led_send_2 = 15;//15; // D8
const int led_zero_2 = 2;//D4;
public:
  WeightClient();
  ~WeightClient();

  void begin(byte dout, byte pd_sck,int AnalogPin);
  float GetWeight_1();
  float GetWeight_2();
  void  Send(float ,float);
  void  SwitchReturn_1(int ret,int val,int led_send,int led_zero);
  void  SwitchReturn_2(int ret,int val,int led_send,int led_zero);
};
