import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

interface CartDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
    const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-slate-50/95 backdrop-blur-xl border-l border-slate-200">
                <SheetHeader className="pb-4 border-b border-slate-200">
                    <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                        <ShoppingBag className="w-6 h-6 text-sky-600" />
                        Savat
                    </SheetTitle>
                </SheetHeader>

                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                        <div className="w-24 h-24 rounded-full bg-sky-100 flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-sky-400" />
                        </div>
                        <p className="text-lg text-slate-500 font-medium">Savatingiz bo'sh</p>
                        <Button
                            variant="outline"
                            className="mt-4 rounded-full"
                            onClick={() => onOpenChange(false)}
                        >
                            Xaridni davom ettirish
                        </Button>
                    </div>
                ) : (
                    <>
                        <ScrollArea className="flex-1 -mx-6 px-6 py-4">
                            <div className="flex flex-col gap-4">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100 group">
                                        {/* Image */}
                                        <div className="h-20 w-20 rounded-xl overflow-hidden bg-slate-50 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>

                                        {/* Details */}
                                        <div className="flex flex-col flex-1 justify-between py-1">
                                            <div className="flex justify-between items-start gap-2">
                                                <h4 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2">
                                                    {item.name}
                                                </h4>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="w-8 h-8 text-slate-400 hover:text-red-500 hover:bg-red-50 shrink-0 -mt-1 -mr-1 transition-colors"
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="font-bold text-sky-600 text-sm">
                                                    {formatPrice(item.priceValue * item.quantity)}
                                                </span>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center bg-slate-50 rounded-full border border-slate-200 p-0.5">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="w-7 h-7 rounded-full text-slate-600 hover:bg-white hover:text-sky-600 hover:shadow-sm transition-all"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </Button>
                                                    <span className="w-8 text-center text-sm font-medium text-slate-700">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="w-7 h-7 rounded-full text-slate-600 hover:bg-white hover:text-sky-600 hover:shadow-sm transition-all"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>

                        <div className="border-t border-slate-200 pt-6 pb-2 mt-auto">
                            <div className="flex items-center justify-between mb-2 text-slate-500 text-sm">
                                <span>Mahsulotlar soni:</span>
                                <span>{cart.reduce((acc, item) => acc + item.quantity, 0)} ta</span>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-lg font-medium text-slate-900">Jami narx:</span>
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-sky-400">
                                    {formatPrice(cartTotal)}
                                </span>
                            </div>

                            <SheetFooter className="gap-3 sm:flex-col sm:justify-start">
                                <Button className="w-full rounded-full py-6 text-lg font-semibold bg-sky-600 hover:bg-sky-700 shadow-lg shadow-sky-600/20 transition-all hover:-translate-y-0.5" onClick={() => {
                                    alert("Buyurtma rasmiylashtirildi!");
                                    clearCart();
                                    onOpenChange(false);
                                }}>
                                    Rasmiylashtirish
                                </Button>
                                <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-800 rounded-full" onClick={() => onOpenChange(false)}>
                                    Davom etish
                                </Button>
                            </SheetFooter>
                        </div>
                    </>
                )}
            </SheetContent>
        </Sheet>
    );
}
