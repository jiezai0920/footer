# 底部弹框组件

> Vue.js 2.x C端的业务组件。

[![emfooter](https://img.shields.io/npm/v/emfooter.svg?style=flat-square)](https://www.npmjs.org/package/emfooter)

[![Sauce Labs Test Status (for master branch)](https://badges.herokuapp.com/browsers?googlechrome=7&firefox=7&microsoftedge=10&iexplore=9&safari=10.10)](https://saucelabs.com/u/_wmhilton)

## 安装

```
$ yarn add emfooter
```

## 案例演示

[浏览器手机模式在线预览](https://output.jsbin.com/zecepul)

``` vue
<w-footer-wap centerLink="https://www.baidu.com" orderLink="https://www.qq.com" />
```

## API

|参数|说明|类型|是否必填|默认值|
|---|----|---|-------|-----|
|centerText|个人中心文案|String|否|个人中心|
|centerLink|个人中心链接|String|Number|否|wap/personal|
|orderText|我的订单文案|String|是|我的订单|
|orderLink|我的订单链接|String|Number|否|wap/orderlist|
|exitText|退出账号文案|String|是|退出账号|
|logoutAction|退出账号的接口|String|是|无|
|domain|退出账号清除cookie的主域|String|是|evente.cn|
|orgid|主办 id|String|Number|是|无|
|useRouter|是否用 vue-router 跳转|String|Boolean|否|无|

### 方法

|参数|说明|返回值|
|---|----|---|
|logout|退出成功的回调|无|


## 需要的环境

- node.js >= 9.0.0
- npm >= 5.0.0

## 说明

本仓库是用脚手架 [fecli](https://github.com/fe6/fecli)，结合 [component-template](https://github.com/fe6/component-template) 模板生成的。
