export const menuItems = [
  {
    label: 'Hãng',
    children: [
      { label: 'iPhone', searchName: 'iPhone' },
      { label: 'Samsung', searchName: 'Samsung' },
      { label: 'Xiaomi', searchName: 'Xiaomi' },
      { label: 'OPPO', searchName: 'OPPO' },
      { label: 'Toàn bộ các hãng', searchName: '' },
    ],
  },
  {
    label: 'Khoảng giá',
    children: [
      { label: 'Dưới 10 triệu', minPrice: undefined, maxPrice: 10000000 },
      { label: '10 - 20 triệu', minPrice: 10000000, maxPrice: 20000000 },
      { label: 'Trên 20 triệu', minPrice: 20000000, maxPrice: undefined },
      { label: 'Tất cả', minPrice: undefined, maxPrice: undefined },
    ],
  },
  {
    label: 'Sắp xếp theo',
    children: [
      { label: 'Giá thấp đến cao', orderBy: 'ASC' },
      { label: 'Giá cao đến thấp', orderBy: 'DESC' },
    ],
  }
];