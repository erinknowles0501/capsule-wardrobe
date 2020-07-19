<template>
  <div class="home">
    <h1>My closet</h1>
    <div v-if="!loading">
      <div v-for="(item, index) in clothes" :key="index">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
/**
 * a) Manage items (create, edit, destroy)
 *    - View items page (with destroy action + link to create/edit)
 *    - Create/Edit page
 *      - Name of item
 *      - Picture
 *      - Description (in lieu of picture ?)
 *      - Season/s
 *      - Mood tags (classy, comfy, sporty...)
 *      -
 * b) Build/save outfit (w/ randomize - wild - incorporate weather/theme/location into decisions)
 *    - Built outfit page (select from items - drag/drop??)
 *      - Randomize button + options
 * c) Capsule builder
 *    - Add base items
 *    - Add 8 shirts, 4 bottoms, 2 dresses (or whatever) for each season
 *    - If you add an item that's tagged with multiple seasons, it'll pre-fill that season with that item, but greyed, so you can choose
 *    - On main view page - items not in the capsule are tinted red
 *    -
 *
 * */
import db from "@/firebase/init";

export default {
  name: "Home",
  components: {
    //  HelloWorld,
  },
  data() {
    return {
      loading: true,

      clothes: [],
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
          this.clothes.push(item);
        });
      });

    this.loading = false;
  },
};
</script>
