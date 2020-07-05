<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/create-sighting">Create Sighting</router-link>
    <router-link to="/profile" v-if="$auth.isAuthenticated">Profile</router-link>
    <router-link to="/external-api">External Api</router-link>
    <a href class="auth" v-if="!$auth.isAuthenticated" @click="login">Login</a>
    <a href class="auth" v-if="$auth.isAuthenticated" @click="logout">Logout</a>
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
  padding-top: 1%;
  padding-bottom: 1%;
}
a {
  margin-left: 2%;
}
.auth {
  float: right;
  margin-right: 2%;
}
</style>