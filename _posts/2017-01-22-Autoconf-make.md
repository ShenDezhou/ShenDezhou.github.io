---
layout: blog_detail
title: Autoconf-make
excerpt_separator: <!--more-->
---
autoreconf -isv
./configure
make
make install
<!--more-->
1.运行时初始化和关闭

ACE_Object_Manager:登记、销毁

ACE_Cleanup:登记的对象派生自此

ACE_Singleton: 双重检查加锁，

typedef ACE_Singleton<SystemController, ACE_Recursive_Thread_Mutex> TheSystemController;

