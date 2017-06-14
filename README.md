# 一个在线memo

## 概要
模仿google keep的一个在线备忘录，可以在上面记事，设置提醒，记下自己的小想法。

设置的提醒打算通过短信的形式进行通知，看起来有些鸡肋，`但这个网站的主要功能主要是记事啊🌚`

实际上是为了完成web设计的作业，以及学着用一下koa和vue

当然这个东西需要认证才行，暂时的话只能我一个人用哦
使用了http basic auth

##细节
模仿google material design的设计，用于输入的记事框

## 需求修改
可以做出Pinterest类似的东西，分享见过的东西，

## 前端细节
编辑记事时，如果失去焦点，即在其他任何地方点击，都会创建未编辑完的记事

根据数据库的数据生成页面，
何时获取数据？更改/插入

## API Doc

### API
访问数据库各model的restful API,
note: find/insert/update/remove
(user: 如果需要认证的话

### memo类型
记事
提醒
清单

### 待实现
图片上传

## 前端技术
html5 contenteditable, filereader, 


[地址](https://memo.zhangfeng.site)

![](public/new-operation.jpg)