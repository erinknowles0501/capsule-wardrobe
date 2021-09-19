import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });

// TODO: Catches and error forwarding

class Api {
  async getItems() {
    return await axiosInstance.get("/items");
  }
}

export default new Api();
