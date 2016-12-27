---
layout: blog_detail
title: build c++ using scons
excerpt_separator: <!--more-->
---

Install:

wget http://prdownloads.sourceforge.net/scons/scons-2.5.1.tar.gz

python setup.py install

Usage:

touch SConstruct

#use emacs SConstruct to edit content, ... need to be replaced by meaningful content.

{% highlight ruby %} 
Program('xxx.out',['source.cpp',...],LIBS=['staticlib',...],LIBPATH=['/usr/lib',...],CCFlags=['-g','-Wall','-O3'],CPPPATH=['/usr/include',...])
{% endhighlight %} 

<!--more-->
#Glob('*.cpp') is a shotcut for the cpp-file list ,as ['a.cpp','b.cpp',...].

StaticLibrary(...)

Library(...)

SharedLibrary(...)

