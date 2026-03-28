import { Trash2, Loader2, ShoppingCart, Minus, Plus } from "lucide-react";
import type { WishlistItem, Product } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";
import { Button } from "./ui/button";

interface WishlistCardProps {
    item: WishlistItem;
    onRemove: (productId: string) => void;
}

// Build a minimal Product from WishlistItem so CartContext & ProductDetailsDrawer work
function toProduct(item: WishlistItem): Product {
    return {
        id: item.productId,
        nameUz: item.productNameUz,
        basePrice: item.basePrice,
        images: item.primaryImageUrl
            ? [{ id: "primary", url: item.primaryImageUrl, isPrimary: true }]
            : [],
    };
}

export function WishlistCard({ item, onRemove }: WishlistCardProps) {
    const formattedPrice = item.basePrice.toLocaleString("uz-UZ");
    const [isRemoving, setIsRemoving] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const { addToCart, getItemQuantity, updateQuantity } = useCart();
    const product = toProduct(item);
    const quantity = getItemQuantity(item.productId);

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRemoving(true);
        onRemove(item.productId);
    };

    return (
        <>
            <motion.div
                layout
                onClick={() => setIsDetailsOpen(true)}
                className="flex flex-col bg-white p-3 rounded-2xl border border-slate-200 relative shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 h-full cursor-pointer hover:border-[#007AFF]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
                {/* Image */}
                <div className="relative w-full aspect-square bg-[#F1F5F9] rounded-xl overflow-hidden mb-3 shrink-0 flex items-center justify-center p-3">
                    {item.primaryImageUrl ? (
                        <img
                            src={item.primaryImageUrl}
                            alt={item.productNameUz}
                            className="w-full h-full object-contain drop-shadow-sm"
                        />
                    ) : (
                        <div className="w-full h-full rounded-xl bg-white/60 backdrop-blur-md border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-slate-300">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-10 h-10 mb-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400">
                                Rasm yo'q
                            </span>
                        </div>
                    )}

                    {/* Trash — always visible, 44x44 touch target */}
                    <button
                        onClick={handleRemove}
                        disabled={isRemoving}
                        className="absolute top-1.5 right-1.5 z-10 w-11 h-11 rounded-full bg-red-500/10 backdrop-blur-md border border-red-200/60 shadow-sm flex items-center justify-center text-red-500 hover:bg-red-500/20 hover:border-red-300 transition-all duration-200 active:scale-90 disabled:opacity-50"
                        aria-label="O'chirish"
                    >
                        {isRemoving ? (
                            <Loader2 className="w-4.5 h-4.5 animate-spin" strokeWidth={2} />
                        ) : (
                            <Trash2 className="w-4.5 h-4.5" strokeWidth={2} />
                        )}
                    </button>
                </div>

                {/* Product Info */}
                <div className="flex flex-col flex-1 px-1">
                    <h3 className="text-[14px] font-semibold text-slate-900 line-clamp-2 leading-snug min-h-10 tracking-tight">
                        {item.productNameUz}
                    </h3>

                    <span className="text-[16px] font-bold text-[#007AFF] mt-auto pt-2 whitespace-nowrap">
                        {formattedPrice} so'm
                    </span>
                </div>

                {/* Cart Action Area */}
                <div className="mt-3 h-10 px-1">
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
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product);
                                    }}
                                    className="h-10 w-full bg-[#007AFF] hover:bg-[#005bb5] text-white rounded-xl text-[12px] font-bold flex items-center justify-center gap-2 transition-all p-0 shadow-sm"
                                >
                                    <ShoppingCart className="w-4 h-4" strokeWidth={2.5} />
                                    Savatga
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="stepper"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="h-10 w-full rounded-xl flex items-center justify-between p-1 bg-white border border-slate-200 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateQuantity(item.productId, Math.max(0, quantity - 1));
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors active:scale-95 shrink-0"
                                >
                                    <Minus className="h-4 w-4" strokeWidth={2.5} />
                                </button>

                                <span className="text-[13px] font-black text-slate-900 px-1 truncate tracking-widest">
                                    {quantity}
                                </span>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateQuantity(item.productId, quantity + 1);
                                    }}
                                    className="w-8 h-8 flex items-center justify-center bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] rounded-lg transition-colors active:scale-95 shrink-0"
                                >
                                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Product Details Drawer */}
            <ProductDetailsDrawer
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                product={product}
            />
        </>
    );
}
