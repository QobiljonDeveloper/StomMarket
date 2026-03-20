import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const {
        addToCart,
        toggleSaveProduct,
        isProductSaved,
        getItemQuantity,
        updateQuantity
    } = useCart();
    const saved = isProductSaved(product.id);
    const quantity = getItemQuantity(product.id);

    return (
        <div className="group flex flex-col bg-white p-3 rounded-xl border border-gray-100 relative hover:shadow-md transition-all duration-200 h-full">
            {/* Image Area */}
            <div className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2 shrink-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Heart Icon (Small, Gray, Transparent BG) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleSaveProduct(product);
                    }}
                    className="absolute top-2 right-2 z-10 p-1 transition-all duration-200 active:scale-90 outline-none"
                >
                    <Heart className={`w-5 h-5 transition-colors ${saved ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                </button>
            </div>

            {/* Typography Area */}
            <div className="flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug min-h-[2.5rem]">
                    {product.name}
                </h3>

                {product.variants && (
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-1 font-medium">
                        {product.variants}
                    </p>
                )}

                <span className="text-base font-bold text-gray-900 mt-auto pt-2 whitespace-nowrap">
                    {product.price}
                </span>

                {/* Action Area (Compact Inline State, Fixed h-8) */}
                <div className="mt-2 h-8">
                    <AnimatePresence mode="wait" initial={false}>
                        {quantity === 0 ? (
                            <motion.div
                                key="add-btn"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Button
                                    onClick={() => addToCart(product)}
                                    className="h-8 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors p-0"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="stepper"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="h-8 w-full border border-gray-200 rounded-lg flex items-center justify-between p-0.5 bg-white shadow-sm"
                            >
                                <button
                                    onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                                    className="w-7 h-7 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-black rounded-md transition-colors active:scale-95 shrink-0"
                                >
                                    <Minus className="h-4 w-4" />
                                </button>

                                <span className="text-xs font-bold text-gray-900 px-1 truncate uppercase tracking-tighter">
                                    {quantity} dona
                                </span>

                                <button
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-black rounded-md transition-colors active:scale-95 shrink-0"
                                >
                                    <Plus className="h-4 w-4" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
