// File: frontend/app/(store)/productos/[slug]/page.tsx

import { GetProductsBySlug } from '@/src/services/products';
import ProductPageServer from '@/components/home/product/ProductPageServer';
import { Suspense } from 'react';
import SpinnerLoading from '@/components/ui/SpinnerLoading';
import ProductJsonLd from '@/components/seo/ProductJsonLd';

type Params = Promise<{
    slug: string;
}>;


export default async function pageProduct({ params }: { params: Params }) {
    const { slug } = await params;
    const producto = await GetProductsBySlug(slug);

    return (
        <main className='px-4 md:px-8'>
            <ProductJsonLd producto={producto} />
            <Suspense fallback={<SpinnerLoading />}>
                <ProductPageServer producto={producto} />
            </Suspense>
        </main>
    );
}