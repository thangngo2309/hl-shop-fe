export interface Product {
  product_id: number;
  name: string;
  description: string;
  info: string;
  price: number;
  stock: number;
  image: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}