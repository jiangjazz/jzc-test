# jzc-test

> 测试nuxt新版本性能的一个项目


## 编译步骤

``` bash
# 安装开发环境
$ npm install

# 启动带热加载的开发环境 localhost:3000
$ npm run dev

# ssr生产环境的编译和启动
$ npm run build
$ npm start

# 纯静态文件编译
$ npm run generate
```

## 版本记录
---

### v1.2.0
```
新增功能
- 新增服务端cache缓解API压力
```
---
### v1.1.0
```
新增功能
- 添加了多语言支持
- 完成注册、退出登陆、选择国家的逻辑与页面
修改功能
- express->axios结构调整，调用方式调整
```
---
### v1.0.0
```
基本结构搭建完成，可用来当nuxt项目模版
```
---
