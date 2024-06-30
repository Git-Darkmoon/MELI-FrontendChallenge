import { SearchedItem } from "../lib/types"
import ProductCard from "../components/ProductCard"
import { useLookQuery, useSearchProduct } from "../lib/hooks"
import Loading from "../components/Loading"
import BreadCrumb from "../components/BreadCrumb"

const SearchResult = () => {
  const query = useLookQuery().get("search")
  const numberOfItemsToShow = 4

  const { data, isLoading, isError } = useSearchProduct(
    query as string,
    numberOfItemsToShow
  )

  const categoriesList = data?.categories.slice(0, numberOfItemsToShow)

  if (isLoading) {
    return (
      <section className="searchResults">
        <Loading />
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
      <BreadCrumb categoriesList={categoriesList as string[]} />
      {data?.items.map((item: SearchedItem) => {
        return <ProductCard key={item.id} {...item} />
      })}
    </section>
  )
}

export default SearchResult
