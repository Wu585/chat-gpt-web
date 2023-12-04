import axios from "axios";

export const ajax = axios.create({
  baseURL: isDev ? 'http://localhost:3000' : '',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})


