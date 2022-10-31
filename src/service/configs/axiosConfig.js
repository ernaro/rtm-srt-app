import Axios from "axios";

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  responseType: "json",
});

export const setAuthoriseHeaders = token => {
  api.defaults.headers.Authorization = `Bearer ${ token }`;
}

export const removeAuthoriseHeaders = () => {
  delete api.defaults.headers.Authorization;
}
