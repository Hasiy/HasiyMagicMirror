#树莓派开机运行python脚本
这个方式不用修改 rc.local 文件。机制上类似于 Windows 的“开始”菜单中的“启动”菜单。方法如下：

在 /home/pi/.config 下创建一个文件夹，名称为 autostart，并在该文件夹下创建一个xxx.desktop文件（文件名以.desktop结尾，前面可以自定义），文件内容如下：

```
 [Desktop Entry]
 Name=exampleComment=My Python Program
 Exec=python /home/pi/example.py
 Icon=/home/pi/example.png
 Terminal=false
 MultipleArgs=false
 Type=Application
 Categories=Application;Development;
 StartupNotify=true 
```
以上 Name、Comment、Icon 可以自定，分别表示这个启动项目的名称、备注以及显示的图标。Exec 表示调用的指令，和在终端输入运行脚本的指令格式一致。
之后 sudo reboot 重启，就可以看到 example.py 在树莓派启动后也自动启动了。
