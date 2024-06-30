import { Link } from "react-router-dom"
// import { useLookQuery, useSearchProduct } from "../lib/hooks"

type BreadCrumbProps = {
  categoriesList: string[]
}

function BreadCrumb({ categoriesList }: BreadCrumbProps) {
  // const query = useLookQuery().get("search")
  // const numberOfCategoriesToShow = 4

  // const { data } = useSearchProduct(query as string)
  // const categoriesList = data?.categories.slice(0, numberOfCategoriesToShow)

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadCrumbs">
        {categoriesList?.map((category, index) => (
          <li key={index} className="breadcrumb-item">
            <Link className="breadCrumb__link" to={`/items?search=${category}`}>
              {category}
            </Link>
            {index !== categoriesList.length - 1 && <span>&gt;</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
export default BreadCrumb
