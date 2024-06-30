export type Author = {
  name: string
  lastname: string
}

export type SearchResultsData = {
  readonly author: Author
  readonly categories: string[]
  readonly items: SearchedItem[]
}

export type SearchedItem = {
  readonly id: string
  readonly title: string
  price: {
    currency: string
    amount: number
    decimals: number
  }
  readonly picture: string
  readonly condition: string
  readonly free_shipping: boolean
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
  readonly id: string
  readonly title: string
  price: {
    currency: string
    amount: number
    decimals: number
  }
  readonly picture: Picture[]
  readonly condition: string
  readonly free_shipping: boolean
  readonly sold_quantity: number
  readonly description: string
  categories: string[]
}

export type ProductDetailsData = {
  readonly author: Author
  readonly item: ItemDetails
}
