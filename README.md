# home-assistant

---
```
                             (domain)
                                |
                       |- Id  sensor.kitchen_sensor_temp
Device ---> Entities --|- Name
                 |     |- Icon
                 |
 (Integration) = |-- State                 |-
               = |- Attributes ------------|-
                                           |-          light / heating
                          Service ---------------------| turn_on
                                                       | turn_off
                                                       ...


Automations:
trigger (platform / state)
             -> condition
                        -> action (service)

```
---


yaml / jinja2 / json ...

https://github.com/octopuslab-cz/home-assistant/tree/main/templates

---
