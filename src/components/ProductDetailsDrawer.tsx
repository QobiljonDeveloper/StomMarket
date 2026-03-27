import {
    Sheet,
    SheetContent,
} from "./ui/sheet";
import { type Product } from "../types";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, Minus, Plus, ShieldCheck, Truck, ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailsDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product;
}

export function ProductDetailsDrawer({ open, onOpenChange, product }: ProductDetailsDrawerProps) {
    const { addToCart, getItemQuantity, updateQuantity, isProductSaved, toggleSaveProduct } = useCart();
    const quantity = getItemQuantity(product.id);
    const saved = isProductSaved(product.id);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="bottom"
                className="w-full h-[95vh] sm:max-w-md sm:h-[95vh] sm:mx-auto sm:rounded-t-[2.5rem] rounded-t-[2.5rem] flex flex-col bg-[#0a1219]/95 backdrop-blur-3xl border-t border-white/10 p-0 text-slate-200 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
            >
                {/* Header Actions Overlay */}
                <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-10 h-10 rounded-full bg-[#0a1219]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-slate-300 pointer-events-auto hover:bg-white/10 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={() => toggleSaveProduct(product)}
                        className="w-10 h-10 rounded-full bg-[#0a1219]/80 backdrop-blur-md border border-white/10 flex items-center justify-center pointer-events-auto hover:bg-white/10 transition-colors"
                    >
                        <Heart className={`w-5 h-5 transition-colors ${saved ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]' : 'text-slate-300'}`} strokeWidth={1.5} />
                    </button>
                </div>

                <ScrollArea className="flex-1 rounded-t-[2.5rem]">
                    {/* Hero Image */}
                    <div className="relative w-full aspect-square bg-[#050a0f] flex items-center justify-center p-8">
                        {/* Sterile Ambient Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-cyan-900/20 rounded-full blur-[80px] pointer-events-none" />

                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                        />

                        {/* Abstract Tech Overlay Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
                    </div>

                    <div className="px-5 py-6 space-y-6">
                        {/* Title and Badge */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                {product.brand && (
                                    <span className="text-[11px] font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 uppercase tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)]">
                                        {product.brand}
                                    </span>
                                )}
                                {product.status === 'Omborda bor' && (
                                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-widest">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Mavjud
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold text-white tracking-wide leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-3xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                {product.price}
                            </p>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="bg-white/5 border border-white/5 rounded-[1.5rem] p-5 shadow-sm">
                                <h3 className="text-sm font-bold text-white mb-2 tracking-wide uppercase">Xususiyatlari haqida</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Spec Table */}
                        {product.specs && product.specs.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wide px-1">Texnik ma'lumotlar</h3>
                                <div className="bg-white/5 border border-white/5 rounded-[1.5rem] overflow-hidden shadow-sm">
                                    {product.specs.map((spec, idx) => (
                                        <div key={idx} className={`flex justify-between items-center p-4 text-[13px] ${idx !== product.specs.length - 1 ? 'border-b border-white/5' : ''}`}>
                                            <span className="text-slate-400 font-medium">{spec.label}</span>
                                            <span className="text-white font-bold text-right">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trust Badges */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center">
                                <ShieldCheck className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
                                <span className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest">Sifat<br />Kafolati</span>
                            </div>
                            <div className="flex-1 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 text-center">
                                <Truck className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
                                <span className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-widest">Tezkor<br />Yetkazish</span>
                            </div>
                        </div>
                    </div>
                    {/* Padding for sticky footer */}
                    <div className="h-28"></div>
                </ScrollArea>

                {/* Sticky Action Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-[#0a1219]/90 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    <AnimatePresence mode="wait" initial={false}>
                        {quantity === 0 ? (
                            <motion.div
                                key="add"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                            >
                                <Button
                                    onClick={() => addToCart(product)}
                                    className="w-full h-14 bg-cyan-500 text-cyan-950 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] rounded-2xl text-base font-black tracking-wide flex items-center justify-center gap-2 transition-all"
                                >
                                    <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
                                    Savatga qo'shish
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="stepper"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="w-full h-14 bg-white/5 border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] rounded-2xl flex items-center justify-between p-2"
                            >
                                <button
                                    onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                                    className="w-12 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors active:scale-95"
                                >
                                    <Minus className="h-5 w-5" strokeWidth={2} />
                                </button>

                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-lg font-black text-cyan-400 tracking-widest drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                                        {quantity}
                                    </span>
                                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest -mt-1">Savatda</span>
                                </div>

                                <button
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="w-12 h-10 flex items-center justify-center bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-50 rounded-xl transition-colors active:scale-95 border border-cyan-500/30"
                                >
                                    <Plus className="h-5 w-5" strokeWidth={2} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </SheetContent>
        </Sheet>
    );
}
