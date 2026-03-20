import { useState } from "react";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { CheckoutDrawer } from "./CheckoutDrawer";

interface CartDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
    const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    };

    return (
        <>
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white backdrop-blur-xl border-l border-slate-100">
                    <SheetHeader className="pb-6 border-b border-slate-50">
                        <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                            <ShoppingBag className="w-6 h-6 text-sky-600" />
                            Savat
                        </SheetTitle>
                    </SheetHeader>

                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-10 text-center">
                            <div className="w-24 h-24 rounded-3xl bg-slate-50 flex items-center justify-center animate-pulse">
                                <ShoppingBag className="w-12 h-12 text-slate-200" />
                            </div>
                            <div>
                                <p className="text-slate-900 font-bold text-lg mb-2">Savatingiz bo'sh</p>
                                <p className="text-slate-400 text-sm">Hali hech narsa tanlamadingiz. Katalogimizdan o'zingizga kerakli narsalarni toping.</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="rounded-full px-10 h-14 border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                            >
                                Xaridni davom ettirish
                            </Button>
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 -mx-6 px-6 py-6">
                                <div className="flex flex-col gap-6">
                                    {cart.map((item) => (
                                        <div key={item.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.04)] flex gap-4 transition-all hover:border-sky-100 group">
                                            <div className="h-24 w-24 rounded-2xl overflow-hidden bg-slate-50 shrink-0 border border-slate-50">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex flex-col flex-1 py-1">
                                                <div className="flex justify-between gap-1 mb-2">
                                                    <h4 className="font-bold text-slate-900 text-sm leading-tight line-clamp-2">
                                                        {item.name}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                                                    >
                                                        <Trash2 className="w-5 h-5 shrink-0" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="font-extrabold text-sky-600 text-base">
                                                        {formatPrice(item.priceValue)}
                                                    </span>

                                                    <div className="flex items-center gap-3 bg-slate-50/80 rounded-xl p-1 shadow-inner ring-1 ring-slate-100">
                                                        <button
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-rose-50 text-slate-600 transition-all active:scale-90"
                                                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-4 text-center text-[11px] font-black text-slate-800">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm hover:bg-rose-50 text-slate-600 transition-all active:scale-90"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="pt-8 pb-8 space-y-6 bg-slate-50/50 border-t border-slate-100 -mx-6 px-8 rounded-t-[2.5rem] mt-auto">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                                        <span>Mahsulotlar soni</span>
                                        <span className="text-slate-900 text-xs">{cartCount} ta</span>
                                    </div>
                                    <div className="flex justify-between items-center text-2xl font-black text-slate-900">
                                        <span>Jami narx</span>
                                        <span className="text-sky-600">{formatPrice(cartTotal)}</span>
                                    </div>
                                </div>

                                <SheetFooter className="gap-4 flex-col sm:flex-col items-stretch">
                                    <Button
                                        className="w-full rounded-2xl h-16 text-lg font-black bg-sky-600 hover:bg-sky-700 shadow-xl shadow-sky-600/20 transition-all active:scale-95"
                                        onClick={() => setIsCheckoutOpen(true)}
                                    >
                                        Rasmiylashtirish
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-slate-400 hover:text-slate-600 hover:bg-transparent h-12 font-bold transition-all text-sm"
                                        onClick={() => onOpenChange(false)}
                                    >
                                        Davom etish
                                    </Button>
                                </SheetFooter>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
            <CheckoutDrawer
                open={isCheckoutOpen}
                onOpenChange={(val) => {
                    setIsCheckoutOpen(val);
                    if (!val) {
                        onOpenChange(false);
                    }
                }}
            />
        </>
    );
}
