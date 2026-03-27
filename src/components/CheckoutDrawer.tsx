import { useCart } from "../context/CartContext";
import { Button } from "./ui/button";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { CreditCard, Truck, User, Phone, MapPin, MessageSquare, ArrowLeft, Banknote, Store } from "lucide-react";

interface CheckoutDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CheckoutDrawer({ open, onOpenChange }: CheckoutDrawerProps) {
    const { cartTotal, clearCart } = useCart();

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    };

    const handleConfirm = () => {
        // In a real app, this would process the order
        clearCart();
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md flex flex-col h-full bg-[#0a0f1a]/90 backdrop-blur-3xl border-l border-white/10 p-0 text-slate-200"
            >
                <SheetHeader className="p-5 border-b border-white/5 flex flex-row items-center gap-3 space-y-0 relative overflow-hidden">
                    <div className="absolute -top-10 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl pointer-events-none" />

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/20 z-10"
                        onClick={() => onOpenChange(false)}
                    >
                        <ArrowLeft className="w-5 h-5 drop-shadow-md" />
                    </Button>
                    <SheetTitle className="text-xl font-bold text-white tracking-wide drop-shadow-md z-10">
                        Rasmiylashtirish
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-5 py-6">
                    <div className="space-y-8">
                        {/* Summary Section */}
                        <div className="bg-linear-to-br from-cyan-500/10 to-transparent p-5 rounded-3xl border border-cyan-500/20 flex flex-col justify-between items-center group shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] relative overflow-hidden">
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-cyan-500/15 rounded-full blur-[30px] pointer-events-none" />
                            <span className="text-cyan-300/80 font-bold uppercase tracking-widest text-xs mb-1 drop-shadow-sm">Jami to'lov</span>
                            <span className="text-white font-black text-3xl tracking-tight drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                                {formatPrice(cartTotal)}
                            </span>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                                    <CreditCard className="w-4 h-4 text-cyan-400" />
                                </div>
                                <h3 className="text-base font-bold text-slate-100 tracking-wide">To'lov usuli</h3>
                            </div>
                            <RadioGroup defaultValue="online" className="grid gap-3">
                                <div>
                                    <RadioGroupItem value="online" id="online" className="peer sr-only" />
                                    <Label
                                        htmlFor="online"
                                        className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 peer-data-[state=checked]:border-cyan-500/50 peer-data-[state=checked]:bg-cyan-500/10 transition-all cursor-pointer shadow-sm group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 group-data-[state=checked]:text-cyan-400 group-data-[state=checked]:bg-cyan-500/20 transition-colors">
                                                <CreditCard className="w-5 h-5 drop-shadow-md" />
                                            </div>
                                            <span className="font-semibold text-slate-200 group-data-[state=checked]:text-white">Onlayn-o'tkazma bilan</span>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 peer-data-[state=checked]:border-cyan-400 peer-data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                                        </div>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                                    <Label
                                        htmlFor="cash"
                                        className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 peer-data-[state=checked]:border-cyan-500/50 peer-data-[state=checked]:bg-cyan-500/10 transition-all cursor-pointer shadow-sm group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 group-data-[state=checked]:text-cyan-400 group-data-[state=checked]:bg-cyan-500/20 transition-colors">
                                                <Banknote className="w-5 h-5 drop-shadow-md" />
                                            </div>
                                            <span className="font-semibold text-slate-200 group-data-[state=checked]:text-white">Kuryerga naqd pul bilan</span>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 peer-data-[state=checked]:border-cyan-400 peer-data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Delivery Method */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-white/5 rounded-xl border border-white/10 shadow-[inset_0_0_10px_rgba(255,255,255,0.05)]">
                                    <Truck className="w-4 h-4 text-cyan-400" />
                                </div>
                                <h3 className="text-base font-bold text-slate-100 tracking-wide">Yetkazib berish usuli</h3>
                            </div>
                            <RadioGroup defaultValue="delivery" className="grid gap-3">
                                <div>
                                    <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                                    <Label
                                        htmlFor="delivery"
                                        className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 peer-data-[state=checked]:border-cyan-500/50 peer-data-[state=checked]:bg-cyan-500/10 transition-all cursor-pointer shadow-sm group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 group-data-[state=checked]:text-cyan-400 group-data-[state=checked]:bg-cyan-500/20 transition-colors">
                                                <Truck className="w-5 h-5 drop-shadow-md" />
                                            </div>
                                            <span className="font-semibold text-slate-200 group-data-[state=checked]:text-white">Yetkazib berish</span>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 peer-data-[state=checked]:border-cyan-400 peer-data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                                        </div>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                                    <Label
                                        htmlFor="pickup"
                                        className="flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 peer-data-[state=checked]:border-cyan-500/50 peer-data-[state=checked]:bg-cyan-500/10 transition-all cursor-pointer shadow-sm group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-1.5 rounded-lg bg-slate-800 text-slate-400 group-data-[state=checked]:text-cyan-400 group-data-[state=checked]:bg-cyan-500/20 transition-colors">
                                                <Store className="w-5 h-5 drop-shadow-md" />
                                            </div>
                                            <span className="font-semibold text-slate-200 group-data-[state=checked]:text-white">O'zi olib ketish</span>
                                        </div>
                                        <div className="w-5 h-5 rounded-full border-2 border-slate-600 peer-data-[state=checked]:border-cyan-400 peer-data-[state=checked]:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Personal Info */}
                        <div className="space-y-6 pt-2">
                            <div className="space-y-3 relative">
                                <Label htmlFor="name" className="flex items-center gap-2 text-sm font-bold text-cyan-100/70 uppercase tracking-widest pl-1">
                                    <User className="w-4 h-4 text-cyan-500" />
                                    Ism
                                </Label>
                                <Input
                                    id="name"
                                    placeholder="Ismingizni kiriting"
                                    className="h-14 rounded-2xl border-white/10 bg-white/5 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:bg-white/10 text-white font-medium placeholder:text-slate-500 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] px-4"
                                />
                            </div>

                            <div className="space-y-3 relative">
                                <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-bold text-cyan-100/70 uppercase tracking-widest pl-1">
                                    <Phone className="w-4 h-4 text-cyan-500" />
                                    Telefon
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="+998"
                                    className="h-14 rounded-2xl border-white/10 bg-white/5 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:bg-white/10 text-white font-medium placeholder:text-slate-500 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] px-4"
                                />
                            </div>

                            <div className="space-y-3 relative">
                                <Label htmlFor="address" className="flex items-center gap-2 text-sm font-bold text-cyan-100/70 uppercase tracking-widest pl-1">
                                    <MapPin className="w-4 h-4 text-cyan-500" />
                                    Manzil
                                </Label>
                                <Input
                                    id="address"
                                    placeholder="Yetkazish manzili"
                                    className="h-14 rounded-2xl border-white/10 bg-white/5 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:bg-white/10 text-white font-medium placeholder:text-slate-500 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)] px-4"
                                />
                            </div>

                            <div className="space-y-3 relative hover:z-20">
                                <Label htmlFor="comment" className="flex items-center gap-2 text-sm font-bold text-cyan-100/70 uppercase tracking-widest pl-1">
                                    <MessageSquare className="w-4 h-4 text-cyan-500" />
                                    Izoh
                                </Label>
                                <Textarea
                                    id="comment"
                                    placeholder="Qo'shimcha ma'lumotlar (ixtiyoriy)"
                                    className="min-h-[100px] rounded-2xl border-white/10 bg-white/5 focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:bg-white/10 text-white font-medium resize-none p-4 placeholder:text-slate-500 shadow-[inset_0_0_15px_rgba(0,0,0,0.2)]"
                                />
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-6 bg-[#050812]/90 border-t border-white/5 mt-auto shadow-[0_-15px_30px_rgba(0,0,0,0.6)] rounded-t-[2.5rem] backdrop-blur-3xl relative">
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/15 rounded-full blur-[50px] pointer-events-none" />

                    <Button
                        className="w-full rounded-2xl h-14 text-base font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all active:scale-[0.98] border border-cyan-400/50 relative z-10"
                        onClick={handleConfirm}
                    >
                        Buyurtmani tasdiqlash
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
