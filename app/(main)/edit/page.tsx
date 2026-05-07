'use client';

import ClientSideCustomEditor from '@/component/client-side-custom-editor';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { updateProductInfo } from '@/lib/auth';
import { toast } from 'react-toastify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getProducts } from '@/lib/auth';
import { Product } from '@/model/product.model';
import { useEffect } from 'react';

export default function Edit() {
  const [content, setContent] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedId, setSelectedId] = useState<number>(1);

  useEffect(() => {
    getProducts(undefined, 1, 50).then(data => setProducts(data.data));
  }, []);

  const handleSave = async () => {
    await updateProductInfo(selectedId, content);
    toast.success('Cập nhật thông tin thành công!');
  }

  return (
    <div>
      <Select
        value={String(selectedId)}
        onValueChange={(val) => setSelectedId(Number(val))}
      >
        <SelectTrigger className="w-64">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {products.map((product) => (
            <SelectItem key={product.product_id} value={String(product.product_id)}>
              {product.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <ClientSideCustomEditor onChange={setContent} />
      <Button type='submit' variant="default" className="mt-4 bg-red-600" onClick={handleSave}>
        Lưu
      </Button>
    </div>
  );
}