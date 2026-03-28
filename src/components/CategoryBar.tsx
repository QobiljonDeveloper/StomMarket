import { LayoutGrid, CornerRightDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "../hooks/useCategories";
import { Category } from "../types";

interface CategoryBarProps {
    selectedCategoryId: string | null;
    onSelectCategory: (categoryId: string | null, categoryName: string) => void;
}

export function CategoryBar({ selectedCategoryId, onSelectCategory }: CategoryBarProps) {
    const { data: categories = [], isLoading } = useCategories();

    // Filter active root categories
    const activeCategories = categories.filter(c => c.isActive);

    // Derive active parent to show children if selected
    let activeParentCat: Category | null = null;
    if (selectedCategoryId) {
        const rootMatch = activeCategories.find(c => c.id === selectedCategoryId);
        if (rootMatch) {
            activeParentCat = rootMatch;
        } else {
            for (const cat of activeCategories) {
                if (cat.children?.some(child => child.id === selectedCategoryId)) {
                    activeParentCat = cat;
                    break;
                }
            }
        }
    }

    if (isLoading) {
        return (
            <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 sticky top-16 z-40">
                <div className="container mx-auto px-4 flex items-center gap-2 overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-24 h-9 bg-slate-100 animate-pulse rounded-full shrink-0"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-16 z-40 shadow-sm flex flex-col transition-all">
            {/* Main Categories Row */}
            <div className="w-full overflow-x-auto scrollbar-hide py-3">
                <div className="container mx-auto px-4 flex items-center gap-2 min-w-max">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelectCategory(null, "Barchasi")}
                        className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap text-[13px] font-semibold focus-visible:outline-none shrink-0 border ${!selectedCategoryId
                            ? "bg-[#007AFF] text-white border-[#007AFF] shadow-sm shadow-[#007AFF]/20"
                            : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        <LayoutGrid className={`w-4 h-4 ${!selectedCategoryId ? "text-white" : "text-slate-400"}`} strokeWidth={!selectedCategoryId ? 2.5 : 2} />
                        Barchasi
                    </motion.button>

                    {activeCategories.map((cat) => {
                        const isRootSelected = selectedCategoryId === cat.id;
                        const isChildSelected = activeParentCat?.id === cat.id && !isRootSelected;
                        const isSelected = isRootSelected || isChildSelected;

                        return (
                            <motion.button
                                key={cat.id}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSelectCategory(cat.id, cat.nameUz)}
                                className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all duration-200 whitespace-nowrap text-[13px] font-semibold focus-visible:outline-none shrink-0 border ${isSelected
                                    ? "bg-[#007AFF] text-white border-[#007AFF] shadow-sm shadow-[#007AFF]/20"
                                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                                    }`}
                            >
                                {cat.nameUz}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Sub Categories Row (Animated) */}
            <AnimatePresence>
                {activeParentCat?.children && activeParentCat.children.length > 0 && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-full bg-slate-50 border-t border-slate-100 overflow-hidden"
                    >
                        <div className="overflow-x-auto scrollbar-hide py-2.5">
                            <div className="container mx-auto px-4 flex items-center gap-2 min-w-max">
                                <CornerRightDown className="w-4 h-4 text-slate-400 mr-1 shrink-0" strokeWidth={2} />

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onSelectCategory(activeParentCat!.id, activeParentCat!.nameUz)}
                                    className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap text-xs font-bold focus-visible:outline-none shrink-0 ${selectedCategoryId === activeParentCat!.id
                                            ? "bg-slate-800 text-white shadow-sm"
                                            : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"
                                        }`}
                                >
                                    Barchasi
                                </motion.button>

                                {activeParentCat.children.filter(c => c.isActive).map((sub) => {
                                    const isSubSelected = selectedCategoryId === sub.id;
                                    return (
                                        <motion.button
                                            key={sub.id}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => onSelectCategory(sub.id, sub.nameUz)}
                                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full transition-all duration-200 whitespace-nowrap text-xs font-bold focus-visible:outline-none shrink-0 ${isSubSelected
                                                    ? "bg-slate-800 text-white shadow-sm"
                                                    : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-100"
                                                }`}
                                        >
                                            {sub.nameUz}
                                        </motion.button>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
