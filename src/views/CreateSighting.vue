<template>
  <b-row class="d-flex justify-content-center">
    <b-col md="8">
      <h5 v-if="formError">{{formError}}</h5>
      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
        <section id="sharkDetails">
          <!-- TYPE -->
          <b-form-group label="Type:" label-for="shark-type-input">
            <b-form-select
              id="shark-type-input"
              v-model="form.sharkDetails.type"
              required
              :options="sharkTypes"
            />
          </b-form-group>
          <!-- SIZE -->
          <b-form-group label="Size:" label-for="shark-size-input">
            <b-form-input
              id="shark-size-input"
              v-model="form.sharkDetails.size"
              required
              placeholder="Shark Size (ft.)"
              type="number"
            />
          </b-form-group>
        </section>

        <section id="sightingDetails">
          <!-- CITY -->
          <b-form-group label="City:" label-for="shark-city-input">
            <google-places
              class="autocomplete form-control"
              types="(cities)"
              country="us"
              id="autocomplete"
              placeholder="Enter a city"
              v-on:placechanged="onPlaceChanged"
            />
          </b-form-group>
          <!-- <b-form-group label="City:" label-for="shark-city-input">
            <b-form-input
              id="shark-city-input"
              v-model="form.sightingDetails.city"
              required
              placeholder="Ex: San Diego, CA"
              type="text"
            />
          </b-form-group>-->

          <!-- DATE -->
          <b-form-group label="Date:" label-for="shark-date-input">
            <b-form-input
              id="shark-date-input"
              v-model="form.sightingDetails.date"
              required
              type="date"
            />
          </b-form-group>

          <!-- TIME -->
          <b-form-group label="Time:" label-for="shark-time-input">
            <b-form-input
              id="shark-time-input"
              v-model="form.sightingDetails.time"
              required
              type="time"
            />
          </b-form-group>

          <!-- DISTANCE FROM SHORE -->
          <b-form-group label="Yards From Shore:" label-for="shark-dist-from-shore-input">
            <b-form-input
              id="shark-dist-from-shore-input"
              v-model="form.sightingDetails.distanceFromShore"
              required
              type="number"
            />
          </b-form-group>
        </section>

        <section id="additionalDetails">
          <b-form-group label="Additional Details:" label-for="shark-additional-details-input">
            <b-form-textarea
              id="shark-additional-details-input"
              v-model="form.sightingDetails.additionalNotes"
              placeholder="Enter any additional details about the shark or the encounter."
              rows="2"
              max-rows="5"
            />
          </b-form-group>
        </section>

        <section>
          <b-form-row class="justify-content-center">
            <b-button type="submit" variant="primary">Submit</b-button>
          </b-form-row>
        </section>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { createSighting } from "../services/sightingService";
import VueGoogleAutocomplete from "vue-google-autocomplete";
import SharkTypeJson from "../assets/sharkTypes.json";
export default {
  name: "CreateSighting",
  components: {
    "google-places": VueGoogleAutocomplete
  },
  data() {
    return {
      form: {
        sharkDetails: {
          type: null,
          size: null,
          showedAggression: false
        },
        sightingDetails: {
          city: null,
          time: null,
          date: null,
          distanceFromShore: null,
          additionalNotes: ""
        }
      },
      show: true,
      sharkTypes: [{ text: "Select One", value: null }],
      formError: ""
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();

      await this.$auth.getTokenSilently().then(async token => {
        await createSighting(this.form, token).catch(
          err => (this.formError = err)
        );
      });
      this.$router.push("/");
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.sharkDetails.type = null;
      this.form.sharkDetails.size = null;
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    onPlaceChanged(address) {
      this.form.sightingDetails.city =
        address.locality + ", " + address.administrative_area_level_1;
    }
  },
  created() {
    for (let key in SharkTypeJson) {
      this.sharkTypes.push({ text: SharkTypeJson[key], value: key });
    }
  }
};
</script>

<style scoped>
form {
  padding: 1%;
  border-radius: 15px;
  background-color: white;
}
section {
  margin: 2%;
}
</style>