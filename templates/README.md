# octopus_lab Home Assistant

---

## templates

**Jinja2** - skriptovací (lépe asi šablonovací) jazyk napsaný v jazyce Python a v Home Assistantu se používá pro vytváření dynamických šablon (templates) pro konfigurační soubory, automatizace, zobrazení stavů entit a další účely.

homeassistant.local:8123/developer-tools/template


```jinja2

--- date_time---

{% set month=states("sensor.date").split("-")[1] %}
Month: {{ month }}


{{ now().date() }} / {{ now().time() }}
{% set month=now().strftime('%m') %}
Month: {{ month }}

```
