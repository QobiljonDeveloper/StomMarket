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
                className="group flex flex-col bg-[#0d171d]/80 backdrop-blur-md p-3 rounded-[1.25rem] border border-white/5 relative hover:border-cyan-500/20 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:bg-[#0a1219] transition-all duration-300 h-full cursor-pointer"
            >
                {/* Image Area with soft sterile glow */}
                <div className="relative w-full aspect-[4/3] bg-white/5 rounded-xl overflow-hidden mb-3 shrink-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] group-hover:shadow-[inset_0_0_30px_rgba(34,211,238,0.05)] transition-all">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 transition-transform duration-700 group-hover:scale-105 drop-shadow-xl"
                    />

                    {/* Sterile Heart toggle */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toggleSaveProduct(product);
                        }}
                        className="absolute top-2 right-2 z-10 p-1.5 transition-all duration-200 active:scale-90 outline-none rounded-full bg-[#0a1219]/60 backdrop-blur-md border border-white/5 hover:bg-[#0a1219]/80"
                    >
                        <motion.div
                            initial={false}
                            animate={{ scale: saved ? [1, 1.3, 1] : 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <Heart className={`w-4 h-4 transition-colors ${saved ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]' : 'text-slate-500 hover:text-rose-400'}`} strokeWidth={1.5} />
                        </motion.div>
                    </button>

                    {/* Status Badge inside image top left */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.status === 'Omborda bor' && (
                            <span className="bg-emerald-500/10 text-emerald-400 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-emerald-500/20 backdrop-blur-sm drop-shadow-sm uppercase tracking-wider">
                                <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                                Omborda
                            </span>
                        )}
                        {product.status === 'Sanoqli qoldi' && (
                            <span className="bg-amber-500/10 text-amber-400 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 border border-amber-500/20 backdrop-blur-sm drop-shadow-sm uppercase tracking-wider">
                                <div className="w-1 h-1 rounded-full bg-amber-400" />
                                Qoldi
                            </span>
                        )}
                    </div>
                </div>

                {/* Typography Area */}
                <div className="flex flex-col flex-1 px-1">
                    <div className="flex items-center justify-between mb-1">
                        {product.brand && (
                            <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 uppercase tracking-widest">
                                {product.brand}
                            </span>
                        )}
                        {product.variants && (
                            <span className="text-[9px] text-cyan-500/70 font-medium tracking-wide">
                                1x
                            </span>
                        )}
                    </div>

                    <h3 className="text-[13px] font-medium text-slate-100 line-clamp-2 leading-snug min-h-[2.5rem] tracking-wide mt-1">
                        {product.name}
                    </h3>

                    <div className="flex flex-col gap-0.5 mt-2 mb-3 h-8">
                        {product.specs?.slice(0, 2).map((s, i) => (
                            <p key={i} className="text-[9px] text-slate-500 line-clamp-1 font-medium flex justify-between">
                                <span>{s.label}:</span>
                                <span className="text-slate-400 truncate ml-1">{s.value}</span>
                            </p>
                        ))}
                    </div>

                    <span className="text-[15px] font-bold text-white mt-auto whitespace-nowrap drop-shadow-sm">
                        {product.price}
                    </span>

                    {/* Action Area */}
                    <div className="mt-3 h-9">
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
                                        className="h-9 w-full bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-50 rounded-xl text-[11px] font-bold flex items-center justify-center gap-2 transition-all p-0 shadow-sm"
                                    >
                                        <ShoppingCart className="w-3.5 h-3.5" strokeWidth={2} />
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
                                    className="h-9 w-full rounded-xl flex items-center justify-between p-1 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] bg-[#050a0f] border border-white/5"
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateQuantity(product.id, Math.max(0, quantity - 1));
                                        }}
                                        className="w-7 h-7 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-lg transition-colors active:scale-95 shrink-0 border border-white/10"
                                    >
                                        <Minus className="h-3.5 w-3.5" strokeWidth={2} />
                                    </button>

                                    <span className="text-[11px] font-black text-cyan-400 px-1 truncate tracking-widest text-shadow-sm">
                                        {quantity}
                                    </span>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            updateQuantity(product.id, quantity + 1);
                                        }}
                                        className="w-7 h-7 flex items-center justify-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-100 rounded-lg transition-colors active:scale-95 shrink-0 border border-cyan-500/30 shadow-[0_0_8px_rgba(34,211,238,0.2)]"
                                    >
                                        <Plus className="h-3.5 w-3.5" strokeWidth={2} />
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
