<template>
  <div>
    <b-btn v-b-toggle.filters>
      Filters
      <strong v-if="isCollapsed" aria-hidden="true" class="ml-auto">
        <b-icon icon="arrow-up"></b-icon>
      </strong>
      <strong v-else aria-hidden="true" class="ml-auto">
        <b-icon icon="arrow-down"></b-icon>
      </strong>
    </b-btn>
    <b-collapse v-model="isCollapsed" id="filters">
      <b-form @submit="onSubmit" @reset="onReset">
        <!-- SHARK TYPE FILTER -->
        <b-form-group label="Shark Type:">
          <b-form-group id="shark-type-list">
            <b-form-checkbox
              v-for="(key, index) in sharkTypeMap.keys()"
              :key="index"
              v-model="sharkTypesSelected"
              :value="key"
            >{{sharkTypeMap.get(key)}}</b-form-checkbox>
          </b-form-group>
        </b-form-group>
        <!-- CITY FILTER -->
        <div>
          <label for="city-filters">Cities:</label>
          <b-form-tags input-id="city-filters" v-model="cityFilters" class="mb-2"></b-form-tags>
        </div>
        <!-- SUBMIT -->
        <section id="submit">
          <b-row class="justify-content-center">
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-row>
        </section>
      </b-form>
    </b-collapse>
  </div>
</template>

<script>
import Axios from "axios";
import SharkTypeJson from "../assets/sharkTypes.json";
export default {
  name: "FilterList",
  data() {
    return {
      isCollapsed: false,
      cityFilters: [],
      sharkTypes: [],
      sharkTypeMap: new Map(),
      sharkTypesSelected: []
    };
  },
  created() {
    for (let key in SharkTypeJson) {
      this.sharkTypeMap.set(key, SharkTypeJson[key]);
      this.sharkTypes.push(SharkTypeJson[key]);
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      let queryString = "?";
      if (this.cityFilters.length > 0) {
        queryString += `cities=${this.cityFilters.join(",")}&`;
      }
      if (this.sharkTypesSelected.length > 0) {
        queryString += `sharkTypes=${this.sharkTypesSelected.join(",")}&`;
      }
      Axios.get(`${process.env.VUE_APP_API_URL}/sightings${queryString}`).then(
        res => {
          this.$emit("sightings-updated", res.data);
        }
      );
    },
    onReset(evt) {
      evt.preventDefault();
    }
  }
};
</script>
<style scoped>
#submit {
  margin-top: 2%;
}
</style>