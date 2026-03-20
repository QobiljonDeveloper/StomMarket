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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Textarea } from "./ui/textarea";
import { CreditCard, Truck, User, Phone, MapPin, MessageSquare, ArrowLeft } from "lucide-react";

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
                className="w-full sm:max-w-md flex flex-col h-full bg-white backdrop-blur-3xl border-l border-slate-100 p-0"
            >
                <SheetHeader className="p-6 border-b border-slate-50 flex flex-row items-center gap-4 space-y-0">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl text-slate-400 hover:text-sky-600 hover:bg-sky-50 transition-all"
                        onClick={() => onOpenChange(false)}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <SheetTitle className="text-2xl font-black text-slate-900 tracking-tight">
                        Rasmiylashtirish
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6 py-8">
                    <div className="space-y-10">
                        {/* Summary Section (Brief) */}
                        <div className="bg-sky-50/50 p-6 rounded-3xl border border-sky-100 flex justify-between items-center group transition-all hover:bg-sky-50 shadow-sm">
                            <span className="text-sky-900 font-bold text-lg">Jami to'lov:</span>
                            <span className="text-sky-600 font-black text-2xl tracking-tighter group-hover:scale-105 transition-transform">
                                {formatPrice(cartTotal)}
                            </span>
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900">To'lov usuli</h3>
                            </div>
                            <RadioGroup defaultValue="online" className="grid gap-3">
                                <div>
                                    <RadioGroupItem value="online" id="online" className="peer sr-only" />
                                    <Label
                                        htmlFor="online"
                                        className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 bg-white hover:bg-slate-50 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50/30 transition-all cursor-pointer shadow-sm"
                                    >
                                        <span className="font-bold text-slate-900">Onlayn-o'tkazma bilan</span>
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-500 transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100" />
                                        </div>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="cash" id="cash" className="peer sr-only" />
                                    <Label
                                        htmlFor="cash"
                                        className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 bg-white hover:bg-slate-50 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50/30 transition-all cursor-pointer shadow-sm"
                                    >
                                        <span className="font-bold text-slate-900">Kuryerga naqd pul bilan</span>
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-500 transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100" />
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Delivery Method */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                                    <Truck className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900">Yetkazib berish usuli</h3>
                            </div>
                            <RadioGroup defaultValue="delivery" className="grid gap-3">
                                <div>
                                    <RadioGroupItem value="delivery" id="delivery" className="peer sr-only" />
                                    <Label
                                        htmlFor="delivery"
                                        className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 bg-white hover:bg-slate-50 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50/30 transition-all cursor-pointer shadow-sm"
                                    >
                                        <span className="font-bold text-slate-900">Yetkazib berish</span>
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-500 transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100" />
                                        </div>
                                    </Label>
                                </div>
                                <div>
                                    <RadioGroupItem value="pickup" id="pickup" className="peer sr-only" />
                                    <Label
                                        htmlFor="pickup"
                                        className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 bg-white hover:bg-slate-50 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-50/30 transition-all cursor-pointer shadow-sm"
                                    >
                                        <span className="font-bold text-slate-900">O'zi olib ketish</span>
                                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-sky-500 transition-all flex items-center justify-center">
                                            <div className="w-2.5 h-2.5 rounded-full bg-white opacity-0 peer-data-[state=checked]:opacity-100" />
                                        </div>
                                    </Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {/* Personal Info */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <Label htmlFor="name" className="text-lg font-black text-slate-900">Имя</Label>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        id="name"
                                        placeholder="Munisa Rizayeva"
                                        className="h-14 rounded-2xl border-slate-200 focus:ring-sky-500 bg-white text-slate-900 font-medium"
                                    />
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pl-1">Введите ваше имя</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <Label htmlFor="phone" className="text-lg font-black text-slate-900">Телефон</Label>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        id="phone"
                                        placeholder="+998 90 111 11 11"
                                        className="h-14 rounded-2xl border-slate-200 focus:ring-sky-500 bg-white text-slate-900 font-medium"
                                    />
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pl-1">Введите ваш телефон</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <Label htmlFor="address" className="text-lg font-black text-slate-900">Адрес</Label>
                                </div>
                                <div className="space-y-2">
                                    <Input
                                        id="address"
                                        placeholder="Ташкент, Юнусабад"
                                        className="h-14 rounded-2xl border-slate-200 focus:ring-sky-500 bg-white text-slate-900 font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                                        <MessageSquare className="w-5 h-5" />
                                    </div>
                                    <Label htmlFor="comment" className="text-lg font-black text-slate-900">Комментарий</Label>
                                </div>
                                <div className="space-y-2">
                                    <Textarea
                                        id="comment"
                                        defaultValue="домофон не работает"
                                        className="min-h-[120px] rounded-2xl border-slate-200 focus:ring-sky-500 bg-white text-slate-900 font-medium resize-none p-4"
                                    />
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider pl-1">Укажите информацию, которую считаете важной</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="p-8 border-t border-slate-50 mt-auto shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.03)] bg-white rounded-t-[3rem]">
                    <SheetFooter>
                        <Button
                            className="w-full rounded-4xl h-16 text-lg font-black bg-sky-600 hover:bg-sky-700 shadow-xl shadow-sky-600/20 transition-all active:scale-95"
                            onClick={handleConfirm}
                        >
                            Buyurtmani tasdiqlash
                        </Button>
                    </SheetFooter>
                </div>
            </SheetContent>
        </Sheet>
    );
}
