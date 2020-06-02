<template>
  <div class="grid">
    <div v-bind:key="grid.id" v-for="grid in grids" class="column">
      <photo v-for="photo in grid" v-bind:photo="photo" v-bind:key="photo.id"></photo>
    </div>
  </div>
</template>

<script>
import photo from "./photo.vue";

export default {
  name: "grid",
  components: { photo },
  props: ["photos"],
  computed: {
    grids: function() {
      const grids = [];
      const deepClonePhotos = JSON.parse(JSON.stringify(this.photos));
      const gridsToMake = Math.ceil(deepClonePhotos.length / 2) - 1;

      for (let index = 0; index <= gridsToMake; index++) {
        const currentGrid = [];

        for (let i = 0; i < 2; i++) {
          if (deepClonePhotos.length) {
            currentGrid.push(deepClonePhotos.shift());
          }
        }

        grids.push(currentGrid);
      }

      return grids;
    }
  }
};
</script>

<style scoped>
.grid {
  display: -ms-flexbox; /* IE10 */
  display: flex;
  -ms-flex-wrap: wrap; /* IE10 */
  flex-wrap: wrap;
  padding: 0;
}

/* Create four equal columns that sits next to each other */
.column {
  -ms-flex: 25%; /* IE10 */
  flex: 25%;
  max-width: 25%;
  padding: 0;
}

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 800px) {
  .column {
    -ms-flex: 50%;
    flex: 50%;
    max-width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    -ms-flex: 100%;
    flex: 100%;
    max-width: 100%;
  }
}
</style>
