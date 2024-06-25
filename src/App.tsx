import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomeLayout from "./pages/HomeLayout"

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
        element: <div>Items</div>,
      },
      {
        path: "/items/:id",
        element: <div>single item</div>,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}
export default App
