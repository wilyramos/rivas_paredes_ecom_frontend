import React from 'react'
import Link from 'next/link'
import { FaWhatsapp } from "react-icons/fa"; // Ícono oficial de WhatsApp

export default function ButtonWsp() {
    return (
        <Link
            href="https://wa.me/51924221553?text=Hola%2C%20queria%20consultar%20sobre%20"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500/90 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.25)] hover:bg-green-500 hover:shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all animate-bounce-slow group"
            aria-label="Chat en WhatsApp"
        >
            <FaWhatsapp className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        </Link>
    )
}
