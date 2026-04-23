export interface MenuItem {
  label: string;
  searchName?: string;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
  children?: MenuItem[];
}