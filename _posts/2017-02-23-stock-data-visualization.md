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
 