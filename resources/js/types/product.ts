export type ProductType = 'single' | 'pack' | 'gift';

export interface Product {
    id: number;
    name: string;
    slug: string;
    type: ProductType;
    tagline: string | null;
    description: string | null;
    ingredients: string | null;
    how_to_use: string | null;
    price: number;
    compare_at_price: number | null;
    net_weight_g: number | null;
    badge: string | null;
    image: string | null;
    in_stock: boolean;
}