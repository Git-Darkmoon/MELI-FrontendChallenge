import { Outlet, useNavigation } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import Loading from "../components/Loading"
import BreadCrumb from "../components/BreadCrumb"

function HomeLayout() {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading"

  return (
    <>
      <SearchBar />
      <BreadCrumb />

      <div>{isPageLoading ? <Loading /> : <Outlet />}</div>
    </>
  )
}
export default HomeLayout
