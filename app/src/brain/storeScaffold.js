import api from "./api"; // Separates api interface from axios

class StoreScaffold {
  items = [];

  // TODO: Displaying errors if existing

  async getItems() {
    const result = await api.getItems();
    this.items = result.data;
  }

  saveItem(item) {
    api.saveItem(item);
  }

  async getCapsule(uid) {
    const result = await api.getCapsule(uid);
    console.log("result!!", result.data[0]);
    return result.data[0];
  }

  saveCapsule(capsule) {
    return api.saveCapsule(capsule);
  }
}

export default StoreScaffold;
