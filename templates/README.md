# octopus_lab Home Assistant

---

## templates

```jinja2
homeassistant.local:8123/developer-tools/template
--- date_time---

{% set month=states("sensor.date").split("-")[1] %}
Month: {{ month }}


{{ now().date() }} / {{ now().time() }}
{% set month=now().strftime('%m') %}
Month: {{ month }}

```
