<template>
    <b-card :title="title" :subTitle="subtitle">
      <b-card-text>
        <b-row>
          <b-col>
            <section id="details">
              <u><h6 class="detailsHeading">Details</h6></u>
              <ul>
                <li>Size: {{sighting.sharkDetails.size}} ft.</li>
                <li>Spotted at {{sighting.sightingDetails.time}}</li>
                <li v-if="sighting.sightingDetails.beach != null">Beach: {{sighting.sightingDetails.beach}}</li>
                <li>{{sighting.sightingDetails.distanceFromShore}} from shore</li>
              </ul>
            </section>
            <section v-if="!sighting.sightingDetails.additionalNotes" id="additionalNotes">
              <u><h6 class="detailsHeading">Additional Notes</h6></u>
              <p>{{sighting.sightingDetails.additionalNotes}}
                The shark was very mysterious as it circled me about 6 times. It never made any aggressive moves but mainly just looked curious. Still, a frightening encounter that makes one feel tiny.
              </p>
            </section>
          </b-col>
        </b-row>
      </b-card-text>
      <!-- <b-link v-if="isAuthor" href="#" class="card-link">Edit Sighting</b-link> -->
    </b-card>
</template>

<script>
export default {
  name: "SightingComponent",
  props: {
    sighting: Object
  },
  computed: {
    title: function() {
      return this.sighting.sharkDetails.type;
    },
    subtitle: function() {
      return this.sighting.sightingDetails.city + " - " + this.sighting.sightingDetails.date;
    },
    isAuthor: function() {
      // TODO
      return true
    }
  }
}
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