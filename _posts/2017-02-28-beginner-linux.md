---
layout: blog_detail
title: beginner linux
excerpt_separator: <!--more-->
---
# socat #

概述

socat，是linux下的一个工具，其功能与有“瑞士军刀”之称的netcat类似，不过据说可以看做netcat的加强版。的确如此，它有一些netcat所不具备却又很有需求的功能，例如ssl连接这种。nc可能是因为比较久没有维护，确实显得有些陈旧了。

安装

Ubuntu上可以直接sudo apt-get install socat，其他发行版没试过。

也可以去官网下载源码包socat

基本语法

socat [options] <address> <address>
其中这2个address就是关键了，如果要解释的话，address就类似于一个文件描述符，socat所做的工作就是在2个address指定的描述符间建立一个pipe用于发送和接收数据。

那么address的描述就是socat的精髓所在了，几个常用的描述方式如下：

-,STDIN,STDOUT ：表示标准输入输出，可以就用一个横杠代替，这个就不用多说了吧….
/var/log/syslog : 也可以是任意路径，如果是相对路径要使用./，打开一个文件作为数据流。
TCP:: : 建立一个TCP连接作为数据流，TCP也可以替换为UDP
TCP-LISTEN: : 建立TCP监听端口，TCP也可以替换为UDP
EXEC: : 执行一个程序作为数据流。
以上规则中前面的TCP等都可以小写。

在这些描述后可以附加一些选项，用逗号隔开，如fork，reuseaddr，stdin，stdout，ctty等。

socat当cat

直接回显

socat - -
cat文件

socat - /home/user/chuck
写文件

echo "hello" | socat - /home/user/chuck
socat当netcat

连接远程端口

nc localhost 80
socat - TCP:localhost:80
监听端口

nc -lp localhost 700
socat TCP-LISTEN:700 -
正向shell

nc -lp localhost 700 -e /bin/bash
socat TCP-LISTEN:700 EXEC:/bin/bash
反弹shell

nc localhost 700 -e /bin/bash
socat tcp-connect:localhost:700 exec:'bash -li',pty,stderr,setsid,sigint,sane
代理与转发

将本地80端口转发到远程的80端口

socat TCP-LISTEN:80,fork TCP:www.domain.org:80
其他

其实从这里才是重点

SSL连接

SSL服务器

socat OPENSSL-LISTEN:443,cert=/cert.pem -
需要首先生成证书文件

SSL客户端

socat - OPENSSL:localhost:443
fork服务器

接下来这个例子，就是我认识socat的原因，可以将一个使用标准输入输出的单进程程序变为一个使用fork方法的多进程服务，非常方便。

socat TCP-LISTEN:1234,reuseaddr,fork EXEC:./helloworld
不同设备的通信

将U盘进行网络共享

socat -d -d /dev/ttyUSB1,raw,nonblock,ignoreeof,cr,echo=0 TCP4-LISTEN:5555,reuseaddr
-d -d 指的是调试信息的级别

将终端转发到COM
socat READLINE,history=$HOME/.cmd_history /dev/ttyS0,raw,echo=0,crnl
socat还有个readbyte的option，这样就可以当dd用了。

小结

因为在Linux/UNIX中，一切都是文件，无论是socket还是其他设备。所以从理论上来说，一切能够在文件层级访问的内容都可以成为socat的数据流的来源，2个address可以任意发挥，能够做到的事情还有很多。特别是其fork的功能，确实是netcat所不能比的。