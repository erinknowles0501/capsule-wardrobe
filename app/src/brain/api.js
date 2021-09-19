import axios from "axios";

// TODO: Use env. process.env.PORT
const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });

// TODO: Catches and error forwarding

class Api {
  async getItems() {
    return await axiosInstance.get("/items");
  }

  async upsertItem(item) {
    console.log("api item: ", item);
    return await axiosInstance.post(`/items/${item.uid}`, item);
  }
}

export default new Api();
