---
layout: blog_detail
title: Defend Break
excerpt_separator: <!--more-->
---
锁是一个抽象数据结构
锁定、解锁
Lock：：Acquire
锁前等待，直到得到锁
Lock：：Release
释放锁，唤醒任何等待的进程

使用锁来控制临界区访问

原子操作指令

现代CPU体系结构都提供一些特殊的原子操作指令

测试和置位（TestAndSet）指令

1.从内存单元读取值

2.测试值是否为1，然后返回真或假

3.内存单元设置为1.

boolean TestAndSet (boolean *target)‏
          {
               boolean rv = *target;
               *target = true;
               return rv:
          }


交换指令（Exchange）指令
void Exchange (boolean *a, boolean *b)‏
          {
               boolean temp = *a;
               *a = *b;
               *b = temp:
          }


使用TS指令实现自旋锁
class Lock {
    int value = 0;
}

Lock::Acquire() {
   while (test-and-set(value))
      ; //spin
}

Lock::Release() {
    value = 0;
}

优点：适用于但处理器或者共享主存的多处理器中任意数量的进程同步

简单且容易证明

支持多临界区

缺点：

忙等待消耗处理器时间

可能导致饥饿，进程离开临界区时有多个等待进程的情况

死锁：

拥有链接去的低优先级进程

请求访问临界区的高优先级进程获得处理并等待临界区






