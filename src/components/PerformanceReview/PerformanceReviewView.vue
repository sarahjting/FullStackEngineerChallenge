<template>
  <div v-if="performanceReview">
    <h1>{{ performanceReview.user.name }}'s Performance Review</h1>
    <h5>#{{ performanceReview.id }}</h5>

    <div v-if="isAdmin">
      <table class="table table-hover">
        <thead>
          <td> Created At </td>
          <td> Employee </td>
          <td> Feedback </td>
        </thead>
        <tr
          v-for="feedback in performanceReview.feedbacks"
          :key="feedback.id"
        >
          <td>
            {{ formatTime(feedback.createdAt) }}
          </td>
          <td>
            {{ feedback.user.name }}
          </td>
          <td>
            <div v-if="feedback.feedback">
              {{ feedback.feedback }}
            </div>
            <div v-else>
              No feedback has been submitted.
            </div>
          </td>
        </tr>
      </table>
    </div>
    
    <div v-else>
      <b-form @submit="onSubmit" v-if="!isLoading">
        <b-form-group label:="`Submit feedback for ${performanceReview.user.name}`:">
          <b-form-textarea v-model="form.feedback" required></b-form-textarea>
        </b-form-group>
        <b-button type="submit" variant="primary" block>Submit</b-button>
      </b-form>
      <Loader v-else />
    </div>

  </div>
</template>

<script>
import Loader from '../Loader';
import utils from "../../utils";
import moment from "moment";

export default {
  name: 'PerformanceReviewView',
  components: {
    Loader
  },
  data: () => ({
    isLoading: false,
    performanceReview: null,
    form: {
      feedback: '',
    },
  }),
  computed: {
    isAdmin: function() {
      return this.$store.state.loggedInUser.isAdmin;
    },
  },
  methods: {
    formatTime: function(timestamp) {
      return moment.unix(timestamp / 1000).format('YYYY/MM/DD');
    },
    onSubmit: function() {
      this.isLoading = true;
      utils.submitPerformanceReviewFeedback({
        performanceReview: this.performanceReview,
        user: this.$store.state.loggedInUser,
        feedback: this.form.feedback,
      }).then(() => {
        this.isLoading = false;
        this.$router.push('/performance-reviews');
      });
    }
  },
  mounted: function() {
    const performanceReview = this.$store.state.performanceReviews.filter(
      (x) => x.id === this.$route.params.id
    )[0];
    if (!performanceReview) {
      this.$router.push('/performance-reviews');
    } else {
      this.performanceReview = performanceReview;
    }
  },
};
</script>
