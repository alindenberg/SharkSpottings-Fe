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
              v-for="(type, index) in sharkTypes"
              :key="index"
              v-model="sharkTypesSelected"
              :value="type"
            >{{type}}</b-form-checkbox>
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
export default {
  name: "FilterList",
  data() {
    return {
      isCollapsed: false,
      cityFilters: [],
      sharkTypes: [],
      sharkTypesSelected: []
    };
  },
  created() {
    Axios.get(`${process.env.VUE_APP_API_URL}/sharkTypes`)
      .then(res => {
        this.sharkTypes.push(...res.data);
      })
      .catch(err => (this.formError = err));
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      let cityQueryString = "";
      if (this.cityFilters.length > 0) {
        cityQueryString = `?cities=${this.cityFilters.join(",")}`;
      }

      let sharkTypeQueryString = "";
      if (this.sharkTypesSelected.length > 0) {
        sharkTypeQueryString = `?sharkTypes=${this.sharkTypesSelected.join(
          ","
        )}`;
      }
      Axios.get(
        `${process.env.VUE_APP_API_URL}/sightings${cityQueryString}${sharkTypeQueryString}`
      ).then(res => console.log(res.data));
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