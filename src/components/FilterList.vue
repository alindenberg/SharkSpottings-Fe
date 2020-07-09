<template>
  <div>
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block v-b-toggle.filters variant="info">Show Filters</b-button>
      </b-card-header>
      <b-collapse id="filters" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group label="Shark Type:">
              <b-row class="justify-content-center">
                <b-col sm="5" v-for="(key, index) in sharkTypeMap.keys()" :key="index">
                  <b-form-checkbox
                    v-model="sharkTypesSelected"
                    :value="key"
                  >{{sharkTypeMap.get(key)}}</b-form-checkbox>
                </b-col>
              </b-row>
            </b-form-group>
            <b-form-group label="City:" label-for="shark-city-input">
              <google-places
                class="autocomplete form-control"
                types="(cities)"
                country="us"
                ref="city"
                id="autocomplete"
                placeholder="Enter a city"
                v-on:placechanged="onPlaceChanged"
              />
            </b-form-group>
            <section>
              <b-row class="justify-content-center" id="cityFilters">
                <b-btn size="sm" id="cityTagBtn" v-for="(city, index) in cityFilters" :key="index">
                  {{city}}
                  <b-icon @click="cityFilters.splice(index, 1)" icon="x-circle" />
                </b-btn>
              </b-row>
            </section>
            <section id="submit">
              <b-row class="justify-content-center">
                <b-button type="submit" variant="primary">Filter</b-button>
              </b-row>
            </section>
          </b-form>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
import VueGoogleAutocomplete from "vue-google-autocomplete";
import SharkTypeJson from "../assets/sharkTypes.json";
import { getAllSightings } from "../services/sightingService";
export default {
  name: "FilterList",
  components: {
    "google-places": VueGoogleAutocomplete
  },
  data() {
    return {
      isCollapsed: false,
      cityFilters: [],
      sharkTypeMap: new Map(),
      sharkTypesSelected: []
    };
  },
  created() {
    for (let key in SharkTypeJson) {
      this.sharkTypeMap.set(key, SharkTypeJson[key]);
    }
  },
  methods: {
    onPlaceChanged(address) {
      let selectedCity =
        address.locality + ", " + address.administrative_area_level_1;
      this.cityFilters.push(selectedCity);
      this.$refs.city.clear();
    },
    onCityAdded() {},
    async onSubmit(evt) {
      evt.preventDefault();

      let queryString = "";
      if (this.cityFilters.length > 0) {
        queryString += `cities=${this.cityFilters.join(";")}&`;
      }
      if (this.sharkTypesSelected.length > 0) {
        queryString += `sharkTypes=${this.sharkTypesSelected.join(";")}&`;
      }
      await getAllSightings(queryString).then(filteredSightings =>
        this.$emit("sightings-updated", filteredSightings)
      );
    },
    onReset(evt) {
      evt.preventDefault();
    }
  }
};
</script>
<style scoped>
form {
  margin: 2%;
  overflow: hidden;
}
.card-body {
  padding: 0;
}
#cityTagBtn {
  margin: 1%;
}
</style>