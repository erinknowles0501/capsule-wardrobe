<template>
	<v-app>
		<v-app-bar app color="primary" dark>
			<v-btn text :to="{ name: 'Home' }">My closet</v-btn>
			<v-btn text :to="{ name: 'Create' }">Add item</v-btn>
			<v-btn text :to="{ name: 'Capsule' }">My capsule</v-btn>
		</v-app-bar>

		<v-main>
			<router-view v-if="!!canLoadPages"> </router-view>
		</v-main>
	</v-app>
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
import storeInst from "./brain/storeInst.js";

export default {
	name: "App",
	components: {
		//
	},
	data: () => ({
		exposedStoreInst: storeInst,
	}),
	mounted() {
		this.getInfo();
	},
	computed: {
		canLoadPages() {
			return (
				!!this.exposedStoreInst && !!this.exposedStoreInst.items.length
			);
		},
	},
	methods: {
		async getInfo() {
			await storeInst.getItems();
		},
	},
};
</script>
