import Vue from 'vue';
import VueRouter from 'vue-router';
import PerformanceReviewIndex from './components/PerformanceReview/PerformanceReviewIndex';
import PerformanceReviewView from './components/PerformanceReview/PerformanceReviewView';
import PerformanceReviewCreate from './components/PerformanceReview/PerformanceReviewCreate';
import Login from './components/Login';
import store from './vuex';

Vue.use(VueRouter);

const routes = [
  {
    path: '/performance-reviews',
    component: PerformanceReviewIndex,
    name: 'performanceReviewIndex',
  },
  {
    path: '/performance-review/create',
    component: PerformanceReviewCreate,
    name: 'performanceReviewCreate',
  },
  {
    path: '/performance-review/:id',
    component: PerformanceReviewView,
    name: 'performanceReviewView',
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
