import { Link } from "react-router-dom"
import { TransformedDataItem } from "../lib/types"
import { formatPriceToARS } from "../lib/utils"

function ProductCard({
  id,
  picture,
  condition,
  free_shipping,
  price,
  title,
}: TransformedDataItem) {
  return (
    <article className="productCard">
      <div className="productCard__content">
        <img
          className="productCard__image"
          src={picture}
          alt={title}
          width={180}
          height={180}
        />
        <div className="productCard__details">
          <div className="productCard__priceDetails">
            <p>
              {formatPriceToARS(price.amount)}
              <sup className="productCard__priceDetails--cents">
                {price.decimals < 10 ? `0${price.decimals}` : price.decimals}
              </sup>
            </p>
            {free_shipping && (
              <img
                src="/assets/ic_shipping.png"
                alt="free shipping logo "
                width={18}
                height={18}
                loading="lazy"
              />
            )}
          </div>
          <Link
            to={`/items/${id}`}
            target="_blank"
            className="productCard__title"
          >
            {title}
          </Link>
        </div>
      </div>
      <div className="productCard__condition">
        {condition ? "Nuevo" : "Usado"}
      </div>
    </article>
  )
}
export default ProductCard
