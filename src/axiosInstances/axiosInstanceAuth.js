import axios from "axios";

const instance = axios.create({
  baseURL: "https://soundwave-2022.herokuapp.com"
  //baseURL: "http://localhost:8080"
});

instance.interceptors.request.use(req => {
  const token = localStorage.getItem('token');
  req.headers.Authorization =  token ? `Bearer ${token}` : '';
  return req;
});

export default instance;