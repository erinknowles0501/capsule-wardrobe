<template>
	<v-container class="home">
		<h1>My closet</h1>

		<div class="closet">
			<v-card outlined v-for="(item, index) in clothes" :key="index">
				<v-img :src="`https://placekitten.com/20${index}/200`">
					<v-btn
						small
						color="white"
						absolute
						bottom
						right
						icon
						:to="{ name: 'EditItem', params: { uid: item.uid } }"
					>
						?
					</v-btn>
				</v-img>
				<v-card-title>{{ item.name }}</v-card-title>
				<v-card-subtitle>{{ item.description }}</v-card-subtitle>
			</v-card>
		</div>
	</v-container>
</template>

<script>
import { storeInst } from "../brain/storeInst";

export default {
	name: "Home",
	data() {
		return {
			//loading: true,

			clothes: [],
		};
	},
	mounted() {
		this.clothes = storeInst.items;
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
