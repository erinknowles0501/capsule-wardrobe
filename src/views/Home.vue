<template>
  <div class="home">
    <h1>My closet</h1>
    <div v-if="!loading">
      <div v-for="(item, index) in clothes" :key="index">{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
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
