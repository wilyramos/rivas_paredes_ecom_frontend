"use client";

import Image from "next/image";
import Link from "next/link";
import type { ProductResponse } from "@/src/schemas";

export default function ProductCardHome({ product }: { product: ProductResponse }) {
    const primaryImage = product.imagenes?.[0] ?? null;
    const hoverImage = product.imagenes?.[1] ?? primaryImage;
    const precio = product.precio ?? 0;
    const stock = product.stock ?? 0;
    const brand = typeof product.brand === "string" ? product.brand : product.brand?.nombre;

    return (
        <Link
            href={`/productos/${product.slug}`}
            className="group flex flex-col bg-white"
        >
            {/* Imagen MUCHO MÁS GRANDE */}
            <div className="relative aspect-[4/5] bg-white overflow-hidden">
                {primaryImage && (
                    <Image
                        src={primaryImage}
                        alt={product.nombre}
                        fill
                        className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                        quality={90}
                    />
                )}

                {hoverImage && (
                    <Image
                        src={hoverImage}
                        alt={`${product.nombre} - vista alternativa`}
                        fill
                        className="object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                        quality={90}
                    />
                )}

                {/* Badge Nuevo */}
                {product.esNuevo && (
                    <div className="absolute top-3 left-3 z-10">
                        <span className="px-2 py-0.5 bg-black text-white text-[10px] uppercase tracking-widest">
                            Nuevo
                        </span>
                    </div>
                )}
            </div>

            {/* Información mínima y elegante */}
            <div className="flex flex-col flex-1 px-1.5 py-3">

                {/* Marca — altura fija */}
                <div className="h-5 flex items-center">
                    {brand && (
                        <span className="text-[11px] uppercase tracking-wide font-medium text-[#c79748]">
                            {brand}
                        </span>
                    )}
                </div>

                {/* Nombre — altura fija */}
                <h3 className="text-sm text-black leading-snug font-light line-clamp-2 h-[2.7rem]">
                    {product.nombre}
                </h3>

                {/* Precio — limpio, sin atributos */}
                <div className="mt-auto pt-2 flex items-baseline gap-2">
                    {stock > 0 ? (
                        <>
                            <span className="text-sm font-semibold text-black tracking-tight">
                                S/ {precio.toFixed(2)}
                            </span>

                            {typeof product.precioComparativo === "number" &&
                                product.precioComparativo > 0 && (
                                    <span className="text-xs text-gray-400 line-through">
                                        S/ {product.precioComparativo.toFixed(2)}
                                    </span>
                                )}
                        </>
                    ) : (
                        <span className="text-sm font-semibold text-neutral-400 uppercase">
                            Agotado
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
