import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { ProductDetailsData, SearchResultsData } from "./types"
import { fetchProductDetails, fetchResultsData } from "./utils"

export function useLookQuery() {
  return new URLSearchParams(useLocation().search)
}

export function useGetPathname() {
  return useLocation().pathname
}

export function useSearchProduct(
  query: string,
  numberOfItemsToShow: number = 4
) {
  return useQuery<SearchResultsData>({
    queryKey: ["search", query],
    queryFn: () => fetchResultsData(query),
    select: (data: SearchResultsData) => ({
      ...data,
      items: data.items.slice(0, numberOfItemsToShow),
    }),
  })
}

export function useProductDetails(productID: string) {
  return useQuery<ProductDetailsData>({
    queryKey: ["product", productID],
    queryFn: () => fetchProductDetails(productID),
  })
}
