// 组件
import WFooterWap from './footer-wap/index';

import WapTem from './footer-wap/Footer';

const waterCpt = {
  WFooterWap,
};

const install = (Vue) => {
  if (install.installed) return;

  Object.keys(waterCpt).forEach((key) => {
    Vue.component(key, waterCpt[key]);
  });
};


if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  WapTem,
};
