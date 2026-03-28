export interface ProductSpec {
    label: string;
    value: string;
}

export interface ProductImage {
    id: string;
    url: string;
    altText?: string;
    isPrimary: boolean;
}

export interface Category {
    id: string;
    parentId: string | null;
    nameUz: string;
    slug: string;
    isActive: boolean;
    children: Category[];
}

export interface Product {
    id: string;

    // New Backend Fields
    nameUz: string;
    basePrice: number;
    images: ProductImage[];
    descriptionUz?: string;
    unit?: string;
    sku?: string;
    stock?: string;

    // Existing / Optional fields
    name?: string;
    brand?: string;
    price?: string;
    priceValue?: number;
    category?: string;
    variants?: string;
    status?: "Omborda bor" | "Bestseller" | "Sanoqli qoldi" | string;
    isNew?: boolean;
    image?: string;
    description?: string;
    specs?: ProductSpec[];
}

export interface CartItem extends Product {
    quantity: number;
}
