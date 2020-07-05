<template>
  <div>
    <sighting
      class="sighting"
      v-for="(sighting, index) in sightings"
      :key="index"
      :sighting="sighting"
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
  }
};
</script>

<style>
.sighting {
  margin-bottom: 2%;
}
</style>