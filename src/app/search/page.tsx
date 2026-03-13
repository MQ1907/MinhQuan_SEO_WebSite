import ProductCard from "@/component/ProductCard";
import { searchProducts } from "@/lib/db";

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
