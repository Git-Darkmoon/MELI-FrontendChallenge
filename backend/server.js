const express = require("express")
const axios = require("axios")
const app = express()
const PORT = 3000

const AUTHOR = {
  name: "Nicolas",
  lastname: "Mayorga",
}

// Helper function to get decimals from price
const getDecimals = (price) => {
  const priceStr = price.toString()
  const decimalIndex = priceStr.indexOf(".")
  return decimalIndex !== -1 ? priceStr.substring(decimalIndex + 1).length : 0
}

// Endpoint /api/items?q=:query
app.get("/api/items", async (req, res) => {
  const query = req.query.q
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" })
  }

  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    )
    const items = response.data.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: getDecimals(item.price),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }))

    const categories =
      response.data.filters
        .find((filter) => filter.id === "category")
        ?.values[0]?.path_from_root.map((category) => category.name) || []

    res.json({
      author: AUTHOR,
      categories,
      items,
    })
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from MercadoLibre" })
  }
})

// Endpoint /api/items/:id
app.get("/api/items/:id", async (req, res) => {
  const id = req.params.id

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`),
    ])

    const itemData = itemResponse.data
    const descriptionData = descriptionResponse.data

    const item = {
      id: itemData.id,
      title: itemData.title,
      price: {
        currency: itemData.currency_id,
        amount: Math.floor(itemData.price),
        decimals: getDecimals(itemData.price),
      },
      picture: itemData.pictures[0]?.url || "",
      condition: itemData.condition,
      free_shipping: itemData.shipping.free_shipping,
      sold_quantity: itemData.sold_quantity,
      description: descriptionData.plain_text || "",
    }

    res.json({
      author: AUTHOR,
      item,
    })
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from MercadoLibre" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
