# octopus_lab Home Assistant

---

## yaml 

[**yaml**](https://cs.wikipedia.org/wiki/YAML)

### List (sequence) / Array

```yaml
this_is_a_list:
  - apple
  - orange
  - banana

second_list: [1,2,3,5,6]
```

### Dictionary / Associative array

```yaml
my_dict:
  item: value
  item2: 123
  ...
```

Automatizace je *list* *"slovníků"*.


---

## templates

[**Jinja2**](https://jinja.palletsprojects.com/en/3.1.x/) - skriptovací (lépe asi šablonovací) jazyk napsaný v jazyce Python a v Home Assistantu se používá pro vytváření dynamických šablon (templates) pro konfigurační soubory, automatizace, zobrazení stavů entit a další účely.

[homeassistant.local:8123/developer-tools/template](http://homeassistant.local:8123/developer-tools/template)

### data with json structure

```jinja2
{% set my_test_data = {
  "temperature": 23,
  "unit": "°C"
} %}

>
The temperature is {{ my_test_data.temperature }} {{ my_test_data.unit }}.
```


### date_time

```jinja2
{## note or disble
{% set month=states("sensor.date").split("-")[1] %}
Month: {{ month }}
##}

{{ as_timestamp(now()) }}
> 1710688333.123456

timestamp2datetime: {{ as_datetime("1710688333.123456") }}
> timestamp2datetime: 2024-03-17 15:12:13.123456+00:00

{{ now().strftime("%H:%M") }}
> 16:22

{{ now().date() }} / {{ now().time() }}
{% set month=now().strftime('%m') %}
Month: {{ month }}

>
2024-03-17 / 08:42:06.920837
Month: 03
```

###

```yaml
{{ states("sensor.esp_hooka_diagnostic_ambient") | round(1) }}
23.1

{{ states.sensor | list }}
[ all sensors... = array

{{ states.sensor | list | count }}
count(array)

{{ states.sensor | rejectattr("state", "eq", "unavailable") | list | count }}

```

### config - bitcoin info

```yaml
rest:
  - resource: https://api.coinpaprika.com/v1/tickers/btc-bitcoin
    scan_interval: 90
    sensor:
   ### BTC
      - name: "BTC/USD"
        # json_attributes_path: "$.[0]"
        value_template: '{{ value_json["quotes"]["USD"]["price"] }}'
        unit_of_measurement: "USD"
        # json_attributes:
        #   - name
        #   - symbol
        #   - price
        #   - quotes


sensor:
  - platform: rest
    name: Latest Bitcoin Block
    resource: https://blockchain.info/latestblock
    value_template: "{{ value_json.height }}"
    scan_interval: 300
```

---


```yaml
# F2C

sensor:
  - platform: dht
    pin: D5
    temperature:
      name: "Teplota"
      id: teplota
    humidity:
      name: "Vlhkost"

template:
  # Převod teploty z Celsia na Fahrenheita
  - sensor:
      - name: "Teplota_Fahrenheit"
        unit_of_measurement: "°F"
        accuracy_decimals: 1
        lambda: |-
          return id(teplota).state * 9.0 / 5.0 + 32.0;
```
