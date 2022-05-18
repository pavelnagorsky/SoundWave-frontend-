import axios from "axios";

const instance = axios.create({
  baseURL: "https://soundwave-2022.herokuapp.com"
  //baseURL: "http://localhost:8080"
});

export default instance;