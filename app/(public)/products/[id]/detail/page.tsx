'use client';

import { useEffect, useState } from 'react';
import { getProductDetail } from '@/lib/auth';
import { ProductDetailResponse } from '@/model/productdetailresponse.model';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import * as React from 'react';
import { cn } from "@/lib/utils";
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
import DOMPurify from 'isomorphic-dompurify';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/`;

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [data, setData] = useState<ProductDetailResponse | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(true);
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);
    setCount(api.scrollSnapList().length)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  useEffect(() => {
    params.then(({ id }) => {
      getProductDetail(Number(id)).then((res) => {
        setData(res);
        setLoading(false);
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <div className="p-6 text-center text-gray-500">Không tìm thấy sản phẩm</div>;

  const { product, images } = data;
  const cleanHtml = DOMPurify.sanitize(product.info);

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Sản phẩm {product.name}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
        <div className="h-115 w-full border rounded-xl flex flex-col items-center justify-center">
          <PhotoProvider>
            <Carousel setApi={setApi} className="w-full relative px-3">
              <CarouselContent>
                {images.map((img) => (
                  <CarouselItem key={img.id}>
                    <PhotoView src={`${url}${img.storage_path}`}>
                      <Image
                        src={`${url}${img.storage_path}`}
                        alt={img.file_name}
                        width={750}
                        height={500}
                        className="w-180 h-80 object-cover"
                      />
                    </PhotoView>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </PhotoProvider>

          {current} / {count}

          <Carousel className="mt-4 w-full px-20">
            <div className="mask-x-from-90%">
              <CarouselContent className="my-1 flex">
                {images.map((img, index) => (
                  <CarouselItem
                    className={cn(
                      "basis-1/4 cursor-pointer transition-opacity",
                      current === index + 1 ? "opacity-100" : "opacity-50"
                    )}
                    key={img.id}
                    onClick={() => handleThumbClick(index)}
                  >
                    <Image
                      src={`${url}${img.storage_path}`}
                      width={256}
                      height={256}
                      alt={img.file_name}
                      className="w-25 h-17 rounded-xl object-cover"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </div>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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

            </div>              
            <Button type='submit' variant="outline" size="lg" className='text-indigo-500'>
                <ShoppingCart className="w-5 h-5 mr-2" /> Thêm vào giỏ hàng
            </Button>
            <Button type='button' variant="outline" size="lg" onClick={() => window.location.href = '/products'} className='bg-indigo-500 text-white hover:bg-indigo-700 transition-colors'>
                <p className="w-5 h-5 mr-2" /> Xem các sản phẩm khác
            </Button>

          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
      <TabsList className="border-b w-full">
        <TabsTrigger value="overview">Thông tin sản phẩm</TabsTrigger>
        <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
      </TabsList>
       
      <TabsContent value="overview">
      {product.info && (
        <div className="flex flex-col gap-3">
          <Separator />
          <div className="ck-content" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>
      )}
      </TabsContent>

      <TabsContent value="specs">
        {product.specs?.length > 0 && (
          <div className="flex flex-col gap-3">
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
      </TabsContent>
      </ Tabs>
    </div>
  );
}