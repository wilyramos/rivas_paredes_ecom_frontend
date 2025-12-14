// app/sitemap.ts
//TODO: REVISAR SITEMAT PARA RIVASPAREDES

import { GetAllProductsSlug } from "@/src/services/products";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await GetAllProductsSlug(); // tu función que devuelve slug o url

    const productUrls = products.map((p) => ({
        url: `https://www.rivasparedes.pe/productos/${p.slug}`,
        lastModified: p.updatedAt || new Date(),
        changefreq: "daily",
        priority: 0.8,
    }));

    return [
        {
            url: "https://www.rivasparedes.pe",
            lastModified: new Date(),
            changefreq: "weekly",
            priority: 1,
        },
        ...productUrls,
    ];
}
