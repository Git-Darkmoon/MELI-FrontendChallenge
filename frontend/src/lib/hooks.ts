import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router-dom"
import { ProductDetailsTransformedData, TransformedData } from "./types"
import { fetchProductDetails, fetchTransformedData } from "./utils"

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
  return useQuery<TransformedData>({
    queryKey: ["search", query],
    queryFn: () => fetchTransformedData(query),
    select: (data) => ({
      ...data,
      items: data.items.slice(0, numberOfItemsToShow),
    }),
  })
}

export function useProductDetails(productID: string) {
  return useQuery<ProductDetailsTransformedData>({
    queryKey: ["product", productID],
    queryFn: () => fetchProductDetails(productID),
  })
}
