import axios from "axios";

// TODO: Use env. process.env.PORT
const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });

// TODO: Catches and error forwarding

class Api {
  getItems() {
    return axiosInstance.get("/items");
  }

  saveItem(item) {
    return axiosInstance.post(`/items/${item._id || "new"}`, item);
  }

  deleteItem(id) {
    console.log("api id");
    return axiosInstance.delete(`/items/${id}`);
  }

  getCapsule(uid) {
    return axiosInstance.get(`/capsules/${uid}`);
  }

  saveCapsule(capsule) {
    return axiosInstance.post(`/capsules/${capsule.uid}`, capsule);
  }

  getMoods() {
    return axiosInstance.get("/moods");
  }

  getTypes() {
    return axiosInstance.get("/types");
  }

  getSeasons() {
    return axiosInstance.get("/seasons");
  }
}

export default new Api();
