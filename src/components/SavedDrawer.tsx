import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Heart, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SavedDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SavedDrawer({ open, onOpenChange }: SavedDrawerProps) {
    const {
        savedItems,
        toggleSaveProduct,
        addToCart,
        getItemQuantity,
        updateQuantity
    } = useCart();

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white backdrop-blur-xl border-l border-slate-100">
                <SheetHeader className="pb-6 border-b border-slate-50">
                    <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                        <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                        Saqlangan mahsulotlar
                    </SheetTitle>
                </SheetHeader>

                {savedItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-10 text-center">
                        <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center animate-pulse">
                            <Heart className="w-12 h-12 text-slate-200" />
                        </div>
                        <div>
                            <p className="text-slate-900 font-bold text-lg mb-2">Hozircha saqlanganlar yo'q</p>
                            <p className="text-slate-400 text-sm">O'zingizga yoqqan mahsulotlarni keyinroq ko'rish uchun saqlab qo'ying.</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="rounded-full px-10 h-14 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                        >
                            Katalogga o'tish
                        </Button>
                    </div>
                ) : (
                    <ScrollArea className="flex-1 -mx-6 px-6 py-6">
                        <div className="grid gap-6">
                            {savedItems.map((item) => {
                                const quantity = getItemQuantity(item.id);
                                return (
                                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.04)] hover:border-sky-100 transition-all group">
                                        <div className="flex gap-4 mb-4">
                                            <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-50 relative">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                <button
                                                    onClick={() => toggleSaveProduct(item)}
                                                    className="absolute top-1 right-1 bg-white/80 backdrop-blur-sm p-1 rounded-lg text-red-500"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="flex flex-col flex-1 py-1">
                                                <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2 mb-2">
                                                    {item.name}
                                                </h4>
                                                <span className="text-base font-extrabold text-sky-600 mt-auto">
                                                    {formatPrice(item.priceValue)}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="h-10">
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
                                                            className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addToCart(item);
                                                            }}
                                                        >
                                                            <ShoppingCart className="w-4 h-4" />
                                                            Savatga qo'shish
                                                        </Button>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="stepper"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="h-10 w-full border border-gray-200 rounded-xl flex items-center justify-between p-1 bg-slate-50 shadow-inner"
                                                    >
                                                        <button
                                                            onClick={() => updateQuantity(item.id, Math.max(0, quantity - 1))}
                                                            className="w-8 h-8 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-black rounded-lg text-lg cursor-pointer transition-colors active:scale-95"
                                                        >
                                                            <Minus className="h-4 w-4" />
                                                        </button>

                                                        <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">
                                                            {quantity} dona
                                                        </span>

                                                        <button
                                                            onClick={() => updateQuantity(item.id, quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-rose-50 hover:bg-rose-100 text-black rounded-lg text-lg cursor-pointer transition-colors active:scale-95"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                )}
            </SheetContent>
        </Sheet>
    );
}
