import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Heart } from "lucide-react";
import { ProductCard } from "./ProductCard";

interface SavedDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function SavedDrawer({ open, onOpenChange }: SavedDrawerProps) {
    const { savedItems } = useCart();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#0a0f1a]/80 backdrop-blur-3xl border-l border-white/10 p-0 text-slate-200">
                <SheetHeader className="p-6 border-b border-white/5 relative overflow-hidden">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

                    <SheetTitle className="flex items-center gap-3 text-2xl font-bold text-white relative z-10">
                        <span className="p-2 bg-rose-500/10 rounded-xl border border-rose-500/20 shadow-[inset_0_0_15px_rgba(244,63,94,0.2)]">
                            <Heart className="w-5 h-5 text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                        </span>
                        Saqlanganlar
                    </SheetTitle>
                </SheetHeader>

                {savedItems.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center gap-6 px-10 text-center relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="w-28 h-28 rounded-[2.5rem] bg-white/5 flex items-center justify-center animate-pulse border border-white/10 shadow-[inner_0_0_20px_rgba(255,255,255,0.05),0_0_40px_rgba(244,63,94,0.15)]">
                            <Heart className="w-12 h-12 text-rose-500/50 fill-rose-500/10 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-white font-bold text-xl mb-3 tracking-wide drop-shadow-sm">Tanlovlar bo'sh</p>
                            <p className="text-slate-400 text-[15px] font-light leading-relaxed">Siz eng yaxshi ko'rgan mahsulotlaringizni shu yerga saqlashingiz mumkin.</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="rounded-2xl px-8 h-12 bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/20 font-medium transition-all z-10 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
                        >
                            Katalogga o'tish
                        </Button>
                    </div>
                ) : (
                    <ScrollArea className="flex-1 p-4 relative">
                        <div className="grid grid-cols-2 gap-3 pb-4">
                            {savedItems.map((item) => (
                                <ProductCard key={item.id} product={item} />
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </SheetContent>
        </Sheet>
    );
}
