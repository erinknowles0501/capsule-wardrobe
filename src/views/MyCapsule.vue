<template>
  <v-container>
    <h1>My Capsule</h1>
    <v-sheet depressed class="display closet" v-if="!loading">
      <v-card outlined v-for="(item, index) in closet" :key="index">
        <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
      </v-card>
    </v-sheet>

    <v-sheet depressed class="display winter">
      <v-card flat v-for="(item, index) in capsule.winter" :key="index">
        <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
      </v-card>
    </v-sheet>
  </v-container>
</template>
<script>
/**
 *  * c) Capsule builder
 *    - Add base items
 *    - Add 8 shirts, 4 bottoms, 2 dresses (or whatever) for each season
 *    - If you add an item that's tagged with multiple seasons, it'll pre-fill that season with that item, but greyed, so you can choose
 *    - On main view page - items not in the capsule are tinted red
 *
 *
 * */
import db from "@/firebase/init";

export default {
  data() {
    return {
      loading: true,

      capsule: {
        spring: [],
        summer: [],
        fall: [],
        winter: [{ name: "dsgsdg" }],
        base: [],
      },
      closet: [],
    };
  },
  async created() {
    await db
      .collection("clothes")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          let item = doc.data();
          item.id = doc.id;
          this.closet.push(item);
        });
      });

    this.loading = false;
  },
};
</script>

<style lang="scss" scoped>
.display {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5em;
  padding: 0.5em;
}

.winter {
}

.winter {
  background: lightblue;
}
</style>
