<template>
  <v-container class="home">
    <h1>My closet</h1>

    <div v-if="!loading" class="closet">
      <v-card outlined v-for="(item, index) in clothes" :key="index">
        <v-img :src="`https://placekitten.com/20${index}/200`">
          <v-btn
            small
            color="white"
            absolute
            bottom
            right
            icon
            :to="{ name: 'EditItem', params: { uid: item.id } }"
            >?</v-btn
          >
        </v-img>
        <v-card-title>{{ item.name }}</v-card-title>
        <v-card-subtitle>{{ item.description }}</v-card-subtitle>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "Home",
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

<style lang="scss" scoped>
.closet {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.75em;
}
</style>
