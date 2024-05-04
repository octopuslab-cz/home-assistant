# octopus_lab Home Assistant

---

## basic setup for hookaMonk board

```yaml
switch:
  - platform: gpio
    name: "Fet 1"
    pin: 26
  - platform: gpio
    name: "Fet 2"
    pin: 27
```

## hookaMonk simple clock

4-digit display **tm1637**

```yaml
# hooka disp4
time:
  - platform: homeassistant
    id: homeassistant_time

display:
  platform: tm1637
  clk_pin: 13
  dio_pin: 14
  update_interval: 500ms
  lambda: |-
      static int i = 0;
      i++;
      if ((i % 2) == 0)
        it.strftime("%H.%M", id(homeassistant_time).now());
      else
        it.strftime("%H%M", id(homeassistant_time).now());

```

---

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
    name: "RGB LED"
    id: rgb32 
```

Project example:

https://github.com/octopuslab-cz/home-assistant/blob/main/projects/hooka_diagnostic.yaml
