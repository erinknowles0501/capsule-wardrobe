<template>
	<v-container>
		<h1>{{ isEditingItem ? "Edit item" : "Create item" }}</h1>

		<v-form @submit.prevent="saveItem" v-if="!saving">
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
				multiple
				active-class="chip-active"
			>
				<v-chip
					v-for="season in seasons"
					:key="season._id"
					:value="season._id"
				>
					{{ season.label }}
				</v-chip>
			</v-chip-group>

			<v-chip-group
				v-model="item.moods"
				multiple
				active-class="chip-active"
			>
				<v-chip
					v-for="mood in moods"
					:key="mood._id"
					class="chip"
					:value="mood._id"
				>
					{{ mood.label }}
				</v-chip>
			</v-chip-group>

			<v-select
				label="Item type"
				v-model="item.type"
				:items="types"
				item-text="label"
				item-value="_id"
			/>

			<!-- <v-checkbox v-model="item.isBase" label="Base item?" /> -->

			<v-btn color="primary" depressed type="submit">{{
				$route.params.uid ? "Update" : "Create"
			}}</v-btn>
			<v-btn
				v-if="$route.params.uid"
				color="red"
				depressed
				dark
				class="ml-2"
				@click="deleteItem"
			>
				Delete
			</v-btn>
		</v-form>

		<!-- <pre>{{ item }}</pre> -->
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
				moods: [],
				type: null,
			},

			moods: {},
			types: {},
			seasons: {},
		};
	},
	created() {
		if (this.isEditingItem) {
			this.item = {
				...this.item,
				...storeInst.items.find(
					(item) => item.uid === this.$route.params.uid
				),
			};
		}

		const vm = this;

		storeInst.getMoods().then((res) => {
			vm.moods = res;
		});
		storeInst.getTypes().then((res) => {
			console.log(res);
			vm.types = res;
		});
		storeInst.getSeasons().then((res) => {
			vm.seasons = res;
		});
	},
	computed: {
		isEditingItem() {
			return !!this.$route.params.uid;
		},
	},
	methods: {
		async saveItem() {
			this.saving = true; // so they can't play with the interface while waiting.

			const hello = await storeInst.saveItem(this.item);
			console.log("hello", hello);
			this.saving = false;

			// Error and success noti handling happening in store.

			await storeInst.getItems();
			this.$router.push({ name: "Home" });
		},
		async deleteItem() {
			// TODO: Open prompt which only deletes if they confirm.
			await storeInst.deleteItem(this.item._id);
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
