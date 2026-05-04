'use client';

import { useEffect, useState } from 'react';
import { getProductDetail } from '@/lib/auth';
import { ProductDetailResponse } from '@/model/productdetailresponse.model';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import * as React from 'react';
import { ShoppingCart } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/`;

function ProductDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      <div className="flex gap-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-64 h-64 rounded-lg shrink-0" />
        ))}
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-1/4" />
      </div>
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [data, setData] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  useEffect(() => {
    params.then(({ id }) => {
      getProductDetail(Number(id)).then((res) => {
        setData(res);
        setLoading(false);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <ProductDetailSkeleton />;
  if (!data) return <div className="p-6 text-center text-gray-500">Không tìm thấy sản phẩm</div>;

  const { product, images } = data;

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-8">
      <div className="mx-auto max-w-2xl px-12">
        <Carousel setApi={setApi} className="w-full max-w-xs relative h-80">
          <CarouselContent>
            {images.map((img) => (
              <CarouselItem key={img.id} className="w-full">
                <Image
                  src={`${url}${img.storage_path}`}
                  alt={img.file_name}
                  width={250}
                  height={320}
                  className="w-full h-full object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Hình {current} / {count}
        </div>
      </div>

      <Card>
        <CardContent className="flex flex-col gap-3 pt-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
              {product.stock > 0 ? `Còn ${product.stock} sản phẩm` : 'Hết hàng'}
            </Badge>
          </div>
          <p className="text-gray-500">{product.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold text-red-500">
              {Number(product.price).toLocaleString('vi-VN')}đ
            </p>
            <Button variant="outline" size="lg">
              <ShoppingCart className="w-5 h-5 mr-2"/> Thêm vào giỏ hàng
            </Button>
          </div>
        </CardContent>
      </Card>

      {product.info && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Mô tả chi tiết</h2>
          <Separator />
          <p className="text-gray-600 leading-relaxed">{product.info}</p>
        </div>
      )}

      {product.specs?.length > 0 && (
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Thông số kỹ thuật</h2>
          <Separator />
          <Card>
            <CardContent className="pt-4">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, index) => (
                    <tr key={spec.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-2 px-4 text-gray-500 w-1/3 font-medium">{spec.key}</td>
                      <td className="py-2 px-4">
                        {spec.value}{spec.unit ? ` ${spec.unit}` : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}