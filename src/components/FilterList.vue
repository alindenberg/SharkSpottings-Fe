<template>
  <div>
    <b-btn v-show="!isCollapsed" variant="link" v-b-toggle.filters>
      <b-icon icon="arrow-left"></b-icon>Filters
    </b-btn>
    <b-sidebar v-model="isCollapsed" right id="filters">
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
        <b-form-group label="City:" label-for="shark-city-input">
          <b-row class="align-items-center">
            <b-col sm="10">
              <google-places
                class="autocomplete form-control"
                types="(cities)"
                country="us"
                ref="city"
                id="autocomplete"
                placeholder="Enter a city"
                v-on:placechanged="onPlaceChanged"
              />
            </b-col>
            <b-col sm="1">
              <b-icon icon="plus-circle" @click="onCityAdded" />
            </b-col>
          </b-row>
        </b-form-group>
        <section>
          <b-row class="justify-content-center" id="cityFilters">
            <b-btn size="sm" id="cityTagBtn" v-for="(city, index) in cityFilters" :key="index">
              {{city}}
              <b-icon @click="cityFilters.splice(index, 1)" icon="x-circle" />
            </b-btn>
          </b-row>
        </section>
        <!-- SUBMIT -->
        <section id="submit">
          <b-row class="justify-content-center">
            <b-button type="submit" variant="primary">Filter</b-button>
          </b-row>
        </section>
      </b-form>
    </b-sidebar>
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
      this.selectedCity =
        address.locality + ", " + address.administrative_area_level_1;
    },
    onCityAdded() {
      this.cityFilters.push(this.selectedCity);
      this.$refs.city.clear();
      this.selectedCity = null;
    },
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
.btn {
  float: right;
}
form {
  margin: 2%;
  overflow: hidden;
}
#submit {
  margin-top: 2%;
}
#cityTagBtn {
  margin: 1%;
}
</style>