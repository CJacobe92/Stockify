import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL

const authInterceptor = (req) => {
  const accessToken =  JSON.parse(localStorage.getItem('root'))?.auth
  if(accessToken){
    req.headers.Authorization = accessToken
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