<template>
  <div>
    <h1>Create Performance Review</h1>

    <b-form @submit="onSubmit" v-if="!isLoading">
      <b-form-group label="Employee:">
        <b-form-select
          v-model="form.user"
          :options="userOptions"
        ></b-form-select>
      </b-form-group>
      <b-form-group label="To give feedback:">
        <b-form-checkbox-group
          v-model="form.feedbackUsers"
          :options="userOptions"
          name="feedbackUserIds"
        ></b-form-checkbox-group>
      </b-form-group>
      <b-button type="submit" variant="primary" block>Submit</b-button>
    </b-form>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from '../Loader';
import utils from '../../utils';
import moment from 'moment';

export default {
  name: 'PerformanceReviewCreate',
  components: {
    Loader,
  },
  data: () => ({
    isLoading: false,
    users: [],
    form: {
      user: '',
      feedbackUsers: '',
    },
  }),
  computed: {
    userOptions: function() {
      return this.users.map((x) => ({
        value: x,
        text: x.name,
      }));
    },
  },
  methods: {
    onSubmit: function() {
      this.isLoading = true;
      utils
        .createPerformanceReview({
          user: this.form.user,
          feedbackUsers: this.form.feedbackUsers,
        })
        .then(() => {
          this.isLoading = false;
          this.$router.push('/performance-reviews');
        });
    },
  },
  mounted: function() {
    utils.users().then((x) => (this.users = x));
  },
};
</script>
