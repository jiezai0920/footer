# 底部弹框(wap)
> 基于Vue.js 的 前端业务组件。

## 没有主办图片的

[浏览器手机模式在线预览](https://output.jsbin.com/zecepul)

<w-footer-wap
  centerLink="https://www.baidu.com"
  orderLink="https://www.qq.com"
  orgid="100015"
  :loginAction="loginAction"
  :countrycodeAction="countrycodeAction"
  :sendAction="sendAction"
/>

## 主办图片

[浏览器手机模式在线预览](https://output.jsbin.com/cetuwip)

<w-footer-wap
  centerLink="https://www.baidu.com"
  orderLink="https://www.qq.com"
  orgid="100015"
  orgImg="https://2img.evente.cn/7b/7b/81/a9b42253e54228e580d3b898be.jpg"
  :loginAction="loginAction"
  :countrycodeAction="countrycodeAction"
  :sendAction="sendAction"
/>

## 只有底部图片

[浏览器手机模式在线预览](https://output.jsbin.com/jeferij)

<w-footer-wap mode="none" />

## API

<div style="width: 100%; overflow: auto">
  <table>
  <thead>
    <tr><th>参数</th><th>说明</th><th>类型</th><th>是否必填</th><th>默认值</th></tr>
  </thead>
  <tbody>
    <tr><td>centerText</td><td>个人中心文案</td><td>String</td><td>否</td><td>个人中心</td></tr>
    <tr><td>centerLink</td><td>个人中心链接</td><td>String|Number</td><td>否</td><td>wap/personal</td></tr>
    <tr><td>orderText</td><td>我的订单文案</td><td>String</td><td>是</td><td>我的订单</td></tr>
    <tr><td>orderLink</td><td>我的订单链接</td><td>String|Number</td><td>否</td><td>wap/orderlist</td></tr>
    <tr><td>exitText</td><td>退出账号文案</td><td>String</td><td>是</td><td>退出账号</td></tr>
    <tr><td>logoutAction</td><td>退出账号的接口</td><td>String</td><td>是</td><td>无</td></tr>
    <tr><td>domain</td><td>退出账号清除cookie的主域</td><td>String</td><td>是</td><td>evente.cn</td></tr>
    <tr><td>env</td><td>环境(process.env)用于连接跳转</td><td>Object</td><td>是</td><td>无</td></tr>
    <tr><td>zIndexModal</td><td>确认弹框的层级</td><td>Number</td><td>是</td><td>99</td></tr>
    <tr><td>zIndexLogin</td><td>登录弹框的层级</td><td>Number</td><td>是</td><td>99</td></tr>
    <tr><td>orgid</td><td>主办 id</td><td>String|Number</td><td>是</td><td>无</td></tr>
    <tr><td>orgImg</td><td>主办 定制白标</td><td>String</td><td>是</td><td>无</td></tr>
    <tr><td>useRouter</td><td>是否用 vue-router 跳转</td><td>Boolean</td><td>否</td><td>无</td></tr>
    <tr><td>loginClose</td><td>登录弹框关闭</td><td>Function</td><td>否</td><td>() => {}</td></tr>
    <tr><td>loginSuccess</td><td>登录成功</td><td>Function</td><td>否</td><td>() => {}</td></tr>
    <tr><td>loginSuccess</td><td>登录成功</td><td>Function</td><td>否</td><td>() => {}</td></tr>
    <tr><td>mode</td><td>底部的模式，可选: all, none 。 all展示主办图片和快捷入口，none只展示。 0.3.0 新增。</td><td>String</td><td>否</td><td>all</td></tr>
  </tbody>
  </table>
</div>

### 方法

|参数|说明|返回值|
|---|----|---|
|logout|退出成功的回调|无|
|login|点击登录|无|

<script>
import WFooterWap from './Footer';

export default {
  data() {
    return {
      show: false,
      loginAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
      countrycodeAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/countrycode',
      sendAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/smssend',
    }
  },
  components: {
    WFooterWap,
  },
  mounted() {
    document.getElementsByTagName('html')[0].className = 'html';
  },
  beforeDestroy() {
    document.getElementsByTagName('html')[0].className = '';
  },
  methods: {
    success(res) {
      console.log(res, '登录');
    },
  },
}
</script>
<style lang="scss" scope>
@import './style/footer.scss';

.html {
  font-size: 37.5px;

  & .navbar {
    height: 34px;
    box-sizing: content-box;
    line-height: 34px;
    padding: 12px 24px;

    & a {
      line-height: 32px;
    }

    & .site-name {
      font-size: 30px;
    }

    & .links {
      right: 24px;
      top: 12px;
      line-height: 32px;
    }
  }

  & .sidebar {
    width: 32%;
    top: 57.6px;
  }

  & .page {
    padding-left: 32%;
  }

  & h1 {
    font-size: 42px;
  }

  & h2 {
    font-size: 38px;
  }

  & pre,
  & pre[class*="language-"] {
    padding: 20px 24px;

    &::before {
      font-size: 16px;
    }
  }

  & blockquote {
    font-size: 20px;
  }

  & .content code {
    padding: 4px 8px;
  }

  & .search-box input {
    height: 32px;
    width: 200px;
    padding: 0 8px 0 32px;
    background-size: 20px;
    background-position: 6px 6px;
  }
}

.demo-box {
  padding: 30px 0;
}

.html .page,
.content:not(.custom) {
  padding: 0 !important;
}

.html .sidebar {
  width: 260px;
}

</style>
