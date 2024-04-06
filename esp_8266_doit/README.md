# octopus_lab Home Assistant

---

## ESP8266 DoIt board

```yaml
switch:
  - platform: gpio
    id: led_2
    name: "8266_D8 / Led 2"
    pin: 
      number: GPIO2
      inverted: True

binary_sensor:
  - platform: gpio
    name: "Button 0"
    pin: 0
    on_press:
    - switch.toggle: led_2
```

---


```yaml
sensor:
  - platform: adc
    pin: A0
    name: "8266_D8 ADC0"
    filters:
      # -  offset: -0.042
      - multiply: 10
      - median:
          window_size: 5
          send_every: 2
          send_first_at: 2
    update_interval: 3s
```