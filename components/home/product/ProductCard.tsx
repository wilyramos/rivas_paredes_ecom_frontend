"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ColorCircle from "@/components/ui/ColorCircle";
import type { ProductResponse } from "@/src/schemas";

export default function ProductCard({ product }: { product: ProductResponse }) {
    const color = product.atributos?.Color || product.atributos?.color || null;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState<number | null>(null);

    const imagenes = product.imagenes ?? [];
    const precio = product.precio ?? 0;
    const stock = product.stock ?? 0;

    // Hover image
    const handleMouseEnter = () => {
        if (imagenes.length > 1) setCurrentIndex(1);
    };
    const handleMouseLeave = () => setCurrentIndex(0);

    // Image navigation
    const nextImage = () =>
        setCurrentIndex((prev) =>
            prev === imagenes.length - 1 ? 0 : prev + 1
        );
    const prevImage = () =>
        setCurrentIndex((prev) =>
            prev === 0 ? imagenes.length - 1 : prev - 1
        );

    // Swipe events (mobile)
    const handleTouchStart = (e: React.TouchEvent) => setStartX(e.touches[0].clientX);
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (startX === null) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 30) {
            if (diff > 0) nextImage();
            else prevImage();
        }
        setStartX(null);
    };

    // Drag events (desktop)
    const handleMouseDown = (e: React.MouseEvent) => setStartX(e.clientX);
    const handleMouseUp = (e: React.MouseEvent) => {
        if (startX === null) return;
        const diff = startX - e.clientX;
        if (Math.abs(diff) > 30) {
            if (diff > 0) nextImage();
            else prevImage();
        }
        setStartX(null);
    };

    return (
        <div
            className="group relative flex flex-col transform transition-transform duration-500 hover:scale-[1.01] bg-white"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <Link href={`/productos/${product.slug}`} className="flex flex-col h-full">

                {/* Imagen */}
                <div className="relative w-full aspect-square bg-white overflow-hidden rounded-t">
                    {imagenes.length > 0 ? (
                        <div className="relative w-full h-full">
                            {/* Carrusel */}
                            <div
                                className="flex w-full h-full transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                            >
                                {imagenes.map((img, idx) => (
                                    <div key={idx} className="min-w-full h-full relative">
                                        <Image
                                            src={img}
                                            alt={`${product.nombre} ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                            quality={80}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Flechas */}
                            {imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => { e.preventDefault(); prevImage(); }}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full opacity-0 md:group-hover:opacity-100 transition"
                                    >
                                        <ChevronLeft size={15} />
                                    </button>

                                    <button
                                        onClick={(e) => { e.preventDefault(); nextImage(); }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1.5 rounded-full opacity-0 md:group-hover:opacity-100 transition"
                                    >
                                        <ChevronRight size={15} />
                                    </button>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
                            Sin imagen
                        </div>
                    )}

                
                </div>


                {/* Información */}
                <div className="flex flex-col flex-1 p-3">

                    {/* Marca (si no existe, se reserva el espacio igual) */}
                    <div className="h-5 flex items-center">
                        <span className="text-[11px] tracking-wide uppercase text-[#c79748] font-medium">
                            {product.brand?.nombre || ""}
                        </span>
                    </div>

                    {/* Nombre del producto */}
                    <h3 className="text-sm font-light text-black leading-snug line-clamp-3 h-[3.8rem]">
                        {product.nombre}
                    </h3>

                    {/* Precio */}
                    <div className="mt-auto pt-2 flex items-center justify-between">
                        {color && <ColorCircle color={color} size={12} />}

                        <div className="flex flex-col items-end leading-tight">
                            {stock > 0 ? (
                                <>
                                    <div>
                                        {(product.precioComparativo ?? 0) > 0 && (
                                            <span className="text-gray-400 text-xs line-through px-1 font-light">
                                                s/ {product.precioComparativo!.toFixed(2)}
                                            </span>
                                        )}
                                        <span className="text-black text-sm">
                                            s/ {precio.toFixed(2)}
                                        </span>
                                    </div>
                                </>
                            ) : (
                                <span className="text-gray-400 text-sm">Sin stock</span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );

}