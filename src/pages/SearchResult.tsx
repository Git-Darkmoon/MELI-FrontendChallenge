import { TransformedDataItem } from "../lib/types"
import ProductCard from "../components/ProductCard"
import { useLookQuery, useSearchProduct } from "../lib/hooks"

const SearchResult = () => {
  const query = useLookQuery().get("search")
  const numberOfItemsToShow = 4

  const { data, isLoading, isError } = useSearchProduct(
    query as string,
    numberOfItemsToShow
  )

  if (isLoading) {
    return (
      <section className="searchResults">
        <p>Loading...</p>
      </section>
    )
  }

  if (isError) {
    return (
      <section className="searchResults">
        <p>Something went wrong...</p>
      </section>
    )
  }

  return (
    <section className="searchResults">
      {data?.items.map((item: TransformedDataItem) => {
        return <ProductCard key={item.id} {...item} />
      })}
    </section>
  )
}

export default SearchResult
