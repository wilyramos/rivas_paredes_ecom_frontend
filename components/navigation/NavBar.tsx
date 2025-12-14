import Link from "next/link";
import Logo from "../ui/Logo";
import ButtonShowCart from "../ui/ButtonShowCart";
import ButtonSearchFormStore from "../ui/ButtonSearchFormStore";
import ServerCategorias from "./ServerCategorias";
import NavBarClient from "./NavBarClient";
import ServerSheetMobile from "./ServerSheetMobile";
import { AiOutlineUser } from "react-icons/ai";
import ButtonSearchMobile from "./ButtonSearchMobile";

export default function NavBar() {
    return (
        <NavBarClient>
            <header className="relative w-full">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-2 min-h-[64px]">

                    {/* --- IZQUIERDA: Menú Mobile + Categorías Desktop --- */}
                    <div className="flex items-center gap-4 z-20">
                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <ServerSheetMobile />
                        </div>

                        {/* Desktop: Categorías fijas a la izquierda */}
                        <div className="hidden md:block">
                            <ServerCategorias />
                        </div>
                    </div>

                    {/* --- CENTRO: Logo (Posición Absoluta) --- */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                        <Link href="/" className="flex items-center">
                            <Logo />
                        </Link>
                    </div>

                    {/* --- DERECHA: Search + User + Cart --- */}
                    <div className="flex items-center gap-2 z-20">
                        
                        {/* Desktop: Search Form & User */}
                        <div className="hidden md:flex items-center gap-2">
                            <div className="w-64 lg:w-80">
                                <ButtonSearchFormStore />
                            </div>

                            <Link
                                href="/auth/registro"
                                className="flex items-center gap-1 transition px-2 py-1"
                                aria-label="Cuenta"
                            >
                                <div className="hover:bg-gray-100 rounded-full p-2">
                                    <AiOutlineUser className="h-6 w-6" />
                                </div>
                            </Link>
                        </div>

                        {/* Mobile: Search Icon only */}
                        <div className="md:hidden">
                            <ButtonSearchMobile />
                        </div>

                        {/* Cart Button (Always visible) */}
                        <ButtonShowCart />
                    </div>

                </div>
            </header>
        </NavBarClient>
    );
}