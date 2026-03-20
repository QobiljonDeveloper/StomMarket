import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { User, PackageOpen, Clock, ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface ProfileDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ProfileDrawer({ open, onOpenChange }: ProfileDrawerProps) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full bg-slate-50/95 backdrop-blur-xl border-l border-slate-200">
                <SheetHeader className="pb-4 border-b border-slate-200">
                    <SheetTitle className="flex items-center gap-2 text-2xl font-bold text-slate-800">
                        <User className="w-6 h-6 text-sky-600" />
                        Mening profilim
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 py-6 flex flex-col gap-8">
                    {/* Profile Summary */}
                    <div className="flex flex-col items-center text-center gap-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-20 h-20 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 text-2xl font-bold border-4 border-white shadow-md">
                            MR
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900">Munisa Rizayeva</h3>
                            <p className="text-sm text-slate-500">munisa.rizayeva@mail.uz</p>
                        </div>
                        <Button variant="outline" className="w-full rounded-xl mt-2 border-slate-200">
                            Profilni tahrirlash
                        </Button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2 px-1">
                            <PackageOpen className="w-5 h-5 text-sky-600" />
                            Buyurtmalar tarixi
                        </h3>

                        <div className="space-y-4">
                            <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-sky-200 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">ID: #4092</p>
                                    <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50">
                                        Yetkazildi
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>12.03.2024</span>
                                    </div>
                                    <span className="font-semibold text-slate-600">240 000 UZS</span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-sky-200 transition-colors cursor-pointer group">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">ID: #3841</p>
                                    <Badge className="bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-50">
                                        Jarayonda
                                    </Badge>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-400">
                                    <div className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        <span>12.03.2024</span>
                                    </div>
                                    <span className="font-semibold text-slate-600">1 250 000 UZS</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-200">
                    <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" />
                        Chiqish
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
