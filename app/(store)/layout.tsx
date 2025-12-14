//File: frontend/app/(store)/layout.tsx

import Footer from "@/components/home/Footer";
import NavBar from "@/components/navigation/NavBar";
import Advertisement from "@/components/home/Advertisement";
import ButtonWsp from "@/components/home/ButtonWsp";

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <section className="flex flex-col min-h-screen">

                {/* 1. Anuncio (Se muestra arriba, scrollea normal) */}
                <div>
                    <Advertisement />
                </div>

                {/* 2. NavBar (Sticky: se pega al top al scrollear pasado el anuncio) */}
                <NavBar />

                {/* 3. Main Content (Sin padding-top forzado) */}
                <main className="flex-1 min-h-screen">
                    {children}
                </main>

                <Footer />
            </section>

            {/* WhatsApp Button Fixed */}
            <ButtonWsp />
        </>
    );
}