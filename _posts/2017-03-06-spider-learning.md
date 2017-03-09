---
layout: blog_detail
title: spider learning
excerpt_separator: <!--more-->
---

![](addr_space.png)
## TASK ##
	ACE_Task是ACE中的任务或主动对象“处理结构”的基类。ACE使用此类来实现主动对象模式。所有希望成为“主动对象”的对象都必须由此类派生。同时可将它看作是更高级的、更为面向对象的线程。
	ACE_Task处理的是对象，因此更有利于构造OO程序，产生更好的OO软件，而且，它还包括了一种用于
	与其他任务通信的易于使用的机制。
	ACE_Task可用作：
	<1>更高级的线程(常称其为任务)
	<2>主动对象模式中的主动对象
	PS.ACE任务：
	每个任务都含有一或多个线程，以及一个底层消息队列。各个任务通过消息队列进行通信。至于消息队列实现的内在细节程序员不必关注。发送任务用putq() 将消息插入到另一任务的消息队列中，接收任务通过使用getq()将消息提取出来。这样的体系结构大大简化了多线程程序的编程模型。


## message block ##
	ACE_Message_Block实现浅析
	1. 概述
	ACE_Message_Block是ACE中很重要的一个类,和ACE框架中的重要模式的实现 如ACE_Reactor, ACE_Proactor, ACE_Stream, ACE_Task都有紧密的联系.
	
	换个角度看,ACE_Message_Block实际上已经是这些实现中的重要组成部分.抛开和框架的配合不谈, ACE_Message_Block本身也相当有用,功能强大,用途广泛.ACE_Message_Block的实现中使用了很多技巧和模式,代表性的有GOF的composite模式.这让它在处理数据特别是网络数据时会很方便.而且, 在多线程开发中,它也可以充当线程之间传递的消息.
	
	2. ACE_Message_Block的特点
	ACE_Message_Block有几个重要特性:
	
	1. ACE_Message_Block内部采用ACE_Data_Block来间接管理实际数据, 减轻了其它功能与实际内存管理之间的耦合.
	
	2. ACE_Message_Block采用了引用计数, 可以灵活高效的共享数据, 并降低了内存拷贝带来的额外开销.
	
	实际上, ACE_Message_Block本身并没有reference count, 而是间接的由ACE_Data_Block来提供.
	
	3. 允许多条消息连接起来,形成一个单向链表, 从而支持复合消息Composite模式).
	
	由此,ACE_Message_Block提供了cont()方法.
	
	4. 允许将多条消息连接起来,形成一个双链表. 为ACE_Message_Queue的实现提供了支持.
	
	由此,ACE_Message_Block提供next()和prev()方法.
	
	5. 集成将同步策略和内存管理策略, 使得无需修改底层代码就能改变ACE_Message_Block的运行特征.
	
	
	下面是自己总结的, 一开始总是混淆和迷惑的地方, 需要注意:
	
	6. 3)4)特性实际上是正交的, 不存在交叉和冲突. 单链表实现复合消息, 双链表实现消息队列; 前者重内部, 后者重外部. 换个角度来说, 就是消息队列中的消息可以是复合消息.
	
	7. ACE_Message_Block对内存空间的管理采用“谁申请谁释放”的策略.
	
	在控制权转移时, 需要特别注意这一点.(空间的所有权可能会随size()方法的调用而转移)在使用外部的缓冲区构造ACE_Message_Block或者初始化时,需要特别注意.

# spider定时器 #
设置mmap threadhold,256K
设置SIGPIPE忽略
设置定时器处理
设置终端处理INT和TERM

默认配置文件为exvr_fetcher.cfg文件
LOG配置

读取配置文件:
	DebugLog配置影响LOG输出的配置LM_DEBUG

初始化curl对象

创建10个信号量mutex

解析SpiderType\CheckInterval\ScanInterval

判断Scan和Check参数是否为空切是否个数相同

创建0-6类爬虫Scan任务:init

启动0-6类爬虫Scan任务线程:open

使用Poll Reactor模式启动ACE框架
	首先创建一个线程池，这个线程池中包括n个线程，每个线程都试图成为领导者，但领导者只能有一个，因此一旦某个线程竞争成为领导者，
	其他线程只能把自己定位为跟随者，并把与之相应的跟随者对象放在一个跟随者队列中，然后等待机会成为领导者，等待时跟随者线程处于挂起状态。
	那个竞争中成为领导者的线程，试图从消息队列中抓起消息，如果消息队列中没有消息，该线程也会处于挂起状态。
	一旦客户把一个消息放入队列（相当于添加了一个任务），领导者线程会被激活，并从消息队列中获取一条消息，然后它做的第一件事情是找一个新领导者，寻找算法就是简单的从跟随者队列的头部取出跟随者，指定它为新领导者，并激活该跟随者线程，当完成这些事情后，再去处理从队列中获取的消息，去执行相应的任务。
	等它完成任务处理后，它再去努力成为领导者，如果发现目前已经有领导者，只好把自己定位为跟随者，并把与之相对应的跟随者对象放入跟随者队列，等待机会成为领导者。

设置线程领导者为当前main所在线程，

开启循环模式（通过SIGINT、SIGTERM可以终止循环），

停止0-6号任务：stoptask，

释放10个信号量，

释放curl对象资源。

# scan任务 #
## init ##

检查ExVrFetcher字段，

获取vr、cr、redis、check_interval，

准备sql,manual_sql,auto_sql，

获取scan_interval，

创建Scan对象，放入scans vector容器中。

## open ##
调用activate指定1线程。

## svc ##
创建redis对象，

创建mysql vr(设置编码utf8)、cr(gbk编码)对象，

连接redis，重试5次失败退出，

	连接mysql，
	判断关闭-报错，
	连不上-报错，
	打不开-报错，
	创建执行对象，执行设置编码utf8，成功退出，
	关闭，
	初始化。

重连超过5次，失败退出，

	连接cr_mysql，
	判断关闭-报错，
	连不上-报错，
	打不开-报错，
	创建执行对象，执行设置编码gbk，成功退出，
	关闭，
	初始化。

重连超过5次，失败退出，

打印手动sql、自动sql、删除sql，

获取线程号，打印线程号，

创建timer指针，

开启循环
	更新timer
	获取时间差-rest
	打印还剩多少秒
	让出线程资源sleep
	再检查一下退出条件（是否收到SIGINT、SIGKILL）
	更新timer，更新m_Mask和上次刷新时间

	输出日志：扫描资源
	爬虫类型=0获取客户资源，删除客户数据
	爬虫类型!=0获取其他资源。
		定义tm、query、cquery、formatquery、datasourcequery、kquery
		设置定时器30秒
		执行sql
		取消定时器
		如果报错，并且如果sql提示CR server gone error,打印日志，返回错误
		其他错，重新执行设置定时器、执行sql、取消定时器
		打印query记录数
		定义doc num
		循环记录
			获取当前时间time str
			取一行,如果记录是为空，打印日志退出循环
			定义field vector容器，放入vr_type...data_from
			遍历字段，如果字段为空或者长度为0，打印critical错误，并且退出循环继续，继续下一行处理
			获取id、频率、数组group、获取时间、数据源、vrid、group字符串
			item str定义为resid#vrid
			如果是手动拼#1#group字符串
			否则#0#group字符串
			如果是删除、则加入del队列，否则加入add队列
			如果失败，打印日志，关闭redis连接
			成功，则打印成功放入redis
			如果2，则打印redis已有key
			2以上，打印不成功。
	
	checkspider：
		开启循环：****死循环****
			如果redis未连接，则连接，
			获取所有HashMembers--spider_member，改变循环状态，
			输出redis error日志，
			设置关闭redis状态，
			关闭redis，
		循环HashMembers，将value按照#拆成timevalue
		如果time vector容器大小为0，继续循环
		获取上次set时间，当前时间
		如果当前时间与上次时间相差超过check_interval
		1获取集合，如果集合个数为正
			开启循环：****死循环****		
				将set name对应的vector 容器，加载到redis tool对象list中
			开启循环：****死循环****
				删除set name集合元素
			加载完毕后删除set name哈希
			删除set name键
		2如果集合个数为0，则删除哈希

释放timer、redis对象
记录exit日志

## stopTask ##
锁定信号量，
alive赋值0，
pthread_cond_broadcast：pthread_cond_t，
释放信号量，
thr mgr终端grp线程，
等待子线程退出。


# fetcher #
初始化信号量fetch_map_mutex
设置mmap threadhold,256K
设置SIGPIPE忽略
设置定时器处理
设置终端处理INT和TERM

默认配置文件为exvr_fetcher.cfg文件
LOG配置

读取配置文件:
	DebugLog配置影响LOG输出的配置LM_DEBUG

初始化长度数组g_subLength,内容和长度二维数组g_subList(个数、16双字符)


初始化curl对象

创建10个信号量mutex

启动Write\UrlUpdate\Fetch\Scan\Delete\Online任务线程:open

使用Poll Reactor模式启动ACE框架
	首先创建一个线程池，这个线程池中包括n个线程，每个线程都试图成为领导者，但领导者只能有一个，因此一旦某个线程竞争成为领导者，
	其他线程只能把自己定位为跟随者，并把与之相应的跟随者对象放在一个跟随者队列中，然后等待机会成为领导者，等待时跟随者线程处于挂起状态。
	那个竞争中成为领导者的线程，试图从消息队列中抓起消息，如果消息队列中没有消息，该线程也会处于挂起状态。
	一旦客户把一个消息放入队列（相当于添加了一个任务），领导者线程会被激活，并从消息队列中获取一条消息，然后它做的第一件事情是找一个新领导者，寻找算法就是简单的从跟随者队列的头部取出跟随者，指定它为新领导者，并激活该跟随者线程，当完成这些事情后，再去处理从队列中获取的消息，去执行相应的任务。
	等它完成任务处理后，它再去努力成为领导者，如果发现目前已经有领导者，只好把自己定位为跟随者，并把与之相对应的跟随者对象放入跟随者队列，等待机会成为领导者。

设置线程领导者为当前main所在线程，

开启循环模式（通过SIGINT、SIGTERM可以终止循环），

启动Write\UrlUpdate\Fetch\Scan\Delete\Online任务线程:stopTask

释放信号量fetch_map_mutex
释放10个信号量，
删除长度数组、内容二维数组
释放curl对象资源。

## ScanTask ##
### init ###
读取Vr、Cr、redis，创建redis对象，
连接redis，如果重连次数超过5次，打印日志，退出，
获取unique_set_name，内部通过将redis事务incr,get唯一unique set name,打印获取唯一set名称，

### open ###
创建唯一线程

### svc ###
创建mysql、crsql,
赋值thr_id_scan,打印日志，
创建随机数时间#随机数，保存到Hash表中，
循环开始：
	获取write、fetch、updatedelete任务数，打印write fetch online delete消息队列消息数，
	连接redis，从delete队列获取value，
	delete流程：拆分记录，从vr_data选择该vrid，打印日志，
	创建delete对象、获取当前时间，
	循环：
		获取记录行，得到docid，放入deletedata对象的docid容器中，
	获取vr_id,res_id,data_group,状态，时间戳id，
	创建消息块，传给delete task。
	休息1秒
清空Del队列后，如果write、fetch队列中的消息数量小于预定值，
连接redis，获取list值，如果失败则关闭redis，成功则拆分值，
检查新增值：
	获取上次访问时间，访问失败关闭，获取时间和随机数，如果key缺失，重新生成unique set name，将值添加到集合中，清空前值，将值放到集合中，返回前值。
如果分拆个数大于3，拼接sql获取资源，
获取资源：（500行源代码，准备好饼干）
	执行查找vr resource表的动作，获取记录行数，对于每个记录查询字段，获取内容，产生调度单元，如果是人工更新，直接设置更新时间，更新，
	自动生成，则生成调度单元，
	创建请求，拼接vr open datasource请求，查询vr_id,循环获取后，解析每一行，获取ds_id,priority,data_source存入ds info map，如果sitemap有值，创建sitemap info对象，保存id，优先级，数据源，sitemap url，sitemap md5，
	查询resource status中res id对应的id，url，datasource id，要求res status>1
	创建vrcounter对象，保存vr data里有多少条记录，
	getLastItemCount：
		从vrdata查询res id对应的md5，docid，data resource id，status id，data status
	
	
	
	


## WriteTask ##
创建信号量unique_set_name_mutex

### init ###
	读取VrResource、VrInfo、CrResource、Schema Prefix、Suffix、Length Prefix、Suffix
	当SpiderType为2时，优先级为1，否则为0
	打印spidertype、和priority
	打印shema suffix prefix length suffix prefix
	创建rwlock、信号量
	读取locationlist，m_loc_map（string->int)
	读取redis参数，type，创建redis对象
	连接redis，重试5次则退出
	进入open流程

### open ###
	创建n个线程

### svc ###
	创建vrmysql对象，设置编码utf8，
	重试5次，退出进程主循环，
	创建vi对象，设置编码gbk，
	重试5次，退出进程主循环，
	创建cr象，设置编码gbk，
	重试5次，退出进程主循环，
	创建mysqlHandle对象，读取配置文件，
	创建CurlHttp对象，设置下载超时200，连接超时10，重试1，初始化curl对象，创建curl slist，
	设置curl回调函数htmlWriteCallback、允许跳转、跳转层次、不发SIG、读响应超时、连接超时、刷新连接、http头用Expect，
	htmlWriteCallback，将ptr里的数据复制到stream指针中，
	循环getq获取msg block：
		
		