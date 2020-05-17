<template>
  <div>
    <h1>Login</h1>
    <b-form @submit="onSubmit" v-if="!isLoading">
      <b-form-group>
        <b-form-input
          v-model="form.name"
          placeholder="Enter name (Try 'Admin' or 'User 1')"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" block>Login</b-button>
    </b-form>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from './Loader';
import utils from '../utils';
export default {
  name: 'Login',
  components: { Loader },
  data: () => ({
    form: {
      name: '',
    },
    isLoading: false,
  }),
  methods: {
    onSubmit: function() {
      this.isLoading = true;
      utils.user(this.form.name).then((x) => {
        if (x) {
          this.$store.commit('setLoggedInUser', this.form);
          this.$router.push('/performance-reviews');
          this.form = {
            name: '',
          };
        }
        this.isLoading = false;
      });
    },
  },
  mounted: function() {
    if (this.$store.state.loggedInUser) {
      this.$router.push('/performance-reviews');
    }
  },
};
</script>
