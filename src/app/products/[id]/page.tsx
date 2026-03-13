import { getProductById } from "@/lib/db";

import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  return (
    <main className="category-container">
      <div className="flex flex-col md:flex-row gap-10 mt-8">
        {/* Giả lập ảnh sản phẩm */}
        <div className="w-full md:w-1/2 aspect-square bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
          Hình ảnh sản phẩm {product.id}
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-6">
            {product.price.toLocaleString("vi-VN")}đ
          </p>

          <div className="border-t border-b border-gray-100 py-6 mb-6">
            <h3 className="font-semibold mb-2">Thông tin sản phẩm:</h3>
            <p className="text-gray-600 leading-relaxed">
              Mẫu hoa được thiết kế tỉ mỉ bởi các thợ cắm hoa lành nghề tại Vũng Tàu.
              Sử dụng các loại hoa tươi mới nhất trong ngày, đảm bảo độ bền và hương
              thơm.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="search-button flex-1 py-4 text-lg">
              Thêm vào giỏ hàng
            </button>
            <button className="px-6 py-4 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all">
              Tư vấn Zalo
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-400">
            Tags: {product.tags.join(", ")}
          </div>
        </div>
      </div>
    </main>
  );
}
