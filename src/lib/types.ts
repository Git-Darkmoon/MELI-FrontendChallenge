// All the types that compose the SearchAPIResponse

export type SearchAPIResponse = {
  readonly site_id: "MLA"
  readonly country_default_time_zone: string
  readonly query: string
  readonly paging: Paging
  readonly results: Result[]
  readonly sort: Sort
  readonly available_sorts: Sort[]
  readonly filters: unknown[]
  readonly available_filters: AvailableFilter[]
  readonly pdp_tracking: PDPTracking
  readonly user_context: null
}

export type AvailableFilter = {
  readonly id: string
  readonly name: string
  readonly type: string
  readonly values: AvailableFilterValue[]
}

export type AvailableFilterValue = {
  readonly id: string
  readonly name: string
  readonly results: number
}

export type Sort = {
  readonly id: string
  readonly name: string
}

export type Paging = {
  readonly total: number
  readonly primary_results: number
  readonly offset: number
  readonly limit: number
}

export type PDPTracking = {
  readonly group: boolean
  readonly product_info: ProductInfo[]
}

export type ProductInfo = {
  readonly id: string
  readonly score: number
  readonly status: "shown"
}

export type Result = {
  readonly id: string
  readonly title: string
  readonly condition: "new"
  readonly thumbnail_id: string
  readonly catalog_product_id: null | string
  readonly listing_type_id: ListingTypeID
  readonly permalink: string
  readonly buying_mode: "buy_it_now"
  readonly site_id: "MLA"
  readonly category_id: CategoryID
  readonly domain_id: DomainID
  readonly thumbnail: string
  readonly currency_id: "ARS"
  readonly order_backend: number
  readonly price: number
  readonly original_price: number | null
  readonly sale_price: null
  readonly available_quantity: number
  readonly official_store_id: number | null
  readonly official_store_name?: OfficialStoreName
  readonly use_thumbnail_id: boolean
  readonly accepts_mercadopago: boolean
  readonly shipping: Shipping
  readonly stop_time: Date
  readonly seller: Seller
  readonly attributes: ResultAttribute[]
  readonly installments: Installments
  readonly winner_item_id: null
  readonly catalog_listing: boolean
  readonly discounts: null
  readonly promotions: unknown[]
  readonly inventory_id: null | string
  readonly differential_pricing?: DifferentialPricing
  readonly variation_filters?: VariationFilter[]
  readonly variations_data?: { [key: string]: VariationsDatum }
}

export type ResultAttribute = {
  readonly id: VariationFilter
  readonly name: Name
  readonly value_id: null | string
  readonly value_name: null | string
  readonly attribute_group_id: AttributeGroupID
  readonly attribute_group_name: AttributeGroupName
  readonly value_struct: Struct | null
  readonly values: AttributeValue[]
  readonly source: number
  readonly value_type: Value
}

export type AttributeGroupID = "OTHERS" | ""

export type AttributeGroupName = "Otros" | ""

export type VariationFilter =
  | "BRAND"
  | "COLOR"
  | "GTIN"
  | "ITEM_CONDITION"
  | "MAIN_COLOR"
  | "MODEL"
  | "GPU_MODEL"
  | "LINE"
  | "PROCESSOR_MODEL"
  | "WEIGHT"
  | "PROCESSOR_BRAND"
  | "PROCESSOR_LINE"
  | "DETAILED_MODEL"
  | "PACKAGE_LENGTH"
  | "PACKAGE_WEIGHT"
  | "ALPHANUMERIC_MODEL"
  | "CABLE_LENGTH"
  | "LENGTH"

export type Name =
  | " Marca del cargador"
  | "Color"
  | "Código universal de producto"
  | "Condición del ítem"
  | "Color principal"
  | " Modelo del cargador"
  | "Marca"
  | "Modelo de GPU"
  | "Línea"
  | "Modelo"
  | "Modelo del procesador"
  | "Peso"
  | "Marca del procesador"
  | "Línea del procesador"
  | "Modelo detallado"
  | "Largo del paquete"
  | "Peso del paquete"
  | "Modelo alfanumérico"
  | "Largo del cable"
  | "Largo"

export type Struct = {
  readonly number: number
  readonly unit: Unit
}

export type Unit = "g" | "cm" | "kg" | "mm"

export type Value = "string" | "list" | "number_unit"

export type AttributeValue = {
  readonly id: null | string
  readonly name: null | string
  readonly struct: Struct | null
  readonly source: number
}

export type CategoryID = "MLA429749" | "MLA1055" | "MLA1652" | "MLA125138"

export type DifferentialPricing = {
  readonly id: number
}

export type DomainID =
  | "MLA-MOBILE_DEVICE_CHARGERS"
  | "MLA-CELLPHONES"
  | "MLA-NOTEBOOKS"
  | "MLA-STYLUSES"

export type Installments = {
  readonly quantity: number
  readonly amount: number
  readonly rate: number
  readonly currency_id: "ARS"
}

export type ListingTypeID = "gold_special" | "gold_pro"

export type OfficialStoreName = "Apple" | "MARSTECH"

export type Seller = {
  readonly id: number
  readonly nickname: string
}

export type Shipping = {
  readonly store_pick_up: boolean
  readonly free_shipping: boolean
  readonly logistic_type: LogisticType
  readonly mode: "me2"
  readonly tags: Tag[]
  readonly benefits: null
  readonly promise: null
  readonly shipping_score: number
}

export type LogisticType =
  | "cross_docking"
  | "xd_drop_off"
  | "drop_off"
  | "fulfillment"

export type Tag =
  | "mandatory_free_shipping"
  | "self_service_in"
  | "fulfillment"
  | "self_service_out"

export type VariationsDatum = {
  readonly thumbnail: string
  readonly ratio: string
  readonly name: string
  readonly pictures_qty: number
  readonly price: number
  readonly user_product_id: string
  readonly attributes: VariationsDatumAttribute[]
}

export type VariationsDatumAttribute = {
  readonly id: VariationFilter
  readonly name: Name
  readonly value_name: Value
  readonly value_type: string
}

export type TransformedData = {
  author: {
    name: string
    lastname: string
  }
  categories: string[]
  items: {
    id: string
    title: string
    price: {
      currency: string
      amount: number
      decimals: number
    }
    picture: string
    condition: string
    free_shipping: boolean
  }[]
}
