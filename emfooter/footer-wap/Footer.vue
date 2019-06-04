<template>
  <div class="wft-wap">
    <div class="wft-wap-imgbox">
      <img class="wft-wap-img" :src="orgImg" alt="logo" />
    </div>
    <nav class="wft-wap-nav">
      <a class="wft-wap-link" href="javascript:;" @click="goCenter">{{centerText}}</a>
      <a class="wft-wap-link" href="javascript:;" @click="goOrder">{{orderText}}</a>
      <a class="wft-wap-link" href="javascript:;" @click="showConform">{{isLogined ? exitText : loginText}}</a>
    </nav>
    <img class="wft-wap-em" src="./style/em.png" alt="icon" />
    <modal-wap v-show="confirmStatus" @cancel="cancelExit" @ok="goExit">确定退出当前账号吗？</modal-wap>
    <toast-wap ref="toast"></toast-wap>
    <w-login
      :domain="domain"
      :show="loginStatus"
      :close="loginCloseFn"
      :success="loginSucFn"
      :orgid="orgid"
      :countrycodeAction="countrycodeAction"
      :sendAction="sendAction"
      :loginAction="loginAction"
    ></w-login>
  </div>
</template>
<script>
import modal from '@fe6/modal';
import toast from '@fe6/toast';
import login from 'emlogin';
import emCookie from 'em-cookie';
import ajax from '../tools/ajax';
import logoutpc from '../tools/logoutpc';

export default {
  name: 'WFooterWap',
  data() {
    return {
      confirmStatus: false,
      loginStatus: false,
      isLogined: false,
    };
  },
  props: {
    centerText: {
      type: String,
      default: '个人中心',
    },
    orderText: {
      type: String,
      default: '我的订单',
    },
    exitText: {
      type: String,
      default: '退出账号',
    },
    loginText: {
      type: String,
      default: '登录账号',
    },
    useRouter: Boolean,
    domain: { // 是否cookie存储加 domain
      type: String,
      default: 'evente.cn',
    },
    orgImg: {
      type: String,
      default: 'https://static2.evente.cn/static/img/logo2018v1.svg',
    },
    orgid: [String, Number],
    centerLink: [String, Object],
    orderLink: [String, Object],
    logoutAction: String,
    // 登录相关 start
    // 登录弹框 关闭
    loginClose: {
      type: Function,
      default: () => {},
    },
    // 登录成功
    loginSuccess: {
      type: Function,
      default: () => {},
    },
    countrycodeAction: String,
    sendAction: String,
    loginAction: String,
    // 登录相关 end
  },
  mounted() {
    this.getLoginStatus(this.orgid);
  },
  methods: {
    getLoginStatus(orgid) {
      this.isLogined = !!window.$cookie.get(`Authorization?org_id=${orgid}`);
    },
    goCenter() {
      if (this.useRouter) {
        this.$router.push(this.centerLink || {
          name: 'Personal',
          query: {
            org_id: this.orgid,
          },
        });
      } else {
        console.log(this.centerLink || `${process.env.ACCOUNT || process.env.VUE_APP_ACCOUNT}wap/personal?org_id=${this.orgid}`, 111);
        window.location.href = this.centerLink || `${process.env.ACCOUNT || process.env.VUE_APP_ACCOUNT}wap/personal?org_id=${this.orgid}`;
      }
    },
    goOrder() {
      if (this.useRouter) {
        this.$router.push(this.orderLink || {
          name: 'OrderList',
          query: {
            org_id: this.orgid,
          },
        });
      } else {
        window.location.href = this.orderLink || `${process.env.ACCOUNT || process.env.VUE_APP_ACCOUNT}wap/orderlist?org_id=${this.orgid}`;
      }
    },
    showConform() {
      if (this.isLogined) {
        this.confirmStatus = true;
      } else {
        this.showLoginFn();
      }
    },
    cancelExit() {
      this.confirmStatus = false;
    },
    goExit() {
      this.cancelExit();
      this.getLoginOutUrl();
    },
    getLoginOutUrl() {
      ajax({
        type: 'GET',
        action: `${this.logoutAction}?org_id=${this.orgid}`,
        onSuccess: (res) => {
          if (res.code === 10000) {
            logoutpc(res, this.orgid, this, () => {
              this.$emit('logout');
            });
          } else {
            this.handleAjaxError(res.message);
          }
        },
        onError: () => {
          this.handleAjaxError();
        },
      });
    },
    handleAjaxError() {
      this.$refs.toast.$emit('show', {
        status: true,
        content: '退出失败',
        icon: 'error',
      });
    },
    // 登录相关 start
    showLoginFn() {
      this.loginStatus = true;
      this.$emit('login');
    },
    loginSucFn() {
      this.getLoginStatus(this.orgid);
      this.loginSuccess();
    },
    loginCloseFn() {
      this.loginStatus = false;
      this.loginClose();
    },
    // 登录相关 end
  },
  watch: {
    orgid(val) {
      this.getLoginStatus(val);
    },
  },
  components: {
    ModalWap: modal.ModalWap,
    ToastWap: toast.ToastWap,
    WLogin: login.WapTem,
    emCookie,
  },
};
</script>
