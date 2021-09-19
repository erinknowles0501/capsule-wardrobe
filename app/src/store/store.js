import api from "./api";

class Store {
  items = [];

  async getItems() {
    this.items = await api.getItems();
  }
}

export default Store;
