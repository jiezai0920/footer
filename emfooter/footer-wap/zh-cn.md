# 底部弹框(wap)
> 基于Vue.js 的 前端业务组件。

## 案例演示

[浏览器手机模式在线预览](https://output.jsbin.com/zecepul)

<w-footer-wap centerLink="https://www.baidu.com" orderLink="https://www.qq.com" />

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

<script>
import WFooterWap from './Footer';

export default {
  data() {
    return {
      show: false,
      loginAction: 'https://www.easy-mock.com/mock/5ab386ecca15e11ded65b593/chinese/login',
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
    click() {
      this.show = true;
    },
    close(val) {
      this.show = val;
    },
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

</style>
