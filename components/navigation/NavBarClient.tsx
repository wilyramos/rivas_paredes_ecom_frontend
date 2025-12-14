"use client";

import { useEffect, useState, ReactNode } from "react";

export default function NavBarClient({ children }: { children: ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            // Ajustamos el umbral si deseas que cambie de color inmediatamente
            setScrolled(window.scrollY > 10);
        };
        onScroll(); // Check inicial
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className={
                `sticky top-0 left-0 w-full z-[22] border-b transition-colors duration-300
                ${scrolled ? "bg-white " : "bg-white"}`
            }
        >
            {children}
        </div>
    );
}