import axios from "axios"

export const meliFetch = axios.create({
  baseURL: "https://api.mercadolibre.com",
})
