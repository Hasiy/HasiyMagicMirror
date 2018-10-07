# 树莓派的运行状态显示NGINX+PHP

#### 安装方法

安装共2步，首先安装 Nginx（或 Apache）和 PHP。然后在 Nginx 目录通过 SFTP 或 GitHub 部署好本项目的程序。

##### 1.安装 Nginx 和 PHP

在 Pi 的终端运行以下命令。

```
sudo apt-get update
sudo apt-get install nginx php7.0-fpm php7.0-cli php7.0-curl php7.0-gd php7.0-mcrypt php7.0-cgi
sudo service nginx start
sudo service php7.0-fpm restart
```

如果安装成功，可通过 `http://树莓派IP` 访问到 Nginx 的默认页。Nginx 的根目录在 `/var/www/html`。
进行以下操作来让 Nginx 能处理 PHP。
`sudo nano /etc/nginx/sites-available/default`

将其中的如下内容

```
location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }
```

替换为

```
location / {
index  index.html index.htm index.php default.html default.htm default.php;
}
 
location ~\.php$ {
fastcgi_pass unix:/run/php/php7.0-fpm.sock;
#fastcgi_pass 127.0.0.1:9000;
fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
include fastcgi_params;
}
```

Ctrl + O 保存再 Ctrl + X 退出。

`sudo service nginx restart`

最后重启 Nginx 即可，以上步骤在树莓派 3B + `Linux version 4.9.41+` 系统版本上测试通过。

##### 2.部署 Dashboard

这里介绍两种方法将 Dashboard 部署在 Nginx 上。
**2.1. SFTP 上传**
在 GitHub 下载本项目源码。通过 FileZilla 等 FTP 软件将解压出来的目录上传到树莓派的 `/var/www/html`目录下。
那么可以通过 `http://树莓派IP/pi-dashboard` 访问部署好了的 Pi Dashboard。

如果页面无法显示，可以尝试在树莓派终端给源码添加运行权限，例如你上传之后的路径是 `/var/www/html/pi-dashboard`，则运行。

```
cd /var/www/html
sudo chown -R www-data dashboard
```

**2.2. GitHub 部署**
如果你了解过 GitHub 的基本操作，通过 GitHub 来下载本项目到 Pi 上会相当方便。

```
#如果已安装过 git 客户端可以跳过下一行
sudo apt-get install git
cd /var/www/html
sudo git clone https://github.com/Hasiy/dashboard.git
```

即可通过 `http://树莓派IP/dashboard` 访问部署好了的 Pi Dashboard。

同样如果页面无法显示，可以尝试在树莓派终端给源码添加运行权限，例如你上传之后的路径是 `/var/www/html/dashboard`，则运行。

```
cd /var/www/html
sudo chown -R www-data dashboard
```





Licensed under the GPL v3.0 license.
