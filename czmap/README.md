# octopus_lab Home Assistant

Example using OctopousLab ESP32-C3 board


## Devices
### SPI Bus
```yaml
spi:
  mosi_pin: GPIO7
  clk_pin: GPIO6
```

### LED definition
```yaml
light:
  - platform: spi_led_strip
    num_leds: 13 # Use how many leds (connected maps) have, 13, 26,..
    id: czmap_led_all
    name: "CZ RGB Map"
    data_rate: 1MHz
    internal: True # If you do not want control all at once, make them internal
```

### MAP Partition definitions
```yaml
  - platform: partition
    name: "Map 1"
    id: "czmap_led_1"
    segments:
      - id: czmap_led_all
        from: 0
        to: 12
  - platform: partition
    name: "Map 2"
    id: "czmap_led_2"
    segments:
      - id: czmap_led_all
        from: 13
        to: 25
  ...
```

### Single led per region definition
```yaml
# Map 1
  - platform: partition
    name: " M1 Praha"
    segments:
      - id: czmap_led_1
        from: 0
        to: 0

  - platform: partition
    name: "M1 Liberecky"
    segments:
      - id: czmap_led_1
        from: 1
        to: 1

  - platform: partition
    name: "M1 Kralovehradecky"
    segments:
      - id: czmap_led_1
        from: 2
        to: 2

  - platform: partition
    name: "M1 Pardubicky"
    segments:
      - id: czmap_led_1
        from: 3
        to: 3

  - platform: partition
    name: "M1 Olomoucky"
    segments:
      - id: czmap_led_1
        from: 4
        to: 4

  - platform: partition
    name: "M1 Moravsko-Slezksky"
    segments:
      - id: czmap_led_1
        from: 5
        to: 5

  - platform: partition
    name: "M1 Zlinsky"
    segments:
      - id: czmap_led_1
        from: 6
        to: 6

  - platform: partition
    name: "M1 Jiho-Moravsky"
    segments:
      - id: czmap_led_1
        from: 7
        to: 7

  - platform: partition
    name: "M1 Vysocina"
    segments:
      - id: czmap_led_1
        from: 8
        to: 8

  - platform: partition
    name: "M1 Jihocesky"
    segments:
      - id: czmap_led_1
        from: 9
        to: 9

  - platform: partition
    name: "M1 Plzensky"
    segments:
      - id: czmap_led_1
        from: 10
        to: 10

  - platform: partition
    name: "M1 Karlovarsky"
    segments:
      - id: czmap_led_1
        from: 11
        to: 11

  - platform: partition
    name: "M1 Ustecky"
    segments:
      - id: czmap_led_1
        from: 12
        to: 12
```