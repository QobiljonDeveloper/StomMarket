import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { MapPin, Loader2 } from "lucide-react";
import { useAddress } from "../hooks/useAddress";
import { useAuthContext } from "../context/AuthContext";

interface AddressPopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSaveSuccess: (addressId?: string) => void;
}

export function AddressPopup({ open, onOpenChange, onSaveSuccess }: AddressPopupProps) {
    const { user } = useAuthContext();
    const { regions, createAddress, isCreatingAddress } = useAddress(user?.id);

    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [label, setLabel] = useState("Uy");
    const [isDefault, setIsDefault] = useState(true);

    const handleSave = async () => {
        if (!user?.id) {
            alert("Foydalanuvchi tizimga kirmagan.");
            return;
        }
        if (!region || !city || !street || !label) {
            alert("Iltimos, barcha maydonlarni to'ldiring.");
            return;
        }

        try {
            const regionInt = parseInt(region, 10);
            const newAddr = await createAddress({
                userId: user.id,
                label,
                region: regionInt,
                city,
                street,
                isDefault
            });
            onSaveSuccess(newAddr.id);
            // Reset fields dynamically
            setRegion("");
            setCity("");
            setStreet("");
            setLabel("Uy");
            setIsDefault(true);
            onOpenChange(false);
        } catch (err) {
            console.error("Popup address failure:", err);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] w-[95%] rounded-4xl p-6 bg-white border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.08)] z-50">
                <DialogHeader className="mb-4 text-left">
                    <DialogTitle className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#007AFF]/10 flex items-center justify-center text-[#007AFF]">
                            <MapPin className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        Manzil qo'shish
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 text-sm mt-1">
                        Buyurtmani yetkazib berish uchun to'liq manzilni kiriting.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-2">
                    <div className="space-y-1.5">
                        <Label htmlFor="region" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Viloyat</Label>
                        <Select value={region} onValueChange={setRegion}>
                            <SelectTrigger className="w-full h-12 rounded-xl border-slate-200 bg-[#F8FAFC] focus:ring-2 focus:ring-[#007AFF]/20 transition-all font-medium">
                                <SelectValue placeholder="Viloyatni tanlang" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px] border-slate-100 shadow-xl rounded-xl bg-white z-100">
                                {regions.map((r) => (
                                    <SelectItem key={r.value.toString()} value={r.value.toString()} className="font-medium cursor-pointer focus:bg-slate-50">{r.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="city" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Shahar / Tuman</Label>
                        <Input
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Shahar yoki tuman nomi..."
                            className="h-12 rounded-xl border-slate-200 bg-[#F8FAFC] placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#007AFF]/20 font-medium px-4"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="street" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Ko'cha, xonadon</Label>
                        <Input
                            id="street"
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="To'liq manzil: ko'cha, uy / kvartira..."
                            className="h-12 rounded-xl border-slate-200 bg-[#F8FAFC] placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#007AFF]/20 font-medium px-4"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="label" className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Manzil Nomi</Label>
                        <Input
                            id="label"
                            value={label}
                            onChange={(e) => setLabel(e.target.value)}
                            placeholder="Uy, Ishxona..."
                            className="h-12 rounded-xl border-slate-200 bg-[#F8FAFC] placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#007AFF]/20 font-medium px-4"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2 ml-1 cursor-pointer" onClick={() => setIsDefault(!isDefault)}>
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${isDefault ? 'bg-[#007AFF] border-[#007AFF] text-white' : 'bg-[#F8FAFC] border-slate-200'}`}>
                            {isDefault /* checkmark */ && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        </div>
                        <Label className="text-sm font-semibold text-slate-600 cursor-pointer pointer-events-none">Asosiy manzil qilish</Label>
                    </div>
                </div>

                <DialogFooter className="mt-6 sm:justify-start flex-col sm:flex-col gap-2">
                    <Button
                        onClick={handleSave}
                        disabled={isCreatingAddress}
                        className="w-full h-12 rounded-xl bg-[#007AFF] hover:bg-[#005bb5] text-white font-bold shadow-[0_8px_20px_rgba(0,122,255,0.2)] transition-colors"
                    >
                        {isCreatingAddress ? <Loader2 className="w-4 h-4 animate-spin mx-auto" strokeWidth={2.5} /> : "Manzilni saqlash"}
                    </Button>
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="w-full h-12 rounded-xl text-slate-500 hover:text-slate-900 border border-transparent hover:bg-slate-50 font-semibold uppercase tracking-wider text-xs"
                    >
                        Bekor qilish
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
