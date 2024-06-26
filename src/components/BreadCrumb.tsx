import { Link, useLocation } from "react-router-dom"

function BreadCrumb() {
  const location = useLocation()

  //   console.log(location)

  let currentPath = ""

  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentPath += `/${crumb}`

      return (
        <li key={crumb}>
          <Link className="breadCrumb__link" to={currentPath}>
            {crumb}
          </Link>
          <span className="breadCrumb__icon">&gt;</span>
        </li>
      )
    })

  return <ul className="breadCrumbs">{crumbs}</ul>
}
export default BreadCrumb
