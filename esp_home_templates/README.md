# octopus_lab Home Assistant

---

## PIN2 / switch - relay / LED2

```yaml
switch:
  - platform: gpio
    name: "Led 2"
    pin: GPIO2
```

## WS

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
