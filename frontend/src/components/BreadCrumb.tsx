import { Link, useNavigate } from "react-router-dom"

type BreadCrumbProps = {
  categoriesList: string[]
}

function BreadCrumb({ categoriesList }: BreadCrumbProps) {
  const navigate = useNavigate()

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadCrumbs">
        <li className="breadcrumb-item">
          <button className="breadCrumb__link" onClick={() => navigate(-1)}>
            Volver
          </button>
          <span>|</span>
        </li>
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
