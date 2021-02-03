import axios from "axios";

const baseURL = "http://localhost:3000/";

export const withAuth = () => {
  return axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    baseURL,
  });
};

export const common = axios.create({
  baseURL,
});
