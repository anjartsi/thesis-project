import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import StableMarriage from '@/components/stable-marriage/StableMarriage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage,
    },
    {
      path: '/stable-marriage',
      name: 'Stable Marriage',
      component: StableMarriage,
    },
  ],
});
