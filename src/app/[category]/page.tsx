import ProductCard from "@/component/ProductCard";
import { formatVietnameseDate } from "@/lib";
import { getCategoryById, getProductsByCategory } from "@/lib/db";
import { notFound } from "next/navigation";

// SEO
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function generateMetadata({ params }: PageProps<"/[category]">) {
  const { category: categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return notFound();
  }

  const categoryName = category.name.toLowerCase();
  const products = await getProductsByCategory(categoryId);
  const topProducts = products.splice(0, 10).map((p) => p.name.toLowerCase());

  return {
    title: `Mẫu ${categoryName} đẹp nhất trong ${formatVietnameseDate(new Date())}`,
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
      title: `Mẫu ${categoryName} đẹp nhất ${formatVietnameseDate(new Date())}`,
      description: `Khám phá bộ sưu tập ${categoryName} thiết kế độc đáo tại Vũng Tàu. Cam kết hoa tươi trong ngày, giá cả cạnh tranh. Free ship nội thành.`,
      url: `${baseUrl}/${categoryId}`,
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
      canonical: `${baseUrl}/${categoryId}`,
    },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: categoryId } = await params;
  const category = await getCategoryById(categoryId);

  if (!category) {
    return notFound();
  }

  const categoryName = category.name.toLowerCase();
  const products = await getProductsByCategory(categoryId);

  return (
    <main className="category-container">
      <h1 className="category-title">Danh mục: {categoryName}</h1>
      <p className="category-description">
        Hiển thị các mẫu hoa thuộc nhóm {categoryName}...
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
