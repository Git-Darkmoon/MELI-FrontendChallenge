import { formatPriceToARS } from "../lib/utils"
import { useGetPathname, useProductDetails } from "../lib/hooks"
import Loading from "../components/Loading"
import BreadCrumb from "../components/BreadCrumb"
import { useState } from "react"

function ProductDetails() {
  const [isShowMore, setIsShowMore] = useState(false)

  const productID = useGetPathname().split("/")[2]
  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useProductDetails(productID)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return (
      <section className="productDetails">
        <h1>{error instanceof Error ? error.message : error}</h1>
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

  return (
    <>
      <BreadCrumb categoriesList={productData.item.categories} />
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
              <h1 className="productDetails__title">
                {productData.item.title}
              </h1>
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
            <p className="productDetails__desc">
              {isShowMore
                ? productData.item.description
                : productData.item.description.substring(0, 350) + "..."}
              <button
                className="productDetails__descBtn"
                onClick={() => setIsShowMore(!isShowMore)}
              >
                {isShowMore ? (
                  <p className="productDetails__descBtnText">Ver menos</p>
                ) : (
                  <p className="productDetails__descBtnText">
                    Ver descripcion completa
                    <svg
                      fill="currentColor"
                      height="16px"
                      width="16px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 407.437 407.437"
                      xmlSpace="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 "></polygon>{" "}
                      </g>
                    </svg>
                  </p>
                )}
              </button>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
export default ProductDetails
