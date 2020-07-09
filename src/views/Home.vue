<template>
  <!-- Check that the SDK client is not currently loading before accessing is methods -->
  <b-row v-if="!$auth.loading" id="home">
    <b-col sm="3"></b-col>
    <b-col sm="6">
      <sighting-list :sightings="sightings" />
    </b-col>
    <b-col sm="3"></b-col>
  </b-row>
</template>
<script>
import { getAllSightings } from "../services/sightingService";
import SightingList from "../components/SightingList";
export default {
  name: "Home",
  components: {
    "sighting-list": SightingList
  },
  data() {
    return {
      sightings: []
    };
  },
  async created() {
    await getAllSightings().then(sightings =>
      this.sightings.push(...sightings)
    );
  }
};
</script>

<style scoped>
#home {
  margin-top: 10px;
}
</style>