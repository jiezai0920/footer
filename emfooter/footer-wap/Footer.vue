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
      <a v-if="isShowLang" class="wft-wap-link" href="javascript:;" @click="languageFun">{{language}}</a>
      <a class="wft-wap-link" href="javascript:;" @click="showConform">{{isLogined ? exitText : loginText}}</a>
    </nav>
    <a href="https://www.evente.cn" class="wft-wap-em-link">
      <img class="wft-wap-em" :src="`https://objects.evente.cn/assets/brand/piaodada/footer-support-logo-${logoColor}.png`" alt="icon" />
    </a>
    <a class="wft-wap-complaint" :class="{
      ['wft-wap-complaint-white']: logoColor === 'white'
    }" href="javascript:;" v-if="complaint" @click="goComplaint">投诉</a>
    <modal-wap v-show="confirmStatus" @cancel="cancelExit" @ok="goExit" :style="{ zIndex: zIndexModal }" v-if="isAll" :title="modalTitle" :okText="okText" :cancelText="cancelText">{{modalContent}}</modal-wap>
    <toast-wap ref="toast" v-if="isAll"></toast-wap>
    <div v-if="loginStatus">  
      <w-login-wechat
        v-if="isAll"
        style="z-index:101;"
        :lang="lang"
        :domain="newDomain"
        :show="loginStatus"
        :close="loginCloseFn"
        :success="loginSucFn"
        :orgid="orgid"
        :countrycodeAction="countrycodeAction"
        :sendAction="sendAction"
        :loginAction="loginAction"
        :style="{zIndex: zIndexLogin}"
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
        :oauthkey="oauthKey"
        :oauthType="oauthType"
        :wechatUrl="wechatUrl"
        :resultJson="resultJson"
        :loginConfirmAction="loginConfirmAction"
        :loginRegisterAction="loginRegisterAction"
        :autologinAction="autologinAction"
        :wechatLoginAction="wechatLoginAction"
        :bindWechatAction="bindWechatAction"
        :isShowEmail="isShowEmail"
        :isShowWechat="isShowWechat"
        :protocolsAction="protocolsAction"
        :env="env"
      ></w-login-wechat>
    </div>
  </div>
</template>
<script>
import modal from '@fe6/modal';
import toast from '@fe6/toast';
import login from 'emfelogin';
import emCookie from 'em-cookie';
import logoutpc from '../tools/logoutpc';
import { hasOwn } from '../tools/o';

export default {
  name: 'WFooterWap',
  data() {
    return {
      confirmStatus: false,
      loginStatus: false,
      isLogined: false,
      language: '中文',
      isChina: false,
      loginState: false,
      clickFlag: '',
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
    confirmAction: String,
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
    okText: {
      type: String,
      default: '确定',
    },
    cancelText: {
      type: String,
      default: '取消',
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    // 登录相关 end
    langHandle: Function,
    oauthKey: {
      type: String,
    },
    oauthType: {
      type: String,
    },
    wechatUrl: {
      type: String,
    },
    loginConfirmAction: {
      type: String,
    },
    loginRegisterAction: {
      type: String,
    },
    autologinAction: {
      type: String,
    },
    wechatLoginAction: {
      type: String,
    },
    protocolsAction: {
      type: String,
    },
    bindWechatAction: {
      type: String,
    },
    isShowLang: {
      type: Boolean,
      default: true,
    },
    resultJson: Object,
    isShowEmail: {
      type: Boolean,
    },
    isShowWechat: {
      type: Boolean,
    },
  },
  computed: {
    isAll() {
      return this.mode === 'all';
    },
    newDomain() {
      let domain = '';
      if (this.env && hasOwn(this.env, 'NODE_ENV')) {
        domain = document.domain.split('.').slice(-2).join('.');
        if (process.env.NODE_ENV === 'development') {
          domain = '';
        }
      }

      return this.domain || domain;
    },
  },
  mounted() {
    this.loginState = this.isLogin;
    this.getLoginStatus(this.orgid);

    this.lang = this.lang || window.$cookie.get('locale') || 'zh_CN';
    this.isChina = this.lang === 'zh_CN';
    this.language = this.isChina ? 'English' : '中文';

    if (this.oauthKey) {
      this.loginStatus = true;
    }
  },
  methods: {
    getLoginStatus(orgid) {
      this.isLogined = !!window.$cookie.get(`EMTOKEN_${orgid}`) || this.loginState;
    },
    goCenter() {
      if (this.isLogined) {
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
      } else {
        this.showLoginFn();
        this.clickFlag = 'goCenter';
      }
    },
    goOrder() {
      if (this.isLogined) {
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
      } else {
        this.showLoginFn();
        this.clickFlag = 'goOrder';
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
      logoutpc(this.orgid, this, () => {
        this.loginState = false;
        this.getLoginStatus(this.orgid);
        this.$emit('logout');
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
      if (this.clickFlag === 'goCenter') {
        this.goCenter();
      }
      if (this.clickFlag === 'goOrder') {
        this.goOrder();
      }
      this.clickFlag = '';
    },
    loginCloseFn() {
      this.loginStatus = false;
      this.loginClose();
    },
    // 登录相关 end
    // // 语言
    languageFun() {
      const locale = this.isChina ? 'en_US' : 'zh_CN';
      this.setLocale(locale);
      setTimeout(() => {
        if (this.langHandle) {
          this.langHandle();
        } else {
          window.location.reload();
        }
      }, 100);
    },
    setLocale(locale) {
      window.$cookie.set('locale', locale, '1m', '/', this.newDomain || '');
    },
  },
  watch: {
    orgid(val) {
      this.getLoginStatus(val);
    },
    isLogin(val) {
      this.loginState = val;
      this.getLoginStatus(this.orgid);
    },
  },
  components: {
    ModalWap: modal.ModalWap,
    ToastWap: toast.ToastWap,
    WLoginWechat: login.WapWechat,
    emCookie,
  },
};
</script>
