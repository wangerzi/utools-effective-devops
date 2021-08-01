# uTools 运维配置小工具
目前仅支持替换 .mobileconfig 中的用户名密码

Github: [https://github.com/wangerzi/utools-effective-devops](https://github.com/wangerzi/utools-effective-devops)
Gitee : [https://gitee.com/wangerzi/utools-effective-devops](https://gitee.com/wangerzi/utools-effective-devops)

## 版本更新

### v1.0.0 支持 .mobileconfig 配置替换
初始版本，满足运维实际需要

## 内置功能

### .mobileconfig vpn 编辑器
复制 .mobileconfig 文件，然后触发 utools，修改后 `⌘ + C / Ctrl + C` 保存即可

![img](./doc/mobileconfig.jpg)


## 加入开发

### 环境准备

nodejs 12.16.1
npm 6.13.4

### 开发者工具
首先找到 utools 官方开发者工具，然后新建插件，选中 `./plugin.json`，进入项目目录，执行如下语句

```shell
$ npm i
$ npm run dev
```

然后运行插件，即可开始调试及开发

### 发布

首先执行如下指令打包，然后切换配置文件为 `./dist/plugin.json`，进行发布和打包

```shell
$ npm run build
```
