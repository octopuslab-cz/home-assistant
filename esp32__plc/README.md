# octopus_lab Home Assistant

---

## PLC board

```yaml
...
i2c:
  sda: 2
  scl: 16
  scan: true
  id: bus_a

pcf8574:
  - id: 'pcf8574_hub'
    address: 0x22
    pcf8575: false

sensor:
  - platform: adc
    pin: 34
    name: "ADC #1"
    update_interval: 15s
    attenuation: 11dB
  - platform: adc
    pin: 35
    name: "ADC #2"
    update_interval: 15s
    attenuation: 11dB
  - platform: tmp102
    address: 0x49
    name: "Board Temperature"
    update_interval: 60s

# Individual outputs
switch:
  - platform: gpio
    name: "FET #1"
    pin:
      pcf8574: pcf8574_hub
      number: 4
      mode:
        output: true
      inverted: true
  - platform: gpio
    name: "FET #2"
    pin:
      pcf8574: pcf8574_hub
      number: 5
      mode:
        output: true
      inverted: true
  - platform: gpio
    name: "FET #3"
    pin:
      pcf8574: pcf8574_hub
      number: 6
      mode:
        output: true
      inverted: true
  - platform: gpio
    name: "FET #4"
    pin:
      pcf8574: pcf8574_hub
      number: 7
      mode:
        output: true
      inverted: true
  
binary_sensor:
  - platform: gpio
    name: "IN #1"
    pin:
      pcf8574: pcf8574_hub
      number: 0
      mode:
        input: true
      inverted: false
  - platform: gpio
    name: "IN #2"
    pin:
      pcf8574: pcf8574_hub
      number: 1
      mode:
        input: true
      inverted: false
  - platform: gpio
    name: "IN #3"
    pin:
      pcf8574: pcf8574_hub
      number: 2
      mode:
        input: true
      inverted: false
  - platform: gpio
    name: "IN #4"
    pin:
      pcf8574: pcf8574_hub
      number: 3
      mode:
        input: true
      inverted: false


```
