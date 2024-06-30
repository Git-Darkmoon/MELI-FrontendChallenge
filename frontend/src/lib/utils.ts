import { meliFetch } from "./axios"
import type { ProductDetailsData, SearchResultsData } from "./types"

export const fetchResultsData = async (
  query: string
): Promise<SearchResultsData> => {
  try {
    const response = await meliFetch(`/items?q=${query}`)
    const data: SearchResultsData = response.data

    return data
  } catch (error) {
    console.error("Error fetching data:", error)
    throw error
  }
}

export async function fetchProductDetails(
  productID: string
): Promise<ProductDetailsData> {
  try {
    const response = await meliFetch(`/items/${productID}`)
    const data: ProductDetailsData = response.data

    return data
  } catch (error) {
    console.error("Error fetching product details:", error)
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
