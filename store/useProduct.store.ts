import { create } from 'zustand';
import { getProducts } from '@/lib/auth';
import { Product } from '@/model/product.model';
import { ProductMeta } from '@/model/productmeta.model';

type ProductState = {
    products: Product[];
    meta: ProductMeta | null;
    fetchProducts: (searchName?: string, page?: number, limit?: number, minPrice?: number, maxPrice?: number) => Promise<void>;
};

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    meta: null,

    fetchProducts: async (searchName?: string, page = 1, limit = 10, minPrice?: number, maxPrice?: number) => {
        const res = await getProducts(searchName, page, limit, minPrice, maxPrice);

        set({
            products: res.data,
            meta: res.meta,
        });
    },
}));
