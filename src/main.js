// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap';
import Vue from 'vue';
import axios from 'axios';
import App from './App';
import router from './router';

require('bootstrap/dist/css/bootstrap.min.css');
require('font-awesome/less/font-awesome.less');

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
