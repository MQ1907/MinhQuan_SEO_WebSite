import ProductCard from "@/component/ProductCard";
import { getProductsByCategory } from "@/lib/db";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const products = await getProductsByCategory(category);

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
