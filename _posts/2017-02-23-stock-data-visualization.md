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

1.index.html显示二维码，二维码内容为http://114.215.101.25/login,通过get请求append?file=xueqiu.user&time=abcd写到文件xueqiu.user中
2.微信扫一扫，扫描二维码，手机点击打开原网页，触发get请求。
3.webserver收到get请求GET http://114.215.101.25/login?nsukey=eA04u7Jmet6VkBxjWm6YSazfdSg9DEFocoKicTns6iuZrtxy9ujylnpbMx%2BdGrJAbNbbZtcl4nMbZVDm4O3CWg%3D%3D
4.webserver如xueqiu.user文件有时间记录，则把nsukey保存到xueqiu.user中，否则丢弃。
5.这样xueqiu.user中有两行记录一行时间、一行nsukey。
6.index.html读取xueqiu.user文件，如果有时间、nsukey记录，并且时间是当时保存的时间则nsukey作为用户id登录成功。
	
