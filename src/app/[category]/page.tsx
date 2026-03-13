import ProductCard from "@/component/ProductCard";
import { formatVietnameseDate } from "@/lib";
import { getProductsByCategory } from "@/lib/db";
import { cache } from "react";

// SEO
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
const getProducts = cache(getProductsByCategory);
export async function generateMetadata({ params }: PageProps<"/[category]">) {
  const { category } = await params;
  const categoryName = category.replace(/-/g, " ");
  const products = await getProducts(category);
  const topProducts = products.splice(0, 10).map((p) => p.name.toLowerCase());

  return {
    title: `Mẫu ${categoryName} đẹp nhất ${formatVietnameseDate(new Date())}`,
    description: `Khám phá bộ sưu tập ${categoryName} thiết kế độc đáo tại Vũng Tàu. Cam kết hoa tươi trong ngày, giá cả cạnh tranh. Free ship nội thành.`,
    keywords: [
      "hoa tươi Vũng Tàu",
      "shop hoa Vũng Tàu",
      "đặt hoa online",
      `${categoryName}`,
      `mẫu ${categoryName} đẹp`,
      `${categoryName} giao tại nhà`,
      ...topProducts,
    ],
    openGraph: {
      title: `Mẫu ${categoryName} đẹp nhất ngày ${formatVietnameseDate(new Date())}`,
      description: `Khám phá bộ sưu tập ${categoryName} thiết kế độc đáo tại Vũng Tàu. Cam kết hoa tươi trong ngày, giá cả cạnh tranh. Free ship nội thành.`,
      url: "https://tiemhoavungtau.com",
      siteName: "Tiệm Hoa Vũng Tàu",
      images: [
        {
          url: "/hoa.jpg",
          width: 1200,
          height: 630,
          alt: "Tiệm Hoa Vũng Tàu",
        },
      ],
      locale: "vi_VN",
      phoneNumbers: "098789456",
      type: "website",
      emails: "tiemhoavungtau@gmail.com",
      countryName: "Việt Nam",
    },
    alternates: {
      canonical: `${baseUrl}/${category}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category } = await params;
  const products = await getProducts(category);

  return (
    <main className="category-container">
      <h1 className="category-title">Danh mục: {category.replace(/-/g, " ")}</h1>
      <p className="category-description">
        Hiển thị các mẫu hoa thuộc nhóm {category.replace(/-/g, " ")}...
      </p>

      {products && products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </ul>
      ) : (
        <p className="empty-message">
          Hiện chưa có sản phẩm nào trong danh mục này.
        </p>
      )}
    </main>
  );
}
