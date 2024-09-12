export interface ICategoryBase {
  title: string
  icon: string
}

export interface ICategoryCreate extends ICategoryBase {
  uniqueString: string
  slug: string
  mainImage: string
}

export interface ICategoryGetOne {
  dkp: string
}

export interface ICategoryUpdate extends Partial<ICategoryBase> {
  dkp: string
}

export interface ICategoryGetAll {
  page?: number
  limit?: number
}
