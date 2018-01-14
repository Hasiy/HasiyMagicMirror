#### 一、查看网卡状态是否正常

把无线网卡插到树莓派上，输入命令ifconfig -a查看是否有wlan0的信息，如果有说明网卡状态正常，可以跳过第二步，直接配置无线网络。如果查不到wlan0的信息，则需要安装无线网卡的驱动。

#### 二、查看无线网卡的信息

输入命令dmesg | grep usb查看无线网卡的信息，主要是看制造厂家（Manufacturer）。比如，我的网卡信息是
usb 1-1.3: Manufacturer: Realtek

以Realtek为例，安装无线网卡驱动。
如果现在你的树莓派能联网，输入安装命令就可以安装Realtek的驱动了。

首先搜索Realtek驱动：

```
apt-cache search realtek
```

看到下面信息：
firmware-realtek – Binary firmware for Realtek wired and wireless network adapters
安装Realtek驱动：

```
sudo apt-get install firmware-realtek
```

如果你的树莓派现在不能上网，那么你可以去镜像站点中下载相关驱动。我推荐阿里云的镜像站点，速度比较快。http://mirrors.aliyun.com/raspbian/raspbian/pool/non-free/f/firmware-nonfree

下载firmware-realtek_0.43_all.deb，用winscp上传到树莓派的/tmp目录中。输入命令安装：

```
sudo dpkg -i /tmp/firmware-realtek_0.43_all.deb
```

#### 三、配置无线网络

用编辑器nano打开interfaces文件

```
sudo nano /etc/network/interfaces
```

我的interfaces文件是这样的：

```
auto lo

iface lo inet loopback
iface eth0 inet dhcp

allow-hotplug wlan0
iface wlan0 inet manual
wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp

```

我们把无线网卡部分全部用#注释掉，然后添加自己的配置信息，最终结果如下：

```
auto lo

iface lo inet loopback
iface eth0 inet dhcp

auto wlan0
#allow-hotplug wlan0
#iface wlan0 inet manual
iface wlan0 inet dhcp
wpa-conf /etc/wpa.conf
#wpa-roam /etc/wpa_supplicant/wpa_supplicant.conf
iface default inet dhcp

```

使用nano编辑器，ctrl+o保存，ctrl+x退出。

wpa文件地址：/etc/wpa_supplicant/ wpa_supplicant.conf

用编辑器nano创建 /etc/wpa.conf 文件：

```
sudo nano /etc/wpa.conf
```

如果你的wifi没有密码

```
network={
[Tab] ssid="你的无线网络名称（ssid）"
[Tab] key_mgmt=NONE
}
```

如果你的wifi使用WEP加密

```
network={
[Tab] ssid="你的无线网络名称（ssid）"
[Tab] key_mgmt=NONE
[Tab] wep_key0="你的wifi密码"
}
```

如果你的wifi使用WPA/WPA2加密

```
network={
[Tab] ssid="你的无线网络名称（ssid）"
[Tab] key_mgmt=WPA-PSK
[Tab] psk="你的wifi密码"
}
```

注1：所有符号都是半角符号（英文状态下的符号），“[Tab]”表示按一次Tab键
注2：如果你不清楚wifi的加密模式，可以在安卓手机上用root explorer打开 /data/misc/wifi/wpa/wpa_supplicant.conf，查看wifi的信息。

比如，我的wpa.conf文件是这样的：

```
network={
    ssid="1234"
    key_mgmt=WPA-PSK
    psk="MTIzNA1234"
}
```

最后输入命令启用无线网卡：

```
sudo ifup wlan0
```

可以连无线网了。