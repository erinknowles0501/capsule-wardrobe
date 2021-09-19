import api from "./api"; // Separates api interface from axios

class Store {
  items = [];

  // TODO: Displaying errors if existing

  async getItems() {
    const result = await api.getItems();
    this.items = result.data;
  }

  async upsertItem(item) {
    await api.upsertItem(item);
  }
}

export default Store;
