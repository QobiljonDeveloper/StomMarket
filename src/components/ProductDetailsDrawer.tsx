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
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductDetailsDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product: Product;
}

export function ProductDetailsDrawer({ open, onOpenChange, product }: ProductDetailsDrawerProps) {
    const { addToCart, getItemQuantity, updateQuantity, isProductSaved, toggleSaveProduct } = useCart();
    const quantity = getItemQuantity(product.id);
    const saved = isProductSaved(product.id);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const mainImage = product.images?.[selectedImageIndex] || product.image;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="bottom"
                className="w-full h-[95vh] sm:max-w-md sm:h-[95vh] sm:mx-auto sm:rounded-t-[2.5rem] rounded-t-[2.5rem] flex flex-col bg-white border-t border-slate-200 p-0 text-slate-900 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]"
            >
                {/* Header Actions Overlay */}
                <div className="absolute top-4 left-4 right-4 z-50 flex justify-between items-center pointer-events-none">
                    <button
                        onClick={() => onOpenChange(false)}
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 flex items-center justify-center text-slate-500 pointer-events-auto hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button
                        onClick={() => toggleSaveProduct(product)}
                        className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 flex items-center justify-center pointer-events-auto hover:bg-slate-50 transition-colors shadow-sm"
                    >
                        <Heart className={`w-5 h-5 transition-colors ${saved ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} strokeWidth={saved ? 0 : 1.5} />
                    </button>
                </div>

                <ScrollArea className="flex-1 rounded-t-[2.5rem]">
                    {/* Hero Image & Gallery Layout */}
                    <div className="flex border-b border-slate-100 min-h-[40vh]">
                        {/* Lateral Thumbnails (Only show if multiple images) */}
                        {product.images && product.images.length > 1 && (
                            <div className="w-20 md:w-24 border-r border-slate-100 flex flex-col gap-2 p-3 overflow-y-auto max-h-[45vh] bg-slate-50/50">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={cn(
                                            "w-full aspect-square rounded-xl bg-white border flex items-center justify-center p-1.5 transition-all overflow-hidden shrink-0",
                                            selectedImageIndex === idx
                                                ? "border-[#007AFF] ring-1 ring-[#007AFF]/20 shadow-sm opacity-100"
                                                : "border-slate-200 hover:border-slate-300 opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Main Hero Image */}
                        <div className="relative flex-1 aspect-square md:aspect-auto bg-[#F8FAFC] flex items-center justify-center p-8">
                            {/* Soft Ambient Light Glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#E0F2F1] rounded-full blur-[80px] pointer-events-none opacity-60" />

                            {mainImage ? (
                                <img
                                    key={mainImage}
                                    src={mainImage}
                                    alt={product.nameUz || product.name || "Mahsulot"}
                                    className="w-full h-full object-contain relative z-10 drop-shadow-xl saturate-110 animate-in fade-in zoom-in-95 duration-300"
                                />
                            ) : (
                                <div className="w-32 h-32 rounded-full bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-slate-300 font-bold tracking-widest uppercase text-sm z-10 relative">
                                    <span className="text-3xl mb-2 opacity-50">📷</span>
                                    Rasm yo'q
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="px-6 py-8 space-y-8">
                        {/* Title and Badge */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                {product.brand && (
                                    <span className="text-[11px] font-bold text-[#007AFF] bg-[#007AFF]/10 px-2 py-0.5 rounded border border-[#007AFF]/20 uppercase tracking-widest">
                                        {product.brand}
                                    </span>
                                )}
                                {product.status === 'Omborda bor' || product.stock === 'Omborda bor' ? (
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded flex items-center gap-1.5 uppercase tracking-widest shadow-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        Mavjud
                                    </span>
                                ) : product.stock && (
                                    <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded uppercase tracking-widest shadow-sm">
                                        {product.stock}
                                    </span>
                                )}
                                {product.sku && (
                                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded tracking-widest">
                                        SKU: {product.sku}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">
                                {product.nameUz || product.name}
                            </h1>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-black text-[#007AFF]">
                                    {product.basePrice !== undefined ? `${product.basePrice.toLocaleString()} so'm` : product.price}
                                </p>
                                {product.unit && (
                                    <span className="text-sm font-semibold text-slate-500">/ {product.unit}</span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        {(product.descriptionUz || product.description) && (
                            <div className="bg-[#F8FAFC] border border-slate-200 rounded-[1.25rem] p-6 shadow-sm">
                                <h3 className="text-sm font-bold text-slate-900 mb-3 tracking-wide uppercase">Tavsif</h3>
                                <p className="text-[15px] text-slate-600 font-normal leading-[1.6]">
                                    {product.descriptionUz || product.description}
                                </p>
                            </div>
                        )}

                        {/* Spec Table */}
                        {product.specs && product.specs.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide px-1">Texnik ma'lumotlar</h3>
                                <div className="bg-white border border-slate-200 rounded-[1.25rem] overflow-hidden shadow-sm">
                                    {product.specs.map((spec, idx) => (
                                        <div key={idx} className={`flex justify-between items-center p-4 text-[14px] ${idx !== (product.specs?.length ?? 0) - 1 ? 'border-b border-slate-100' : ''}`}>
                                            <span className="text-slate-500 font-medium">{spec.label}</span>
                                            <span className="text-slate-900 font-semibold text-right">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Trust Badges */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 bg-white border border-slate-200 rounded-[1.25rem] p-5 flex flex-col items-center justify-center gap-3 text-center shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-1">
                                    <ShieldCheck className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest leading-tight">Sifat<br />Kafolati</span>
                            </div>
                            <div className="flex-1 bg-white border border-slate-200 rounded-[1.25rem] p-5 flex flex-col items-center justify-center gap-3 text-center shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF] mb-1">
                                    <Truck className="w-5 h-5" strokeWidth={2} />
                                </div>
                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-widest leading-tight">Tezkor<br />Yetkazish</span>
                            </div>
                        </div>
                    </div>
                    {/* Padding for sticky footer */}
                    <div className="h-28"></div>
                </ScrollArea>

                {/* Sticky Action Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/90 backdrop-blur-2xl border-t border-slate-200 shadow-[0_-10px_40px_rgba(0,0,0,0.06)]">
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
                                    className="w-full h-14 bg-[#007AFF] hover:bg-[#005bb5] text-white shadow-[0_8px_20px_rgba(0,122,255,0.25)] hover:shadow-[0_10px_25px_rgba(0,122,255,0.35)] rounded-full text-base font-bold tracking-wide flex items-center justify-center gap-2 transition-all"
                                >
                                    <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
                                    Savatga
                                </Button>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="stepper"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="w-full h-14 bg-[#F8FAFC] border border-slate-200 shadow-inner rounded-full flex items-center justify-between p-1.5"
                            >
                                <button
                                    onClick={() => updateQuantity(product.id, Math.max(0, quantity - 1))}
                                    className="w-12 h-11 flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 rounded-full shadow-sm transition-colors active:scale-95 border border-slate-200"
                                >
                                    <Minus className="h-5 w-5" strokeWidth={2} />
                                </button>

                                <div className="flex flex-col items-center justify-center">
                                    <span className="text-xl font-black text-slate-900 tracking-widest">
                                        {quantity}
                                    </span>
                                </div>

                                <button
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                    className="w-12 h-11 flex items-center justify-center bg-[#007AFF]/10 hover:bg-[#007AFF]/20 text-[#007AFF] rounded-full shadow-sm transition-colors active:scale-95 border border-[#007AFF]/20"
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
