---
layout: blog_detail
title: stock data visualization
excerpt_separator: <!--more-->
---
# 5W1H #
http://114.215.101.25/index.html
## What ##
通过股票让钱增值
## When ##
2 weeks: 2.25-2.26, 3.4-3.5
## Where ##
清华FIT楼3-102
## Who ##
前端d3：青青

后端服务器：申德周
## Why ##
优化雪球数据搜索及可视化
## How ##
初稿提交：2.27
修改提交：3.6

# 前后端接口 #
前提：index.html不能为0长度文件，xueqiu.like文件需要事前创建
GET http://114.215.101.25/index.html 对应/search/money/web/index.html

GET http://114.215.101.25/append?file=xueqiu.like&key=abcd&key=cdef&key=fghi 对应/search/money/web/xueqiu.like文件增加一行abcd	cdef	fghi

GET http://114.215.101.25/xueqiu.like 获取点赞文件内容

# CSV转JSON #
	function csvJSON(csv){
	
	  var lines=csv.split("\n");
	
	  var result = [];

	  // xueqiu.url.types
	  var headers= ["url","城市","city","行业","industry"];
	  // xueqiu.crumb
	  //var headers= ["url","名称","简介","time"];

	  for(var i=0;i<lines.length;i++){
	
		  var obj = {};
		  var currentline=lines[i].split("\t");
	
		  for(var j=0;j<headers.length;j++){
			  obj[headers[j]] = currentline[j];
		  }
	
		  result.push(obj);
	
	  }
	  
	  return JSON.stringify(result); //JSON
	}

# GBK转UTF-8 #
	function gbk_utf8(gbkdata){

		var x = new Uint8Array(gbkdata);

		var result = new TextDecoder('gbk').decode(x);
		// utf8 string
		return result;
	}

# URI编码 #
## Javascript函数：escape() ##
Javascript语言用于编码的函数，一共有三个，最古老的一个就是escape()。虽然这个函数现在已经不提倡使用了，但是由于历史原因，很多地方还在使用它，所以有必要先从它讲起。
实际上，escape()不能直接用于URL编码，它的真正作用是返回一个字符的Unicode编码值。比如"春节"的返回结果是%u6625%u8282，也就是说在Unicode字符集中，"春"是第6625个（十六进制）字符，"节"是第8282个（十六进制）字符。

它的具体规则是，除了ASCII字母、数字、标点符号"@ * _ + - . /"以外，对其他所有字符进行编码。在\u0000到\u00ff之间的符号被转成%xx的形式，其余符号被转成%uxxxx的形式。对应的解码函数是unescape()。
所以，"Hello World"的escape()编码就是"Hello%20World"。因为空格的Unicode值是20（十六进制）。

还有两个地方需要注意。
首先，无论网页的原始编码是什么，一旦被Javascript编码，就都变为unicode字符。也就是说，Javascipt函数的输入和输出，默认都是Unicode字符。这一点对下面两个函数也适用。
其次，escape()不对"+"编码。但是我们知道，网页在提交表单的时候，如果有空格，则会被转化为+字符。服务器处理数据的时候，会把+号处理成空格。所以，使用的时候要小心。
## 七、Javascript函数：encodeURI() ##
encodeURI()是Javascript中真正用来对URL编码的函数。
它着眼于对整个URL进行编码，因此除了常见的符号以外，对其他一些在网址中有特殊含义的符号"; / ? : @ & = + $ , #"，也不进行编码。编码后，它输出符号的utf-8形式，并且在每个字节前加上%。

它对应的解码函数是decodeURI()。
需要注意的是，它不对单引号'编码。
## 八、Javascript函数：encodeURIComponent() ##
最后一个Javascript编码函数是encodeURIComponent()。与encodeURI()的区别是，它用于对URL的组成部分进行个别编码，而不用于对整个URL进行编码。
因此，"; / ? : @ & = + $ , #"，这些在encodeURI()中不被编码的符号，在encodeURIComponent()中统统会被编码。至于具体的编码方法，两者是一样。
它对应的解码函数是decodeURIComponent()。
=======

1.显示xueqiu.user的词云，点击任何用户均可登陆
2.或者在输入框创建新用户、校验手机号位数
3.登陆保存时间和手机号：GET append?file=xueqiu.user&key=time&key=cell
4.显示选股界面。

******
喜欢这只股票的用户还喜欢某某某股票是这样的。对于某股票，有一个用户集，对于用户集，有一个股票集。	
比如AAAAAA   对应了   UUUUU    VVVVV  WWWW 三个用户
UUUUU     喜欢   AAAAA  BBBBB   CCCCC
VVVVV     喜欢   AAAAA  BBBBB   CCCCC
WWWW     喜欢   EEEEE  FFFFF   GGGGG

那么结果就是把AAAAA   BBBBB   CCCCC   EEEEE   FFFFF  GGGGG 输出就好了。
*******

周末愉快。
