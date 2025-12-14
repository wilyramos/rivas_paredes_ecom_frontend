// File: frontend/app/(store)/page.tsx

import CarruselPrincipal from "@/components/home/CarruselPrincipal";
import ProductosNuevos from "@/components/home/ProductosNuevos";
import ProductosDestacados from "@/components/home/ProductosDestacados";
import CategoriasDestacadasWrapper from "@/components/home/CategoriasDestacadasWrapper";
import FeaturesList from "@/components/home/FeaturesList";


export default function HomePage() {
    return (
        <>
          
            <section className="container mx-auto">
                <CarruselPrincipal />
            </section>

            <section>
                <ProductosDestacados />
            </section>

            <section>
                <ProductosNuevos />
            </section>

            {/* <section className="my-5">
                <BrandsList />
            </section> */}

            <section className="my-10">
                <CategoriasDestacadasWrapper />
            </section>
            <section>
                <FeaturesList />
            </section>
        </>
    );
}
