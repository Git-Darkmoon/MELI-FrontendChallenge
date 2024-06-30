export type Author = {
  name: string
  lastname: string
}

export type SearchResultsData = {
  author: Author
  categories: string[]
  items: SearchedItem[]
}

export type SearchedItem = {
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
}

export type Picture = {
  readonly id: string
  readonly url: string
  readonly secure_url: string
  readonly size: string
  readonly max_size: string
  readonly quality: string
}

export type ItemDetails = {
  id: string
  title: string
  price: {
    currency: string
    amount: number
    decimals: number
  }
  picture: Picture[]
  condition: string
  free_shipping: boolean
  sold_quantity: number
  description: string
  categories: string[]
}

export type ProductDetailsData = {
  author: Author
  item: ItemDetails
}
