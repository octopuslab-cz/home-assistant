# octopus_lab Home Assistant

---

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