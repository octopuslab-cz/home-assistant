# octopus_lab Home Assistant

---

## ESP8266 DoIt board

```yaml
# RGB // 15/12/13 // D8 D6 D7
switch:
  - platform: gpio
    id: led_R
    name: "8266 / Led R"
    pin: GPIO15 # D8

  - platform: gpio
    id: led_G
    name: "8266 / Led G"
    pin: GPIO12 # D6

  - platform: gpio
    id: led_B
    name: "8266 / Led B"
    pin: GPIO13 # D7

sensor:
  # LDR ADC A0
  - platform: adc
    pin: A0
    name: "8266_D8 ADC0"
    filters:
      # -  offset: -0.042
      - multiply: 1
    update_interval: 30s
     
```

---


```yaml
# Dallas GPIO0 / D3
...
```