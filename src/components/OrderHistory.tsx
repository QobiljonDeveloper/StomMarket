import { X, Package, Clock, CheckCircle2, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderHistoryProps {
    open: boolean;
    onClose: () => void;
}

const MOCK_ORDERS = [
    {
        id: "4092",
        date: "24 Okt 2024",
        status: "Yetkazib berildi",
        total: "1 250 000 so'm",
        items: "3 ta mahsulot"
    },
    {
        id: "3841",
        date: "12 Okt 2024",
        status: "Yo'lda",
        total: "450 000 so'm",
        items: "1 ta mahsulot"
    },
    {
        id: "3720",
        date: "01 Sen 2024",
        status: "Yetkazib berildi",
        total: "3 800 000 so'm",
        items: "12 ta mahsulot"
    }
];

export function OrderHistory({ open, onClose }: OrderHistoryProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed inset-0 z-60 bg-[#F8FAFC] flex flex-col w-full h-full overflow-y-auto font-sans"
                >
                    {/* Header Bar */}
                    <div className="flex items-center justify-between p-4 sticky top-0 bg-[#F8FAFC]/90 backdrop-blur-md z-10 border-b border-slate-200/50">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
                                <Package className="w-4 h-4" strokeWidth={2} />
                            </div>
                            <span className="font-bold text-slate-900 tracking-tight text-lg">Buyurtmalar tarixi</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 -mr-2 rounded-full hover:bg-slate-200/50 transition-colors text-slate-400 hover:text-slate-700"
                        >
                            <X className="w-6 h-6" strokeWidth={1.5} />
                        </button>
                    </div>

                    <div className="px-5 pb-8 pt-6 flex-1 flex flex-col max-w-lg mx-auto w-full space-y-4">
                        {MOCK_ORDERS.map((order) => {
                            const isDelivered = order.status === "Yetkazib berildi";
                            return (
                                <div key={order.id} className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 relative overflow-hidden group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">
                                                BUYURTMA RAQAMI
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lg font-bold text-slate-900">
                                                    #{order.id}
                                                </span>
                                                <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {order.date}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                                        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border shadow-sm ${isDelivered
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            : "bg-[#007AFF]/5 text-[#007AFF] border-[#007AFF]/20"
                                            }`}>
                                            {isDelivered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                                            {order.status}
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-0.5">Jami summa</span>
                                            <span className="text-lg font-black text-slate-900 tracking-tight">
                                                {order.total}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        <p className="text-center text-xs text-slate-400 mt-6 font-medium px-4 italic">
                            Faqat so'nggi buyurtmalar ko'rsatilmoqda
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
