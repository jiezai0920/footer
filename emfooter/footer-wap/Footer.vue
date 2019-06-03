<template>
  <div class="wft-wap">
    <div class="wft-wap-imgbox">
      <img class="wft-wap-img" :src="orgImg" alt="logo" />
    </div>
    <nav class="wft-wap-nav">
      <a class="wft-wap-link" href="javascript:;" @click="goCenter">{{centerText}}</a>
      <a class="wft-wap-link" href="javascript:;" @click="goOrder">{{orderText}}</a>
      <a class="wft-wap-link" href="javascript:;" @click="showConform">{{exitText}}</a>
    </nav>
    <img class="wft-wap-em" src="./style/em.png" alt="icon" />
    <modal-wap v-show="confirmStatus" @cancel="cancelExit" @ok="goExit">确定退出当前账号吗？</modal-wap>
    <toast-wap ref="toast"></toast-wap>
  </div>
</template>
<script>
import modal from '@fe6/modal';
import toast from '@fe6/toast';
import emCookie from 'em-cookie';
import ajax from '../tools/ajax';
import logoutpc from '../tools/logoutpc';

export default {
  name: 'WFooterWap',
  data() {
    return {
      confirmStatus: false,
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
  },
  methods: {
    goCenter() {
      if (this.useRouter) {
        this.$router.push(this.centerLink || {
          name: 'Personal',
          query: {
            org_id: this.orgId,
          },
        });
      } else {
        window.location.href = this.centerLink || `${process.env.ACCOUNT || process.env.VUE_APP_ACCOUNT}wap/personal?org_id=${this.orgId}`;
      }
    },
    goOrder() {
      if (this.useRouter) {
        this.$router.push(this.orderLink || {
          name: 'OrderList',
          query: {
            org_id: this.orgId,
          },
        });
      } else {
        window.location.href = this.orderLink || `${process.env.ACCOUNT || process.env.VUE_APP_ACCOUNT}wap/orderlist?org_id=${this.orgId}`;
      }
    },
    showConform() {
      this.confirmStatus = true;
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
  },
  components: {
    ModalWap: modal.ModalWap,
    ToastWap: toast.ToastWap,
    emCookie,
  },
};
</script>
