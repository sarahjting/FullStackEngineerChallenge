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
import Loader from "./Loader";
export default {
  name: "Login",
  components: { Loader },
  data: () => ({
    form: {
      name: ""
    },
    isLoading: false
  }),
  methods: {
    onSubmit: function() {
      this.$store.commit("setLoggedInUser", this.form);
      this.$router.push("performance-reports");
      this.form = {
        name: ""
      };
    }
  },
  mounted: function() {
    if (this.$store.loggedInUser) {
      this.$router.push("performance-reports");
    }
  }
};
</script>
