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
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-[#0a0f1a]/80 backdrop-blur-3xl border-l border-white/10 p-0 text-slate-200">
                <SheetHeader className="p-6 border-b border-white/5 relative overflow-hidden">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

                    <SheetTitle className="flex items-center gap-3 text-2xl font-bold text-white relative z-10">
                        <span className="p-2 bg-cyan-500/10 rounded-xl border border-cyan-500/20 shadow-[inset_0_0_15px_rgba(6,182,212,0.2)]">
                            <PackageOpen className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        </span>
                        Buyurtmalar tarixi
                    </SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex-1 px-6 py-4">
                    <div className="space-y-4 py-2">
                        {ORDER_HISTORY.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col gap-4 bg-white/5 p-5 rounded-3xl border border-white/10 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-xs font-bold text-cyan-100/60 uppercase tracking-widest drop-shadow-sm">Buyurtma raqami</p>
                                        <p className="text-xl font-black text-white group-hover:text-cyan-400 transition-colors drop-shadow-md">#{order.id}</p>
                                    </div>
                                    <Badge
                                        className={`rounded-xl px-3 py-1.5 text-[11px] font-black tracking-wider shadow-sm transition-all ${order.statusType === 'success'
                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                                            : 'bg-sky-500/10 text-sky-400 border border-sky-500/20 drop-shadow-[0_0_8px_rgba(14,165,233,0.5)]'
                                            }`}
                                    >
                                        {order.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-slate-300 bg-slate-950/50 px-3 py-1.5 rounded-xl border border-white/5 shadow-inner">
                                        <Clock className="w-3.5 h-3.5 text-cyan-500/70" />
                                        <span className="text-xs font-bold tracking-wide">{order.date}</span>
                                    </div>
                                    <span className="text-[15px] font-black text-white drop-shadow-sm">{order.price}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-6 bg-slate-950/80 border-t border-white/10 mt-auto backdrop-blur-xl text-center text-[11px] text-slate-400/80 font-medium tracking-wide uppercase shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
                    <span className="drop-shadow-sm">Faqat so'nggi buyurtmalar ko'rsatilmoqda</span>
                </div>
            </SheetContent>
        </Sheet>
    );
}
