<template>
  <div>
    <navbar></navbar>
    <b-container fluid id="app">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/Navbar"
export default {
  name: 'App',
  components: {
    navbar: NavBar
  }
}
</script>

<style>
html, #app {
  background-color: #80d4ff;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 2%;
}
</style>
