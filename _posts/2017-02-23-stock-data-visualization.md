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
