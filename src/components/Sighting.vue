<template>
  <b-card :title="title" :subTitle="subtitle">
    <b-card-text>
      <b-row>
        <b-col>
          <section id="details">
            <u>
              <h6 class="detailsHeading">Details</h6>
            </u>
            <ul>
              <li>Size: {{sighting.sharkDetails.size}} ft.</li>
              <li>Spotted at {{this.formatTime(sighting.sightingDetails.time)}}</li>
              <li
                v-if="sighting.sightingDetails.beach != null"
              >Beach: {{sighting.sightingDetails.beach}}</li>
              <li>{{sighting.sightingDetails.distanceFromShore}} yards from shore</li>
            </ul>
          </section>
          <section v-if="sighting.sightingDetails.additionalNotes" id="additionalNotes">
            <u>
              <h6 class="detailsHeading">Additional Notes</h6>
            </u>
            <p>{{sighting.sightingDetails.additionalNotes}}</p>
          </section>
        </b-col>
      </b-row>
    </b-card-text>
    <b-row class="justify-content-center">
      <b-modal
        title="Confirm Delete"
        v-bind:id="sighting._id"
        @ok="deleteSighting"
      >Confirm deletion of sighting?</b-modal>
      <b-link v-b-modal="sighting._id" v-if="isAuthor">Delete Sighting</b-link>
    </b-row>
  </b-card>
</template>

<script>
import Axios from "axios";
import SharkTypeJson from "../assets/sharkTypes.json";
export default {
  name: "Sighting",
  props: {
    sighting: Object
  },
  computed: {
    title: function() {
      return SharkTypeJson[this.sighting.sharkDetails.type];
    },
    subtitle: function() {
      return (
        this.sighting.sightingDetails.city +
        " - " +
        this.sighting.sightingDetails.date
      );
    }
  },
  methods: {
    formatTime(time) {
      let hour = Number(String(time).substring(0, 2));
      if (hour > 12) {
        time = `${hour - 12}${time.substring(2)} PM`;
      } else if (hour == 12) {
        time = String(time).concat(" PM");
      } else {
        time = String(time).concat(" AM");
      }
      return time;
    },
    async isAuthor() {
      return (await this.$auth.getTokenSilently()).sub === this.sighting.author;
    },
    async deleteSighting() {
      const token = await this.$auth.getTokenSilently();
      Axios.delete(`http://localhost:8081/sightings/${this.sighting._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(() => this.$emit("sighting-deleted"));
    }
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding-bottom: 2%;
}
li {
  font-weight: bold;
}
/* Class tags */
.detailsHeading {
  text-align: left;
  font-weight: normal;
  font-style: italic;
}
/* ID tags */
</style>