import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface BadgeWrapperProps {
    count: number;
    children: ReactNode;
    className?: string;
    badgeClassName?: string;
}

export function BadgeWrapper({
    count,
    children,
    className,
    badgeClassName,
}: BadgeWrapperProps) {
    return (
        <div className={cn("relative inline-flex items-center justify-center", className)}>
            {children}

            <AnimatePresence>
                {count > 0 && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className={cn(
                            "absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 z-10",
                            "w-4 h-4 rounded-full bg-[#DC2626] ring-1 ring-white shadow-sm",
                            "flex items-center justify-center pointer-events-none",
                            badgeClassName
                        )}
                    >
                        <span className="text-white text-[10px] font-bold leading-none tracking-tight">
                            {count > 9 ? "9+" : count}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
