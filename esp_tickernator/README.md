# octopus_lab Home Assistant

---

## Tickernator - display8

```yaml
# display8
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23

sensor:
  - platform: homeassistant
    name: "BTC/USD"
    id: ident
    entity_id: sensor.btc_usd

display:
  - platform: max7219
    cs_pin: GPIO5
    num_chips: 1
    update_interval: 1000ms
    lambda: |-
      it.set_intensity(5);
      it.printf("%8.0f", id(ident).state);
```

LCD block / halving

```yaml
i2c: #0x76 en 0x27
  sda: GPIO21
  scl: GPIO22

sensor:
  - platform: homeassistant
    name: "BTC/USD"
    id: latest_block
    entity_id: sensor.latest_bitcoin_block

display:
  - platform: lcd_pcf8574
    dimensions: 16x2
    address: 0x38
    update_interval: 1s
    id: lcd
    user_characters:
      - position: 0
        data:
          - 0b00000
          - 0b01010
          - 0b00000
          - 0b00100
          - 0b00100
          - 0b10001
          - 0b01110
          - 0b00000
    lambda: |-
      static int i = 0;
      i++;
      if (!id(latest_block).has_state()) {
        it.printf(0, 0, "Loading halving");
        if ((i % 2) == 0)
          it.printf(0, 1, "countdown ...");  
        else
          it.printf(0, 1, "countdown");  
      }
      else {
        // int latest_block = id(latest_block).state;
        it.printf(0, 0, "Latest %i", (int) id(latest_block).state);
        if ((i % 2) == 0)
          it.printf(15, 0, "\x08");
        it.printf(0, 1, "Halving in %i", 840000 - (int) id(latest_block).state);
      }
```
