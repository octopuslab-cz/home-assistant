# octopus_lab Home Assistant - displays

---

## 4-digit display TM 1637

```yaml
...
# tm1637 / clock

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

## LCD 1602

```yaml
...
# display LCD 1602 / i2c

i2c: #0x76 en 0x27
  sda: GPIO21
  scl: GPIO22

display:
  - platform: lcd_pcf8574
    dimensions: 16x2
    address: 0x38 # 0x27
    update_interval: 500ms
    id: lcd
    lambda: |-
      it.print("01234567");
```

---

## 8-digit SPI display MAX 7219

```yaml
...
# display8 / ticker
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

## OLED I2C display ssd1306

```yaml
...
font:
  - file: 'verdana.ttf' # /homeassistant/esphome/verdana.ttf
    id: font1
    size: 12

  - file: 'verdana.ttf'
    id: font2
    size: 18

i2c:
  sda: 21 # $(pin_sda)
  scl: 22 # $(pin_scl)

display: # x,y
  - platform: ssd1306_i2c
    model: "SSD1306 128x64"
    address: 0x3C
    lambda: |-
      it.print(0, 0, id(font1), "Hello Octopus");
      it.print(10, 20, id(font2), "TEST 123");
```
