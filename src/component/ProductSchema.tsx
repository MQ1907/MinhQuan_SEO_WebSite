import { Product, WithContext } from "schema-dts";

interface Props {
  name: string;
  description?: string;
  price?: number;
  productId: number;
}

export default function ProductSchema({
  name,
  description,
  price,
  productId,
}: Props) {
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: name,
    description: description,
    brand: {
      "@type": "Brand",
      name: "Tiệm Hoa Vũng Tàu",
    },
    offers: {
      "@type": "Offer",
      url: `https://tiemhoavungtau.com/products/${productId}`,
      priceCurrency: "VND",
      price: price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
