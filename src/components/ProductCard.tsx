import type { Product } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    return (
        <div className="group relative bg-white rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col h-full overflow-hidden">

            {/* Image Container */}
            <div className="relative aspect-square mb-4 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start">
                    {product.isNew && (
                        <Badge className="bg-sky-500 hover:bg-sky-600 text-white text-[10px] px-2 py-0.5 rounded-sm border-none shadow-sm animate-in fade-in">Yangi</Badge>
                    )}
                    {product.status === "Bestseller" && (
                        <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded-sm border-none shadow-sm">Top sotuv</Badge>
                    )}
                    {product.status === "Few left" && (
                        <Badge variant="destructive" className="text-[10px] px-2 py-0.5 rounded-sm border-none shadow-sm">Oz qoldi</Badge>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <p className="text-xs font-medium text-slate-400 mb-1">{product.category}</p>
                <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-tight mb-2 line-clamp-2 group-hover:text-sky-600 transition-colors">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 line-through mb-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            {product.priceValue * 1.15} UZS
                        </span>
                        <span className="text-base sm:text-lg font-bold text-green-600 tracking-tight">
                            {product.price}
                        </span>
                    </div>

                    <Button
                        size="icon"
                        className="rounded-full bg-slate-900 hover:bg-sky-600 text-white shadow-md transition-colors shrink-0 group/btn"
                        onClick={() => addToCart(product)}
                        title="Savatga qo'shish"
                    >
                        <ShoppingCart className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
