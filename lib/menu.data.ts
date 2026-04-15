import { MenuItem } from '@/model/menu.model';

export const menuItems: MenuItem[] = [
    {
        label: 'Danh mục',
        children: [
            {
                label: 'Danh mục 1',
                children: [
                    {
                        label: 'Danh mục con 1',
                        href: '/#',
                    },
                    {   
                        label: 'Danh mục con 2',
                        href: '/#',
                    },
                ],
            },
            {
                label: 'Danh mục 2',
                children: [
                    {
                        label: 'Danh mục con 3',
                        href: '/#',
                    },
                    {
                        label: 'Danh mục con 4',
                        href: '/#',
                    },
                    {
                        label: 'Danh mục con 5',
                        href: '/#',
                    }
                ],
            },
        ],
    },
];