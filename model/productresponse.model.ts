import {Product} from './product.model';
import {ProductMeta} from './productmeta.model';

export interface ProductResponse {
  data: Product[];
  meta: ProductMeta;
}