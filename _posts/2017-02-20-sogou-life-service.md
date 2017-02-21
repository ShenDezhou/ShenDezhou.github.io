---
layout: blog_detail
title: sogou life service
excerpt_separator: <!--more-->
---
# 生活服务项目 #

----------

> 生活服务项目是 搜狗App下面的本地生活标签，下面包含了电影，美食，KTV，足疗等。
> 这里主要是 美食 + 电影 + KTV + 足疗部分的数据整合工作，其他几项主要是VR的接入方式完成的。 

![](/img/spider_system.png)

涉及到的机器：

    （1）  10.134.106.123  （）  扫URL库，获取点评店铺的url列表

	（2）  10.134.96.110   （）  用于分发到各个机器上去抓取页面，解析页面（使用dbnetget的方式）
        10.142.105.210
        10.142.104.204
        10.142.47.173
        10.143.9.182
        10.143.21.160
        10.143.22.226
        10.134.79.188
        10.139.26.144
        10.139.30.197
        10.139.27.217
        10.134.79.154
        10.134.96.152

	（3）  10.134.96.110   （）  用于分发到各个机器上去抓取无线点评团购页面，解析页面
       	10.142.105.210
        10.143.9.182
        10.143.21.160
        10.143.22.226
        10.134.79.188
        10.134.79.154
        10.134.96.152
        10.142.104.204
        10.142.47.173

	（4）  10.134.14.117   （）   点评的数据制作，电影的数据抓取（除了chrome spider抓取之外的）制作

	（5）  10.134.34.33     （） chrome spider抓取  
        10.134.79.154:1
        10.139.27.217:1
        10.142.104.204:1
        10.142.105.210:1	()

----------

# 1.电影的数据更新流程 #
> 10.134.14.117:/fuwu/Manage/Schedule; sh schedule\_get\_movie\_threepart\_info.sh

	编译输出目录：
	10.134.14.117:/fuwu/Merger/Output/movie/ 
	output:
	cinema_detail.table                             movie_detail.table
	cinema_movie_rel.table  movie_actors.table      movie_detail.table.allbox
	cinema_tuan.table       movie_cinema_rel.table  movie_presale.table
	city_movie_list.table   movie_comments.table    movie_videos.table

时光网Mtime的电影的各种详情信息的抓取，第三方合作方的排片信息的抓取，chrome spider抓取的评论信息，以及票房，排名等信息的抓取           数据清洗合并（包括不同来源的电影的合并，不同源的电影院的合并，最后生成电影的，影院的，电影--影院，影院--电影等各种关系表格）          做索引，上线更新数据

## 1.1猫眼电影长短评 接入猫眼，大众点评，抠电影，微票等几家的排座信息 build\_download\_cooperation_data.sh ##
接入猫眼，大众点评，抠电影，微票等几家的排座信息

抠电影（目前没数据）、糯米（接口已屏蔽）



## 1.2时光网电影详情 时光网的其他信息抓取（剧照，片花等）  getMtimeMovie.py ##
获取时光网的电影信息

10.134.14.117：/task/result/system/task-121/		演员表

10.134.14.117：/task/result/system/task-122/		片花

10.134.14.117：/task/result/system/task-123/		短片

10.134.14.117：/task/result/system/task-144/		电影描述

## 1.3票房数据 schedule\_get\_movie\_allbox.sh ##
/fuwu/Manage/Schedule; sh schedule_get_movie_allbox.sh

票房数据:/search/zhangk/Fuwu/Spider/Cbooo/data/cbo_allbox

## 1.4wap页面抓取 ##

每个模块的大致解释以及系统的工作流程：
因为涉及到时光网，猫眼等几个网站的wap页面的抓取，这块是用的坤哥开发的浏览器插件的方法抓取的，数据无法通过扫库来完成。

7200秒抓取一次：
	 task_id="118" seed="http://10.134.14.117/seed/root/task-118/mtime_movie_detail_seed" regex="^http://movie.mtime.com/[0-9]+/$"  listregex="" depth="1" description="mtime movie detail" mark="mtime movie detail" listcycle="7200" cycle="7000" spider_freq="2" page_load_max_wait="200" creator="zhangkun" load_img="true" lastupdate="2014-12-31 17:42:43.0" task_locked="false"  buffer_count="1" 

上述这种抓取方式主要抓取的是：

10.134.14.117：/task/result/system/task-118/     时光网的电影详情页

10.134.14.117：/task/result/system/task-119/     猫眼电影短评 

10.134.14.117：/task/result/system/task-120/     猫眼电影长评

Spider Task Manager：抓取任务管理Server，包括加载抓取任务，为spider client分发抓取url，将已经抓取的url写入到已经抓取的url列表中，控制抓取深度等，以及在程序退出时，将抓取任务写入Spider Task running detail DB中，用于下次可以从当前状态继续抓取
Spider Task Manager： 

部署在 10.134.34.33  (root   )   /search/odin/apache-tomcat-7.0.67/webapps/taskservice  
SVN：http:10.134.14.117/svn/repository/taskservice

Spider Task meta DB：抓取任务的原始信息，包括每个抓取任务的taskid，feed，抓取间隔，抓取深度，解析脚本等

Spider task result DB：记录每个抓取任务的抓取解析结果，以taskid为文件夹，时间戳为文件名分别存放
Spider task result DB： 这个现在是存储在117机器上的，这块现在是写死在抓取脚本的代码里的，如果需要改变，则需要修改如下脚本    10.134.14.117：/search/odin/chrome/chrome.spider.sogou/crawler/crawler.js        即修改spider client机器上的 中的receiveApi变量；重新拖到浏览器上，即重新安装此插件
     
	10.134.14.117：/task/multiReceiveResult.php （chrome spider的插件和server这块如果有问题，直接问坤哥）
	10.134.14.117：/task/multiReceiveResult.php 没有迁移，应该直接把10.134.14.117：/task 拷贝到10.134.106.123机器或者其他机器（记得要部署启动apache，参考117 ：/search/zhangk/knowledge_se/apache/  下的conf/httpd.conf  启动脚本应该是 bin/httpd -k start）

Spider Task running detail DB：在stop server时，将每个任务的当前抓取状态记录下来（即每个任务的已抓取列表，抓取队列等信息）


spider client： 浏览器的抓取插件，详情可见 10.134.79.154机器上的chrome浏览器插件 （vnc连接到10.134.79.154:1    密码：）
spider client：10.134.79.154:1        10.139.27.217:1        10.142.104.204:1        10.142.105.210:1

VNC连接到上面几台机器上（密码：）， 然后打开chrome浏览器，打开插件即可进行抓取

### 运营注意 ###
注意：spider client 是打开浏览器一直在运行的，运行时间长了浏览器会崩溃掉，这时候需要重启 Spider Task Manager  然后重启 spider client所在的机器，然后到spider client所在机器上打开chrome浏览器，点击插件的抓取即可；
那如何知道spider client挂掉了呢？参考 10.134.14.117:/fuwu/Manage/Monitor/bin/build_serviceapp_monitor.sh  这个脚本每天发送一个抓取任务对应结果文件夹下的文件的状态文件，如果发现电影相关的那几个任务出现红色，则说明挂了； 如果需要增加邮件的收件人列表，请修改 http://op.sogou-inc.com/mail/mds_modify.php  邮件文件名为“service_app_spider”的项目里的收件人列表

### 故障恢复 ###
查看log:  tail -f /search/odin/apache-tomcat-7.0.67/logs/catalina.out  能查看那些ip对应的spider还存活（如果没有存活的机器，重启机器，重启浏览器，重启插件）

## 1.3编译电影数据 ##
每天更新一遍电影的数据(chrome插件抓取的以及时光网的数据) /search/zhangk/Fuwu/Source/Crawler/beijing/movie/

检查电影原始数据是否为空

抓票房信息

影院/电影基本信息

合并影院的基本信息

更新票房数据

发邮件通知更新结果

检查一下文件行数

建索引

## 1.4电影优惠 ##
每天，查看是否生成了新的电影优惠文件，并且新文件与输出文件相差20%以内，否则发送报警邮件。

----------

# 2.大众点评的数据更新流程 #
## 2.1基础数据获取 ##
（1）10.134.106.123：  扫出大众点评的url  并根据url扫出来的crumb去除无效的url 扫库，获取大众点评的列表页列表   
		10.134.106.123:/search/odin/PageDB/Application/Dianping/bin/get_dianping_shop_urls.sh
	
（2）扫库获取crumb 用于过滤掉无用的URL（上一步的结果包含了大量的国外的，非需要类别的数据）将有效的url从 10.134.106.123 拷贝到 10.134.96.110机器上去做抓取解析
		10.134.106.123:/search/odin/PageDB/Application/Dianping/bin/get_dianping_shop_crumb.sh
		F:10.134.96.110:/search/fangzi/ServiceApp/Dianping/Scan/data/shop_urls.types

### 117定期推送到110上新的url ###
/fuwu/DataCenter/; sh bin/get_dianping_online_urls.sh

（3）10.134.96.110 分发url 到12台机器上  去分布的抓取解析得到解析的 key-value格式的结果文件  （大概一天的时间）
         cd /search/fangzi/ServiceApp/Dianping

        (1) 先抓取解析     （解析是用的基于nodejs 的 cheerio库）
        打开 bin/update_dianping_baseinfo.sh脚本中的full_update_from_scan_shopurls
　     
        执行sh bin/update_dianping_baseinfo.sh restaurant|play

        待抓取完毕后，（需要到各台分布式机器上去看一下是否抓取完成）；

        （2）将解析后的结果拷贝回来      （检查result文件的个数  与  url文件的个数一致才能说明全部抓取解析完毕）
        关闭bin/update_dianping_baseinfo.sh脚本中full_update_from_scan_shopurls，打开 scp_host_result_to_local      

        执行 sh bin/update_dianping_baseinfo.sh restaurant|play

        或者  直接执行 sh bin/scp_host_result_to_local.sh restaurant|play 

（4） 将12台机器上的result文件拷贝回到110机器上
		生成result文件。
		/search/fangzi/ServiceApp/Dianping/data/$type/result/ 下面是新生成的扫库文件

## 2.2优惠信息抓取 ##
大众点评团购数据的更新

        是调用了大众点评的开发者API接口   参考： http://developer.dianping.com/app/tech/api

                var appkey = "343629756";  
                var secret = "a54b3d169af14dd688b56fe9c4b9ebcc";  
        每日更新的crontab任务：见117机器上的   /fuwu/Manage/Schedule/schedule_get_dianping_all_tuan.sh

大众点评的优惠信息的抓取

           见10.134.96.110机器上的crontab

            00 02 */2 * * cd /search/kangq/dianping; sh -x batch.sh 1>tmp/std 2>tmp/err &

## 2.3编译数据 ##
（5） 在117（已过保）上执行 做数据的脚本（清洗，归一化，合并，最终的结果在DataCenter目录下）  （大概一两天）
		回到10.134.14.117(root   )机器上去做数据，/fuwu/build_restaurant.sh || /fuwu/build_play.sh        

（6）到110机器上建索引（建索引的脚本会从117机器的DataCenter下拷贝数据过去）
## 2.4说明 ##
 !!!!!!!!!!  美食这块已经基本处于维护状态，产品可能两周会让更新一次数据，如果产品没找你，就不用去更新 ！！！！！！！！！当前没有产品在跟进

## 2.5美食优惠 ##

每天，查看是否生成了新的美食（shop）优惠文件，并且新文件与输出文件相差20%以内，否则发送报警邮件。
！！！！！！！！！！！！！目前，！！！！！！！！！！！！！！！！

## 2.6合并团购信息 ##
抓取无线点评优惠团购信息

/fuwu/Source/Cooperation/Tuan/; sh bin/create_dianping_tuan_from_kq.sh

合并团购信息，放到线上

/fuwu/Manage/Schedule; sh schedule_merge_tuan.sh

----------

# 3.娱乐 #
## 足疗团购 ##
/fuwu/Manage/Schedule; sh schedule_get_foot_tuan.sh

# 4.数据监控 #

/fuwu/Manage/Monitor/; sh -x bin/build_serviceapp_monitor.sh

# 5.数据基础备份 #

/fuwu/Manage/Schedule/; sh schedule_backup_service_data.sh

# 6.数据基础清理 #

/fuwu/Manage/Schedule/; sh schedule_clean_movie_task.sh

