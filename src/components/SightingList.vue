<template>
  <div>
    <sighting
      class="sighting"
      v-for="(sighting, index) in sightings"
      :key="index"
      :sighting="sighting"
      @sighting-deleted="sightingDeleted(index)"
    />
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
</style>