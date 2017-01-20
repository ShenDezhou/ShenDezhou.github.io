---
layout: blog_detail
title: Tips-To-Remember
excerpt_separator: <!--more-->
---
Tools:
Mail_Outlook_2013
Office_2013

C_IDE:
Sublime Text 3:SFTP,SidebarEnhancement

Browser:
QQBrowser

IM:
QQ

SSH:
MobaXterm

Git:
SourceTree

Input:
Sougou

<!--more-->
VH:exvr_fetcher
VH/exvr_fetcher/trunk/


VH:xmlPageReader
VH/xmlPageReader/trunk/

VM:
http://roc.sogou/?cluster.11408.machine#!10.134.100.140

DailyBuild:
http://rhel6.dailybuild.sogou-inc.com/sgbuild/h-report-last.html

WeekReport:(周四)
https://oa.sogou-inc.com/wmr

Google C++ Style Guide

1.Goals of the Sytle Guide

Sytle rules should pull their weight

Optimize for the reader, not the writer

Be consistent with existing code
Be consistent with the broader C++ community when appropriate

Avoid surprising or dangerous constructs
Avoid constructs that our average C++ programmer would find tricky or hard to maintain

Be mindful of our scale

Concede to optimization when necessary

*****************************************
X11Forwarding problem on RedHat

because RedHat/CentOS require the xorg-x11-xauth package
*****************************************

#将文件打开限制改为1048768
ulimit -n 0x100000
#重新登录
exec su $LOGNAME