interface IProduct {
  content: string,
  created_at: string,
  id: number,
  meta_description: string,
  meta_title: string,
  name: string,
  price: number,
  published_at: string,
  slug: string,
  updated_at: string,
}

export interface ProductsProps {
  products: IProduct[];
}