'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import AddProductToCart from './AddProductToCart';
import ImagenesProductoCarousel from './ImagenesProductoCarousel';
import ProductExpandableSections from './ProductExpandableSections ';
import PaymentMethods from '../PaymentMethods';

import type { ProductWithCategoryResponse, TApiVariant } from '@/src/schemas';
import { getDeliveryRange } from '@/lib/utils';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import ColorCircle from '@/components/ui/ColorCircle';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';


type Props = {
    producto: ProductWithCategoryResponse;
};

export default function ProductDetails({ producto }: Props) {
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedVariant, setSelectedVariant] = useState<TApiVariant | null>(null);
    const searchParams = useSearchParams();

    const allAttributes = useMemo(() => {
        const attrs: Record<string, string[]> = {};
        producto.variants?.forEach(v => {
            Object.entries(v.atributos).forEach(([key, value]) => {
                if (!attrs[key]) attrs[key] = [];
                if (!attrs[key].includes(value)) attrs[key].push(value);
            });
        });
        return attrs;
    }, [producto.variants]);

    useEffect(() => {
        const initialAttrs: Record<string, string> = {};
        Object.keys(allAttributes).forEach(attr => {
            const val = searchParams.get(attr);
            if (val) initialAttrs[attr] = val;
        });

        setSelectedAttributes(initialAttrs);

        const matched =
            Object.keys(initialAttrs).length > 0
                ? producto.variants?.find(v =>
                    Object.keys(initialAttrs).every(k => initialAttrs[k] === v.atributos[k]),
                ) ?? null
                : null;

        setSelectedVariant(matched);
    }, [allAttributes, searchParams, producto.variants]);

    const updateSelectedVariant = (attrKey: string, attrValue: string | null) => {
        const newAttributes = { ...selectedAttributes };

        if (attrValue === null || newAttributes[attrKey] === attrValue) {
            delete newAttributes[attrKey];
        } else {
            newAttributes[attrKey] = attrValue;
        }

        setSelectedAttributes(newAttributes);

        const matchedVariant =
            producto.variants?.find(v =>
                Object.keys(v.atributos).every(k => newAttributes[k] === v.atributos[k]),
            ) ?? null;

        setSelectedVariant(matchedVariant);

        const params = new URLSearchParams();
        Object.entries(newAttributes).forEach(([k, v]) => v && params.set(k, v));
        window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
    };

    const getAvailableValues = (attrKey: string): string[] => {
        const values = new Set<string>();
        producto.variants?.forEach(variant => {
            const matches = Object.entries(selectedAttributes).every(
                ([key, value]) => key === attrKey || variant.atributos[key] === value,
            );
            if (matches) values.add(variant.atributos[attrKey]);
        });
        return Array.from(values).sort((a, b) => a.localeCompare(b));
    };

    const precio = selectedVariant?.precio ?? producto.precio ?? 0;
    const precioComparativo =
        selectedVariant?.precioComparativo ?? producto.precioComparativo ?? null;

    const stock =
        Object.keys(selectedAttributes).length === 0 || !selectedVariant
            ? producto.stock ?? 0
            : selectedVariant.stock ?? 0;

    const allAttributesSelected = Object.keys(allAttributes).every(
        key => selectedAttributes[key],
    );

    const isOptionOutOfStock = (attrKey: string, attrValue: string) => {
        const variant = producto.variants?.find(v =>
            v.atributos[attrKey] === attrValue &&
            Object.entries(selectedAttributes).every(
                ([key, value]) => key === attrKey || v.atributos[key] === value,
            ),
        );
        return variant?.stock === 0;
    };

    const colorAtributo =
        !producto.variants?.length &&
        (producto.atributos?.color ||
            producto.atributos?.Color ||
            producto.atributos?.COLOR ||
            null);

    const variantImages =
        selectedVariant?.imagenes?.length
            ? selectedVariant.imagenes
            : [
                ...(producto.imagenes ?? []),
                ...(producto.variants?.flatMap(v => v.imagenes ?? []) ?? []),
            ].filter((img, i, arr) => arr.indexOf(img) === i);

    return (
        <>
            <article className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 max-w-7xl mx-auto px-4 lg:px-0 ">
                <div className="lg:col-span-8">
                    <ImagenesProductoCarousel images={variantImages} />
                </div>

                <section className="lg:col-span-4 sticky top-24 self-start">
                    <div className="bg-white p-6 space-y-6">
                        <header className="space-y-4 border-b border-gray-100 pb-6">
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                                {producto.nombre}
                            </h1>
                            <div className="flex items-end gap-4">
                                <p className="text-3xl font-semibold tracking-tight">
                                    <span className="text-sm mr-1">S/</span>
                                    {precio.toFixed(2)}
                                </p>

                                {precioComparativo && precioComparativo > precio && (
                                    <div className="flex items-center gap-2">
                                        <span className="line-through text-gray-400 text-sm">
                                            S/ {precioComparativo.toFixed(2)}
                                        </span>
                                        <span className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
                                            -{Math.round(((precioComparativo - precio) / precioComparativo) * 100)}%
                                        </span>
                                    </div>
                                )}
                                {stock > 0 ? (
                                    <span className="ml-auto ">
                                        
                                    </span>
                                ) : (
                                    <span className="ml-auto text-sm text-red-600 font-medium">
                                        Agotado
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-500">
                                {producto.brand && (
                                    <Link
                                        href={`/productos?brand=${producto.brand.slug}`}
                                        className="uppercase font-semibold tracking-widest hover:text-gray-800"
                                    >
                                        {producto.brand.nombre}
                                    </Link>
                                )}

                                
                            </div>
                        </header>

                        {Object.entries(allAttributes).map(([key]) => {
                            const values = getAvailableValues(key);

                            return (
                                <fieldset key={key} className="space-y-3">
                                    <legend className="text-xs font-semibold uppercase tracking-widest text-gray-700">
                                        {key}
                                    </legend>

                                    {key.toLowerCase() === 'color' ? (
                                        <div className="flex flex-wrap gap-4">
                                            {values.map(val => {
                                                const selected = selectedAttributes[key] === val;
                                                const out = isOptionOutOfStock(key, val);

                                                return (
                                                    <button
                                                        key={val}
                                                        disabled={out}
                                                        onClick={() => !out && updateSelectedVariant(key, val)}
                                                        className={`w-16 h-20 rounded-xl border flex flex-col items-center justify-center transition
                              ${selected ? 'border-gray-900 ring-2 ring-gray-900/20' : 'border-gray-200 hover:border-gray-400'}
                              ${out ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'}
                            `}
                                                    >
                                                        <ColorCircle color={val} />
                                                        <span className="text-[10px] mt-1">{val}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ) : values.length <= 6 ? (
                                        <div className="flex flex-wrap gap-3">
                                            {values.map(val => {
                                                const selected = selectedAttributes[key] === val;
                                                const out = isOptionOutOfStock(key, val);

                                                return (
                                                    <Button
                                                        key={val}
                                                        variant={selected ? 'default' : 'outline'}
                                                        size="sm"
                                                        disabled={out}
                                                        onClick={() => !out && updateSelectedVariant(key, val)}
                                                        className="rounded-full px-4 text-xs uppercase tracking-wide"
                                                    >
                                                        {val}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <Select
                                            value={selectedAttributes[key] || ''}
                                            onValueChange={value => updateSelectedVariant(key, value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Seleccionar ${key}`} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {values.map(val => (
                                                    <SelectItem key={val} value={val}>
                                                        {val}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                </fieldset>
                            );
                        })}

                          {!producto.variants?.length && colorAtributo && (
                                <div className="flex items-center  gap-3 text-sm text-gray-600 ">
                                    <span>Colores disponibles:</span>
                                    {Array.isArray(colorAtributo)
                                        ? colorAtributo.map((c: string) => <ColorCircle key={c} color={c} />)
                                        : <ColorCircle color={colorAtributo} />}
                                </div>
                            )}

                        <section className="flex items-center border-gray-100">
                            <div className="flex-1 hidden md:block">
                                <AddProductToCart
                                    product={producto}
                                    variant={allAttributesSelected ? selectedVariant ?? undefined : undefined}
                                />
                            </div>
                            {/* <div className="flex-1">
                                <ShopNowButton
                                    product={producto}
                                    variant={selectedVariant ?? undefined}
                                    disabled={!allAttributesSelected || stock <= 0}
                                />
                            </div> */}
                        </section>
                    </div>

                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="info"
                        className="mt-2 text-[13px] text-gray-700"
                    >
                        <AccordionItem value="info" className="">
                            <AccordionTrigger
                                className="px-6 py-4 
      "
                            >
                                Información de compra
                            </AccordionTrigger>

                            <AccordionContent className="px-6 space-y-6">
                                {/* Envíos */}
                                <div className="space-y-2 leading-relaxed text-xs">
                                    <p>
                                        Envíos <span className="font-medium text-zinc-500">gratis y contraentrega</span>.
                                    </p>
                                    <p>
                                        Envíos a todo el Perú mediante{' '}
                                        <span className="font-medium text-zinc-500">
                                            Shalom
                                        </span>.
                                    </p>
                                    <p className="inline-block rounded-full border border-gray-200 px-4 py-1 text-[12px] text-gray-600">
                                        {producto.diasEnvio
                                            ? `Recíbelo entre: ${getDeliveryRange(producto.diasEnvio)}`
                                            : 'Recíbelo en 1–3 días hábiles'}
                                    </p>
                                </div>

                                <div className="h-px bg-gray-100" />

                                {/* Pagos */}
                                <div className="space-y-3">
                                    <p className="text-[12px] font-medium uppercase tracking-widest text-gray-500">
                                        Medios de pago aceptados
                                    </p>
                                    <PaymentMethods />
                                </div>

                                <div className="h-px bg-gray-100" />

                                {/* Contacto */}
                                <div className="text-center">
                                    <a
                                        href={`https://wa.me/51924221553?text=Hola%2C%20consulta%20sobre%20${encodeURIComponent(
                                            producto.nombre,
                                        )}`}
                                        target="_blank"
                                        className="
            text-[13px]
            font-medium
            text-gray-900
            underline underline-offset-4
            hover:text-gray-700
          "
                                    >
                                        ¿Necesitas ayuda? Escríbenos por WhatsApp
                                    </a>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>



                </section>
            </article>

            <ProductExpandableSections producto={producto} />

            <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-2xl p-4 z-50">
                <AddProductToCart
                    product={producto}
                    variant={allAttributesSelected ? selectedVariant ?? undefined : undefined}
                />
            </div>
        </>
    );
}
