---
layout: blog_detail
title: linux stuff
excerpt_separator: <!--more-->
---

LANG: 默认的 Locale
这个变量的值会覆盖掉所有未设置的 LC_* 变量的值.

LANGUAGE: 后备 Locale
使用 gettext 翻译的软件会按照 LANGUAGE 选择使用的语言。用户通过这个变量指定一个locale 列表，如果前面的 locale 缺少翻译，会自动使用后面的 locale 显示界面。 例如下面的例子使用简体中文,没有翻译时使用英文：

LC_ALL: 这个变量的值会覆盖掉 LANG 和所有 LC\_* 变量的值,无论它们是否设置.
只有 LC\_ALL 不能在 locale.conf 文件中,这意味着它只是为了测试和排除问题而设置,例如在 /etc/profile 中.
<!--more-->