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

    <v-sheet
      depressed
      v-for="(season, key) in capsule"
      :key="key"
      :class="`season display-${key}`"
    >
      <v-card flat class="season-info subtitle-2">
        <p>{{ key }}</p>
        <p>
          <b>tops:</b> {{ season.filter((item) => item.type === "top").length }}
        </p>
        <p>
          <b>bottoms:</b>
          {{ season.filter((item) => item.type === "bottom").length }}
        </p>
        <p>
          <b>dresses:</b>
          {{ season.filter((item) => item.type === "dress").length }}
        </p>
      </v-card>

      <draggable
        :list="season"
        :class="`draggable draggable-${key} display`"
        ghost-class="draggable-ghost"
        group="capsule"
        @start="checkDrop"
      >
        <v-card
          flat
          v-for="(item, index) in season"
          :key="index"
          class="capsule-item"
        >
          <v-card-title class="subtitle-2">{{ item.name }}</v-card-title>
        </v-card>
      </draggable>
    </v-sheet>

    <v-btn @click="saveCapsule">Save</v-btn>
  </v-container>
</template>
<script>
/**
 *  * c) Capsule builder
 *    - Add base items
 *    - Add 8 shirts, 4 bottoms, 2 dresses (or whatever) for each season
 *    - If you add an item that's tagged with multiple seasons, it'll pre-fill that season with that item, but greyed, so you can choose
 *    - On main view page - items not in the capsule are tinted red
 *    - Base items populate base
 *    - Prevent moving to season that item isn't marked for
 *
 *
 * TODO NOTE: :remove-on-spill should have worked EXCEPT it wasn't removing the items from the list. Known bug. Keep an eye out for it being fixed.
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

    await db
      .collection("capsules")
      .doc("erin")
      .get()
      .then((doc) => {
        //  doc.data().fore
        this.capsule.spring = doc.data().spring;
      })
      .catch((err) => console.log("err", err));

    this.loading = false;
  },
  methods: {
    isUsed(item) {
      // TODO: Bonus points if you can do this with a reduce
      return (
        this.capsule.winter.includes(item) ||
        this.capsule.summer.includes(item) ||
        this.capsule.fall.includes(item) ||
        this.capsule.spring.includes(item) ||
        this.capsule.base.includes(item)
      );
    },
    checkDrop(e) {
      console.log(e);
      if (!e.pullMode) {
        console.log("%c SAME", "color: red");
      }
    },
    saveCapsule() {
      console.log(this.capsule);

      let capsuleItems = {
        spring: [],
        summer: [],
        winter: [],
        fall: [],
        base: [],
      };

      for (const season in this.capsule) {
        console.log(this.capsule[season]);
        this.capsule[season].forEach((item) => {
          capsuleItems[season].push(item.id);
        });
      }

      console.log(capsuleItems);

      db.collection("capsules")
        .doc("erin")
        .set({
          spring: capsuleItems.spring,
          summer: capsuleItems.summer,
          fall: capsuleItems.fall,
          winter: capsuleItems.winter,
          base: capsuleItems.base,
        })
        .then(() => console.log("Success"))
        .catch((err) => console.log("error", err));
    },
  },
};
</script>

<style lang="scss" scoped>
.subtitle-2 {
  word-break: break-word !important;
}

.season {
  padding: 0.5em;
}

.season-info {
  background: transparent;
  border-radius: 0;
  margin: 0.5em;

  p {
    display: inline;
    margin-right: 1em;
  }
}

.display {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 0.5em;
  padding: 0.5em;
  min-height: 50px;
  width: 100%;
  box-sizing: border-box;
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

.display-base {
  background: lightgray;
}

.display-closet {
}

.capsule-item ::v-deep div {
  padding: 1em !important;
  font-size: 12px !important;
}

.draggable-ghost {
  filter: blur(1px) opacity(75%);
}
</style>
