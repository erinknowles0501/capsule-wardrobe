<template>
	<v-container>
		<h1>Edit item</h1>

		<v-form @submit.prevent="submitItem">
			<v-text-field
				label="Item name"
				outlined
				v-model="item.name"
				required
			/>

			<v-textarea
				rows="1"
				auto-grow
				label="Item description"
				outlined
				v-model="item.description"
			/>

			<v-chip-group
				v-model="item.seasons"
				mandatory
				multiple
				active-class="chip-active"
			>
				<v-chip class="chip" value="winter" color="light-blue lighten-4"
					>Winter</v-chip
				>
				<v-chip class="chip" value="spring" color="lime lighten-4"
					>Spring</v-chip
				>
				<v-chip class="chip" value="summer" color="green lighten-4"
					>Summer</v-chip
				>
				<v-chip class="chip" value="fall" color="orange lighten-4"
					>Fall</v-chip
				>
			</v-chip-group>

			<v-chip-group
				v-model="item.moods"
				mandatory
				multiple
				active-class="chip-active"
			>
				<v-chip
					v-for="(mood, index) in moods"
					:key="index"
					class="chip"
					:value="mood"
					>{{ mood }}</v-chip
				>
			</v-chip-group>

			<v-select v-model="item.type" :items="types" />

			<v-checkbox v-model="item.isBase" label="Base item?" />

			<v-btn color="primary" depressed type="submit">{{
				$route.params.uid ? "Update" : "Create"
			}}</v-btn>
		</v-form>

		<pre>{{ item }}</pre>
	</v-container>
</template>

<script>
/**
 *    - Create/Edit page
 *      - Name of item
 *      - Picture
 *      - Description (in lieu of picture ?)
 *      - Season/s
 *      - Mood tags (classy, comfy, sporty...)
 * */

//import db from "@/firebase/init";
// import { mdiAccount } from "@mdi/js";

export default {
	name: "edit-item",
	data() {
		return {
			item: {
				name: "",
				description: "",
				seasons: [],
				moods: [],
				type: null,
				isBase: false,
			},

			moods: ["classy", "sporty", "comfy", "basic", "fun", "work"],
			types: [
				"top",
				"bottom",
				"dress",
				"shoes",
				"accessory",
				"cover",
				"other",
			],
		};
	},
	created() {
		if (this.$route.params.uid) {
			// 	db.collection("clothes")
			// 		.doc(this.$route.params.uid)
			// 		.get()
			// 		.then((doc) => (this.item = doc.data()))
			// 		.catch((error) => console.log("Error!", error));
		}
	},
	methods: {
		async submitItem() {
			console.log("yes hi!");
			if (!this.$route.params.uid) {
				// await db
				// 	.collection("clothes")
				// 	.add(this.item)
				// 	.then(function (docRef) {
				// 		console.log("Document written: ", docRef.id);
				// 	})
				// 	.catch(function (error) {
				// 		console.error("Error adding document: ", error);
				// 	});
			} else {
				//await db
				// .collection("clothes")
				// .doc(this.$route.params.uid)
				// .set(this.item)
				// .then(() => console.log("Success!"))
				// .catch((error) => console.log("Error!", error));
			}
			this.$router.push({ name: "Home" });
		},
	},
};
</script>

<style lang="scss" scoped>
// .spring {
//   background-color: lime !important;
// }
// .summer {
//   background-color: green;
// }
// .fall {
//   background-color: orange;
// }
// .winter {
//   background-color: lightblue;
// }
.chip {
	opacity: 0.3;
}

.chip-active {
	opacity: 1;
}
</style>
