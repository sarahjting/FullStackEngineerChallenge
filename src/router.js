import Vue from 'vue';
import VueRouter from 'vue-router';
import PerformanceReviewIndex from './components/PerformanceReview/PerformanceReviewIndex';
import Login from './components/Login';

Vue.use(VueRouter);

const routes = [
  { path: '/performance-reports', component: PerformanceReviewIndex },
  { path: '/', component: Login },
];

const router = new VueRouter({
  routes, 
});

export default router;
