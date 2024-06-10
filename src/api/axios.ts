"use client";

import axios from "axios";
import Cookies from 'js-cookie';

/* urlPRODUCTION = https://creaciones-joaquin-back.onrender.com/api/ 
  urlTEST = http://localhost:4000/api/
*/

const AxiosInstance = axios.create({
  baseURL: 'https://creaciones-joaquin-back.onrender.com/api/',
  headers: {
    "Authorization": "Bearer " + Cookies.get("token") || ''
  }
});

export { AxiosInstance };