<template>
  <div>
    <navbar></navbar>
    <b-container fluid id="app">
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/Navbar";
export default {
  name: "App",
  components: {
    navbar: NavBar
  }
};
</script>

<style>
body {
  background-image: url("./assets/sharkBackground.jpg");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-top: 2%;
}
/* Google places widget - always bring autocomplete suggestion modal to front */
.pac-container {
  z-index: 1051 !important;
}
</style>
