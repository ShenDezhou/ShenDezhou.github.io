---
layout: blog_detail
title: spider data flow
excerpt_separator: <!--more-->
---

# 代码风格 #
- 前言

这是一份很低强度要求的代码风格和review指南。我们不期望这份指南会让任意两个人写出的代码风格完全一致，但我们希望这份指南能使得大家写出的代码更容易被互相理解，更容易的避免一些常见错误。


- 编译器选项


Warnings

如果没有特殊原因，-Wall -Werror是必须的。
虽然这样做会使你的旧代码一下子变得千疮百孔，需要整改。但是可以避免大量的后期调试工作。



- 语言标准

如果没有特殊原因，C++代码需要使用-std=gnu++0x选项（或者-std=gnu++11，gcc-4.7以上支持），C代码需要-std=gnu99选项（（或者-std=gnu11，gcc-4.7以上支持））。
这会使得我们的代码能够利用新标准带来的一系列好处：更快的STL，内置的utf-16支持等语法糖。下文会有专门的一章描述被建议使用的新语法。


- 头文件



- 多重包含保护

所有头文件都应该防止头文件被多重包含。标准的方法是使用#define gurad机制来实现。
为保证唯一性, 头文件的命名应该依据所在项目源代码树的全路径. 例如, 项目 foo 中的头文件 foo/src/bar/baz.h 可按如下方式保护:

	#ifndef FOO_BAR_BAZ_H_
	#define FOO_BAR_BAZ_H_
	…
	#endif // FOO_BAR_BAZ_H_//
实际上，有一种更方便省心的方式，而且也被几乎所有的编译器支持：
	#pragma once

使用２种方式都是可行的，但使用第一种方式时务必要命名清晰，避免命名冲突。

	#if / #endif 配对

每个#endif的后面都应该用//标示出其对应的#if。#else 和 #elif 也应该如此。

例如：

	#ifndef FOO_BAR_BAZ_H_
	#define FOO_BAR_BAZ_H_
	…
	#endif // FOO_BAR_BAZ_H_


- 分割inline代码到.inl文件

除非得到特别允许，我们要求模块不对外提供内联函数
对外暴露的内联函数会造成上线的一系列麻烦。如果程序A依赖模块libB.so，libB.so的一个内联函数的修改，会需要重新编译A才能有所体现。上线时很容易忽略这一点，误认为库的abi没有变化，而只上线.so文件。
唯一的例外是特别简单的get/set函数，和=default的函数。



- 超过2行代码内联函数必须拆到单独的.inl文件
内联函数的定义必须放在头文件中, 编译器才能在调用点内联展开定义。然而, 实现代码理论上应该放在 .cpp文件中, 我们不希望 .h 文件中有太多实现代码, 除非在可读性和性能上有明显优势.
如果内联函数的定义比较短小, 逻辑比较简单, 实现代码放在 .h 文件里没有任何问题. 比如, 简单的get/set函数。
比较复杂的内联函数建议不要放到 .h 文件中，这样会使头文件显得笨重。把它萃取到单独的 .inl文件中，这样把实现和类定义分离开来, 降低阅读时的困难。
类似的，模版的实现代码也不要放到.h 文件中，而是放到.inl文件中。

这里我们对“比较复杂”的定义是超过2行代码。一般来讲超过2行代码的函数甚至都不应该内联，当然模板库除外。



- 头文件依赖关系和前向声明

能用前置声明的地方尽量不使用 #include.

当一个头文件被包含的同时也引入了新的依赖, 一旦该头文件被修改, 代码就会被重新编译. 如果这个头文件又包含了其他头文件, 这些头文件的任何改变都将导致所有包含了该头文件的代码被重新编译. 因此, 我们倾向于减少包含头文件, 尤其是在头文件中包含头文件.

使用前置声明可以显著减少需要包含的头文件数量. 举例说明: 如果头文件中用到类 File, 但不需要访问 File 类的声明, 头文件中只需前置声明 class File; 而无须 #include "file/base/file.h".

不允许访问类的定义的前提下, 我们在一个头文件中能对类 Foo 做哪些操作?

我们可以将数据成员类型声明为 Foo * 或 Foo &.
我们可以将函数参数 / 返回值的类型声明为 Foo (但不能定义实现).
我们可以将静态数据成员的类型声明为 Foo, 因为静态数据成员的定义在类定义之外.
反之, 如果你的类是 Foo 的子类, 或者含有类型为 Foo 的非静态数据成员, 则必须包含 Foo 所在的头文件.

有时, 使用指针成员 (如果是 scoped_ptr 更好) 替代对象成员的确是明智之选. 然而, 这会降低代码可读性及执行效率, 因此如果仅仅为了少包含头文件，还是不要这么做的好.

当然 .cpp 文件无论如何都需要所使用类的定义部分, 自然也就会包含若干头文件.

#include

谨慎的安排#include的顺序，避免给自己和他人增添困扰。
.h文件里包含的#include应该不多也不少，既不引入过多的依赖关系，也不因为缺少依赖导致使用这个.h的其他用户需要自己预先include文件。
为了达到这个目的，我们建议每个.cpp的第一个#include是这个.cpp对应的.h文件。例如Ranker.cpp的第一个#include是Ranker.h。
其次，优先引用被依赖的本模块头文件，接下来是公司内部代码的头文件，然后是不常见的库，最后才是libc和stl。



- 其他

永远永远不要在头文件里using namespace！



- 模块封装



- 头文件封装

新的automake系统里，一个依赖模块的头文件不再是直接全部暴露给外部了。只有写在[nobase_]include_HEADERS里面的文件才会被暴露给外围。请尽快全部升级到系统，并谨慎的选择你需要暴露哪些头文件给外围。如果有必要，请调整一下头文件内容，把一些不需要暴露的东西放到新的内部专用头文件去。

具体操作：
更新到最新的automake模版
在模块最上层的Makefile.am里加入nobase_include_HEADERS=xxxx/sss.h adas/ssd.h ... 语句

例子可以参见ssplatform2



- 函数和变量隐藏

仅被同一个.cpp/.c文件里的函数内部引用的小函数和全局变量，请加上static限定符。

仅被同一个.so内部使用的函数和变量，请加上SS_NOEXPORT限定符(ssplatform2:ssmacros.h)

例如：

	#include <ssmacros.h>
	SS_NOEXPORT
	ssize_t internal_func()
	{
	}



- ABI稳定性(二进制兼容性)

ABI是一个.so模块对外所有接口的统称，如果一个.so的ABI发生不兼容的变化，那么所有依赖它的程序和模块都需要重新编译。

ABI稳定性也被称为二进制兼容性

安装到系统里的基础库必须要保持ABI的稳定性，比如sohudb, ssplatform等等。

哪些行为会破坏ABI
	修改继承关系
	class和struct添加或删除数据成员或者改变它们的声明顺序
	class和struct增加或删除virtual函数或者改变它们的声明顺序
	改变全局变量或者数据成员的类型
	改变除private成员函数以外的函数签名
	删除全局变量或者函数
	修改任何inline函数和模板函数的语义(极可能导致意料以外的行为)
	重新定义数据取值的含义（比如参数、返回值、数据成员等等）
	改变align size
从线程安全降格为线程不安全
	哪些行为不会破坏ABI
	添加新的静态数据成员
	添加新的非virtual函数
	仅在模块内部使用的class/struct/function可以尽情修改 (强烈要求这些东西加上SS_NOEXPORT或者static)
	仅修改函数的返回类型，而且同时保持兼容性，比如从父类指针改成子类指针，从void*改成int*

# 类 #

- 风格

类的声明通常按以下顺序:

typedefs 和枚举，内部类
常量
构造函数
析构函数
成员函数, 含静态成员函数
数据成员, 含静态数据成员

为了减少代码的宽度，我们建议public:等存取控制符不要造成多余的缩进，例如：

	class Foo
	{
	public:
	        Foo();
	}


- 构造函数

在构造函数中进行最基本初始化操作，避免可能失败的操作，例如打开文件，解析字符串等。这是因为：

构造函数中很难上报错误, 我们又不建议使用异常.
操作失败会造成对象初始化失败，进入不确定状态.
如果在构造函数内调用了自身的虚函数, 这类调用是不会重定向到子类的虚函数实现. 即使当前没有子类化实现, 将来仍是隐患.
如果有人创建该类型的全局变量 (虽然违背了上节提到的规则), 构造函数将先 main() 一步被调用, 有可能破坏构造函数中暗含的假设条件. 例如, gflags 尚未初始化.
除非特殊情况，每个类都应该有一个无参数的默认构造函数。如果你声明一个带参数的构造函数时，默认构造函数会被自动隐藏，这时候需要显式的声明它。
构造函数构造的结果至少应该保证可以直接析构而不造成任何问题。

小Hint，常见函数的默认实现

C++11提供了 = default 语法，可以实现默认的构造函数、析构函数和。例如：
	class Foo
	{
	public:
	    Foo();
	};
	Foo::Foo() = default;

这当你需要在class定义写一下一个函数，用以改变起默认存取等级等内容，但是起内容却没什么好写的的时候很有用。



- 拷贝构造和赋值函数

对于类Foo而言，Foo(const Foo&) 和 Foo& operator=(const Foo&) 这一对兄弟被用于定义拷贝构造和赋值。这两个函数都会被隐式的默认声明和实现。这造成我们的对象默认是可复制的。但实践上，大家写的类一般都不具备可复制性，例如Ranker，Intersector之类的。所以应该养成在定义class时，顺手直接禁止掉复制功能的习惯，可以减少很多麻烦。

具体方法：

声明private的拷贝构造和赋值函数
	class Foo
	{
	private:
	    Foo(const Foo&);
	    Foo& operator=(const Foo&);
	public:
	    Foo(); // Foo()会被自动隐藏
	};
继承ACE_Copy_Disabled 或 boost::noncopyable 
	class Foo: ACE_Copy_Disabled
	{
	};
令拷贝构造和赋值函数在声明时= delete (C++11 only)
	class Foo
	{
	public:
	    Foo(const Foo&) = delete;
	    Foo& operator=(const Foo&) = delete;
	    Foo() = default; // Foo()会被自动隐藏
	};
如果一个类你认为它是可复制的，且牵扯到指针，一定要在注释里描述清楚是浅拷贝还是深拷贝。



- 继承和多态

如无必要，不要搞多继承，尤其是有vtable的多继承。



- 运算符重载

除少数特定环境外，不要重载运算符.

优点:
使代码看上去更加直观, 类表现的和内建类型 (如 int) 行为一致. 重载运算符使 Equals(), Add() 等函数名黯然失色. 为了使一些模板函数正确工作, 你可能必须定义操作符.
缺点:
虽然操作符重载令代码更加直观, 但也有一些不足:

混淆视听, 让你误以为一些耗时的操作和操作内建类型一样轻巧.
更难定位重载运算符的调用点, 查找 Equals() 显然比对应的 == 调用点要容易的多.
有的运算符可以对指针进行操作, 容易导致 bug. Foo + 4 做的是一件事, 而 &Foo + 4 可能做的是完全不同的另一件事. 对于二者, 编译器都不会报错, 使其很难调试;
重载还有令你吃惊的副作用. 比如, 重载了 operator& 的类不能被前置声明.

结论:
一般不要重载运算符. 尤其是赋值操作 (operator=) 比较诡异, 应避免重载. 如果需要的话, 可以定义类似 Equals(), CopyFrom() 等函数.

然而, 极少数情况下可能需要重载运算符以便与模板或 “标准” C++ 类互操作 (如 operator<<(ostream&, const T&)). 只有被证明是完全合理的才能重载, 但你还是要尽可能避免这样做. 尤其是不要仅仅为了在 STL 容器中用作键值就重载  operator<; 相反, 你应该在声明容器的时候, 创建相等判断和大小比较的仿函数类型.

有些 STL 算法确实需要重载 operator== 时, 你可以这么做, 记得别忘了在文档中说明原因.



- 存取控制

尽量减少public的方法，内部方法多用protected和private，数据成员更加如此。

struct 和POD类型

C++里struct等价于默认public的class。所以混乱的混用struct和class是一种常见的烂代码。

这里我们要求struct仅用于定义简单的POD类型，要求有如下特征：

单线继承
所有的数据成员都是public
所有的数据成员都是pod或者简单C类型
不存在析构函数
不存在虚函数
默认构造函数要么不写，要么=default
可复制，且复制操作和memcpy等价
没有成员函数的struct，其数据成员可以不加前后缀
可以用C++11的static_assert和type_traits机制来强制验证这一点(gcc-4.4的pod检查有些过于严格，比如不能继承)。

	#include <type_traits>
	static_assert(std::is_pod<gDocID256_t>::value, "gDocID256_t must be POD type");
我们建议类似于docId之类的简单对象写成POD-Like的。

我们强制要求需要通过网络发送或者存储到磁盘的对象必须是POD的。



# 其他 C++ 特性 #

- 引用参数

传递只读的对象时，请使用const引用来提高性能。
不建议使用非const引用来传递需要修改的参数，使用指针会使得阅读代码更为容易。
事实上这在 Google Code 是一个硬性约定: 输入参数是值参或 const 引用, 输出参数为指针. 输入参数可以是 const 指针, 但决不能是 非 const 的引用参数。



- 缺省参数

不建议使用缺省参数，除了=0, =NULL, =-1 这三种情形可以稍例外

- 变长数组和 alloca()

变长数组具有浑然天成的语法. 变长数组和 alloca() 也都很高效。但是它们根据数据大小动态分配堆栈内存, 会引起难以发现的内存越界 bugs。

谨慎的使用它们，最好通过assert来确保不会分配过大的内存。

铁律：不得在循环内部使用alloca，几乎一定会造成问题。



- 友元

通常友元应该定义在同一文件内, 避免代码读者跑到其它文件查找使用该私有成员的类



- 异常

如果使用异常, 光凭查看代码是很难评估程序的控制流: 函数返回点可能在你意料之外. 这回导致代码管理和调试困难. 你可以通过规定何时何地如何使用异常来降低开销, 但是让开发人员必须掌握并理解这些规定带来的代价更大。
从表面上看, 使用异常利大于弊, 尤其是在新项目中. 但是对于现有代码, 引入异常会牵连到所有相关代码. 如果新项目允许异常向外扩散, 在跟以前未使用异常的代码整合时也将是个麻烦.

除非不可绕开的第三方库的要求，我们不使用 C++ 异常。即使不得不使用，也需要把它限制在尽可能小的范围内。



- 运行时类型识别

除单元测试外, 不要使用 RTTI. 如果你发现自己不得不写一些行为逻辑取决于对象类型的代码, 考虑换一种方式判断对象类型.

如果要实现根据子类类型来确定执行不同逻辑代码, 虚函数无疑更合适. 在对象内部就可以处理类型识别问题.

如果要在对象外部的代码中判断类型, 考虑使用双重分派方案, 如访问者模式. 可以方便的在对象本身之外确定类的类型.

如果你认为上面的方法你真的掌握不了, 你可以使用 RTTI, 但务必请三思 :-) . 不要试图手工实现一个貌似 RTTI 的替代方案, 我们反对使用 RTTI 的理由, 同样适用于那些在类型继承体系上使用类型标签的替代方案.



- 类型转换

C 语言的类型转换问题有两大问题，一是过于强大，什么都能转，二是在于模棱两可的操作; 有时是在做强制转换 (如 (int)3.5), 有时是在做类型转换 (如 (int)"hello"). 另外, C++ 的类型转换在查找时更醒目.

用 static_cast 替代 C 风格的值转换, 或某个类指针需要明确的向上转换为父类指针时.
用 const_cast 去掉 const 限定符.
用 reinterpret_cast 指针类型和整型或其它指针之间进行不安全的相互转换. 仅在你对所做一切了然于心时使用.
dynamic_cast 测试代码以外不要使用. 除非是单元测试, 如果你需要在运行时确定类型信息, 说明有 设计缺陷.


- stream

不要使用C++的stream机制。性能极差，而且格式化字符串很不清晰。



- ++和--，副作用

绝对不要在同一个表达式里对同一个变量使用两次++或--操作符，涉及到++/--的变量也尽量不要在同一个表达式里引用两次。

这是因为C/C++编译器并不会严格的按照从左到右的顺序计算表达式。编译器为了优化速度，会以各种不可思议的角度来乱序表达式的求值，++/--以及其他有副作用的东西对此非常敏感。如果你不是对C++里面sequence point的概念了如指掌且保证改你的代码人也如此，那么就不要在这里玩花样。



- const 的使用

在任何可能的情况下都要使用 const.

const 变量, 数据成员, 函数和参数为编译时类型检测增加了一层保障; 便于尽早发现错误. 因此, 我们强烈建议在任何可能的情况下使用 const:

如果函数不会修改传入的引用或指针类型参数, 该参数应声明为 const.
尽可能将函数声明为 const. get函数应该总是 const. 其他不会修改任何数据成员, 未调用非 const 函数, 不会返回数据成员非 const 指针或引用的函数也应该声明成 const.
如果数据成员在对象构造之后不再发生变化, 可将其定义为 const.
整型

<stdint.h> 定义了 int16_t, uint32_t, int64_t 等整型, 在需要确保整型大小时可以使用它们

在需要表达一个和32/64位指针相关的数时，用ptrdiff_t, intptr_t, size_t, ssize_t。
表达偏移量，使用off_t或者off64_t。

printf时也需要多加注意兼容性，这需要用头文件 inttypes.h (#define STDC_FORMAT_MACROS 先)

	类型 	不要使用 	使用 
	 指针	%lx 	%p 
	 int64_t	%qd, %lld 	 %" PRId64 "
	 uint64_t 	 %qu, %llu, %llx 	 %" PRIu64 ", %" PRIx64 "
	 size_t	 %u 	 %zu
	 size_t, ptrdiff_t	 %d 	 %zd
	
	#define __STDC_FORMAT_MACROS
	#include <stdio.h>
	#include <inttypes.h>
	
	printf("v=%" PRIu64 "\n", uint64_t(100));


- auto_ptr

任何时候都不要用它。
用std::unique_ptr代替。



- sizeof

尽可能用 sizeof(varname) 代替 sizeof(type).



- boost库

某些 Boost 库提倡的编程实践可读性差, 比如元编程和其他高级模板技术, 以及过度 “函数化” 的编程风格.
因此对boost库的使用需要谨慎，为了向阅读和维护代码的人员提供更好的可读性, 我们只允许使用 Boost 一部分经认可的特性子集. 目前允许使用以下库:

Compressed Pair : boost/compressed_pair.hpp
Pointer Container : boost/ptr_container (序列化除外)
The Boost Graph Library (BGL) : boost/graph (序列化除外)
Property Map : boost/property_map.hpp

特别的，智能指针不要使用boost里的，用C++11 STL的版本。

如果有其他的需求，欢迎发起讨论。



- 命名约定

doSomething, do_something的方式都是可以的，但是一个模块内部不要混用多种命名方式。

class的数据成员，需要有特别的标示，"m_"前缀和“_"后缀都可以，但是也不要混用。

struct的数据成员，不需要的特别的前后缀。



- 缩进控制

缩进格数和modeline

默认情况下，vim和emacs都是采用8格的缩进，用tab作为缩进符。可能有的同学喜欢4格甚至2格的缩进。这没关系，我们不强要求所有代码的缩进一致，但是单个文件内部的缩进应该严格一致。

为了达到单个文件内部缩进一致的目的，我们建议在文件的头部加入vim的modeline，用于描述这个文件的缩进（特别是如果你的缩进习惯不是8格tab时）。
例如:

//
// vim: set ts=4 sw=4 expandtab:     // 设定一个tab=4格，缩进为4格，tab被自动展开成空格
//
class Foo {
    Foo(const Foo&) = delete;
    ~Foo() = default;
}
// vim: set ts=8 sw=8 noexpandtab:     // 这是默认的情况

默认情况下，root用户的vim不识别modeline，所以需要在~/.vimrc文件里加入一行：

filetype plugin on
filetype indent on
set smartindent
set modeline
set listchars=tab:+.,eol:$
缩进格式

原则是避免过多的缩进。这里有２段示范代码：
不太好的
class Foo {
    public:
        Foo(const Foo&) = delete;
        ~Foo() = default;    
    private:
}
int foo(int v)
{
    switch (v) {
        case 1:
            break;
    }
}
好一点的
class Foo {
public:
    Foo(const Foo&) = delete;
    ~Foo() = default;
private:
}
int foo(int v)
{
    switch(v) {
    case 0:
        break;
    }
｝
vim默认是按前一种方式做自动缩进，不过我们可以通过设置"set cinoptions=:0,g0"来实现第二种效果。vim具体的格式控制可以参见vim文档
"cinoptions=:0,g0"也可以加到你的modeline里面

# 具体代码中的一些问题 #

出错处理的代码风格

工程代码中，往往正常路径上的代码只占九牛一毛，而错误处理占了代码的主要篇幅。所以很好的应对错误处理是高质量代码的一个重要方面。
一般来说，在C++代码里，我们很少使用异常机制来做错误处理，常用的还是判断函数的返回值。这种错误处理形式，我们经常遇到２个问题，１是遗漏了一些可能出错的点没有处理；２是处理逻辑不清晰，对现场恢复工作做得不够。对应的我们错误处理有２个原则：１是面面俱到，检查所有可能出错的环节；２是逻辑清晰，有分配有释放。
以下将分别举例说明：

//　遗漏了出错点，malloc和open都可能失败，这里没有判断返回值就直接往下走。
int foo()
{
    void* p = malloc(...);
    if (do1(p)) {
        int fd = open(...);
        if (do2(fd, resource1)) {
            // do my job
            return 0;
        }
    }
    return -1;
}
//遇挫即退式错误处理风格
//缺点是资源回收代码严重分散，对代码正确性的检查很困难，后来者修改代码也很苦
//强烈不推荐
int foo()
{
    void* p = malloc(...);
    if (!p)
        return -1;
    if (!do1(p)) {
        free(p);
        return -1;
    }
    int fd = open(...);
    if (fd < 0)
    {
        free(p);
        close(fd);
        return -1;
    }
    if (!do2(fd, resource1)) {
        free(p);
        close(fd);
        return -1;
    }
    // do my job
    free(p);
    close(fd);
    return 0;
}
//层层缩进式错误处理风格
//成功时，缩进一层，并在"}"处和"return 0"处安排资源回收代码。
//整个函数有２个出口，缩进最深处的return 0和函数结尾的return -1;
//弊端是缩进容易太深，资源回收的代码不集中。而且后来者修改时往往不容易注意到保持这种风格，发生遗漏。
//如果配合C++的智能指针、Guard等RAII机制，可以规避资源回收代码不集中的问题。
int foo()
{
    void* p = malloc(...);
    if (p) {
        if (do1(p)) {
            int fd = open(...);
            if (fd < 0) {
                if (do2(fd, resource1)) {
                    // do my job
                    close(fd);
                    close(p);
                    return 0; // OK
                }
                close(fd);
            }
        }
        free(p);
    }
    return -1;
}
//goto式错误处理风格
//出错时，goto到函数尾部的集中现场清理环节，成功时顺序执行。
//整个函数有２个出口，成功线上的return 0和函数结尾的return -1;
//好处是逻辑特别清晰，修改时不容易出错。
//不好的地方是goto的引入，以及强制要求所有的资源变量必须集中生命在函数的前面。
int foo()
{
	void* p = NULL;
	int fd = -1;
	int ret = -1;
	p = malloc(123);
	if (!p)
		goto out;
	if (!do1(p))
		goto out;
	fd = open("", 0);
	if (fd < 0)
		goto out;
	if (!do2(fd, p))
		goto out;
	// do my job
	ret = 0;
out:
	free(p); // free(NULL) ok
	close(fd); // close(-1) ok
	return ret;
}
我们推荐使用goto式的处理方式，因为后来的修改会比较容易，不容易出错。对于不太长的函数也可以适用缩进式的处理方式。

另外，多使用assert来断言一些绝对不可能出现的情况对代码的健康是很有好处的。

资源回收函数和析构函数的错误处理
这一类函数的错误处理和上文的函数对比稍有区别，当某个子资源释放失败时，一般不中途退出，而是不管三七二十一的往下走，力图释放更多的资源，或者干脆assert了事。

错误码的设置和保护

一般来说系统函数会在errno里面设置错误码，我们的函数也可以利用errno来描述自己的出错原因。如果错误原因过于复杂，建议自定义一个枚举类型用于描述错误原因。例如sasn1就定义了自己的一组返回值。

函数在出错处理时，要注意保护errno现场，任何的的函数调用都可能导致errno被修改，例如close/free/printf，除非是sin abs strcmp之类很明确的和系统调用无关的函数。其实上一节的例子都忽略了这一点。正确的写法应该类似如下的代码：

int tmperrno = errno;
free(...);
close(...);
errno = tmperrno;
return -1;
资源的生命周期控制

资源的释放和分配需要遵循谁分配谁释放的原则。同一个资源的分配和释放一般应当属于同一个模块，尽量避免由模块A分配，模块B释放的情形。如果迫不得已需要转移资源的所有权，一般应当同时传递资源的释放方法，例如传递一个allocator或者free函数等等。

直接用裸指针来管理资源是不被推荐的，这样容易出现资源泄露、double free等问题。我们建议使用C++11的unique_ptr和shared_ptr，前者处理比较简单的情形，后者处理比较复杂的情形。

unique_ptr的例子

void f()
{
        std::unique_ptr<int> p(new int);
        int* q1 = p.get();
        //std::unique_ptr<int> q2 = p; // unique_ptr不能被直接复制
        std::unique_ptr<int> q3 = std::move(p);　//　但是可以被移动
        std::unique_ptr<int[]> u(new int[3]);  // 数组需要特殊处理
        // 用free释放的指针
        std::unique_ptr<int[], decltype(&free)>  p2(static_cast<int*>(malloc(100*sizeof(int))), &free);
}
unique_ptr有２个模版参数，１是指针类型，２是释放方法，如果你的资源不是用new分配的，那么可以重载第２个参数来处理。

类似的，我们用ACE_Guard机制来处理上锁的问题，可以减少很多死锁之类的问题。

C++11

新容器和算法

参见C++11 STL additions

重点类型
unordered_set<T>
unordered_map<T>
unordered_multiset<T>
unordered_multimap<T>
array<T,N>
forward_list<T>
重点函数
T&& move(T&)
用于右值引用，移动语义
OutIter move(InIter first, InIter last, OutIter result)
OutIter move_backward(InIter first, InIter last, OutIter result)
pair<OutIter1, OutIter2> partition_copy(InIter first, InIter last, OutIter1 out_true, OutIter2 out_false, Pred pred)
RAIter partial_sort_copy(InIter first, InIter last, RAIter result_first, RAIter result_last)
pair<const T&, const T&> minmax(const T& a, const T& b)
pair<Iter, Iter> minmax_element(Iter first, Iter last)
bool is_sorted(Iter first, Iter last)
Iter is_sorted_until(Iter first, Iter last)
void iota(Iter first, Iter last, T value)
gcc-4.4支持并被提倡使用的特性

Static assertions
静态断言增强代码的健壮性
auto-typed variables & decltype
不要滥用，仅限于复杂的模版嵌套之类，例如map::iterator啥的。
使用auto和decltype的地方，至少要从上下文看得出来这是个啥类型，或者是像stl一样的大众脸。
// 合理的使用
auto iter = Xmap.find(key);
auto iter = Xvec.begin();
// 不合理的使用
auto ranker = foo.getRanker();    // 敲一下CRanker这么简单的词不会累死人的。
auto tmp = calcSolution(...);     // 哪位知道calcSolution返回啥类型啊？
char16_t 和 char32_t
原生的utf16和utf32支持，编译时可能要加上"-finput-charset=gbk"参数。
const char16_t * utf16str = u"中文汉字";
const char32_t * utf32str = U"中文汉字";
Defaulted and deleted functions
比private:之类的workaround更清晰，更容易优化性能。=default和=delete语法让代码更加明确的表达目的，也有利于编译器优化。
Rvalue references & move semantic
右值引用和对象移动语义可以使得某些程序性能更高，而且可以放心的在stl中使用大对象。
class Foo {
public:
        ...
        Foo(Foo && v); // 移动构造
        Foo& operator=(Foo &&v); // 移动赋值
private:
        int* p; // 指向一个大数组，
};
Foo::Foo(Foo && v)
: p(NULL)
{
        *this = std::move(v);
}
       // 移动赋值
Foo& Foo::operator=(Foo &&v) {
        free(this->p);
        this->p = v.p;
        v.p = NULL;
}
Initializer lists
形如std::vector<int> v = {1,2,3} 这样的语法，使程序更简短实用。
 

gcc-4.7支持并被提倡使用的特性

Range-based for
代码清晰简短
std::vector<XX> vec;
for (auto v : vec) {
    // do with v
}
Explicit virtual overrides
显著降低typo带来的问题
struct D : B { 
        // 重载 B::f(), 如果D::f和B::f签名不一致，就会编译出错
        void f() override;
}; 
Atomic operations  
不需要自己山寨原子操作了，具体有哪些原子操作可以参见头文件，里面写得很清楚。
其实gcc-4.4也提供了原子操作，但是头文件的名字和后来的标准不一样。标准规定的和gcc-4.7实现的是<atomic>，但是gcc-4.4.6还是<cstdatomic>
规则特例

前面说明的编程习惯基本都是强制性的. 但所有优秀的规则都允许例外, 这里就是探讨这些特例.

第三方代码

当你修改使用其他风格的第三方代码时, 为了与代码原有风格保持一致可以不使用本文档. 
小提示：尽可能将你的修改放在单独的文件中，多做外围的包装而避免修改内部。

既有代码

需要持续改进的代码，请和你的leader确定一个时间点，达到本文档的要求。

# openhub #
一、openhub接口地址
线上4个机房，sjs、zw、tc、1.tc，每个机房8台机器，一共32台机器
vropenhb[01-08].web.[sjs/zw/tc/1.tc].ted:19019，如vropenhb03.web.zw.ted:19019

二、openhub接口参数说明
query或者queryString：查询词【必须】，需要URLEncode
ie：参数的编码，utf8或者utf16，不写的话默认是utf16编码
reqClassids：请求的vr classid【必须】，需要URLEncode，多个用英文半角分号“;”分隔，如reqClassids=11000301;1100901;
queryFrom：wap或者web【必须】
vrForQc：false或者true，表示是否需要走qc【必须】
retType：返回的数据格式，xml或者html【必须】
dataPlatformSource：取个名字，标识来源，openhub需要对各个来源的请求做统计【必须】
userArea：可选，最多到二级，省\t市，直辖市，直辖市\t县。如：福建省\t福州市，北京市，重庆市\t武隆县

三、查询示例
queryString：保定天气
reClassids：21169701和21169601
queryFrom、vrForQc、retType：直接从下面示例可以看出
dataPlatformSource：weather_card

a.)utf8
http://vropenhb01.web.sjs.ted:19019/?queryString=%E4%BF%9D%E5%AE%9A%E5%A4%A9%E6%B0%94&ie=utf8&reqClassids=21169701%3b21169601%3b&queryFrom=wap&vrForQc=false&retType=xml&dataPlatformSource=weather_card

b.)utf16
http://vropenhb01.web.sjs.ted:19019/?queryString=%DD%4F%9A%5B%29%59%14%6C&reqClassids=%32%00%31%00%31%00%36%00%39%00%37%00%30%00%31%00%3B%00%32%00%31%00%31%00%36%00%39%00%36%00%30%00%31%00%3B%00&queryFrom=wap&vrForQc=false&retType=xml&dataPlatformSource=%77%00%65%00%61%00%74%00%68%00%65%00%72%00%5F%00%63%00%61%00%72%00%64%00

#  #
最基础的基础代码库介绍
编辑
代码位于 http://svn.sogou-inc.com/svn/rd_modules/

 库名 	 内容 	 有无rpm
 ssplatform 	 最基本的一堆大杂烩: bchar_t相关，docid相关，黑名单相关…… 	 有
 encoding 	 和文本字符编码相关的大杂烩 	 不稳定
 libsohumisc 	 一些C的简单数据结构容器和原子操作、位操作的函数 	 有
 lqdb 	 一种特别的key-value库，专为快速随机读取设计和节省空间设计，不可以读写混合，做出来的.lqdb文件可以方便的拷贝 	 有
 qdb 	 一种高速的key-value库，必须架设在设备文件上，读写混合性能好 	 有
 simple_asn1 	 基于ASN.1协议的二进制数据传输协议封装，实现了其BER编码，将要实现XER 	 有
 sohudb 	 一种过时的key-value库，但其网络接口被qdb和lqdb继承 	 有
 urlinfo 	 url处理相关的库·	 无
FAQ
编辑
待整理

 需求 	 需求方 	 解决办法
字符串处理库，处理char及gchar的查找、匹配、分割、合并等操作。
C++版本字符串切分工具，类似java的stringtokenizer

许静芳组

王灿辉组

OK，进入基础库开发计划

需要一个能返回空串的的strtok。

         这个strsep能干，暂时没有bchar_t的版本

其他ssplatform2已经满足。

向量、矩阵运算库

矩阵运算：加、减、乘、除、转置、求逆等

向量相似度计算：向量内积、余弦相似度等

分布相似度计算：Kullback–Leibler divergence 、Jensen–Shannon divergence等

基本的统计量：均值、方差、协方差、相关系数等

许静芳组

王灿辉组

建议使用lapack

其他候选atlas, blas

是否允许使用boost::numeric需要组长慎重考虑

字符串相似度计算	王灿辉组	
OK，进入基础库开发计划

但因为需求不明确，最多只能提供最基本的edit distance距离。

请王灿辉组负责给一个基本接口和实现。我来整理到ssplatform里

识别字符编码和乱码	
许静芳组

王灿辉组

理论上应该Encoding里面有

如果不能满足的请补充

一个能给全角字符用的正则库	王灿辉组	
转成unicode再处理

可用的库: pcre(cpp), std::regex

前者支持utf-8，后者支持utf-32/16

效率足够高的单机简化版倒排索引库	许静芳组	
开发成本较高。

需要下次圆桌讨论明确需求和重要性。

hbase扫库慢，希望能快点	余浩组	应转云平台组开发
url归一化的库，希望有java版，之前有c版本的	余浩组	
OK，进入基础库开发计划

原来有基于spider里的代码，需要抠出来放到sspaltform里面，且提供java包装

不负责策略

hadoop版的spiderpages、offsum pages格式对应的InputFormat，方便hadoop直接读取pages。（李毅需求）		应转云平台组开发
http请求的deamon服务	
余浩组

徐驰组

OK，进入基础库开发计划

计划先做一个3段流水线的版本

解析http请求->处理生成结果->回传结果

Java Bloom Filter	余浩组	
字符串转化工具指定编码、大小写、全半角等参数，一次调用转化好.

宽字符串（wchar_t或wstring）与单字符串（char或string）之间的转换工具

王灿辉组	
iconv或者icu做编码转换。

大小写全半角之类转换理论上encoding里面有，可以考虑做一个utf16版本的。

多线程外排工具	王灿辉组	分块排序以后，用”sort -m”合并
节省内存的高效的Double Array Trie，支持中英文多种编码	王灿辉组	
OK，进入基础库开发计划

能支持char和bchar_t就行了，中文就用bchar_t

Duanhuanzhong牵头给出明确的需求

序列化工具：将一些c++标准容器（如vector，map，hash_map等）直接写入文件，或从文件中直接读入标准容器	多个组	
OK，进入基础库开发计划

本质上是需要能mmap的数据结构

能在某种程度上支持嵌套更好

XML解析/生成 简洁易用的xml工具	
徐驰组

吴明达组

本质上是开发觉得自己解析太麻烦，而xml库解析普遍比较慢。

考虑将asn.1升级出一个java版本来，并且同时支持xml输出

http客户端库	徐驰组	
简单需求请先用curl满足。

搞不定请接着补充。

类似sohudb_net的、通用的、网络同步调用接口	徐驰组	ssplatform的envelope修改包大小问题后可以适用
几种常用策略的内存池	徐驰组	
先升级到RHEL6，malloc性能已经大大改善

再考虑内存分配是不是真的瓶颈

然后再看具体需求

基础的几种encoding/decoding

基础的几种hash/加密/校验算法

徐驰组	用openssl满足。


# mark #
内部VR专项返回结果
返回结果示例

<?xml version="1.0" encoding="gbk"?>
<DOCUMENT>
<item>
    <key ><![CDATA[北京]]></key> //  VR的关键词
    <display>                              //  display 中的字段用于真实展现，具体需要与前端协商
        <title><![CDATA[XXXXXXXXXXXXXXXX]]></title>   //必填
        <url><![CDATA[http://www.weather.com.cn/weather/101010100.shtml]]></url>   //必填
        。。。。。。。。。。。。。。。。。
    </display>
<classid>207302</classid>
<term><![CDATA[(北京)(天气)]]></term>    //  查询词的分词结果，用于标红
<classtag>EXTERNAL.WEATHER.CITY2</classtag>
<param1>50000</param1>    //  rank 有关的相关信息
<param2>100</param2>
<param3>50000</param3>
<param4>103</param4>
<param5>1</param5>
<tplid>60</tplid>        //  front web 端展现的模板编号
</item>
</DOCUMENT>
<!--STATUS VR OK-->       //  状态位

状态位

<!--STATUS VR OK-->        //正常 返回，有VR结果

<!--STATUS NOVR OK-->      // 正常返回，无VR 结果

<!--STATUS VR ERROR-->     //专项接口不能在规定时间内返回，或者其他错误以致没有返回结果
注意事项

1）返回结果不要有标红结果

2）返回结果的编码是gbk，半角

# 1.fetcher_scheduler #
轮询开放平台db，将
# 2.fetcher #

# 3.reader #
向index和summery发送数据

