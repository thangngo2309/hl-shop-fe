import { UploadImageResponse } from "./imageresponse.model";
import { Product } from "./product.model";
import { ProductSpecs } from "./productpecs.model";

export interface ProductDetailResponse {
  product: Product & {
    specs: ProductSpecs[];
  };
  images: UploadImageResponse[];
}