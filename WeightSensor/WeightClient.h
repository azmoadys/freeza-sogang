#define USE_FSR01CE false

#include "HX711.h"
#include "Network.h"


class WeightClient{

private:
Network net;

const float calibration_factor =671.4;
HX711  scale;

int fsrAnalogPin;
public:
  WeightClient();
  void begin(byte dout, byte pd_sck,int AnalogPin);
  float GetWeight_0();
  int GetWeight_1();
  void  Send(float weight);


};
