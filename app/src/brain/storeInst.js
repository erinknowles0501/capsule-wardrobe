import StoreScaffold from "./storeScaffold";

export let storeInst = null;

export function initializeStore() {
  storeInst = new StoreScaffold();
}
