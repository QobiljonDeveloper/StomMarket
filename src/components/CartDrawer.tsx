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
                <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#0a0f1a]/80 backdrop-blur-3xl border-l border-white/10 p-0 text-slate-200">
                    <SheetHeader className="p-6 border-b border-white/5 relative overflow-hidden">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                        <SheetTitle className="flex items-center gap-3 text-2xl font-bold text-white relative z-10">
                            <span className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]">
                                <ShoppingBag className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            </span>
                            Savat
                        </SheetTitle>
                    </SheetHeader>

                    {cart.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-10 text-center relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="w-24 h-24 rounded-4xl bg-white/5 flex items-center justify-center animate-pulse border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05)]">
                                <ShoppingBag className="w-10 h-10 text-slate-600 drop-shadow-md" />
                            </div>
                            <div className="relative z-10">
                                <p className="text-white font-bold text-xl mb-3 tracking-wide drop-shadow-sm">Savatingiz bo'sh</p>
                                <p className="text-slate-400 text-[15px] font-light leading-relaxed">Hali hech narsa tanlamadingiz. Katalogimizdan o'zingizga kerakli narsalarni toping.</p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => onOpenChange(false)}
                                className="rounded-2xl px-8 h-12 bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 font-medium transition-all z-10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                            >
                                Xaridni davom ettirish
                            </Button>
                        </div>
                    ) : (
                        <>
                            <ScrollArea className="flex-1 px-6 py-4 relative">
                                <div className="flex flex-col gap-4">
                                    {cart.map((item) => (
                                        <div key={item.id} className="bg-white/5 p-3 rounded-2xl border border-white/5 flex gap-4 transition-all hover:bg-white/10 hover:border-white/10 group shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)]">
                                            <div className="h-20 w-20 rounded-xl overflow-hidden bg-[#050812] shrink-0 border border-white/5 p-1.5 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-xl" />
                                            </div>
                                            <div className="flex flex-col flex-1 py-0.5 justify-between">
                                                <div className="flex justify-between gap-2.5 items-start">
                                                    <h4 className="font-semibold text-slate-100 text-sm leading-snug line-clamp-2 drop-shadow-sm">
                                                        {item.name}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-slate-500 hover:text-rose-400 bg-white/5 hover:bg-rose-500/10 rounded-lg p-1.5 transition-colors border border-transparent hover:border-rose-500/20 shrink-0 shadow-sm"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="flex items-center justify-between mt-2">
                                                    <span className="font-black text-cyan-400 text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                                                        {formatPrice(item.priceValue)}
                                                    </span>

                                                    <div className="flex items-center gap-1.5 bg-slate-950/60 rounded-lg p-1 border border-white/5 shadow-[inner_0_0_5px_rgba(0,0,0,0.5)]">
                                                        <button
                                                            className="w-7 h-7 flex items-center justify-center rounded-md bg-white/5 hover:bg-white/10 text-slate-300 transition-all active:scale-95 border border-white/5 shadow-sm"
                                                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <span className="w-5 text-center text-xs font-bold text-white tracking-wider">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            className="w-7 h-7 flex items-center justify-center rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 transition-all active:scale-95 border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>

                            <div className="p-6 bg-slate-950/80 border-t border-white/10 mt-auto backdrop-blur-xl relative overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none" />

                                <div className="space-y-4 relative z-10 mb-6">
                                    <div className="flex justify-between items-center text-slate-400 font-bold uppercase tracking-widest text-[10px] drop-shadow-sm">
                                        <span>Mahsulotlar soni</span>
                                        <span className="text-slate-200 text-xs">{cartCount} ta</span>
                                    </div>
                                    <div className="flex justify-between items-center text-2xl font-black text-white drop-shadow-md">
                                        <span>Jami narx</span>
                                        <span className="text-cyan-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">{formatPrice(cartTotal)}</span>
                                    </div>
                                </div>

                                <SheetFooter className="gap-3 flex-col sm:flex-col items-stretch relative z-10">
                                    <Button
                                        className="w-full rounded-2xl h-14 text-[15px] font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all active:scale-[0.98] border border-cyan-400/50"
                                        onClick={() => setIsCheckoutOpen(true)}
                                    >
                                        Rasmiylashtirish
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        className="w-full text-slate-500 hover:text-white hover:bg-white/5 h-12 font-semibold transition-all text-sm rounded-xl"
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
