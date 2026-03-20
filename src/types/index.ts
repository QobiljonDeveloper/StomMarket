export interface Product {
    id: string;
    name: string;
    price: string;
    priceValue: number;
    category: string;
    variants?: string;
    status: "In Stock" | "Bestseller" | "Few left";
    isNew: boolean;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}
