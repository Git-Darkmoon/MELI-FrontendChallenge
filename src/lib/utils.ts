import type { SearchAPIResponse, Result } from "./types" // Import your types here

export const fetchTransformedData = async (query: string) => {
  try {
    const response = await fetch(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    )
    const data: SearchAPIResponse = await response.json()

    const transformedData = {
      author: {
        name: "Nicolas",
        lastname: "Mayorga",
      },
      categories: data.available_filters
        .filter((filter) => filter.id === "category")
        .flatMap((filter) => filter.values.map((value) => value.name)),
      items: data.results.map((item: Result) => ({
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: parseFloat((item.price % 1).toFixed(2).substring(2)),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    }

    console.log(transformedData)

    return transformedData
  } catch (error) {
    console.error("Error fetching and transforming data:", error)
    throw error
  }
}
