import Vue from "vue";
import StoreCreator from "./storeCreator";

// we need a single instance of the store, otherwise our data
// will go all higgledy-piggledy because it'll be stored in different stores...
// Note also that I'm using Vue's obversable for convenience here. Ideally
// this observable function would be agnostic - I just haven't written one yet.

const storeInst = Vue.observable(StoreCreator.getInstance());

export default storeInst;
