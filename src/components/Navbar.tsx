import { useState } from "react";
import { ShoppingCart, Heart, LayoutGrid, Syringe, Drill, Scissors, Wrench, Activity, ShieldCheck, MonitorSpeaker, Package, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CartDrawer } from "./CartDrawer";
import { SavedDrawer } from "./SavedDrawer";
import { ProfileDrawer } from "./ProfileDrawer";

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
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSavedOpen, setIsSavedOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full bg-white flex flex-col shadow-sm">
            {/* Top Tier: Search & Actions */}
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-6">
                <div className="flex-1 max-w-2xl relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search className="w-5 h-5" />
                    </div>
                    <Input
                        placeholder="Mahsulot qidirish..."
                        className="w-full h-11 pl-12 pr-4 rounded-xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-sky-500 transition-all font-medium text-slate-600"
                    />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-xl text-slate-500 hover:text-red-500 hover:bg-red-50 transition-all"
                        onClick={() => setIsSavedOpen(true)}
                    >
                        <Heart className="h-6 w-6" />
                        {/* NO BADGE */}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-xl text-slate-500 hover:text-sky-600 hover:bg-sky-50 transition-all"
                        onClick={() => setIsCartOpen(true)}
                    >
                        <ShoppingCart className="h-6 w-6" />
                        {/* NO BADGE */}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-11 w-11 rounded-xl border border-slate-100 p-0 overflow-hidden hover:border-sky-300 transition-all ml-1"
                        onClick={() => setIsProfileOpen(true)}
                    >
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-600 text-sm font-bold">
                            MR
                        </div>
                    </Button>
                </div>
            </div>

            {/* Bottom Tier: Categories */}
            <div className="w-full border-t border-slate-50 overflow-x-auto scrollbar-hide py-2 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.03)] bg-white">
                <div className="container mx-auto px-4 flex items-center gap-2 min-w-max">
                    {CATEGORIES_DATA.map((cat, idx) => {
                        const isSelected = selectedCategory === cat.name;
                        const Icon = cat.icon;

                        return (
                            <button
                                key={idx}
                                onClick={() => onSelectCategory(cat.name)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap text-sm font-bold border-none outline-none ${isSelected
                                    ? "bg-slate-100 text-slate-900"
                                    : "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50/50"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isSelected ? "text-sky-600" : "text-slate-400"}`} />
                                {cat.name}
                                {/* NO BADGE */}
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
