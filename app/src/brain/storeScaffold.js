import api from "./api";

class Store {
  items = [];
  isNew = false;

  constructor(isNew = false) {
    this.isNew = isNew;
  }

  async getItems() {
    this.items = await api.getItems();
  }
}

export default Store;
