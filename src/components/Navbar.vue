<template>
  <div id="nav">
    <b-nav pills>
      <b-nav-item :active="$route.path == '/'" to="/">Home</b-nav-item>
      <b-nav-item :active="$route.path == '/create-sighting'" to="/create-sighting">Create Sighting</b-nav-item>
      <b-nav-item
        :active="$route.path == '/profile'"
        to="/profile"
        v-if="$auth.isAuthenticated"
      >Profile</b-nav-item>
      <b-nav-item class="ml-auto" v-if="!$auth.isAuthenticated" @click="login">Login</b-nav-item>
      <b-nav-item class="ml-auto" v-if="$auth.isAuthenticated" @click="logout">Logout</b-nav-item>
    </b-nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style scoped>
#nav {
  background-color: whitesmoke;
  padding: 0.5%;
}
</style>