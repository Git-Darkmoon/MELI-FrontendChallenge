import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { fetchTransformedData } from "../lib/utils"
import { TransformedData } from "../lib/types"
// import ProductCard from "../components/ProductCard"

function useLookQuery() {
  return new URLSearchParams(useLocation().search)
}
const SearchResult: React.FC = () => {
  const [data, setData] = useState<TransformedData | null>(null)
  const query = useLookQuery().get("search")

  useEffect(() => {
    fetchTransformedData(query as string)
      .then((transformedData) => {
        const slicedData = {
          ...transformedData,
          items: transformedData.items.slice(0, 4),
        }
        setData(slicedData)
        console.log(transformedData)
        console.log(slicedData)
      })
      .catch((error) => {
        console.error("Error fetching search results:", error)
      })
  }, [query])

  return (
    <section className="searchResults">
      <h1>
        Search Results for "{query}" for {data?.author?.name}{" "}
        {data?.author?.lastname}
      </h1>
      {data?.items.map((item) => {
        return (
          <li key={item.id}>
            <img src={item.picture} alt={item.title} width={180} height={180} />
            <div>{item.title}</div>
            <div>
              {item.price.currency} {item.price.amount}.{item.price.decimals}
            </div>
            <div>{item.condition}</div>
            <div>Free Shipping: {item.free_shipping ? "Yes" : "No"}</div>
          </li>
        )
      })}
    </section>
  )
}

export default SearchResult
