import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { fetchTransformedData } from "../lib/utils"
import { useLookQuery } from "../lib/hooks"

function BreadCrumb() {
  const [categories, setCategories] = useState<string[]>()
  const query = useLookQuery().get("search")

  const numberOfCategoriesToShow = 4

  useEffect(() => {
    fetchTransformedData(query as string)
      .then((transformedData) => {
        setCategories(
          transformedData.categories.slice(0, numberOfCategoriesToShow)
        )
      })
      .catch((error) => {
        console.error("Error fetching search results:", error)
      })
  }, [query])

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadCrumbs">
        {categories?.map((category, index) => (
          <li key={index} className="breadcrumb-item">
            <Link className="breadCrumb__link" to={`/items?search=${category}`}>
              {category}
            </Link>
            <span>&gt;</span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
export default BreadCrumb
