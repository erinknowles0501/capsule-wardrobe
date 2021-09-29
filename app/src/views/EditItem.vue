<template>
	<v-container>
		<h1>{{ isEditingItem ? "Edit item" : "Create item" }}</h1>

		<v-form @submit.prevent="submitItem" v-if="!saving">
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
				<v-chip
					class="chip"
					value="winter"
					color="light-blue lighten-4"
				>
					Winter
				</v-chip>
				<v-chip class="chip" value="spring" color="lime lighten-4">
					Spring
				</v-chip>
				<v-chip class="chip" value="summer" color="green lighten-4">
					Summer
				</v-chip>
				<v-chip class="chip" value="fall" color="orange lighten-4">
					Fall
				</v-chip>
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

			<v-select label="Item type" v-model="item.type" :items="types" />

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

import storeInst from "../brain/storeInst";
// import { mdiAccount } from "@mdi/js";

export default {
	name: "edit-item",
	data() {
		return {
			saving: false,

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
		if (this.isEditingItem) {
			this.item = storeInst.items.find(
				(item) => item.uid === this.$route.params.uid
			);
		}
	},
	computed: {
		isEditingItem() {
			return !!this.$route.params.uid;
		},
	},
	methods: {
		async submitItem() {
			this.saving = true; // so they can't play with the interface while waiting.

			if (!this.$route.params.uid) {
				// item is new. UID generation should happen on insert to mongoose, but we can
				// fake our way around here
				this.item.uid = "new" + String(Math.random()).slice(-5);
			}

			await storeInst.upsertItem(this.item);
			this.saving = false;

			// Error and success noti handling happening in store.

			await storeInst.getItems();
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
