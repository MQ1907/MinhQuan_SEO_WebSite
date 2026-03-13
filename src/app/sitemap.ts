import { getCategories, getProducts } from "@/lib/db";
import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getCategories();
  const products = await getProducts();

  const categoryPages = categories
    .map((cat) => ({
      url: `${baseUrl}/${cat.id}`,
      //   lastModified: `${cat.updatedAt}`,
      // changeFrequency: "monthly",
      priority: 0.8,
    }))
    .flat() as MetadataRoute.Sitemap;

  const productPages = products
    .map((prod) => ({
      url: `${baseUrl}/products/${prod.id}`,
      priority: 0.6,
      //    lastModified: `${prod.updatedAt}`,
    }))
    .flat() as MetadataRoute.Sitemap;

  return [
    {
      url: `${baseUrl}`,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categoryPages,
    ...productPages,
  ];
}
