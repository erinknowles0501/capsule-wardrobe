import axios from "axios";

// TODO: Use env. process.env.PORT
const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });

// TODO: Catches and error forwarding

class Api {
  getItems() {
    return axiosInstance.get("/items");
  }

  saveItem(item) {
    return axiosInstance.post(`/items/${item.uid}`, item);
  }

  getCapsule(uid) {
    console.log("capsule??", axiosInstance.get(`/capsules/${uid}`));
    return axiosInstance.get(`/capsules/${uid}`);
  }

  saveCapsule(capsule) {
    return axiosInstance.post(`/capsules/${capsule.uid}`, capsule);
  }
}

export default new Api();
