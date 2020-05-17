<template>
  <div>
    <NavBar />
    <b-container class="container">
      <b-row>
        <b-col offset="1" cols="10">
          <router-view></router-view>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
