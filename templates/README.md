# octopus_lab Home Assistant

---

## templates

**Jinja2** - skriptovací (lépe asi šablonovací) jazyk napsaný v jazyce Python a v Home Assistantu se používá pro vytváření dynamických šablon (templates) pro konfigurační soubory, automatizace, zobrazení stavů entit a další účely.

[homeassistant.local:8123/developer-tools/template](http://homeassistant.local:8123/developer-tools/template)

### Data with json structure

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

{{ now().date() }} / {{ now().time() }}
{% set month=now().strftime('%m') %}
Month: {{ month }}

>
2024-03-17 / 08:42:06.920837
Month: 03
```
