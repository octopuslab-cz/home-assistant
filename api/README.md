...
## autostart setup (for Raspberry Pi)
---
/etc/systemd/system/startup.service
```
[Unit]
Description=Start HA python proxy server

[Service]
ExecStart=/usr/bin/python3 -m http.server 5500
WorkingDirectory=/home/pi/api
User=pi
StandardOutput=inherit
StandardError=inherit
Restart=always

[Install]
WantedBy=multi-user.target
```

activate:
```
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable startup.service
```

---
/etc/xdg/lxsession/LXDE-pi/autostart
```
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
@xscreensaver -no-splash

@xset s off
@xset -dpms
@xset s noblank

@chromium-browser --start-fullscreen http://YOUR_URL:5500/ha_example.html
```
---
configuration.yaml
```
http:
  cors_allowed_origins:
    - http://localhost:5500
```
---

ToDo: "fix" for *localhost*
