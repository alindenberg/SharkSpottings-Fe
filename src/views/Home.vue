<template>
    <!-- Check that the SDK client is not currently loading before accessing is methods -->
    <b-row v-if="!$auth.loading" id="home" class="justify-content-center">
      <b-col sm="6">
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
    }
}
</script>

<style scoped>
#home {
    margin-top: 10px;
}
</style>