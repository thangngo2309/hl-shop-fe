'use client';

import UploadImage from "@/component/upload.component";
import { ImageType } from "@/constants/image-type.enum";
import { getProducts } from "@/lib/auth";
import { Product } from "@/model/product.model";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TestUploadPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<number>(1);

  useEffect(() => {
    getProducts(undefined, 1, 50).then(data => setProducts(data.data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Test Upload</h1>
      <p className="text-gray-600">Chọn sản phẩm để upload ảnh:</p>

      <Select
        value={String(selectedId)}
        onValueChange={(val) => setSelectedId(Number(val))}
      >
        <SelectTrigger className="w-64">
          <SelectValue/>
        </SelectTrigger>
        <SelectContent>
          {products.map((product) => (
            <SelectItem key={product.product_id} value={String(product.product_id)}>
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <UploadImage
        key={selectedId}
        type={ImageType.PRODUCT}
        entityId={selectedId}
        onUploadSuccess={(response) => console.log('Upload success:', response)}
      />
    </div>
  );
}