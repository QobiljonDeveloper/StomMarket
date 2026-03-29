import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
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
import { CreditCard, Truck, User, Phone, MapPin, MessageSquare, ArrowLeft, Store, ShieldCheck } from "lucide-react";
import { AddressPopup } from "./AddressPopup";

interface CheckoutDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function CheckoutDrawer({ open, onOpenChange }: CheckoutDrawerProps) {
    const { cartTotal, clearCart } = useCart();
    const { user } = useAuthContext();

    const [paymentMethod, setPaymentMethod] = useState("online");
    const [deliveryMethod, setDeliveryMethod] = useState("delivery");

    // Address UI State
    const [address, setAddress] = useState<any>(null);
    const [isAddressPopupOpen, setIsAddressPopupOpen] = useState(false);

    // Form Personal Data
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("+998");

    useEffect(() => {
        if (open) {
            setFullName(user?.fullName || "");
        }
    }, [open, user]);

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value.replace(/[^\d+]/g, '');
        if (!val.startsWith('+998')) {
            val = '+998';
        }
        if (val.length > 13) {
            val = val.slice(0, 13);
        }
        setPhone(val);
    };

    const handleDeliveryChange = (value: string) => {
        setDeliveryMethod(value);
        if (value === "delivery" && !address) {
            setIsAddressPopupOpen(true);
        }
    };

    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
    };

    const handleConfirm = () => {
        clearCart();
        onOpenChange(false);
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="right"
                className="w-full sm:max-w-md flex flex-col h-full bg-white border-l border-slate-200 p-0 text-slate-900 shadow-[-10px_0_40px_rgba(0,0,0,0.05)]"
            >
                <SheetHeader className="px-5 py-5 border-b border-slate-100 flex flex-row items-center gap-3 space-y-0 bg-white/80 backdrop-blur-xl shrink-0 sticky top-0 z-10 transition-all">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
                        onClick={() => onOpenChange(false)}
                    >
                        <ArrowLeft className="w-5 h-5" strokeWidth={2} />
                    </Button>
                    <SheetTitle className="text-xl font-bold text-slate-900 tracking-tight">
                        Rasmiylashtirish
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-5 py-6">
                    <div className="space-y-8">
                        {/* Summary Section */}
                        <div className="bg-[#F8FAFC] p-6 rounded-3xl border border-slate-200 flex flex-col items-center group shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#007AFF]/5 rounded-full blur-[30px] pointer-events-none" />
                            <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-1">To'lov miqdori</span>
                            <span className="text-slate-900 font-black text-3xl tracking-tight">
                                {formatPrice(cartTotal)}
                            </span>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2 ml-1">
                                <div className="w-8 h-8 rounded-lg bg-[#E0F2F1] flex items-center justify-center text-[#007AFF] border border-[#007AFF]/10">
                                    <CreditCard className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">To'lov usuli</h3>
                            </div>
                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid gap-3">
                                <div>
                                    <RadioGroupItem value="online" id="online" className="peer sr-only" />
                                    <Label
                                        htmlFor="online"
                                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 peer-data-[state=checked]:border-[#007AFF] peer-data-[state=checked]:bg-[#007AFF]/5 transition-all cursor-pointer shadow-sm group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-data-[state=checked]:text-[#007AFF] group-data-[state=checked]:bg-[#007AFF]/10 transition-colors border border-slate-100 group-data-[state=checked]:border-[#007AFF]/20">
                                                <CreditCard className="w-5 h-5" strokeWidth={2} />
                                            </div>
                                            <span className="font-bold text-slate-600 group-data-[state=checked]:text-slate-900">Onlayn-o'tkazma</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-data-[state=checked]:border-[#007AFF] transition-all flex items-center justify-center bg-white">
                                            <div className="w-3 h-3 rounded-full bg-[#007AFF] scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Delivery Method */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 mb-2 ml-1">
                                <div className="w-8 h-8 rounded-lg bg-[#E0F2F1] flex items-center justify-center text-[#007AFF] border border-[#007AFF]/10">
                                    <Truck className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Yetkazish usuli</h3>
                            </div>
                            <RadioGroup value={deliveryMethod} onValueChange={handleDeliveryChange} className="grid gap-3">
                                <div>
                                    <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                                    <Label
                                        htmlFor="delivery"
                                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 peer-data-[state=checked]:border-[#007AFF] peer-data-[state=checked]:bg-[#007AFF]/5 transition-all cursor-pointer shadow-sm group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-data-[state=checked]:text-[#007AFF] group-data-[state=checked]:bg-[#007AFF]/10 transition-colors border border-slate-100 group-data-[state=checked]:border-[#007AFF]/20">
                                                <Truck className="w-5 h-5" strokeWidth={2} />
                                            </div>
                                            <span className="font-bold text-slate-600 group-data-[state=checked]:text-slate-900">Yetkazib berish</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-data-[state=checked]:border-[#007AFF] transition-all flex items-center justify-center bg-white">
                                            <div className="w-3 h-3 rounded-full bg-[#007AFF] scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                                        </div>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                                    <Label
                                        htmlFor="pickup"
                                        className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 peer-data-[state=checked]:border-[#007AFF] peer-data-[state=checked]:bg-[#007AFF]/5 transition-all cursor-pointer shadow-sm group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 rounded-xl bg-slate-50 text-slate-400 group-data-[state=checked]:text-[#007AFF] group-data-[state=checked]:bg-[#007AFF]/10 transition-colors border border-slate-100 group-data-[state=checked]:border-[#007AFF]/20">
                                                <Store className="w-5 h-5" strokeWidth={2} />
                                            </div>
                                            <span className="font-bold text-slate-600 group-data-[state=checked]:text-slate-900">O'zi olib ketish</span>
                                        </div>
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-data-[state=checked]:border-[#007AFF] transition-all flex items-center justify-center bg-white">
                                            <div className="w-3 h-3 rounded-full bg-[#007AFF] scale-0 peer-data-[state=checked]:scale-100 transition-transform" />
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Personal Info */}
                        <div className="space-y-6 pt-2">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Ism-sharif</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <User className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                    <Input
                                        id="name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="To'liq ismingizni kiriting"
                                        className="h-12 rounded-xl border-slate-200 bg-[#F8FAFC] focus-visible:ring-2 focus-visible:ring-[#007AFF]/20 focus-visible:border-[#007AFF] text-slate-900 font-bold placeholder:text-slate-400 shadow-sm pl-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Telefon raqam</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Phone className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneChange}
                                        placeholder="+998"
                                        className="h-12 rounded-xl border-slate-200 bg-[#F8FAFC] focus-visible:ring-2 focus-visible:ring-[#007AFF]/20 focus-visible:border-[#007AFF] text-slate-900 font-bold placeholder:text-slate-400 shadow-sm pl-11 tracking-wide"
                                    />
                                </div>
                            </div>

                            {deliveryMethod === "delivery" && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Yetkazib berish manzili</Label>

                                    {address ? (
                                        <div className="relative p-3.5 rounded-xl border border-[#007AFF]/20 bg-[#007AFF]/5 flex items-start gap-3 shadow-sm group">
                                            <div className="mt-0.5 text-[#007AFF]">
                                                <MapPin className="w-4 h-4" strokeWidth={2.5} />
                                            </div>
                                            <div className="flex-1 flex flex-col pr-8">
                                                <span className="text-xs font-bold text-slate-900 leading-tight">
                                                    {address.region}, {address.city}
                                                </span>
                                                <span className="text-xs font-medium text-slate-500 mt-1 line-clamp-2">
                                                    {address.street}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => setIsAddressPopupOpen(true)}
                                                className="absolute right-3 top-3 text-xs font-bold text-[#007AFF] bg-white border border-[#007AFF]/20 px-2 py-1 rounded-lg shadow-sm hover:bg-[#007AFF] hover:text-white transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                                            >
                                                O'zgar.
                                            </button>
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => setIsAddressPopupOpen(true)}
                                            className="relative h-12 rounded-xl border-2 border-dashed border-[#007AFF]/30 bg-[#007AFF]/5 flex items-center justify-center gap-2 cursor-pointer hover:bg-[#007AFF]/10 hover:border-[#007AFF]/50 transition-all text-[#007AFF]"
                                        >
                                            <MapPin className="w-4 h-4" strokeWidth={2.5} />
                                            <span className="text-sm font-bold">Karta ustiga manzil qo'shing</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="comment" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Izoh (ixtiyoriy)</Label>
                                <div className="relative">
                                    <div className="absolute left-4 top-4 text-slate-400">
                                        <MessageSquare className="w-4 h-4" strokeWidth={2} />
                                    </div>
                                    <Textarea
                                        id="comment"
                                        placeholder="Qo'shimcha istaklaringiz..."
                                        className="min-h-[100px] rounded-xl border-slate-200 bg-[#F8FAFC] focus-visible:ring-2 focus-visible:ring-[#007AFF]/20 focus-visible:border-[#007AFF] text-slate-900 font-medium resize-none pl-11 py-4 placeholder:text-slate-400 shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Trust Banner */}
                        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-emerald-500 shadow-sm">
                                <ShieldCheck className="w-5 h-5" strokeWidth={2} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-emerald-800 tracking-tight">Xavfsiz buyurtma</span>
                                <span className="text-[10px] text-emerald-600 font-medium">Barcha ma'lumotlar himoyalangan</span>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-6 bg-white border-t border-slate-100 mt-auto shadow-[0_-10px_30px_rgba(0,0,0,0.03)] rounded-t-[2.5rem] relative">
                    <Button
                        className="w-full rounded-full h-14 text-base font-black bg-[#007AFF] hover:bg-[#005bb5] text-white shadow-[0_8px_20px_rgba(0,122,255,0.25)] hover:shadow-[0_10px_25px_rgba(0,122,255,0.35)] transition-all flex items-center justify-center gap-2"
                        onClick={handleConfirm}
                    >
                        Buyurtmani tasdiqlash
                    </Button>
                </div>
            </SheetContent>

            <AddressPopup
                open={isAddressPopupOpen}
                onOpenChange={setIsAddressPopupOpen}
                onSave={setAddress}
            />
        </Sheet>
    );
}
