import axios from "axios"

export const meliFetch = axios.create({
  baseURL: "https://meli-challenge-api.vercel.app/api",
})
