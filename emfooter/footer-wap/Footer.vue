<template>
  <div class="wft-wap">
    <div class="wft-wap-imgbox" v-if="orgImg && isAll">
      <img class="wft-wap-img" :src="orgImg" alt="logo" />
    </div>
    <nav class="wft-wap-nav" :class="{
      ['wft-wap-nav-no']: !orgImg,
    }" v-if="isAll">
      <a class="wft-wap-link" href="javascript:;" @click="goCenter">{{centerText}}</a>
      <a class="wft-wap-link" href="javascript:;" @click="goOrder">{{orderText}}</a>
      <a class="wft-wap-link" href="javascript:;" @click="showConform">{{isLogined ? exitText : loginText}}</a>
    </nav>
    <a href="https://www.evente.cn" class="wft-wap-em-link">
      <img class="wft-wap-em" :src="`//static2.evente.cn/static/img/emfooter-logo-${logoColor}.png`" alt="icon" />
    </a>
    <a class="wft-wap-complaint" :class="{
      ['wft-wap-complaint-white']: logoColor === 'white'
    }" href="javascript:;" v-if="complaint" @click="goComplaint">投诉</a>
    <modal-wap v-show="confirmStatus" @cancel="cancelExit" @ok="goExit" :style="{ zIndex: zIndexModal }" v-if="isAll" :title="modalTitle">{{modalContent}}</modal-wap>
    <toast-wap ref="toast" v-if="isAll"></toast-wap>
    <w-login-wap
      v-if="isAll"
      style="z-index:101;"
      :domain="newDomain"
      :show="loginStatus"
      :close="loginCloseFn"
      :success="loginSucFn"
      :orgid="orgid"
      :countrycodeAction="countrycodeAction"
      :sendAction="sendAction"
      :loginAction="loginAction"
      :style="{zIndex: zIndexLogin}"
      :lang="lang"
      :sendEnglishAction="sendEnglishAction"
      :loginEnglishAction="loginEnglishAction"
      :title="loginTitle"
      :btnText="btnText"
      :subingText="subingText"
      :sendingText="sendingText"
      :telEmptyText="telEmptyText"
      :telFormatErrorText="telFormatErrorText"
      :smsBtnText="smsBtnText"
      :smsPlaceholder="smsPlaceholder"
      :telPlaceholder="telPlaceholder"
      :desc="desc"
    ></w-login-wap>

  </div>
</template>
<script>
import modal from '@fe6/modal';
import toast from '@fe6/toast';
import login from 'emlogin';
import emCookie from 'em-cookie';
import ajax from '../tools/ajax';
import logoutpc from '../tools/logoutpc';
import { hasOwn } from '../tools/o';

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
    modalTitle: {
      type: String,
      default: '提示',
    },
    modalContent: {
      type: String,
      default: '确定退出当前账号吗？',
    },
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
    productId: [Number, String],
    productType: String,
    useRouter: Boolean,
    complaint: Boolean,
    logoColor: {
      type: String,
      default: 'gray',
    },
    domain: String,
    orgImg: String,
    userId: String,
    orgid: [String, Number],
    centerLink: [String, Object],
    orderLink: [String, Object],
    complaintLink: [String, Object],
    logoutAction: String,
    env: Object,
    zIndexModal: {
      type: Number,
      default: 99,
    },
    mode: {
      type: String,
      default: 'all', // none
    },
    // 登录相关 start
    zIndexLogin: {
      type: Number,
      default: 99,
    },
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
    lang: {
      type: String,
      default: 'zh_CN',
    },
    sendEnglishAction: String,
    loginEnglishAction: String,
    loginTitle: {
      type: String,
      default: '请完善手机信息',
    },
    desc: {
      type: String,
      default: '成功短信将发送至该手机',
    },
    telPlaceholder: {
      type: String,
      default: '输入手机号',
    },
    smsPlaceholder: {
      type: String,
      default: '输入验证码',
    },
    smsBtnText: {
      type: String,
      default: '获取验证码',
    },
    telFormatErrorText: {
      type: String,
      default: '手机号格式有误',
    },
    telEmptyText: {
      type: String,
      default: '输入手机号',
    },
    sendingText: {
      type: String,
      default: '获取中',
    },
    subingText: {
      type: String,
      default: '正在提交...',
    },
    btnText: {
      type: String,
      default: '确定',
    },
    // 登录相关 end
  },
  computed: {
    isAll() {
      return this.mode === 'all';
    },
    newDomain() {
      let domain = '';
      if (this.env && hasOwn(this.env, 'NODE_ENV')) {
        const host = 'evente.cn';
        if (this.env.NODE_ENV === 'production') {
          domain = host;
        } else if (this.env.NODE_ENV === 'labing') {
          domain = `lab.${host}`;
        } else if (this.env.NODE_ENV === 'testing') {
          domain = `inner.${host}`;
        } else {
          domain = '';
        }
      }

      return this.domain || domain;
    },
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
        window.location.href = this.centerLink || `${this.env.ACCOUNT || this.env.VUE_APP_ACCOUNT}wap/personal?org_id=${this.orgid}`;
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
        window.location.href = this.orderLink || `${this.env.ACCOUNT || this.env.VUE_APP_ACCOUNT}wap/orderlist?org_id=${this.orgid}`;
      }
    },
    goComplaint() {
      if (this.useRouter) {
        const query = { org_id: this.orgid };
        if (this.productId) {
          query.product_id = this.productId;
        }
        if (this.productType) {
          query.product_type = this.productType;
        }
        if (this.userId) {
          query.user_id = this.userId;
        }
        this.$router.push(this.complaintLink || {
          name: 'Complaint',
          query,
        });
      } else {
        window.location.href = this.complaintLink || `${this.env.ACCOUNT || this.env.VUE_APP_ACCOUNT}wap/complaint?org_id=${this.orgid}${this.productId ? `&product_id=${this.productId}` : ''}${this.productType ? `&product_type=${this.productType}` : ''}${this.userId ? `&user_id=${this.userId}` : ''}`;
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
              this.getLoginStatus(this.orgid);
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
