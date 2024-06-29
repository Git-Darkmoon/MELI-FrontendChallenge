const express = require("express")
const app = express()
const dotenv = require("dotenv")
const meliFetch = require("./utils/axios")

dotenv.config()

const PORT = process.env.PORT

const AUTHOR = {
  name: "Nicolas",
  lastname: "Mayorga",
}

// Endpoint /api/items?q=:query
app.get("/api/items", async (req, res) => {
  const query = req.query.q
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" })
  }

  try {
    const response = await meliFetch(`/sites/MLA/search?q=${query}`)
    const data = response.data

    const searchResultsData = {
      author: AUTHOR,
      categories: data.available_filters
        .filter((filter) => filter.id === "category")
        .flatMap((filter) => filter.values.map((value) => value.name)),
      items: data.results.map((item) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: item.price,
          decimals: parseFloat((item.price % 1).toFixed(2).substring(2)),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    }

    return res.json(searchResultsData)
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from MercadoLibre" })
  }
})

// Endpoint /api/items/:productID
app.get("/api/items/:productID", async (req, res) => {
  const { productID } = req.params

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      meliFetch(`/items/${productID}`),
      meliFetch(`/items/${productID}/description`),
    ])

    const itemData = itemResponse.data
    const descriptionData = descriptionResponse.data

    const productDetailsData = {
      author: AUTHOR,
      item: {
        id: itemData.id,
        title: itemData.title,
        price: {
          currency: itemData.currency_id,
          amount: Math.floor(itemData.price),
          decimals: Math.round((itemData.price % 1) * 100),
        },
        picture: itemData.pictures,
        condition: itemData.condition,
        free_shipping: itemData.shipping.free_shipping,
        sold_quantity: itemData.initial_quantity,
        description: descriptionData.plain_text,
      },
    }

    return res.json(productDetailsData)
  } catch (error) {
    res.status(500).json({ error: "Error fetching data from MercadoLibre" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
