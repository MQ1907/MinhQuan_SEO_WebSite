export default function BusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Florist",
    name: "Tiệm Hoa Vũng Tàu",
    image: "https://tiemhoavungtau.com/hoa.jpg",
    url: "https://tiemhoavungtau.com",
    telephone: "+84-987-894-56",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vũng Tàu",
      addressRegion: "Bà Rịa - Vũng Tàu",
      addressCountry: "VN",
    },
    areaServed: "Vũng Tàu",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}
