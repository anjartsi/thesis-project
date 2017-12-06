import HomePage from '@/components/HomePage';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import router from '@/router';

Vue.use(VueRouter);
Vue.use(Vuex);

describe('HomePage.vue', () => {
  it('should render correct title', () => {
    const Constructor = Vue.extend(HomePage);
    const vm = new Constructor({ router }).$mount();
    expect(vm.$el.querySelector('h1.hello').textContent)
      .to.equal('Welcome to Fun with Algorithms!');
  });
});
