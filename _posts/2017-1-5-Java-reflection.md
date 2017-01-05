---
layout: blog_detail
title: Java reflection
excerpt_separator: <!--more-->
---
{% highlight ruby %} 
Class someClass = XXX.class;
Class ___ = Class.forName(someClass.getName());
XXX xxx = (XXX)___.newInstance();
XXX xxx = (XXX)___.newInstance(new Object[]{...});
{% endhighlight %} 


获取类信息：基本类型使用Integer.TYPE,其他使用XXX.class。





