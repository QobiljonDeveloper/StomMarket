import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Package, MapPin, Phone, History, User } from "lucide-react";
import { motion } from "framer-motion";

interface ProfileDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const MOCK_ORDERS = [
    {
        id: "4092",
        date: "24 Okt 2024",
        status: "Yetkazib berildi",
        total: "1 250 000 so'm",
        items: "3ta mahsulot"
    },
    {
        id: "4085",
        date: "12 Okt 2024",
        status: "Yo'lda",
        total: "450 000 so'm",
        items: "1ta mahsulot"
    },
    {
        id: "3920",
        date: "01 Sen 2024",
        status: "Yetkazib berildi",
        total: "3 800 000 so'm",
        items: "12ta mahsulot"
    }
];

export function ProfileDrawer({ open, onOpenChange }: ProfileDrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="bottom" className="w-full h-[90vh] sm:max-w-md sm:h-[95vh] sm:mx-auto sm:rounded-t-[2rem] rounded-t-[2rem] flex flex-col bg-[#F8FAFC] border-t border-slate-200 p-0 text-slate-900 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <SheetHeader className="px-6 py-6 border-b border-slate-200 bg-white/80 backdrop-blur-xl shrink-0 sticky top-0 z-10 rounded-t-[2rem]">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-[#E0F2F1] flex items-center justify-center border border-[#007AFF]/20 shadow-sm relative overflow-hidden">
                            <User className="absolute -bottom-2 w-10 h-10 text-[#007AFF]/60" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col">
                            <SheetTitle className="text-xl font-bold text-slate-900 tracking-tight">
                                Muzaffar Ruzmetov
                            </SheetTitle>
                            <span className="text-[13px] font-medium text-[#007AFF] bg-[#007AFF]/10 px-2 py-0.5 rounded-full w-fit mt-1 border border-[#007AFF]/20">
                                Premium Mijoz
                            </span>
                        </div>
                    </div>
                </SheetHeader>

                <ScrollArea className="flex-1 px-4 py-6">
                    <div className="space-y-6">
                        {/* Info Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col gap-2 shadow-sm relative overflow-hidden group">
                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007AFF]/10 group-hover:text-[#007AFF] transition-colors">
                                    <Phone className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-0.5">Telefon</span>
                                    <span className="text-[13px] font-semibold text-slate-900">+998 90 123 45 67</span>
                                </div>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col gap-2 shadow-sm relative overflow-hidden group">
                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#007AFF]/10 group-hover:text-[#007AFF] transition-colors">
                                    <MapPin className="w-4 h-4" strokeWidth={2} />
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block mb-0.5">Manzil</span>
                                    <span className="text-[13px] font-semibold text-slate-900 line-clamp-1">Toshkent, Chilonzor</span>
                                </div>
                            </div>
                        </div>

                        {/* Order History Timeline */}
                        <div>
                            <div className="flex items-center gap-2 mb-6 ml-2">
                                <History className="w-5 h-5 text-slate-400" strokeWidth={2} />
                                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Buyurtmalar tarixi</h3>
                            </div>

                            <div className="pl-5 border-l-2 border-slate-200 ml-4 space-y-8 py-2">
                                {MOCK_ORDERS.map((order, i) => {
                                    const isDelivered = order.status === "Yetkazib berildi";
                                    return (
                                        <motion.div
                                            key={order.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="relative pb-2"
                                        >
                                            {/* Timeline Node */}
                                            <div className={`absolute -left-[27px] top-1.5 w-3.5 h-3.5 rounded-full border-[3px] border-[#F8FAFC] shadow-sm ${isDelivered ? 'bg-emerald-500' : 'bg-[#007AFF]'}`} />

                                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-[0_5px_15px_rgba(0,0,0,0.02)] relative group hover:border-[#007AFF]/30 transition-colors cursor-pointer">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                                            Buyurtma #{order.id}
                                                        </span>
                                                        <span className="text-[14px] font-bold text-slate-900">
                                                            {order.date}
                                                        </span>
                                                    </div>
                                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-sm ${isDelivered
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                        : "bg-[#007AFF]/5 text-[#007AFF] border-[#007AFF]/20"
                                                        }`}>
                                                        {order.status}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-end pt-3 border-t border-slate-100 mt-2">
                                                    <div className="flex items-center gap-1.5 text-slate-500">
                                                        <Package className="w-4 h-4" strokeWidth={2} />
                                                        <span className="text-[12px] font-semibold">{order.items}</span>
                                                    </div>
                                                    <span className="text-[16px] font-black text-slate-900">
                                                        {order.total}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    {/* Padding for bottom */}
                    <div className="h-6"></div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}
