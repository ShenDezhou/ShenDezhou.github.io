---
layout: blog_detail
title: Tips-To-Remember
excerpt_separator: <!--more-->
---
Documentation Tools:
Outlook 2013
Office 2013
Visio 2007

CPP_IDE:
Sublime Text 3: SFTP, SidebarEnhancement

Browser:
QQBrowser

IM:
QQ
Paas

SSH:
MobaXterm

Code Management:
SourceTree
TortoiseSVN

Input:
Sogou

<!--more-->

*****************************************

X11Forwarding problem on RedHat

because RedHat/CentOS require the xorg-x11-xauth package

*****************************************

#将打开文件个数限制为1048768
ulimit -n 0x100000
#重新登录
exec su $LOGNAME

*****************************************

MEMENTO:

VH:exvr_fetcher
VH/exvr_fetcher/trunk/


VH:xmlPageReader
VH/xmlPageReader/trunk/

VM:
http://roc.sogou/?cluster.11408.machine#!10.134.100.140

DailyBuild:
http://rhel6.dailybuild.sogou-inc.com/sgbuild/h-report-last.html

WeekReport:(周四)
https://oa.sogou-inc.com/wmr

*****************************************

如何写好一封邮件。

发出去的邮件，无法撤回。

顺序：附件、正文、标题、收件人

开头说清楚：谁、什么、何时、为什么

怎么样

是把复杂的事情分成几个大块，每块下面几个小点，以重要性和紧急程度排序，把不可泄漏的重点用黄底标出，层次清楚，皆大欢喜。

用对标点符号、不要中英文标点混用、分清「的地得」、不写错别字、英文单词之间要空格、特殊名词首字母大写

*****************************************

/*
Copyright (c) 2017-2018 Dezhou Shen, Sogou-Inc.
   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at
       http://www.apache.org/licenses/LICENSE-2.0
   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

*****************************************

**********Google C++ Style Guide**********

1.Goals of the Sytle Guide

Sytle rules should pull their weight

Optimize for the reader, not the writer

Be consistent with existing code
Be consistent with the broader C++ community when appropriate

Avoid surprising or dangerous constructs
Avoid constructs that our average C++ programmer would find tricky or hard to maintain

Be mindful of our scale

Concede to optimization when necessary



Use standard order for readability and to avoid hidden dependencies:

Related header, C library, C++ library, other libraries' .h, your project's .h.

With few exceptions, place code in a namespace. Namespaces should have unique names based on the project name, and possibly its path.

1.Header Files

every .cc file should have an associated .h file. Exceptions: unittest and small .cc files.

1.1 Self-contained headers

Self-contained end in .h. Inclusion end in .inc

template and inline functions in the same file.

Definition and declaration in the same file.

1.2The #define Guard

project_path_file_H_.

1.3Forward Declareations

AVOID

1.4 Inline Functions

Define functions inline only when they are small, 10 lines.

Recursive functions should not be inline.

Virtual function inline is to place its definition in the class.

1.5 Names and Order of Includes

Related header, C library, C++ library, other libraries' .h, project's .h. 

Headers should be listed as descendants of the project's source directory without UNIX directory shortcuts . or ..

Then put conditional includes after other includes.


2. Scoping

2.1 Namespaces
Place code in a namespace. Namespaces have project and path name. NO using-directives.

inline is used for API compability.

Terminate with comments

Wrap after includes, gflags definitions/declarations and forward declarations of cleasses.

Do not declare anything in namespace std.

May not use a using-directive to make all names from a namesapce available.

Do not use Namespace aliases at namespace scope in header files except in explicitly marked internal-only namespaces.

Do not use inline namespaces.

2.2 Unnamed Namespaces and Static Variables

Encourage to use Unnamed namespaces and static variables.

Do not use internal linkage in .h files.

2.3 Nonmember, Static Member, and Global Functions

Prefer placing nonmember functions in a namespace; use completely global functions rarely.

Prefer grouping functions with a namespace instead of using a class as if it were a namespace.

Static methods of a class should generally be closely related to instances of the class or the class's static data.

2.4 Local Variables
C++ allows you to declare variables anywhere in a function.

Declare them in as local a scop as possible, and as close to the first use as possible.

2.5 Static and Global Variables

Objects with static storage duration, must be Plain Old Data.

One way to alleviate the destructor problem. Call quick_exit().

Only allow static variables to contain POD data. disallows vector or string.

If you need a static or global variable of a class type, consider initializing a pointer, from either your main() function or from pthread_once().



3. Classes

3.1 Doing Work in Constructors

Avoid virtual method calls in constructors, and avoid initialization that can fail.

3.2 Implicit Conversions
Constructors callable with a single argument, must be marked explicit in the class deifnition. 

Copy and move constructors should not be explicit, since they do not perform type conversion.

Cannot be called with a single argument should omit explicit.
Copy-initialization should omit explicit.

3.3 Copyalbe and Movable Types

A copyalbe type allows its objects to be initialized or assigned from any other object of the same type, without changing the value of the source.

A movale type is one that can be initialized and ssigned from temporaries.
std::unique_ptr<int> is a movable but not copyable type.

MyClass(const MyClass&) = delete;
MyClass& operator=(const MyClass&) = delete;

3.4 Structs vs. Classes

Use a struct only for passive objects that carry data;

Methods should not provide behavior but should only be sued to set up the data members, e.g., constructor, destructor, Initialize(), Reset(), Validate().

3.5Inheritance

Composition is often more appropriate than inheritance. Make it public.

Rationale: A function or destructor marked override or final that is not an override of a base class virtual function will not compile, and this helps catch common errors. The specifiers serve as documentation; if no specifier is present, the reader has to check all ancestors of the class in question to determine if the function or destructor is virtual or not.

3.6 Multiple inheritance

Multiple inheritance is allowed only when all superclasses, whith the possible exception of the first one, are pure interfaces.

3.7 Interfaces
Definition: 
* It has only public pure virtual methods and static method.
& It may not have non-static data members.
* It need not have any contructors defined. If provided, it must take no arguments and it must be portected.
% If it is a subclass, it may onlly be derived from classes that satisfy these conditions and are tagged with the Interface.

To make sure all implimentations of the interface can be destroyed correctly, the interface must also declare a virtual destructor.

3.8 Operator Overloading 

operator" " and type-conversion functions such as operator bool()

If a binary operator is defined as a class member, implicit conversions will apply to the right hand argument, but not the left-hand one.

Prefer to define Operator Overloading like ==, =, and <<.

Do not overload &&, ||, ,(comma), or unary &, " ".

3.9 Access Control
Make data members private

3.10 Declaration Order

Group similar declaration together, placing public parts earlier.

A class definition should start with pulic then protected and then private, omit empty.

types: typedef, using, nested structs and classes,
constants,
factory functions,
constructors,
assignment operators, 
destructor,
all other methods,
data members.

4. Functions

4.1 Parameter Ordering
When defining a function, parameter order is: inputs, then outputs.

4.2 Reference Arguments
Input arguments are values or const references while output arguments are pointers

4.3 Default Arguments

4.4 Trailing Return Type Syntax

C++11
auto foo(int x) -> int;

int foo(int x);

template <class T, class U> decltype(declval<T&>() + declval<U&>()) add(T t, U u);

template <class T, class U> auto add(T t, U u) -> decltype(t + u);

5. Google-Specific Magic

5.1 Ownership and Smart Pointers
Prefer to have single, fixed owners for dynamically allocated objects. Prefer to transfer ownership with smart pointers.

unique_ptr<T> and shared_ptr<T> to manage ownership

Never use auto_ptr<T> instead use unique_ptr<T>

5.2 cpplint

False positives can be ignored by putting // NOLINT at the end of the line or // NOLINTNEXTLINE in the previous line.

6. Other C++ Features

6.1 Rvalue References

Use rvalue references only to define move constructors and move assignment operators, or for perfect forwarding.

void f(string&& s); declares a Rvalue reference.

6.2 Friends

We allow use of friend classes and functions, within reason.

6.3 Exceptions

We do not use C++ Exceptions.

6.4 Run-Time Type Information(RTTI)

Avoid

* Virtual methods
* Visitor design pattern

6.5 Casting

Use C++-style casts like static_cast<float>(double_value), rather than (int)x or int(x) way to do casting.

* Use brace initialization to convert arithmetic types int64{x}.

* Use static_cast as the equivalent of a C-style cast that does value conversion, when you need to explicit up-cast a pointer to its superclass.

* Use const_cast to remove the const qualifier.

* Use reinterpret_cast to do unsafe conversions of pointer types to and from integer and other pointer types.

6.6 Streams

Use streams only when they are the best tool for the job.

6.7 Preincrement and Predecrement

For simple scalar values both. For iterator and other template types, use preincrement.


6.8 Use of const

If a function guarantees that it will not modify an argument passed by reference or by Pointer.

Declare methods to be const whenever possible. Accessors should almost always be const.

Consider making data members const whenever they do not need to be modified after construction.

The mutable keyword is allowed but is unsafe when used with threads.

6.9 Use of constexpr

6.10 Integer Types

short is 16 bits, int is 32 bits, long is 32 bits and long long is 64 bits.

6.11 64-bit Portability

Code should be 64-bit and 32-bit friendly.

GOOGLE UGLY VERSION
// printf macros for size_t, in the style of inttypes.h
#ifdef _LP64

#define __PRIS_PREFIX "z"

#else

#define __PRIS_PREFIX

#endif

// Use these macros after a % in a printf format string
// to get correct 32/64 bit behavior, like this:
// size_t size = records.size();
// printf("%" PRIuS "\n", size);

#define PRIdS __PRIS_PREFIX "d"

#define PRIxS __PRIS_PREFIX "x"

#define PRIuS __PRIS_PREFIX "u"

#define PRIXS __PRIS_PREFIX "X"

#define PRIoS __PRIS_PREFIX "o"

Type	DO NOT use	DO use	Notes

void * (or any pointer)	%lx	%p	

int64_t	%qd, %lld	%" PRId64 "	

uint64_t	%qu, %llu, %llx	%" PRIu64 ", %" PRIx64 "	

size_t	%u	%" PRIuS ", %" PRIxS "	C99 specifies %zu

ptrdiff_t	%d	%" PRIdS "	C99 specifies %td

* sizeof(void *)!= sizeof(int) use intptr_t if you want a pointer-sized integer.

You may need to be careful with structure alignments, particularly for structures being stored on disk. Any class/structure with a int64_t/uint64_t member will by default end up being 8-byte aligned on a 64-bit system. If you have such structures being shared on disk between 32-bit and 64-bit code, you will need to ensure that they are packed the same on both architectures. Most compilers offer a way to alter structure alignment. For gcc, you can use __attribute__((packed)). MSVC offers #pragma pack() and __declspec(align()).

Use LL or ULL suffixes.

6.11.1 Preprocessor Macros

Avoid defining macros, especially in headers; prefer inline functions, enums, and const variables.

6.11.2 0 and nullptr/NULL

Use 0 for integers, 0.0 for reals, nullptr (or NULL) for pointers, and '\0' for chars..

6.11.3 sizeof

Prefer sizeof(varname) to sizeof(type)

use sizeof(varname) when you take the size of a perticular variable.

6.11.4 auto

Use auto to avoid type names that are noisy, obvious, or unimportant - cases.

6.11.5 Braced Initializer List

C++11, any object type can now be created with a braced initializer list, known as a brace-init-list in the grammar.

A user-defined type can also define a constructor and/or assignment operator that take std::initializer_list<T>.

Brace initialization can also call ordinary contructors of data types, even if they do not have std::initializer_list<T>.

6.12 Lambda expressions

Are a concise way of creating anonymous function objects.

Allow capturing variables from the enclosing scope. Explicit captures require each variable to be listed, as either a value or refrence capture

Default captures implicitly capture any variable referenced in the lambda body.

[&][=]capture by reference and value.

6.13 Template metaprogramming

Avoid

Template metaprogramming refers to a family of techniques that exploit the fact that the C++ template instantiation mechanism is Turing complete.

Template metaprogramming 

Bias.

6.14 Boost

Call Traits from boost/call_traits.hpp

Compressed Pair from boost/compressed_pair.hpp

The Boost Graph Library (BGL) from boost/graph, except serialization (adj_list_
serialize.hpp) and parallel/distributed algorithms and data structures (boost/graph/parallel/* and boost/graph/distributed/*).

Property Map from boost/property_map, except parallel/distributed property maps (boost/property_map/parallel/*).

Iterator from boost/iterator
The part of Polygon that deals with Voronoi diagram construction and doesn't depend on the rest of Polygon: boost/polygon/voronoi_builder.hpp, boost/polygon/voronoi_diagram.hpp, and boost/polygon/voronoi_geometry_type.hpp

Bimap from boost/bimap

Statistical Distributions and Functions from boost/math/distributions

Special Functions from boost/math/special_functions

Multi-index from boost/multi_index

Heap from boost/heap

The flat containers from Container: boost/container/flat_map, and boost/container/flat_set

Intrusive from boost/intrusive.

The boost/sort library.

Preprocessor from boost/preprocessor.

6.15 std::hash

std::hash<T> is C++11 hash containers use to hash keys of type T.

std::unordered_map<int, string>

std::unordered_map<int,string, MyIntHash>

6.16 C++11

Forbidden:
Compile-time rational numbers (<ratio>)

The <cfenv> and <fevn.h>

Ref-qualifiers on member functions, void X::Foo() &  or void X::Foo() &&.

6.17 Nonstandard Extensions

NO

6.18 Aliases

typedef Foo Bar;
using Bar = Foo;
using other_namespace::Foo;

7. Naming

7.1 General Name Rules

Be descriptive; avoid abbreviation

7.2 File Names

All lowercase and can include underscores or dashes.

7.3 Type Names

Start with a capital letter and no underscores.

7.4 Variable Names

all lowercases, with underscore between words. Data members of classes(not structs) have additional trailing underscore.

7.5 Constant Names

declared constexpr or const, named with  a leading 'k' and by mixed case.

7.6 Function Names

functions should start with a capital letter and have a capital letter for each new word.

7.7 Namespace Names.

7.8 Punctuation, Spelling and Grammar.

8 Formatting

8.1 Line Length

80 characters is the maximum.

8.2 Non-ASCII Characters.

UTF-8 formatting.

Hex encoding is also OK, and encouraged where it enhances readability. "\xEF\xBB\xBF" or u8"\uFEFF"

8.3 Spaces vs. Tabs

Use only spaces, and indent 2 spaces at a time.

shouldn't use C++11 char16_6 and char32_t.

Choose good parameter names.

Parameter names may be omitted only if the parameter is unused and its purpose is obvious.

If you cannot fit the return type and the function name on a single line, break between them.

If you break after the return type of a function declaration or definition, do not indent.

The open parenthesis is always on the same line as the function name.

There is never a space between the function name and the open parenthesis.

There is never a space between the parentheses and the parameters.

The open curly brace is always on the end of the last line of the function declaration, 
not the start of the next line.

The close curly brace is either on the last line by itself or on the same line as the open curly brace.

There should be a space between the close parenthesis and the open curly brace.

All parameters should be aligned if possible.

Default indentation is 2 spaces.

Wrapped parameters have a 4 space indent.


9. Comments

the best code is self-documenting. Giving sensible names to types and variables is much better than using obscure names that you must then explain through comments.

9.1 File Comments
Start each file with license boilerplate.

Every file should contain license boilerplate.

If a .h declares multiple abstractions, the file-level comment should broadly describe the content of the file.


**********Google C++ Style Guide**********

