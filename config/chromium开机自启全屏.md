#Chromium开机自启全屏

1.在/home/pi/.config目录里创建一个autostart文件夹

```
mkdir /home/pi/.config/autostart/
```

2.在/home/pi/.config/autostart目录里创建并编辑my.desktop文件

```
nano /home/pi/.config/autostart/my.desktop
```

3.输入以下内容

```
[Desktop Entry]
Type=Application
Exec=chromium-browser -–disable-popup-blocking -–no-first-run -–disable-desktop-notifications --kiosk "http://www.hasiymagicmirror.top/"
```

nano编辑器Ctrl+O键是写入文件（保存文件）会提到是否保存，请按回车键

Ctrl+X退出编辑器

4.在Chromium中设置开启浏览器是打开指定页为智能镜子的主页

5.鼠标不移动时自动隐藏光标

```
sudo apt-get install x11-xserver-utils unclutter
```

