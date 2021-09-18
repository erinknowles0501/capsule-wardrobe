import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });

axiosInstance
  .get("/test")
  .then(function(response) {
    // handle success
    console.log(response.data);
  })
  .catch((e) => console.log(e));
