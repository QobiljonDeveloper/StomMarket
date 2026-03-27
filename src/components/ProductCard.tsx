import { Heart, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import type { Product } from "../types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ProductDetailsDrawer } from "./ProductDetailsDrawer";

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
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    return (
        <>
            <div
                onClick={() => setIsDetailsOpen(true)}
                className="group flex flex-col bg-white p-3 rounded-2xl border border-slate-200 relative hover:border-[#007AFF]/30 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] transition-all duration-300 h-full cursor-pointer"
            >
                {/* Image Area with soft medical blue backing */}
                <div className="relative w-full aspect-square bg-[#F1F5F9] group-hover:bg-[#E0F2F1]/50 rounded-xl overflow-hidden mb-3 shrink-0 transition-colors duration-300 flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-[85%] h-[85%] object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-sm"
                    />

                    {/* Like button: Light gray turning into an elegant red dot on active */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toggleSaveProduct(product);
                        }}
                        className="absolute top-2 right-2 z-10 p-1.5 transition-all duration-200 active:scale-90 outline-none rounded-full bg-white/80 backdrop-blur-md border border-slate-200 hover:bg-white shadow-sm"
                    >
                        <motion.div
                            initial={false}
                            animate={{ scale: saved ? [1, 1.3, 1] : 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Heart className={`w-4 h-4 transition-colors ${saved ? 'text-white fill-red-500 bg-red-500 rounded-full' : 'text-slate-400 hover:text-red-400'}`} strokeWidth={saved ? 0 : 2} />
                        </motion.div>
                    </button>

                    {/* Status Badge inside image top left */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.status === 'Omborda bor' && (
                            <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider shadow-sm">
                                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                                Omborda
                            </span>
                        )}
                        {product.status === 'Sanoqli qoldi' && (
                            <span className="bg-amber-50 text-amber-600 border border-amber-100 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 uppercase tracking-wider shadow-sm">
                                <div className="w-1 h-1 rounded-full bg-amber-500" />
                                Qoldi
                            </span>
                        )}
                    </div>
                </div>

                {/* Typography Area */}
                <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-center justify-between mb-1">
                        {product.brand && (
                            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 uppercase tracking-widest">
                                {product.brand}
                            </span>
                        )}
                        {product.variants && (
                            <span className="text-[9px] text-[#007AFF] font-bold tracking-wide bg-[#007AFF]/10 px-1.5 py-0.5 rounded">
                                1x
                            </span>
                        )}
                    </div>

                    <h3 className="text-[14px] font-semibold text-slate-900 line-clamp-2 leading-snug min-h-[2.5rem] tracking-tight mt-1">
                        {product.name}
                    </h3>

                    <div className="flex flex-col gap-0.5 mt-2 mb-3 h-8">
                        {product.specs?.slice(0, 2).map((s, i) => (
                            <p key={i} className="text-[10px] text-slate-500 line-clamp-1 font-medium flex justify-between">
                                <span>{s.label}:</span>
                                <span className="text-slate-700 truncate ml-1 font-semibold">{s.value}</span>
                            </p>
                        ))}
                    </div>

                    <span className="text-[16px] font-bold text-[#007AFF] mt-auto whitespace-nowrap">
                        {product.price}
                    </span>

                    {/* Action Area */}
                    <div className="mt-3 h-10">
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
                                            updateQuantity(product.id, Math.max(0, quantity - 1));
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
                                            updateQuantity(product.id, quantity + 1);
                                        }}
                                        className="w-8 h-8 flex items-center justify-center bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] rounded-lg transition-colors active:scale-95 shrink-0"
                                    >
                                        <Plus className="h-4 w-4" strokeWidth={2.5} />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <ProductDetailsDrawer
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                product={product}
            />
        </>
    );
}
