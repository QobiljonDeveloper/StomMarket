import {
    LayoutGrid,
    Syringe,
    Drill,
    Scissors,
    Wrench,
    Activity,
    ShieldCheck,
    MonitorSpeaker,
    Package
} from "lucide-react";

interface CategoryFilterProps {
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const CATEGORIES_DATA = [
    { name: "Barchasi", icon: LayoutGrid },
    { name: "Plombalar", icon: Syringe },
    { name: "Nasadkalar", icon: Drill },
    { name: "Jarrohlik", icon: Scissors },
    { name: "Ortodontiya", icon: Wrench },
    { name: "Endodontiya", icon: Activity },
    { name: "Izolyatsiya", icon: ShieldCheck },
    { name: "Uskunalar", icon: MonitorSpeaker },
    { name: "Sarflov", icon: Package }
];

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
    return (
        <div className="w-full bg-white border-b border-border shadow-sm sticky top-16 z-40">
            <div className="container mx-auto px-4 py-3">
                {/* Swipeable Container */}
                <div className="flex w-full overflow-x-auto gap-2 pb-1 scrollbar-hide snap-x touch-pan-x items-center">
                    {CATEGORIES_DATA.map((cat, idx) => {
                        const isSelected = selectedCategory === cat.name;
                        const Icon = cat.icon;

                        return (
                            <button
                                key={idx}
                                onClick={() => onSelectCategory(cat.name)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 whitespace-nowrap shrink-0 snap-start text-sm sm:text-base ${isSelected
                                        ? "border-sky-600 bg-sky-50 text-sky-700 font-semibold shadow-sm"
                                        : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-slate-50 font-medium"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? "text-sky-600" : "text-slate-400"}`} />
                                {cat.name}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
