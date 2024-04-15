# home-assistant

https://github.com/home-assistant

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

## Terminal & SSH

(Home Assistant Add-on: SSH server)

**Main sys info**
```
[core-ssh]$ ha os info
```

## Install

**HACS** [Home Assistant Community Store](https://hacs.xyz/)
```
[core-ssh]$  wget -O - https://get.hacs.xyz | bash -
```


**Midnight Commander** (via ssh)
```
[core-ssh]$ apk add mc
```
