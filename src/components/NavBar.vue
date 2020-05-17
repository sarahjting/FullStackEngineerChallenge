<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">PayPay Assessment</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="$store.state.loggedInUser">
          <router-link to="/performance-reviews" class="nav-link">
            <b-icon-clipboard-data class="mr-1" />
            Performance Reviews
          </router-link>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" v-if="$store.state.loggedInUser">
          <b-nav-item disabled>
            <b-icon-person-fill />
            {{ $store.state.loggedInUser.name }}
          </b-nav-item>
          <b-nav-item href="#" @click="logout()">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <router-link to="/" class="nav-link">
            <b-icon-person />
            Login
          </router-link>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout: function() {
      this.$store.state.loggedInUser = null;
      this.$router.push('/');
    },
  },
};
</script>
