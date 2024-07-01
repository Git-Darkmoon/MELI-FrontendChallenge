const { StatusCodes } = require("http-status-codes")
const meliFetch = require("../utils/axios")

const AUTHOR = {
  name: "Nicolas",
  lastname: "Mayorga",
}

const getSearchResults = async (req, res) => {
  const query = req.query.q
  if (!query) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Query parameter is required" })
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
    console.log(error)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Error fetching data from MercadoLibre" })
  }
}

const getItemsDetails = async (req, res) => {
  const { productID } = req.params

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      meliFetch(`/items/${productID}`),
      meliFetch(`/items/${productID}/description`),
    ])

    const itemData = itemResponse.data
    const descriptionData = descriptionResponse.data
    const { category_id } = itemData

    const categoriesResponse = await meliFetch(`/categories/${category_id}`)
    const categoriesList = categoriesResponse.data.path_from_root.map(
      (category) => category.name
    )

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
        categories: categoriesList,
      },
    }

    return res.json(productDetailsData)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error fetching data from MercadoLibre" })
  }
}

module.exports = {
  getSearchResults,
  getItemsDetails,
}
