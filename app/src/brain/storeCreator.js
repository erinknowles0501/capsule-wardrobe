import StoreScaffold from "./storeScaffold";

const StoreCreator = (() => {
  let instance;
  return {
    getInstance: () => {
      if (!instance) {
        instance = new StoreScaffold();
      }
      return instance;
    },
  };
})();

export default StoreCreator;
