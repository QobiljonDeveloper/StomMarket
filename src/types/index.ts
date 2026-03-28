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
    primaryImageUrl?: string | null;
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

export interface CartItem {
    id: string; // The backend cart item ID (used for DELETE and PATCH)
    quantity: number;
    product: Product; // The actual product object
}

export interface WishlistItem {
    id: string;                // wishlist record ID — do NOT use for product logic
    productId: string;         // actual product UUID — use for delete/view actions
    productNameUz: string;
    productNameRu: string;
    slug: string;
    basePrice: number;
    primaryImageUrl: string | null;
}
