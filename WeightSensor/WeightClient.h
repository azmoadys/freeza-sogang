#define USE_NETWORK true

#include "HX711.h"
#include "Network.h"


class WeightClient{

private:
Network net;
HX711  scale;
int fsrAnalogPin;

/* 시작 */
bool inited;
/* 무게 측정 */
const float calibration_factor_0=671.4;
const float calibration_factor_1=0.66;
// threshold for sensor 0, unit is gram.
const float threshold_0 = 50;
const float threshold_1 = 50;
int init_weight_1;
float prev_weight_0;
float prev_weight_1;

const int times = 24;

/* 방치 확인 */
const float zero_0 = 10;
bool flag_zero;
unsigned long last_abandoned;
unsigned long first_abandoned;
const unsigned long SEC = 1000;
const unsigned long dur_zero = 13;

const int led_send = 10; // SD3
// SD2 : 9 - GPIO9 is internally used to control the flash memory.  [https://github.com/esp8266/Arduino/issues/1446]
const int led_zero = 4; //D2
public:
  WeightClient();
  void begin(byte dout, byte pd_sck,int AnalogPin);
  float GetWeight_0();
  float GetWeight_1();
  void  Send(float ,float);


};
