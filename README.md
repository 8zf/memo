# 一个在线memo

## 概要
模仿google keep的一个在线富文本记事本。

## 功能
创建记事，可以附带多张图片。

创建之后的再编辑功能。

设置网页提醒。

## UI风格
google material design 

waterfull

## 细节
编辑栏的隐藏于扩展

上传图片的预览

按钮

记事更新状态
## 前端
Vue.js：组件化，数据驱动

webpack：管理插件，打包

## 后端
caddy：反向代理，自动获取 https 证书

koa.js：后端框架

basic auth： 基础的用户认证，https保证了传输的安全

开发过程：前后端分离，通过restful API沟通

## 待改进
使用vue-router以改进网页提醒功能
记事的多图排列

## Restful API Doc
GET /note 获取所有记事

GET /note/:id 根据id记事

POST /note + formdata 创建记事

POST /upload 上传图片

POST /note/update + formdata 更新记事

POST /note/delete 删除记事


## Fin.
![](public/new-operation.jpg)
