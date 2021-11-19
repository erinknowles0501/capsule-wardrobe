<template>
	<v-container>
		<h1>My Capsule</h1>
		<v-sheet depressed>
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
					<v-card-title class="subtitle-2">{{
						item.name
					}}</v-card-title>
				</v-card>
			</draggable>
		</v-sheet>

		<v-sheet
			depressed
			v-for="(season, key) in capsule.seasons"
			:key="key"
			:class="`season display-${key}`"
		>
			<v-card flat class="season-info subtitle-2">
				<p>{{ key }}</p>
				<!-- todo: v-for from item types. Also Base might not need this? -->
				<p>
					<b>tops:</b>
					{{ season.filter((item) => item.type === "top").length }}
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
					<v-card-title class="subtitle-2">{{
						item.name
					}}</v-card-title>
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

import draggable from "vuedraggable";
import storeInst from "../brain/storeInst";

export default {
	components: {
		draggable,
	},
	data() {
		return {
			dragging: false,

			capsule: {
				uid: null,
				seasons: {
					spring: [],
					summer: [],
					fall: [],
					winter: [],
					base: [],
				},
			},
			closet: [],
		};
	},
	async mounted() {
		this.closet = storeInst.items;
		this.capsule.uid = this.$route.params.uid;
		let tempCapsule = await storeInst.getCapsule(this.capsule.uid);
		Object.entries(tempCapsule.seasons).forEach(
			([seasonName, seasonItems]) => {
				seasonItems = seasonItems.filter((item) => !!item);
				this.capsule.seasons[seasonName] = seasonItems;
			}
		);
	},
	methods: {
		isUsed(item) {
			// TODO: Bonus points if you can do this with a reduce
			const seasons = Object.values(this.capsule.seasons);
			return seasons.reduce((doesInclude, season) => {
				return season.includes(item) || doesInclude;
			}, false);
		},
		checkDrop(e) {
			console.log(e);
			if (!e.pullMode) {
				console.log("%c SAME", "color: red");
			}
		},
		async saveCapsule() {
			// TODO: move this save-parsing to store function
			let capsuleItems = {
				spring: [],
				summer: [],
				winter: [],
				fall: [],
				base: [],
			};

			for (const season in this.capsule.seasons) {
				this.capsule.seasons[season].forEach((item) => {
					capsuleItems[season].push(item._id);
				});
			}
			await storeInst.saveCapsule({
				uid: this.capsule.uid,
				seasons: capsuleItems,
			});
			this.capsule = await storeInst.getCapsule(this.capsule.uid);
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

.display-closet ::v-deep div {
	cursor: default;
}

.capsule-item ::v-deep div {
	padding: 1em !important;
	font-size: 12px !important;
}

.draggable-ghost {
	filter: blur(1px) opacity(75%);
}
</style>
