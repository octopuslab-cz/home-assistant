# octopus_lab Home Assistant

---


## Devices
### I2C Bus
```yaml
i2c:
  - scl: 1
    sda: 0
    scan: true
    id: bus_a
```

### Accel and gyro sensor
```yaml
sensor:
  - platform: mpu6050
    address: 0x68
    accel_x:
      name: "Accel X"
    accel_y:
      name: "Accel Y"
    accel_z:
      name: "Accel z"
    gyro_x:
      name: "Gyro X"
    gyro_y:
      name: "Gyro Y"
    gyro_z:
      name: "Gyro z"
    temperature:
      name: "MPU6500 Temperature"
```

### RGB Led
```yaml
light:
  - platform: neopixelbus
    type: GRB
    variant: WS2812
    pin: GPIO8
    method:
      type: esp32_rmt
      channel: 0
    num_leds: 1
    name: "RGB LED"
```

### LiIon fuel gauge

This device is not part of ESPHome, so it needs manual installation of library.

You need put thist file to ESPHome data folder and call it as `MAX17048_component.h`
```h
#include "esphome.h"

#define MAX17048_ADDRESS        0x36
#define MAX17048_VCELL          0x02 // voltage
#define MAX17048_SOC            0x04 // percentage
#define MAX17048_MODE           0x06
#define MAX17048_VERSION        0x08
#define MAX17048_CONFIG         0x0c
#define MAX17048_COMMAND        0xfe

class MAX17048Sensor : public PollingComponent, public Sensor {
 public:
  Sensor *voltage_sensor = new Sensor();
  Sensor *percentage_sensor = new Sensor();

  MAX17048Sensor() : PollingComponent(10000) {}

  void setup() override {
    // Initialize the device here. Usually Wire.begin() will be called in here,
    // though that call is unnecessary if you have an 'i2c:' entry in your config
    ESP_LOGD("custom", "Starting up MAX17048 sensor");

    Wire.begin();
  }

  uint16_t read16(uint8_t reg) {
      uint16_t temp;
      Wire.begin();
      Wire.beginTransmission(MAX17048_ADDRESS);
      Wire.write(reg);
      Wire.endTransmission();
      Wire.requestFrom(MAX17048_ADDRESS, 2);
      temp = (uint16_t)Wire.read() << 8;
      temp |= (uint16_t)Wire.read();
      Wire.endTransmission();
      return temp;
  }

  void update() override {
    float voltage = (float)(read16(MAX17048_VCELL)) * 78.125 / 1000000;
    voltage_sensor->publish_state(voltage);

    uint16_t percentage_tmp = read16(MAX17048_SOC);
    float percentage = (float)(percentage_tmp) / 256;
    percentage_sensor->publish_state(percentage);
  }
};
```

Then you have to include this file in ESPHome
```yaml
esphome:
  includes:
    - MAX17048_component.h
```

Sensor definition
```yaml
sensors:
  - platform: custom
    lambda: |-
      auto max17048_sensor = new MAX17048Sensor();
      App.register_component(max17048_sensor);
      return {max17048_sensor->voltage_sensor, max17048_sensor->percentage_sensor};
    sensors:
      - name: "Voltage"
        unit_of_measurement: V
        accuracy_decimals: 2
      - name: "Percentage"
        unit_of_measurement: '%'
```
