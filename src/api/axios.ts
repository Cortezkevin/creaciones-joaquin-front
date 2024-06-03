"use client";

import axios from "axios";
import Cookies from 'js-cookie';

const AxiosInstance = axios.create({
  baseURL: 'https://creaciones-joaquin-back.onrender.com/api/',
  headers: {
    "Authorization": "Bearer " + Cookies.get("token") || ''
  }
});

export { AxiosInstance };