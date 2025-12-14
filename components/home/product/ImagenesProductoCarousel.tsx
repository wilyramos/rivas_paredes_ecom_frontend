"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImagenesProductoCarousel({ images }: { images: string[] }) {
    const hasImages = images && images.length > 0;

    const imgList = hasImages ? images : [];

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const nextImage = () => {
        setSelectedIndex((prev) => (prev + 1) % imgList.length);
        setZoom(false);
    };

    const prevImage = () => {
        setSelectedIndex((prev) => (prev - 1 + imgList.length) % imgList.length);
        setZoom(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoom) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - rect.left) / rect.width) * 100;
        const y = ((e.pageY - rect.top) / rect.height) * 100;
        setPosition({ x, y });
    };

    const toggleZoom = () => setZoom((prev) => !prev);
    const showThumbnails = imgList.length > 1;

    if (!hasImages) {
        return (
            <div className="w-full mx-auto flex items-center justify-center h-full bg-neutral-100 ">
                <span className="text-gray-500 text-base">no image</span>
            </div>
        );
    }

    return (
        <div className="w-full mx-auto">
            {/* Escritorio */}
            <div className="hidden md:block">
                {imgList.length === 1 ? (
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f6f6]">
                        <Image
                            src={imgList[0]}
                            alt="Imagen única"
                            fill
                            className="object-cover"
                            quality={95}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        {imgList.map((img, idx) => (
                            <div key={idx} className="relative aspect-[4/5] w-full overflow-hidden bg-[#f6f6f6]">
                                <Image
                                    src={img}
                                    alt={`Imagen ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    quality={95}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Móvil */}
            <div className="md:hidden">
                <div
                    className={`relative aspect-square overflow-hidden bg-[#f6f6f6] ${
                        zoom ? "cursor-zoom-out" : "cursor-zoom-in"
                    }`}
                    onMouseMove={handleMouseMove}
                    onClick={toggleZoom}
                >
                    <Image
                        key={selectedIndex}
                        src={imgList[selectedIndex]}
                        alt={`Imagen ${selectedIndex + 1}`}
                        fill
                        className={`object-contain transition duration-300 ${
                            zoom ? "scale-150" : "scale-100"
                        }`}
                        style={{ transformOrigin: `${position.x}% ${position.y}%` }}
                        quality={100}
                        unoptimized
                    />

                    {imgList.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    prevImage();
                                }}
                                className="absolute top-1/2 left-2 -translate-y-1/2 backdrop-blur-sm text-gray-700 p-3 rounded-full shadow-md"
                            >
                                <FaChevronLeft size={18} />
                            </button>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    nextImage();
                                }}
                                className="absolute top-1/2 right-4 -translate-y-1/2 backdrop-blur-sm text-gray-700 p-3 rounded-full shadow-md"
                            >
                                <FaChevronRight size={18} />
                            </button>
                        </>
                    )}
                </div>

                {showThumbnails && (
                    <div className="mt-2 flex md:hidden justify-center gap-2 overflow-x-auto no-scrollbar">
                        {imgList.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedIndex(idx)}
                                className={`relative h-12 w-12 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                                    selectedIndex === idx ? "border-gray-500" : "border-gray-200"
                                }`}
                            >
                                <Image
                                    src={img}
                                    alt={`Miniatura ${idx + 1}`}
                                    fill
                                    className="object-cover"
                                    quality={5}
                                    unoptimized
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
