import axios from "axios";
import { storage } from "./utils";
const BASE_URL = import.meta.env.VITE_API_URL

const authInterceptor = (req) => {
  const token = storage.auth

  if(token){
    req.headers.Authorization = token
  }
  return req
}

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(authInterceptor)