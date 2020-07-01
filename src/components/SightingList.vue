<template>
  <div>
    <sighting class="sighting" v-for="(sighting, index) in sightings" :key="index" :sighting="sighting" />
  </div>
</template>

<script>
import Axios from "axios"
import Sighting from "./Sighting"
export default {
  name: "SightingList",
  components: {
    sighting: Sighting
  },
  data() {
    return {
      sightings: []
    }
  },
  created() {
    Axios.get(`${process.env.VUE_APP_API_URL}/sightings`).then(sightings => {
        this.sightings.push(...sightings.data)
    })
  }
}
</script>

<style>
.sighting {
  margin-bottom: 2%;
}
</style>