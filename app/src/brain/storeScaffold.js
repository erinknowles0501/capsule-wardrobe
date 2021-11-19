import api from "./api"; // Separates api interface from axios

class StoreScaffold {
  items = [];

  // TODO: Displaying errors if existing

  async getItems() {
    const result = await api.getItems();
    this.items = result.data;
  }

  saveItem(item) {
    return api.saveItem(item);
  }

  deleteItem(id) {
    api.deleteItem(id);
  }

  async getCapsule(uid) {
    const result = await api.getCapsule(uid);
    console.log("result!!", result.data);
    return result.data;
  }

  saveCapsule(capsule) {
    return api.saveCapsule(capsule);
  }

  async getMoods() {
    const moods = await api.getMoods();
    return moods.data;
  }

  async getTypes() {
    const types = await api.getTypes();
    return types.data;
  }

  async getSeasons() {
    const seasons = await api.getSeasons();
    return seasons.data;
  }
}

export default StoreScaffold;