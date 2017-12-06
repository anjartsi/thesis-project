import StableMarriage from '@/components/stable-marriage/StableMarriage';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import router from '@/router';

Vue.use(VueRouter);
Vue.use(Vuex);

describe('stable-marriage/StableMarriage.vue', () => {
  it('should render correct title in second navbar', () => {
    const Constructor = Vue.extend(StableMarriage);
    const vm = new Constructor({ router }).$mount();
    expect(vm.$el.querySelector('#navbar2 div.navbar-brand').textContent)
      .to.equal('Stable Marriage');
  });
});
