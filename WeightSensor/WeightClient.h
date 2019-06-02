#define USE_NETWORK false

#include "HX711.h"
#include "Network.h"


class WeightClient{

private:
Network net;

const float calibration_factor_0=671.4;
const float calibration_factor_1=0.66;
HX711  scale;
// threshold for sensor 0, unit is gram.
const float threshold_0 = 50;
const float threshold_1 = 50;

const int times = 24;

float prev_weight_0;
float prev_weight_1;

int init_weight_1;
int fsrAnalogPin;
public:
  WeightClient();
  void begin(byte dout, byte pd_sck,int AnalogPin);
  float GetWeight_0();
  float GetWeight_1();
  void  Send(float ,float);


};
