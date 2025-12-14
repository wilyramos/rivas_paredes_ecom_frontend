"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ButtonGroupProps } from "react-multi-carousel";

export default function HeaderConControles({ next, previous }: ButtonGroupProps) {
    return (
        <div className="flex items-center justify-end">
            <div className="flex gap-4">
                <button
                    onClick={() => previous?.()}
                    aria-label="Anterior"
                    className="
            group
            w-9 h-9
            flex items-center justify-center
            rounded-full
            border border-black/20
            bg-white
            transition-all duration-300
            hover:bg-black hover:border-black
          "
                >
                    <ArrowLeft
                        className="
              w-4 h-4
              text-black
              transition-colors duration-300
              group-hover:text-[#c79748]
            "
                        strokeWidth={1.4}
                    />
                </button>

                <button
                    onClick={() => next?.()}
                    aria-label="Siguiente"
                    className="
            group
            w-9 h-9
            flex items-center justify-center
            rounded-full
            border border-black/20
            bg-white
            transition-all duration-300
            hover:bg-black hover:border-black
          "
                >
                    <ArrowRight
                        className="
              w-4 h-4
              text-black
              transition-colors duration-300
              group-hover:text-[#c79748]
            "
                        strokeWidth={1.4}
                    />
                </button>
            </div>
        </div>
    );
}
