"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type ArrowProps = {
    onClick?: () => void;
    direction: "left" | "right";
};

export function CustomArrow({ onClick, direction }: ArrowProps) {
    const baseClasses =
        "absolute top-1/2 -translate-y-1/2 z-20 hover:text-zinc-700 transition p-3";

    const positionClasses =
        direction === "left"
            ? "left-0 rounded-r-full"
            : "right-0 rounded-l-full";

    return (
        <button onClick={onClick} className={`${baseClasses} ${positionClasses}`}>
            {direction === "left" ? (
                <ChevronLeft className="w-8 h-8" />
            ) : (
                <ChevronRight className="w-8 h-8" />
            )}
        </button>
    );
}
