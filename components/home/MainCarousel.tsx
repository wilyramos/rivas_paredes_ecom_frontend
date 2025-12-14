"use client";

import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import type { ProductResponse } from "@/src/schemas";
import Link from "next/link";
import { CustomDot } from "../ui/CustomDot";
import { CustomArrow } from "../ui/CustomArrows";
import { useEffect, useState } from "react";

const responsive = {
    superLargeDesktop: { breakpoint: { max: 3000, min: 2000 }, items: 1 },
    desktop: { breakpoint: { max: 2000, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1 },
};

export default function MainCarousel({ products }: { products: ProductResponse[] }) {
    const [showDiscount, setShowDiscount] = useState(true);

    // Alternar visualización del descuento cada 3 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setShowDiscount((prev) => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full mx-auto overflow-hidden">
            <Carousel
                responsive={responsive}
                autoPlay
                infinite
                autoPlaySpeed={6000}
                showDots
                renderDotsOutside={true}
                dotListClass="!bottom-2" // Ajuste para acercar los dots
                customDot={<CustomDot />}
                customLeftArrow={<CustomArrow direction="left" />}
                customRightArrow={<CustomArrow direction="right" />}
                itemClass="pb-10 md:pb-0" // Espacio para los dots en mobile
                containerClass="z-10"
            >
                {products.map((product) => {
                    const discountPercentage = product.precioComparativo
                        ? Math.round(
                            ((product.precioComparativo - product.precio) /
                                product.precioComparativo) * 100
                        )
                        : 0;

                    const brandName = product.brand?.nombre || "RIVAS PAREDES";

                    return (
                        <Link
                            key={product._id}
                            href={`/productos/${product.slug}`}
                            className="group relative flex flex-col-reverse md:flex-row items-center justify-between 
                            px-4 md:px-12 py-6 h-auto min-h-[450px] md:h-[500px] w-full bg-white md:rounded-xl overflow-hidden"
                        >
                            {/* --- TEXT SECTION --- */}
                            <article className="relative z-10 w-full md:w-5/12 space-y-4 text-center md:text-left mt-6 md:mt-0 flex flex-col items-center md:items-start">
                                
                                {/* Etiqueta Superior */}
                                <div className="flex items-center gap-3 mb-2">
                                    {product.esNuevo && (
                                        <span className="px-3 py-1 bg-black text-[#e5d9a5] text-[10px] font-bold uppercase tracking-widest">
                                            Nueva Colección
                                        </span>
                                    )}
                                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c79748]">
                                        {brandName}
                                    </span>
                                </div>

                                {/* Título */}
                                <h2 className="text-3xl md:text-5xl font-black text-black leading-tight tracking-tight uppercase">
                                    {product.nombre}
                                </h2>

                                {/* Precios */}
                                <div className="flex items-end justify-center md:justify-start gap-4 pt-2">
                                    <p className="text-3xl md:text-4xl font-bold text-[#c79748]">
                                        <span className="text-lg align-top font-medium mr-1">S/.</span>
                                        {product.precio?.toFixed(2)}
                                    </p>

                                    {product.precioComparativo && product.precioComparativo > product.precio && (
                                        <div className="flex flex-col items-start mb-1">
                                            <span className="text-sm text-gray-400 line-through decoration-gray-400">
                                                S/. {product.precioComparativo.toFixed(2)}
                                            </span>
                                            
                                            {/* Badge Descuento Dinámico */}
                                            <div className="h-5 overflow-hidden relative w-24">
                                                <span className={`absolute left-0 top-0 text-xs font-bold text-black bg-[#e5d9a5] px-1 transition-transform duration-500 ${showDiscount ? 'translate-y-0' : '-translate-y-full'}`}>
                                                    -{discountPercentage}% OFF
                                                </span>
                                                <span className={`absolute left-0 top-0 text-xs font-bold text-[#c79748] transition-transform duration-500 ${!showDiscount ? 'translate-y-0' : 'translate-y-full'}`}>
                                                    OFERTA
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Botón CTA Simulado */}
                                <div className="pt-4 hidden md:block">
                                    <span className="inline-block border-b-2 border-black text-black font-semibold text-sm pb-1 uppercase tracking-widest group-hover:text-[#c79748] group-hover:border-[#c79748] transition-colors">
                                        Ver Detalles
                                    </span>
                                </div>
                            </article>

                            {/* --- IMAGE SECTION --- */}
                            <div className="relative w-full md:w-7/12 h-[280px] sm:h-[350px] md:h-[450px]">
                                {/* Fondo decorativo circular sutil */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] md:w-[420px] h-[280px] md:h-[420px] bg-[#e5d9a5]/20 rounded-full blur-3xl -z-10"></div>

                                <div className="relative w-full h-full">
                                    {/* Imagen Principal */}
                                    <Image
                                        src={product.imagenes?.[0] || "/placeholder.png"}
                                        alt={product.nombre}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 60vw"
                                        priority
                                        className={`object-contain transition-all duration-700 ease-in-out z-10 
                                            ${product.imagenes?.[1] ? 'group-hover:opacity-0 group-hover:scale-105' : 'group-hover:scale-105'}`}
                                    />
                                    
                                    {/* Imagen Secundaria (Hover) */}
                                    {product.imagenes?.[1] && (
                                        <Image
                                            src={product.imagenes[1]}
                                            alt={`${product.nombre} vista trasera`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 60vw"
                                            className="absolute inset-0 object-contain transition-all duration-700 ease-in-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-105 z-20"
                                        />
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </Carousel>
        </section>
    );
}