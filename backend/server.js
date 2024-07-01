require("dotenv").config()
const cors = require("cors")

const itemsRouter = require("./app/routers/items")

const express = require("express")
const app = express()

// CORS and JSON parsing middleware
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send(
    '<h1>Meli API</h1><a href="/api/items/MLA1379378621">Sample endpoint</a>'
  )
})
app.use("/", itemsRouter)

// Starting the server
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
