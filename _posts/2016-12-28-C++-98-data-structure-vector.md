---
layout: blog_detail
title: c++ data structure vector
excerpt_separator: <!--more-->
---
Language:c++98
Compiler:gcc 4.6.3

header: <vector>
vector<auto> vec;
vec.push_back(a);
vec[index]
for(it=vec.begin();it!=vec.end();++it)
    *it

vec.size()
vec.clear()

header: <map>
map<string, vector<string> > _map;
map<string, vector<string> >::iterator it;
it = _map.find('somekey');
if( it != _map.end())
    *it


header: <algorithm>
reverse(vec.begin(),vect.end())
sort(vec.begin(),vec.end())

header: <string>
string str;
str.append(astr);
str.assign(bstr);
str.replace(rstr);
str.swap(val);



