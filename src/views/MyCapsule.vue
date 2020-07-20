<template>
  <v-container>
    <h1>My Capsule</h1>
    <v-sheet depressed v-if="!loading">
      <draggable
        :list="closet"
        class="draggable draggable-closet display display-closet"
        ghost-class="draggable-ghost"
        :group="{ name: 'capsule', pull: 'clone', put: false }"
      >
        <v-card
          outlined
          v-for="(item, index) in closet"
          :key="index"
          :disabled="isUsed(item)"
          :class="{ 'draggable-ghost': isUsed(item) }"
        >
          <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
        </v-card>
      </draggable>
    </v-sheet>

    <v-sheet depressed>
      <draggable
        :list="capsule.winter"
        class="draggable draggable-winter display display-winter"
        ghost-class="draggable-ghost"
        group="capsule"
        @end="checkDrop"
      >
        <v-card flat v-for="(item, index) in capsule.winter" :key="index">
          <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
        </v-card>
      </draggable>
    </v-sheet>

    <v-sheet depressed>
      <draggable
        :list="capsule.spring"
        class="draggable draggable-spring display display-spring"
        ghost-class="draggable-ghost"
        group="capsule"
        @end="checkDrop"
      >
        <v-card flat v-for="(item, index) in capsule.spring" :key="index">
          <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
        </v-card>
      </draggable>
    </v-sheet>

    <v-sheet depressed>
      <draggable
        :list="capsule.summer"
        class="draggable draggable-summer display display-summer"
        ghost-class="draggable-ghost"
        group="capsule"
        @end="checkDrop"
      >
        <v-card flat v-for="(item, index) in capsule.summer" :key="index">
          <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
        </v-card>
      </draggable>
    </v-sheet>

    <v-sheet depressed>
      <draggable
        :list="capsule.fall"
        class="draggable draggable-fall display display-fall"
        ghost-class="draggable-ghost"
        group="capsule"
        @end="checkDrop"
      >
        <v-card flat v-for="(item, index) in capsule.fall" :key="index">
          <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
        </v-card>
      </draggable>
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
 * NOTE: :remove-on-spill should have worked EXCEPT it wasn't removing the items from the list. Known bug. Keep an eye out for it being fixed.
 *
 * */
import db from "@/firebase/init";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      loading: true,
      dragging: false,

      capsule: {
        spring: [],
        summer: [],
        fall: [],
        winter: [],
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
  methods: {
    isUsed(item) {
      return (
        this.capsule.winter.includes(item) ||
        this.capsule.summer.includes(item) ||
        this.capsule.fall.includes(item) ||
        this.capsule.spring.includes(item)
      );
    },
    checkDrop(e) {
      if (!e.pullMode) {
        console.log("%c SAME", "color: red");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.display {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5em;
  padding: 0.5em;
  min-height: 50px;
}

.display-winter {
  background: lightblue;
}

.display-spring {
  background: lightgreen;
}

.display-summer {
  background: lightseagreen;
}

.display-fall {
  background: lightsalmon;
}

.display-closet {
}

.draggable-ghost {
  filter: blur(1px) opacity(75%);
}
</style>
