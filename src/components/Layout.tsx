import { ReactNode, useState } from "react";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { SavedDrawer } from "./SavedDrawer";
import { ProfilePage } from "./ProfilePage";
import { useAuthContext } from "../context/AuthContext";
import { useWishlist } from "../hooks/useWishlist";

import { BadgeWrapper } from "./ui/BadgeWrapper";

export function Layout({ children, onSearch }: { children: ReactNode; onSearch?: (val: string) => void }) {
    const { cartCount } = useCart();
    const { user } = useAuthContext();
    const { wishlist = [] } = useWishlist(user?.id);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSavedOpen, setIsSavedOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [imageError, setImageError] = useState(false);

    const displayName = user?.fullName || "Foydalanuvchi";
    const initials = displayName
        .split(" ")
        .map(n => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U";

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900 flex flex-col selection:bg-[#007AFF]/20 selection:text-[#007AFF]">
            {/* Header */}
            <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl flex flex-col border-b border-slate-200">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                    {/* Search */}
                    <div className="flex-1 min-w-0 max-w-2xl relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                            <Search className="w-4 h-4" strokeWidth={2} />
                        </div>
                        <Input
                            placeholder="Mahsulot qidirish..."
                            onChange={(e) => onSearch?.(e.target.value)}
                            className="w-full h-10 pl-11 pr-4 rounded-xl bg-[#F1F5F9] border border-transparent text-[13px] focus-visible:ring-1 focus-visible:ring-[#007AFF] focus-visible:border-[#007AFF]/20 transition-all font-medium text-slate-900 placeholder:text-slate-500 hover:bg-[#E2E8F0]/50"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5 shrink-0">
                        {/* Wishlist */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            onClick={() => setIsSavedOpen(true)}
                        >
                            <BadgeWrapper count={wishlist.length}>
                                <Heart className="h-5 w-5" strokeWidth={1.5} />
                            </BadgeWrapper>
                        </Button>

                        {/* Cart */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <BadgeWrapper count={cartCount}>
                                <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
                            </BadgeWrapper>
                        </Button>

                        {/* Profile */}
                        <Button
                            variant="ghost"
                            className="h-10 sm:ml-2 rounded-full p-1 pl-3 pr-1 bg-white/60 hover:bg-white/80 border border-white backdrop-blur-xl shadow-[0_2px_12px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.8)] transition-all relative flex items-center justify-between gap-3 text-slate-700 hover:text-slate-900 group"
                            onClick={() => setIsProfileOpen(true)}
                        >
                            {/* Dynamic User Name (Hidden on very small screens) */}
                            <span className="hidden sm:inline-block text-[13px] font-bold tracking-tight">
                                {displayName}
                            </span>

                            {/* Circular Glassmorphism Avatar Container (Scaled for Header) */}
                            <div className="w-8 h-8 rounded-full relative drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] flex items-center justify-center p-0.5 bg-white/80 border border-white shadow-[inset_0_1px_4px_rgba(255,255,255,0.9)] overflow-hidden shrink-0">
                                <div className="w-full h-full rounded-full overflow-hidden bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)] relative z-10 text-[#007AFF]">
                                    {user?.photoUrl && !imageError ? (
                                        <img
                                            src={user.photoUrl}
                                            alt="User Avatar"
                                            className="w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:scale-105"
                                            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <span className="text-xs font-black tracking-tight drop-shadow-sm">
                                            {initials}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            {children}

            {/* Global Drawers */}
            <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
            <SavedDrawer open={isSavedOpen} onOpenChange={setIsSavedOpen} />
            <ProfilePage open={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
        </div>
    );
}
