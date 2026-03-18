import { useState } from "react";
import { Search, ShoppingCart, Stethoscope } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";

export function Navbar() {
    const { cartCount } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-md shadow-sm">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-3 sm:gap-4">

                    <div className="flex items-center gap-2 shrink-0">
                        <a href="#" className="flex items-center gap-2 text-sky-600 font-bold text-xl cursor-pointer hover:opacity-90 transition-opacity">
                            <Stethoscope className="h-6 w-6" />
                            <span className="hidden sm:inline-block tracking-tight">StomMarket</span>
                        </a>
                    </div>

                    <div className="flex-1 max-w-2xl mx-1 sm:mx-4 relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-9 sm:pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:bg-white transition-all text-sm sm:text-base outline-none"
                            placeholder="Qidirish..."
                        />
                    </div>

                    <div className="flex items-center shrink-0">
                        <Button
                            variant="outline"
                            size="icon"
                            className="relative rounded-full border-slate-200 hover:border-sky-200 hover:bg-sky-50 transition-all group shrink-0"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart className="h-5 w-5 text-slate-600 group-hover:text-sky-600 transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full animate-in zoom-in shadow-sm">
                                    {cartCount}
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>
            <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
        </>
    );
}
