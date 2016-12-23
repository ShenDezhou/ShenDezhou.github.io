---
layout: blog_detail
title: asdf asdf asdf
excerpt_separator: <!--more-->
---
项目的站点

不同于用户和组织的站点，项目的站点文件存放在项目本身仓库的 gh-pages 分支中。 <!--more-->该分支下的文件将会被 Jekyll 处理，生成的站点会被 部署到你的用户站点的子目录上，例如 username.github.io/project （除 非指定了一个自定义的域名）。
Jekyll 项目本身就是一个很好的例子，Jekyll 项目的代码存放在 master 分支 ， 而 Jekyll 的项目站点（就是你现在看见的网页）包含在同一仓库的 gh-pages 分支 中。

项目站点的网址结构

你最好在将 Jekyll 站点提交到 gh-pages 之前先预览一下。因为 Github 上项目站点的子目录结构会使站点的网址结构变得复杂。这里有一些处 理 Github Pages 子目录结构（username.github.io/project-name/）的方法 使你本地浏览的站点和部署在 Github Pages 上的站点一致，方便你的维 护。