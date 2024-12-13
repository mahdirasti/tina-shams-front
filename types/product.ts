import { BrandType } from "./brand"
import { CategoryType } from "./category"
import { FileType } from "./file"

export type ProductType = {
  name: string
  price: number
  discountPercentage: number
  discountAmount: number
  seo_title: string
  seo_description: string
  seo_keyword: string
  slug: string
  medias?: FileType[]
  categories?: CategoryType[]
  similars: ProductType[]
  brands?: BrandType[]
  thumbnail: FileType
  rate: number
  rateCount: number
  stock: number
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  priceFinal: number
  id: string
}
