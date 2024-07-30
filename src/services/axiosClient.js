import axios from "axios";

const api = axios.create({
  baseURL: "https://65edc41d08706c584d9a8a28.mockapi.io/",
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

export default api;
