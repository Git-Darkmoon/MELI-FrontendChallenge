import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { fetchTransformedData } from "../lib/utils"
import { TransformedData, TransformedDataItem } from "../lib/types"
import ProductCard from "../components/ProductCard"

function useLookQuery() {
  return new URLSearchParams(useLocation().search)
}
const SearchResult = () => {
  const [data, setData] = useState<TransformedData | null>(null)
  const query = useLookQuery().get("search")

  const numberOfItemsToShow = 4

  useEffect(() => {
    fetchTransformedData(query as string)
      .then((transformedData) => {
        const slicedData = {
          ...transformedData,
          items: transformedData.items.slice(0, numberOfItemsToShow),
        }
        setData(slicedData)
        // console.log(transformedData)
        // console.log(slicedData)
      })
      .catch((error) => {
        console.error("Error fetching search results:", error)
      })
  }, [query])

  return (
    <section className="searchResults">
      {data?.items.map((item: TransformedDataItem) => {
        return <ProductCard key={item.id} {...item} />
      })}
    </section>
  )
}

export default SearchResult
