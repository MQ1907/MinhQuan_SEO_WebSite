import ProductCard from "@/component/ProductCard";
import { searchProducts } from "@/lib/db";

// SEO
const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  if (!q) {
    return {
      title: "Tìm kiếm hoa tươi tại Vũng Tàu",
      description: "Tìm kiếm nhanh các mẫu hoa tươi đẹp tại Tiệm Hoa Vũng Tàu",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  const products = await searchProducts(q);
  const topProducts = products.slice(0, 10).map((p) => p.name.toLowerCase());

  return {
    title: `Top ${products.length} mẫu ${q} đẹp nhất tại Vũng Tàu`,
    description: `Top ${products.length} mẫu ${q} đẹp nhất tại Tiệm Hoa Vũng Tàu. Hoa tươi mỗi ngày, giao nhanh nội thành.`,
    keywords: [
      "hoa tươi Vũng Tàu",
      "shop hoa Vũng Tàu",
      "đặt hoa online",
      `${q}`,
      `mẫu ${q} đẹp`,
      `mua ${q} tại Vũng Tàu`,
      ...topProducts,
    ],

    openGraph: {
      title: `Top ${products.length} mẫu ${q} đẹp nhất tại Vũng Tàu`,
      description: `Khám phá các mẫu ${q} được yêu thích tại Tiệm Hoa Vũng Tàu. Hoa tươi mỗi ngày, giao nhanh nội thành.`,
      url: `${baseUrl}/search?q=${encodeURIComponent(q)}`,
      siteName: "Tiệm Hoa Vũng Tàu",
      images: [
        {
          url: "/hoa.jpg",
          width: 1200,
          height: 630,
          alt: `Top ${products.length} mẫu ${q} đẹp nhất tại Vũng Tàu`,
        },
      ],
      locale: "vi_VN",
      phoneNumbers: "098789456",
      type: "website",
      emails: "tiemhoavungtau@gmail.com",
      countryName: "Việt Nam",
    },

    alternates: {
      canonical: `${baseUrl}/search?q=${encodeURIComponent(q)}`,
    },

    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const products = await searchProducts(q);

  return (
    <main className="category-container">
      <h1 className="category-title">Kết quả cho: &quot;{q}&quot;</h1>
      <p className="category-description">
        Top {products.length} sản phẩm {q} đẹp nhất dành cho bạn.
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
          Rất tiếc, chúng tôi không tìm thấy sản phẩm nào phù hợp với từ khóa &quot;
          {q}&quot;.
        </p>
      )}
    </main>
  );
}
