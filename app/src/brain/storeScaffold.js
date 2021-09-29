import api from "./api"; // Separates api interface from axios

class StoreScaffold {
  items = [];

  // TODO: Displaying errors if existing

  async getItems() {
    const result = await api.getItems();
    this.items = result.data;
  }

  upsertItem(item) {
    api.upsertItem(item);
  }
}

export default StoreScaffold;
