# octopus_lab Home Assistant | ESP home

## ESP8266 | ESP32

---
### ota 2025
```yaml
...
ota:
  - platform: esphome
    password: "..."
```
### PIN2 / switch - relay / LED2

```yaml
switch:
  - platform: gpio
    name: "Led 2"
    pin: GPIO2
```

### WS

```yaml
light:
  - platform: neopixelbus
    type: GRB
    variant: WS2812
    pin: GPIO25
    method:
      type: esp32_rmt
      channel: 0
    num_leds: 32
    name: "RGB LED D"
    id: rgb3
```

---


### PIN2 LED2 - blink On boot

```yaml
esphome:
  ...
  on_boot:
    priority: 600
    # ...
    then:
      - switch.turn_on: led_2
      - delay: 500ms
      - switch.turn_off: led_2
```


### PIN2 LED2 - still flashing

```yaml
interval:
  - interval: 1000ms  # (200ms + 800ms)
    then:
      - lambda: |-
          static bool led_state = false;
          led_state = !led_state;
          if (led_state) {
            id(led_2).turn_on();
            delay(200);  // on
          } else {
            id(led_2).turn_off();
            delay(800);  // off
          }
```

### WiFi Signal

```yaml
sensor:
  - platform: wifi_signal
    name: "WiFi_Signal"
    id: wifi_sensor
    update_interval: 10min
```
