---
layout: blog_detail
title: Visualize cascading data
excerpt_separator: <!--more-->
---
![My helpful screenshot](/img/blog/f.png)
![My helpful screenshot](/img/blog/g.png)
根据课堂第四讲《层次数据可视化》中所述的相关内容，完成以下问题：

树图是一种使用空间包含关系表示层次结构的一种可视化设计，请根据课堂知识与你的理解，完成以下小问：
⦁	（简答）与直接使用节点-链接式的布局（如下图）两相对比，你认为使用树图进行层次数据可视化有什么优缺点？

⦁	（编码实现）工程分析是现代软件工程的一项常见任务，请你从github.com任意采集一个你感兴趣的开源项目的源代码，并完成以下任务：
⦁	一个项目各层级的模块（或子文件夹）构成一个天然的层次结构。请你统计项目中各级文件夹中所有源代码文件所包含的代码行数，并建立一个树结构。
⦁	使用任意两种你感兴趣的树图布局展示整个工程各个文件夹中代码行数的分布。
<!--more-->
答：树图与节点-链接式的布局相比较其
优点：
	•节点数随着深度增加不会呈几何级数增长
缺点：
	• 逐级纵横切割细分会产生狭长的四边形
• 难以与非叶节点交互。
• 类别数据本身没有层次关系
• 类别的层次安排对结果影响很大
	• 把类别对数据的影响程度作为层次

编码实现：
github项目中各级文件夹组成了一个树结构，我选择了treemap和partition两种树图的布局展示。

    在对项目结构进行递归分析的过程中，递归函数没有顺利写完，于是参考了网上递归函数的写法，得知要考虑清楚退出条件以及每一步的执行。
于是将原有错误代码全部删除后，重新考虑了递归的退出条件，即是当一个路径表示一个文件时，返回{"name":"code.py","size": 100}这样的文件信息，而递归的每一步则是考虑文件夹下面对每一个子文件夹都分别调用递归函数。
os.walk返回了根，文件夹，文件三个可迭代元素，继续便利输出第二层级下的根，文件夹，文件。对于本任务，只需要遍历一次即可，不需要后续的遍历，因此需要增加break停止遍历。
    第二个遇到的问题是，输出的json文件报UnicodeDecodeError，排查问题由输入文件的格式，经检查输入模板可能是中文保存为ASCII格式的原因，但后来发现并不是，最后发现输出文件应指定UTF8编码，因为输出的JSON格式中包含中文。最后将os.walk的入参指定为unicode，这样函数返回的数据结构里的串均为unicode，在保存文件时，在代码文件中预置了默认系统编码为UTF-8，于是在首次创建输出文件，文件会以UTF8格式保存输出流。
    在可视化过程中，参照了d3源码中的对应treemap和partition的代码。



{% highlight ruby %}
# encoding: utf-8
import json
import os
import sys
reload(sys)
sys.setdefaultencoding("utf-8")

print '---'
def parse(in_folder):
    print in_folder
    _ = dict()
    for root,dir,files in os.walk(in_folder):
        if not _.get("children"):
            _["children"] = list()
            _["name"]= os.path.split(in_folder)[-1]
        for subdir in dir:
            if subdir.startswith("."):
                continue
            sub_path = os.path.join(root,subdir)
            dd = parse(sub_path)
            if dd:
                _["children"].append(dd)
        for subfile in files:
            if os.path.splitext(subfile)[1] in [".js", ".html", ".css",".scss",".md",".yml"]:
                subf_path = os.path.join(root, subfile)

                ff = dict()
                ff["name"] = subfile
                with open(subf_path, "r") as handle:
                    ff["size"] = sum(1 for line in handle)
                if ff:
                    _["children"].append(ff)
        if len(_.get("children"))==0:
            _.pop("children")
        break
    return _

print 30 * '*'
input_folder = u'E:\ShenDezhou.github.io'
out_folder = u'E:\ShenDezhou.github.io1'
ddd = parse(input_folder)
ddd["name"] = os.path.split(input_folder)[-1]
print ddd
file_output = os.path.join(out_folder, "github.json")
with open(file_output, 'w') as f:
    f.write(json.dumps(ddd).decode("unicode-escape"))
print 'job done'
{% endhighlight %}
