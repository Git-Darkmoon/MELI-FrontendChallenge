const axios = require("axios")

const meliFetch = axios.create({
  baseURL: "https://api.mercadolibre.com",
})

module.exports = meliFetch
