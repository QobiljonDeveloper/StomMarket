import { useState } from "react";
import { ShoppingCart, Heart, LayoutGrid, Syringe, Drill, Scissors, Wrench, Activity, ShieldCheck, MonitorSpeaker, Package, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CartDrawer } from "./CartDrawer";
import { SavedDrawer } from "./SavedDrawer";
import { ProfileDrawer } from "./ProfileDrawer";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CATEGORIES_DATA = [
    { name: "Barchasi", icon: LayoutGrid },
    { name: "Plombalar", icon: Syringe },
    { name: "Nasadkalar", icon: Drill },
    { name: "Jarrohlik", icon: Scissors },
    { name: "Ortodontiya", icon: Wrench },
    { name: "Endodontiya", icon: Activity },
    { name: "Izolyatsiya", icon: ShieldCheck },
    { name: "Uskunalar", icon: MonitorSpeaker },
    { name: "Sarflov materiallari", icon: Package }
];

export function Navbar({ selectedCategory, onSelectCategory }: NavbarProps) {
    const { savedItems } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSavedOpen, setIsSavedOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-slate-950/70 backdrop-blur-2xl flex flex-col border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            {/* Top Tier: Search & Actions */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0 max-w-2xl relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="w-5 h-5 drop-shadow-md" />
                    </div>
                    <Input
                        placeholder="Mahsulot qidirish..."
                        className="w-full h-10 pl-11 pr-4 rounded-xl bg-white/5 border border-white/10 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-cyan-500/50 transition-all font-medium text-slate-200 placeholder:text-slate-500 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]"
                    />
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20 relative"
                        onClick={() => setIsSavedOpen(true)}
                    >
                        <Heart className="h-5 w-5 drop-shadow-md" />
                        <AnimatePresence>
                            {savedItems.length > 0 && (
                                <motion.div
                                    key={savedItems.length}
                                    initial={{ scale: 0.5, y: 10, opacity: 0 }}
                                    animate={{ scale: 1, y: 0, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] bg-rose-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1 shadow-[0_0_10px_rgba(244,63,94,0.6)] border border-rose-400/50"
                                >
                                    {savedItems.length}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl text-slate-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="h-5 w-5 drop-shadow-md" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 sm:ml-2 rounded-xl border border-white/10 p-0 overflow-hidden hover:border-cyan-500/50 transition-all shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                        onClick={() => setIsProfileOpen(true)}
                    >
                        <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-200 text-xs font-bold bg-linear-to-tr from-slate-900 to-slate-700">
                            MR
                        </div>
                    </Button>
                </div>
            </div>

            {/* Bottom Tier: Categories */}
            <div className="w-full border-t border-white/5 overflow-x-auto scrollbar-hide py-3">
                <div className="container mx-auto px-4 flex items-center gap-2.5 min-w-max">
                    {CATEGORIES_DATA.map((cat, idx) => {
                        const isSelected = selectedCategory === cat.name;
                        const Icon = cat.icon;

                        return (
                            <button
                                key={idx}
                                onClick={() => onSelectCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap text-sm font-medium focus-visible:outline-none ${isSelected
                                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/20"
                                    : "bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200 hover:bg-white/10 hover:border-white/10"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-400 drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" : "text-slate-500"}`} />
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
            <SavedDrawer open={isSavedOpen} onOpenChange={setIsSavedOpen} />
            <ProfileDrawer open={isProfileOpen} onOpenChange={setIsProfileOpen} />
        </header>
    );
}
