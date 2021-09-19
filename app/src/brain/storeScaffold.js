import api from "./api";

class Store {
  items = [];

  // TODO: Displaying errors if existing

  async getItems() {
    const result = await api.getItems();
    this.items = result.data;
  }
}

export default Store;
