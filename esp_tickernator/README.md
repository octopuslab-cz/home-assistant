# octopus_lab Home Assistant

---

## Tickernator - display8

```yaml
# display8 test
spi:
  clk_pin: GPIO18
  mosi_pin: GPIO23

sensor:
  - platform: homeassistant
    name: "Helper cnt"
    id: ident
    entity_id: counter.cnt

text_sensor:
  - platform: homeassistant
    name: "Helper test"
    id: ident_txt
    entity_id: input_text.text1

display:
  - platform: max7219
    cs_pin: GPIO5
    num_chips: 1
    update_interval: 1000ms
    lambda: |-
      it.printf("%s", id(ident_txt).state.c_str());
    
```

helper - text

```yaml
"sensor.latest_bitcoin_block"

```

data - API

```yaml
...
```