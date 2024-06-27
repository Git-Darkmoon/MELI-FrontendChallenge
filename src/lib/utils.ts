import { meliFetch } from "./axios"
import type {
  SearchAPIResponse,
  Result,
  ProductDetailsAPIResponse,
  DescriptionResponse,
  ProductDetailsTransformedData,
} from "./types" // Import your types here

export const fetchTransformedData = async (query: string) => {
  try {
    const response = await meliFetch(`/sites/MLA/search?q=${query}`)
    const data: SearchAPIResponse = response.data

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
          amount: item.price,
          decimals: parseFloat((item.price % 1).toFixed(2).substring(2)),
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
      })),
    }

    return transformedData
  } catch (error) {
    console.error("Error fetching and transforming data:", error)
    throw error
  }
}

export function formatPriceToARS(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export async function fetchProductDetails(
  productID: string
): Promise<ProductDetailsTransformedData> {
  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      meliFetch<ProductDetailsAPIResponse>(`/items/${productID}`),
      meliFetch<DescriptionResponse>(`/items/${productID}/description`),
    ])

    const itemData = itemResponse.data
    const descriptionData = descriptionResponse.data

    const transformedData: ProductDetailsTransformedData = {
      author: {
        name: "Nicolas",
        lastname: "Mayorga",
      },
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

    return transformedData
  } catch (error) {
    console.error("Error fetching product details:", error)
    throw error
  }
}
