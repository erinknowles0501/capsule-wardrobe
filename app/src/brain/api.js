import axios from "axios";

// TODO: Use env. process.env.PORT
const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });

// TODO: Catches and error forwarding

class Api {
  getItems() {
    return axiosInstance.get("/items");
  }

  upsertItem(item) {
    return axiosInstance.post(`/items/${item.uid}`, item);
  }
}

export default new Api();
