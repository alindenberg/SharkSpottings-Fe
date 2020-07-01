<template>
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <b-row v-if="!$auth.loading" class="justify-content-center">
      <b-col sm="6">
          <!-- show login when not authenticated -->
        <button v-if="!$auth.isAuthenticated" @click="login">Log in</button>
        <!-- show logout when authenticated -->
        <button v-if="$auth.isAuthenticated" @click="logout">Log out</button>
        <sighting-list />
      </b-col>
    </b-row>
</template>
<script>
import SightingList from "../components/SightingList"
export default {
    name: "Home",
    components: {
        "sighting-list": SightingList
    },
    methods: {
        login() {
            this.$auth.loginWithRedirect();
        },
        logout() {
            this.$auth.logout({
                returnTo: window.location.origin
            });
        }
    },
}
</script>

<style>

</style>