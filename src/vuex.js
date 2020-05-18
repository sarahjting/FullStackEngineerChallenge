import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedInUser: null,
    performanceReviews: [],
  },
  mutations: {
    setLoggedInUser: (state, user) => {
      state.loggedInUser = user;
    },
    setPerformanceReviews: (state, performanceReviews) => {
      state.performanceReviews = performanceReviews;
    },
  },
});
