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
        <div className="group flex flex-col bg-white/5 backdrop-blur-md p-2.5 rounded-[1.25rem] border border-white/10 relative hover:border-white/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] hover:bg-white/10 transition-all duration-300 h-full">
            {/* Image Area */}
            <div className="relative w-full aspect-square bg-[#0b1121] rounded-xl overflow-hidden mb-3 shrink-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110 drop-shadow-xl"
                />

                {/* Heart Icon (Small, Glass, Transparent BG) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        toggleSaveProduct(product);
                    }}
                    className="absolute top-2 right-2 z-10 p-1.5 transition-all duration-200 active:scale-90 outline-none rounded-full bg-slate-900/40 backdrop-blur-md border border-white/5 hover:bg-slate-900/60"
                >
                    <motion.div
                        initial={false}
                        animate={{ scale: saved ? [1, 1.3, 1] : 1 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Heart className={`w-4 h-4 transition-colors ${saved ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_5px_rgba(244,63,94,0.6)]' : 'text-slate-400 hover:text-rose-400'}`} />
                    </motion.div>
                </button>
            </div>

            {/* Typography Area */}
            <div className="flex flex-col flex-1 px-1">
                <h3 className="text-[13px] font-medium text-slate-100 line-clamp-2 leading-tight min-h-[2.4rem] tracking-wide">
                    {product.name}
                </h3>

                {product.variants && (
                    <p className="text-[10px] text-cyan-400/80 line-clamp-1 mt-1 font-medium tracking-wide uppercase">
                        {product.variants}
                    </p>
                )}

                <span className="text-[15px] font-bold text-white mt-auto pt-2 whitespace-nowrap drop-shadow-md">
                    {product.price}
                </span>

                {/* Action Area */}
                <div className="mt-2.5 h-9">
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
                                    className="h-9 w-full bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-50 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-all p-0 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/10"
                                >
                                    <ShoppingCart className="w-4 h-4" />
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
                                className="h-9 w-full rounded-xl flex items-center justify-between p-1 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] bg-slate-950/50 border border-white/5"
                            >
                                <button
                                    onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                                    className="w-7 h-7 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors active:scale-95 shrink-0 border border-white/10"
                                >
                                    <Minus className="h-3.5 w-3.5" />
                                </button>

                                <span className="text-[11px] font-bold text-cyan-300 px-1 truncate uppercase tracking-widest text-shadow-sm">
                                    {quantity} <span className="text-cyan-500/70 text-[9px]">dona</span>
                                </span>

                                <button
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 rounded-lg transition-colors active:scale-95 shrink-0 border border-cyan-500/30"
                                >
                                    <Plus className="h-3.5 w-3.5" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
