//File: frontend/app/(store)/categoria/[slug]/page.tsx


import FiltrosPorCategoria from "@/components/home/categorias/FiltrosPorCategoria ";
import ListaProducts from "@/components/home/categorias/ListaProducts";
import OrdenarPor from "@/components/home/products/OrdenarPor";

type Params = Promise<{
    slug: string;
}>;

type SearchParams = Promise<Record<string, string | string[] | undefined>>;


export default async function pageCategoria({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const { slug } = await params;
    const allParams = await searchParams;

    const {
        page,
        limit,
        priceRange,
        sort,
        compatibilidad,
        query,
        ...restAtributos
    } = allParams;

    const atributos: Record<string, string[]> = {};
    Object.entries(restAtributos).forEach(([key, value]) => {
        if (typeof value === "string") {
            atributos[key] = value.split(",").map(item => item.trim());
        }
    });

    const limitNumber = limit ? parseInt(limit as string, 10) : 10;

    return (

        <main className="max-w-screen-2xl mx-auto">
            <section className="grid grid-cols-1 sm:grid-cols-8 gap-4 px-4">

                {/* Filtros en sidebar solo en escritorio */}
                <div className="hidden sm:block sm:col-span-2 px-2m-4">
                    <div className="sticky top-20 px-2 ">
                        <FiltrosPorCategoria categorySlug={slug} />
                    </div>
                </div>

                {/* Productos */}
                <section className="sm:col-span-6 space-y-2">

                    {/* Barra responsive arriba en mobile */}
                    <div className="flex items-center justify-between gap-2 sm:hidden">
                        {/* DrawerFilters ya está dentro de FiltrosPorCategoria */}
                        {/* <Suspense fallback={<SpinnerLoading />}> */}
                        <FiltrosPorCategoria categorySlug={slug} />
                        {/* </Suspense> */}
                        <OrdenarPor pathname={`/categoria/${slug}`} />
                    </div>

                    {/* Ordenar en escritorio */}
                    <div className="hidden sm:flex sm:justify-end">
                        <OrdenarPor pathname={`/categoria/${slug}`} />
                    </div>

                    {/* Lista de productos */}
                    {/* <Suspense fallback={<SpinnerLoading />}> */}
                    <ListaProducts
                        category={slug}
                        priceRange={priceRange as string}
                        page={page as string}
                        limit={limitNumber}
                        sort={sort as string}
                        compatibilidad={compatibilidad as string}
                        query={query as string}
                        atributos={atributos}
                    />
                    {/* </Suspense> */}
                </section>
            </section>
        </main>
    );
}