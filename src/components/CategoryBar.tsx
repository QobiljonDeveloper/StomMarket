import { LayoutGrid, Syringe, Drill, Scissors, Wrench, Activity, ShieldCheck, MonitorSpeaker, Package } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryBarProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

export const CATEGORIES_DATA = [
    { name: "Barchasi", icon: LayoutGrid },
    { name: "Plombalar", icon: Syringe },
    { name: "Nasadkalar", icon: Drill },
    { name: "Jarrohlik", icon: Scissors },
    { name: "Ortodontiya", icon: Wrench },
    { name: "Endodontiya", icon: Activity },
    { name: "Izolyatsiya", icon: ShieldCheck },
    { name: "Uskunalar", icon: MonitorSpeaker },
    { name: "Sarflov materiallari", icon: Package }
];

export function CategoryBar({ selectedCategory, onSelectCategory }: CategoryBarProps) {
    return (
        <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 overflow-x-auto scrollbar-hide py-3 sticky top-16 z-40">
            <div className="container mx-auto px-4 flex items-center gap-2 min-w-max">
                {CATEGORIES_DATA.map((cat, idx) => {
                    const isSelected = selectedCategory === cat.name;
                    const Icon = cat.icon;

                    return (
                        <motion.button
                            key={idx}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onSelectCategory(cat.name)}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap text-[13px] font-semibold focus-visible:outline-none ${isSelected
                                ? "bg-[#007AFF] text-white shadow-sm shadow-[#007AFF]/20"
                                : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                        >
                            <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-slate-400"}`} strokeWidth={isSelected ? 2.5 : 2} />
                            {cat.name}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
