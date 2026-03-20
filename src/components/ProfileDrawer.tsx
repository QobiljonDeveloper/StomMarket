import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { PackageOpen, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

interface ProfileDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ORDER_HISTORY = [
    { id: "4092", date: "20.03.2026", price: "240 000 UZS", status: "Yetkazib berildi", statusType: "success" },
    { id: "3841", date: "18.03.2026", price: "1 250 000 UZS", status: "Yo'lda", statusType: "info" },
    { id: "3720", date: "15.03.2026", price: "450 000 UZS", status: "Yetkazib berildi", statusType: "success" },
    { id: "3655", date: "10.03.2026", price: "890 000 UZS", status: "Yetkazib berildi", statusType: "success" },
];

export function ProfileDrawer({ open, onOpenChange }: ProfileDrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-white border-l border-slate-100 p-0">
                <SheetHeader className="p-6 border-b border-slate-50">
                    <SheetTitle className="flex items-center gap-3 text-2xl font-black text-slate-900 tracking-tight">
                        <div className="p-2.5 bg-sky-50 rounded-2xl text-sky-600">
                            <PackageOpen className="w-6 h-6" />
                        </div>
                        Buyurtmalar tarixi
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6 py-4">
                    <div className="space-y-4 py-4">
                        {ORDER_HISTORY.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col gap-4 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-default"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Buyurtma raqami</p>
                                        <p className="text-lg font-black text-slate-900 group-hover:text-sky-600 transition-colors">#{order.id}</p>
                                    </div>
                                    <Badge
                                        className={`rounded-full px-4 py-1.5 text-xs font-black border-none ${order.statusType === 'success'
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-sky-50 text-sky-600'
                                            }`}
                                    >
                                        {order.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                    <div className="flex items-center gap-2 text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span className="text-xs font-bold">{order.date}</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-900">{order.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-6 bg-slate-50/50 border-t border-slate-100 italic text-center text-[11px] text-slate-400 font-medium">
                    Faqat so'nggi buyurtmalar ko'rsatilmoqda
                </div>
            </SheetContent>
        </Sheet>
    );
}
