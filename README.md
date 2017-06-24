# 一个在线memo

## 概要
模仿google keep的一个在线富文本记事本。

这是后端代码以及介绍。

[前端代码](https://github.com/SharpZhang/memo-front-end)

[后端代码](https://github.com/SharpZhang/memo)

[在线版本](http://memo.zhangfeng.site)https的链接出了些问题，上传的图片无法完成传输，估计是服务器的反向代理问题，可能与实际效果不甚符合，建议访问http版本，也就是段首的超链接。

## 功能
创建记事，可以附带多张图片。

创建之后的再编辑功能。

设置网页提醒。使用HTML5 notification API

## UI风格
google material design 

记事排布方案：瀑布流

## 细节
编辑栏的隐藏与扩展，需要对dom时间的冒泡和捕获进行一些定制化处理。

上传图片的预览，使用HTML5 filreader API，先本地读入图片预览，图片上传完成读取替换图片。

上传图片按钮

记事更新状态（包括创建时间与更新状态的显示）
## 前端
Vue.js：组件化，数据驱动

webpack：管理插件，打包

## 后端
caddy：反向代理，自动获取 https 证书

koa.js：后端框架

basic auth： 基础的用户认证，https保证了传输的安全

## 开发过程
前后端分离，两个服务器通过restful API沟通，集成时修改前端服务器访问API地址，使用webpack将前端项目打包，就能够在后端服务器使用，后端服务器只需要提供restFul API与静态文件服务即可

## 待改进
使用vue-router以改进网页提醒功能
记事的多图排列方式有待改进

## Restful API Doc
GET /note 获取所有记事

GET /note/:id 根据id记事

POST /note + formdata 创建记事

POST /upload 上传图片

POST /note/update + formdata 更新记事

POST /note/delete 删除记事


## Fin.
