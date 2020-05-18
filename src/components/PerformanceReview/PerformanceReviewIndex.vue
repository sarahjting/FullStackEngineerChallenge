<template>
  <div>
    <h1>Performance Reviews</h1>
    <div v-if="isAdmin">
      You are currently viewing all performance reviews.
    </div>
    <div v-else>
      You are currently viewing performance reviews that require your feedback.
    </div>
    <div class="text-right">
      <router-link
        :to="`/performance-review/create`"
        class="btn btn-secondary"
        v-if="isAdmin"
      >
        <b-icon-plus-circle /> Create Review
      </router-link>
    </div>
    <div v-if="$store.state.performanceReviews.length === 0">
      No reviews found.
    </div>
    <table class="table table-striped table-hover mt-3 text-center" v-else>
      <thead>
        <td>
          Created At
        </td>
        <td>
          Performance Review
        </td>
        <td v-if="isAdmin">
          Feedbacks Received
        </td>
      </thead>
      <tr
        v-for="performanceReview in $store.state.performanceReviews"
        :key="performanceReview.id"
      >
        <td>
          {{ formatTime(performanceReview.createdAt) }}
        </td>
        <td>
          <router-link :to="`/performance-review/${performanceReview.id}`">
            <b-icon-person-fill />
            {{ performanceReview.user.name }}
          </router-link>
        </td>
        <td v-if="isAdmin && performanceReview.feedbacks">
          {{
            performanceReview.feedbacks.filter((y) => y.feedback).length +
              '/' +
              performanceReview.feedbacks.length
          }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import utils from '../../utils';
import moment from 'moment';
export default {
  name: 'PerformanceReviewIndex',
  computed: {
    isAdmin: function() {
      return this.$store.state.loggedInUser.isAdmin;
    },
  },
  methods: {
    formatTime: function(timestamp) {
      return moment.unix(timestamp / 1000).format('YYYY/MM/DD');
    },
  },
  mounted: function() {
    if (this.$store.state.loggedInUser.isAdmin) {
      utils.performanceReviews().then((performanceReviews) => {
        this.$store.commit('setPerformanceReviews', performanceReviews);
      });
    } else {
      utils
        .pendingPerformanceReviews(this.$store.state.loggedInUser)
        .then((performanceReviews) => {
          this.$store.commit('setPerformanceReviews', performanceReviews);
        });
    }
  },
};
</script>
