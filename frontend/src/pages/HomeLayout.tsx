import { Outlet, useNavigation } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import Loading from "../components/Loading"

function HomeLayout() {
  const navigation = useNavigation()
  const isPageLoading = navigation.state === "loading"

  return (
    <>
      <SearchBar />

      <div>{isPageLoading ? <Loading /> : <Outlet />}</div>
    </>
  )
}
export default HomeLayout
