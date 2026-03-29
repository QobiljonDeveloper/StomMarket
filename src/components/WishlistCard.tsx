import { Trash2, Loader2 } from "lucide-react";
import type { WishlistItem } from "../types";
import { motion } from "framer-motion";
import { useState } from "react";

interface WishlistCardProps {
    item: WishlistItem;
    onRemove: (productId: string) => void;
}

export function WishlistCard({ item, onRemove }: WishlistCardProps) {
    const formattedPrice = item.basePrice.toLocaleString("uz-UZ");
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsRemoving(true);
        onRemove(item.productId);
    };

    return (
        <motion.div
            layout
            className="flex flex-col bg-white p-3 rounded-2xl border border-slate-200 relative shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 h-full"
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

                {/* Trash — always visible, 44x44 touch target, red glassmorphism */}
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
        </motion.div>
    );
}
