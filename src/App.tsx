import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomeLayout from "./pages/HomeLayout"
import SearchResult from "./pages/SearchResult"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
      },
      {
        path: "/items",
        element: <SearchResult />,
      },
      {
        path: "/items/:id",
        element: <div>single item page</div>,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}
export default App
