import { ReactNode, useState } from "react";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCart } from "../context/CartContext";
import { CartDrawer } from "./CartDrawer";
import { SavedDrawer } from "./SavedDrawer";
import { ProfilePage } from "./ProfilePage";
import { useUserAvatar } from "../hooks/useUserAvatar";

import { BadgeWrapper } from "./ui/BadgeWrapper";

export function Layout({ children }: { children: ReactNode }) {
    const { savedItems, cartCount } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSavedOpen, setIsSavedOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Retrieve telegram id and run avatar query for the Header nav button
    const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
    const { avatarUrl, isError } = useUserAvatar(tgUser?.id);

    const initials = tgUser
        ? [tgUser.first_name, tgUser.last_name].filter(Boolean).join(" ").split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()
        : "MR";

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
                            <BadgeWrapper count={savedItems.length}>
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
                            size="icon"
                            className="h-9 w-9 sm:ml-2 rounded-full border border-slate-200 p-0 overflow-hidden hover:border-slate-300 transition-all shadow-sm ring-1 ring-slate-200/50 bg-[#E0F2F1]/50 relative"
                            onClick={() => setIsProfileOpen(true)}
                        >
                            {(avatarUrl && !isError) ? (
                                <img
                                    src={avatarUrl}
                                    alt="User Avatar"
                                    className="w-full h-full object-cover transition-opacity duration-500 opacity-0"
                                    onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#007AFF] text-[11px] font-bold bg-[#E0F2F1]/50">
                                    {initials}
                                </div>
                            )}
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
