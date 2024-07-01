const express = require("express")
const router = express.Router()

const {
  getItemsDetails,
  getSearchResults,
} = require("../controllers/itemsController")

// Endpoint /api/items?q=:query
router.route("/api/items").get(getSearchResults)

// Endpoint /api/items/:productID
router.route("/api/items/:productID").get(getItemsDetails)

module.exports = router
