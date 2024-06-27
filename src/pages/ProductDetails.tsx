import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { fetchProductDetails, formatPriceToARS } from "../lib/utils"
import { ProductDetailsTransformedData } from "../lib/types"

function useGetPathname() {
  return useLocation().pathname
}

function ProductDetails() {
  const [productData, setProductData] =
    useState<ProductDetailsTransformedData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const productID = useGetPathname().split("/")[2]
  console.log(productID)

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await fetchProductDetails(productID)
        setProductData(data)
        console.log(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching product details:", error)
        setError("Error fetching product details")
        setLoading(false)
      }
    }

    getProductDetails()
  }, [productID])

  if (loading) {
    return (
      <section className="productDetails">
        <h1>Loading...</h1>
      </section>
    )
  }

  if (error) {
    return (
      <section className="productDetails">
        <h1>{error}</h1>
      </section>
    )
  }

  if (!productData) {
    return (
      <section className="productDetails">
        <h1>No product data available...</h1>
      </section>
    )
  }

  console.log(productData.item)

  return (
    <section className="productDetails">
      <div className="productDetails__content">
        <div className="productDetails__info">
          <img
            className="productDetails__image"
            src={productData.item.picture[0].secure_url}
            alt={productData.item.title}
            width={680}
            height={680}
          />
          <aside className="productDetails__shoppingInfo">
            <p className="productDetails__condition">
              {productData.item.condition ? "Nuevo" : "Usado"} |{" "}
              {productData.item.sold_quantity} vendidos
            </p>
            <h1 className="productDetails__title">{productData.item.title}</h1>
            <p className="productDetails__price">
              {formatPriceToARS(productData.item.price.amount)}
              <sup className="productDetails__price--cents">
                {productData.item.price.decimals < 10
                  ? `0${productData.item.price.decimals}`
                  : productData.item.price.decimals}
              </sup>
            </p>
            <button className="productDetails__btn">Comprar</button>
          </aside>
        </div>
        <div className="productDetails__descContainer">
          <h2 className="productDetails__descTitle">
            Descripción del producto
          </h2>
          <p className="productDetails__desc">{productData.item.description}</p>
        </div>
      </div>
    </section>
  )
}
export default ProductDetails
