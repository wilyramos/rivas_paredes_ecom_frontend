import { getFrontPageProducts } from "@/src/services/products";
import MainCarousel from "./MainCarousel";

export default async function CarruselPrincipal() {
    // Get the products for the carousel
    const products = await getFrontPageProducts();

    if (!products || products.products.length === 0) {
        return null;
    }

    return (
        <div className="w-full bg-white mb-8">
            <div className="max-w-7xl mx-auto md:px-6 lg:px-8">
                <MainCarousel products={products.products} />
            </div>
        </div>
    );
}