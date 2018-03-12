# 一个在线memo
![logo](https://raw.githubusercontent.com/8zf/memo/master/logo.png)

## 概要
灵感来自[google keep](https://keep.google.com)的一个在线富文本记事本。

这是后端代码以及介绍。

[前端代码](https://github.com/SharpZhang/memo-front-end)

[后端代码](https://github.com/SharpZhang/memo)

[在线版本](http://memo.zhangfeng.site)https的链接出了些问题，上传的图片无法完成传输，估计是服务器的反向代理问题，可能与实际效果不甚符合，建议访问http版本，也就是段首的超链接。

## 功能
- 创建记事，可以附带多张图片。图片依据三张每行来进行排列，是多图显示的一种解决方案。

![1](https://raw.githubusercontent.com/8zf/memo/master/1.png)

- 创建之后的再编辑功能。包括图片的删除与添加

- 设置网页提醒。使用HTML5 notification API

## UI风格
google material design 

记事排布方案：瀑布流

## 细节
- 编辑栏的隐藏与扩展，需要一些hack实现，以及编辑栏使用contenteditable属性来确保可以定制自己需要的效果。

![editor](https://raw.githubusercontent.com/8zf/memo/master/editor.png)

- 上传图片过程的用户体验优化需要对Vue的生命周期有比较深入的了解，在不同时钟周期需要做不同的工作。

- 图片的排列使用计算得出的flex-basis属性来进行排列

![5](https://raw.githubusercontent.com/8zf/memo/master/5.png)

- 上传图片的预览，使用HTML5 filreader API，先本地读入图片预览，图片上传完成读取替换图片，同时伴随图片加载状态的显示。

![2](https://raw.githubusercontent.com/8zf/memo/master/2.png)

- 上传图片（文件）按钮定制

- 记事更新状态（包括创建时间与更新状态的显示）

![4](https://raw.githubusercontent.com/8zf/memo/master/4.png)

## 前端
Vue.js：组件化，数据驱动

webpack：管理插件，打包

## 后端
caddy：反向代理，自动获取 https 证书

koa.js：后端框架

mongodb: 数据库

http basic auth： 基础的用户认证，https保证了传输的安全

## 开发过程
前后端分离，两个服务器通过restful API沟通，集成时修改前端服务器访问API地址，使用webpack将前端项目打包，就能够在后端服务器使用，后端服务器只需要提供restFul API与静态文件服务即可

## 待改进
使用vue-router以改进网页提醒功能
首次加载会出现一些bug，导致显示的问题，需要重拍一次才能正常显示，应该与图片加载有关
记事的多图排列方式有待改进（已完成）

## Restful API Doc
GET /note 获取所有记事

GET /note/:id 根据id记事

POST /note + formdata 创建记事

POST /upload 上传图片

POST /note/update + formdata 更新记事

POST /note/delete 删除记事


## Fin.
