export interface ProductSpec {
    label: string;
    value: string;
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    price: string;
    priceValue: number;
    category: string;
    variants?: string;
    status: "Omborda bor" | "Bestseller" | "Sanoqli qoldi";
    isNew: boolean;
    image: string;
    description: string;
    specs: ProductSpec[];
}

export interface CartItem extends Product {
    quantity: number;
}
