<template>
  <!-- Check that the SDK client is not currently loading before accessing is methods -->
  <b-row v-if="!$auth.loading" id="home">
    <b-col sm="3"></b-col>
    <b-col sm="6">
      <sighting-list />
    </b-col>
    <b-col sm="3">
      <filter-list />
    </b-col>
  </b-row>
</template>
<script>
import FilterList from "../components/FilterList";
import SightingList from "../components/SightingList";
export default {
  name: "Home",
  components: {
    "filter-list": FilterList,
    "sighting-list": SightingList
  }
};
</script>

<style scoped>
#home {
  margin-top: 10px;
}
</style>