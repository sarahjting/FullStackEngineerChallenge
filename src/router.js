import Vue from 'vue';
import VueRouter from 'vue-router';
import PerformanceReviewIndex from './components/PerformanceReview/PerformanceReviewIndex';
import Login from './components/Login';
import store from './vuex';
import { BIconExclamationSquareFill } from 'bootstrap-vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/performance-reviews',
    component: PerformanceReviewIndex,
    name: 'performanceReviewIndex',
  },
  { path: '/', component: Login, name: 'login' },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.loggedInUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
