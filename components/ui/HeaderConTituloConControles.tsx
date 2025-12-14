"use client";

import type { ButtonGroupProps } from "react-multi-carousel";
import HeaderConControles from "./HeaderConControles";

interface Props extends ButtonGroupProps {
  title: string;
  subtitle?: string;
}

export default function HeaderConTituloConControles({
  title,
  subtitle,
  next,
  previous,
}: Props) {
  return (
    <div className="flex items-end justify-between mb-12 md:mb-16">
      <div>
        {/* Título – estilo moda premium */}
        <h2 className="text-xl md:text-2xl font-light tracking-wide text-black mb-3">
          {title}
        </h2>

        {/* Línea elegante */}
        <div className="h-px w-24 md:w-32 bg-black mb-3" />

        {/* Subtítulo */}
        {subtitle && (
          <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-neutral-500">
            {subtitle}
          </p>
        )}
      </div>

      {/* Controles minimalistas */}
      <HeaderConControles next={next} previous={previous} />
    </div>
  );
}
