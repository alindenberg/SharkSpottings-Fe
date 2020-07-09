<template>
  <div>
    <sighting
      class="sighting"
      v-for="(sighting, index) in sightings"
      :key="index"
      :sighting="sighting"
      @sighting-deleted="sightingDeleted(index)"
    />
    <b-row v-if="sightings.length === 0" id="emptyList" class="justify-content-center">
      <b-col class="text-center">
        <h2>No sightings found. Create one now!</h2>
        <b-btn @click="$router.replace('/create-sighting')" variant="link" size="lg">Create Sighting</b-btn>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Sighting from "./Sighting";
export default {
  name: "SightingList",
  components: {
    sighting: Sighting
  },
  props: {
    sightings: Array
  },
  methods: {
    sightingDeleted(index) {
      this.sightings.splice(index, 1);
    }
  }
};
</script>

<style>
.sighting {
  margin-bottom: 2%;
}
#emptyList {
  margin: 15% 2% 0% 2%;
  padding: 10%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 5px 5px grey;
}
</style>