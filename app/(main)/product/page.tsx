'use client';

import { ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/auth';
import { ProductResponse } from '@/model/productresponse.model';
import { ProductMeta } from '@/model/productmeta.model';
import { Product } from '@/model/product.model';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent} from '@/components/ui/card';

export default function ProductPage() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [products, setProducts] = useState<Product[]>([]);
    const [meta, setMeta] = useState<ProductMeta | null>(null);

    const searchName = searchParams.get('searchName') || '';
    const minPriceParam = searchParams.get('minPrice');
    const maxPriceParam = searchParams.get('maxPrice');
    const minPrice = minPriceParam !== null ? Number(minPriceParam) : undefined;
    const maxPrice = maxPriceParam !== null ? Number(maxPriceParam) : undefined;
    const orderBy = searchParams.get('orderBy') || 'ASC';
    const pageParam = Number(searchParams.get('page') || '1');
    const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
    const limitParam = Number(searchParams.get('limit') || '10');
    const limit = Number.isNaN(limitParam) || limitParam < 1 ? 10 : limitParam;

    useEffect(() => {
        const fetchProducts = async () => {
            const response: ProductResponse = await getProducts(searchName, page, limit, minPrice, maxPrice, orderBy);
            setProducts(response.data);
            setMeta(response.meta);
        };
        fetchProducts();
    }, [searchName, page, limit, minPrice, maxPrice, orderBy]);

    const buildParams = (overrides: Record<string, string | undefined>) => {
        const params = new URLSearchParams(searchParams.toString());
        for (const [key, value] of Object.entries(overrides)) {
            if (value !== undefined) {
                params.set(key, value);
            } else {
                params.delete(key);
            }
        }
        if (!searchName) params.delete('searchName');
        return params.toString();
    };

    const goToPage = (nextPage: number) => {
        if (nextPage < 1 || (meta && nextPage > meta.pageTotalCount)) return;
        router.push(`${pathname}?${buildParams({ page: String(nextPage) })}`);
    };

    const handleLimitChange = (newLimit: string) => {
        const limit = Number(newLimit);
        if (limit < 1) return;
        router.push(`${pathname}?${buildParams({ limit: String(limit), page: '1' })}`);
    };

    const handlePageChange = (newPage: string) => {
        const pageNum = Number(newPage);
        if (pageNum < 1) return;
        router.push(`${pathname}?${buildParams({ page: String(pageNum) })}`);
    };

return (
    <div className="flex min-h-screen flex-col">
        <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-10 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 shadow-md">
                    <Package className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Danh sách sản phẩm</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((item) => (
                    <Card
                        key={item.product_id}
                        className="hover:shadow-xl transition-all hover:-translate-y-1 group"
                    >
                        <CardContent className="p-6 flex h-full flex-col">
                            <h2 className="mb-3 text-lg font-semibold text-gray-900 transition-colors group-hover:text-indigo-600">
                                {item.name}
                            </h2>

                            <p className="mb-4 line-clamp-3 grow text-sm text-gray-600">
                                {item.description}
                            </p>

                            <div className="mt-auto border-t border-gray-100 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Giá bán</span>
                                    <span className="text-xl font-bold text-indigo-600">
                                        {Number(item.price).toLocaleString('vi-VN')}đ
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>

        {meta && (
            <div>
                <div className="flex items-center justify-center gap-3">
                    <Button
                        disabled={!meta.hasPreviousPage}
                        onClick={() => goToPage(page - 1)}
                        variant="outline"
                        size="sm"
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        <span className="hidden sm:inline">Trước</span>
                    </Button>

                    <div className="flex items-center gap-2 rounded-lg bg-linear-to-r from-indigo-500 to-purple-600 px-3 py-1.5 text-white shadow-md">
                        <span className="text-xs sm:text-sm">
                            Trang <span className="font-bold">{meta.page}</span> / {meta.pageTotalCount}
                        </span>
                    </div>

                    <Button
                        disabled={!meta.hasNextPage}
                        onClick={() => goToPage(page + 1)}
                        variant="outline"
                        size="sm"
                    >
                        <span className="hidden sm:inline">Sau</span>
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">Đến trang</span>
                        <Select value={String(page)} onValueChange={handlePageChange}>
                            <SelectTrigger className="w-14 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Array.from({ length: meta.pageTotalCount }, (_, i) => (
                                    <SelectItem key={i + 1} value={String(i + 1)}>
                                        {i + 1}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-gray-500">/ {meta.pageTotalCount}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-600">Hiển thị:</span>
                        <Select value={String(limit)} onValueChange={handleLimitChange}>
                            <SelectTrigger className="w-14 h-8">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 15, 20, 25, 50].map(val => (
                                    <SelectItem key={val} value={String(val)}>
                                        {val}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <span className="text-gray-500">sản phẩm / trang</span>
                    </div>
                </div>

                <div className="flex items-center justify-center text-xs sm:text-sm text-gray-500">
                    Có <span className="font-medium mx-1">{meta.itemCount}</span> sản phẩm phù hợp trên
                    tổng <span className="font-medium mx-1">{meta.itemTotalCount}</span> sản phẩm
                </div>
            </div>
        )}
    </div>
);
}