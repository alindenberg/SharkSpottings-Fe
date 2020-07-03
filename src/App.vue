<template>
  <b-container fluid id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/create-sighting">Create Sighting</router-link>
      <router-link  to="/profile" v-if="$auth.isAuthenticated">Profile</router-link>
      <router-link to="/external-api">External Api</router-link>
    </div>
    <router-view />
  </b-container>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
