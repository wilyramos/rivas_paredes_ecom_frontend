"use client";

import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import PaymentMethods from "./PaymentMethods";
import Logo from "../ui/Logo";

export default function Footer() {
    const links = [
        { label: "Inicio", href: "/" },
        { label: "Colección", href: "/productos" },
        { label: "Categorías", href: "/categorias" },
    ];

    const helpCenterLinks = [
        { label: "Contacto", href: "/hc/contacto-y-soporte" },
        { label: "Proceso de compra", href: "/hc/proceso-de-compra" },
        { label: "Cambios y devoluciones", href: "/hc/garantias-y-devoluciones" },
        { label: "Preguntas frecuentes", href: "/hc/preguntas-frecuentes" },
        { label: "Políticas de privacidad", href: "/hc/politicas-de-privacidad" },
    ];

    const social = [
        {
            icon: <FaInstagram />,
            href: "https://www.instagram.com/rivasparedes",
            name: "Instagram",
        },
        {
            icon: <FaFacebookF />,
            href: "https://www.facebook.com/rivasparedes",
            name: "Facebook",
        },
        {
            icon: <FaWhatsapp />,
            href: "https://api.whatsapp.com/send?phone=51924221553&text=Hola%2C%20quisiera%20información%20sobre%20RivasParedes",
            name: "WhatsApp",
        },
    ];

    return (
        <footer className="bg-white text-gray-700 text-sm border-t">

            {/* Contenido principal */}
            <div className="max-w-7xl mx-auto px-6 py-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-5">

                {/* Branding */}
                <div className="lg:col-span-2">
                    <div className="mb-6">
                        <Logo />
                    </div>

                    <p className="text-gray-600 leading-relaxed max-w-sm">
                        Moda contemporánea diseñada para destacar con elegancia.
                        Piezas atemporales que definen tu estilo.
                    </p>
                </div>

                {/* Navegación */}
                <nav>
                    <h3 className="mb-4 font-semibold tracking-wide uppercase text-xs text-gray-900">
                        Explorar
                    </h3>
                    <ul className="space-y-3">
                        {links.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="hover:text-black transition-colors"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Ayuda */}
                <nav>
                    <h3 className="mb-4 font-semibold tracking-wide uppercase text-xs text-gray-900">
                        Ayuda
                    </h3>
                    <ul className="space-y-3">
                        {helpCenterLinks.map(({ label, href }) => (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className="hover:text-black transition-colors"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Contacto */}
                <div>
                    <h3 className="mb-4 font-semibold tracking-wide uppercase text-xs text-gray-900">
                        Contáctanos
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                        <li>
                            <a
                                href="tel:+51999999999"
                                className="hover:text-black transition-colors"
                            >
                                +51 999 999 999
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:contacto@rivasparedes.com"
                                className="hover:text-black transition-colors"
                            >
                                contacto@rivasparedes.com
                            </a>
                        </li>
                        <li className="text-xs text-gray-500">
                            Lun – Sáb · 10:00 – 19:00
                        </li>
                    </ul>
                </div>
            </div>

            {/* Social + pagos */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

                    {/* Redes */}
                    <div className="flex gap-4">
                        {social.map(({ icon, href, name }) => (
                            <a
                                key={name}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                                className="
                                    w-10 h-10 flex items-center justify-center
                                    border border-gray-300 rounded-full
                                    text-gray-700
                                    hover:bg-black hover:text-white hover:border-black
                                    transition-all
                                "
                            >
                                {icon}
                            </a>
                        ))}
                    </div>

                    {/* Pagos */}
                    <div className="flex flex-col items-center md:items-end gap-2">
                        <span className="text-xs uppercase tracking-wide text-gray-500">
                            Métodos de pago
                        </span>
                        <PaymentMethods />
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-200 text-center py-6 px-6 text-xs text-gray-500">
                © {new Date().getFullYear()}{" "}
                <span className="font-medium text-gray-700">RivasParedes</span>.
                Todos los derechos reservados.
            </div>
        </footer>
    );
}
