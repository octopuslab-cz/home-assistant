# octopus_lab Home Assistant

---

## ...
```
switch:
  - platform: gpio
    id: led_2
    name: "Led 2"
    pin: GPIO2

binary_sensor:
  - platform: gpio
    name: "Button 0"
    pin: 0
    on_press:
    - switch.toggle: led_2

sensor:
  - platform: adc
    pin: 39
    name: "ADC #39"
    samples: 3
    update_interval: 60s
    attenuation: 11dB

  - platform: wifi_signal
    name: "WiFi_Signal"
    id: wifi_sensor
    update_interval: 10min

```
