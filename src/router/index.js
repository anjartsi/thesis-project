import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/components/HomePage';
import StableMarriage from '@/components/stable-marriage/StableMarriage';
import IntervalScheduling from '@/components/interval-scheduling/IntervalScheduling';

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
    {
      path: '/interval-scheduling',
      name: 'Interval Scheduling',
      component: IntervalScheduling,
    },
  ],
});
