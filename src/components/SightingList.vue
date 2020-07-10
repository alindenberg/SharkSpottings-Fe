<template>
  <div>
    <filter-list id="filter-list" @sightings-updated="onSightingsUpdated"></filter-list>
    <sighting
      class="sighting"
      v-for="(sighting, index) in sightings"
      :key="index"
      :sighting="sighting"
      @sighting-deleted="onSightingDeleted(index)"
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
import FilterList from "./FilterList";
import Sighting from "./Sighting";
export default {
  name: "SightingList",
  components: {
    "filter-list": FilterList,
    sighting: Sighting
  },
  props: {
    sightings: Array
  },
  methods: {
    onSightingDeleted(index) {
      this.sightings.splice(index, 1);
    },
    onSightingsUpdated(newList) {
      this.sightings.splice(0);
      this.sightings.push(...newList);
    }
  }
};
</script>

<style scoped>
.sighting,
#filter-list {
  margin-bottom: 2%;
}
.sighting {
  box-shadow: 2px 2px 2px 2px grey;
}
#emptyList {
  margin: 2% 0% 2%;
  padding: 10%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 5px 5px grey;
}
</style>