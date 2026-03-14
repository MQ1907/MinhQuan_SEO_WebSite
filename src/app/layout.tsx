import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";
import BusinessSchema from "@/component/BusinessSchema";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
export const metadata: Metadata = {
  title: {
    template: "%s | Tiệm Hoa Vũng Tàu",
    default: "Hoa Tươi 24/7 Giao Nhanh Tại Vũng Tàu | Tiệm Hoa Vũng Tàu",
  },
  description:
    "Chuyên thiết kế hoa sinh nhật, khai trương, Valentine sang trọng. Cam kết hoa tươi mới mỗi ngày, giá tốt, giao nhanh hỏa tốc 2h tận nơi tại Vũng Tàu.",
  keywords: ["hoa tươi Vũng Tàu", "shop hoa Vũng Tàu", "đặt hoa online"],
  openGraph: {
    title: {
      template: "%s | Tiệm Hoa Vũng Tàu",
      default: "Hoa Tươi 24/7 Giao Nhanh Tại Vũng Tàu | Tiệm Hoa Vũng Tàu",
    },
    description:
      "Chuyên thiết kế hoa sinh nhật, khai trương, Valentine sang trọng. Cam kết hoa tươi mới mỗi ngày, giá tốt, giao nhanh hỏa tốc 2h tận nơi tại Vũng Tàu.",
    url: `${baseUrl}`,
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
    canonical: `${baseUrl}`,
  },
  metadataBase: new URL(`${baseUrl}`),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <BusinessSchema />
      </head>

      <body>
        <nav className="nav-bar">
          <div className="nav-content">
            <Link
              href="/"
              className="nav-logo"
            >
              🌸 Tiệm Hoa Vũng Tàu
            </Link>

            <div className="nav-links">
              <Link
                href="/hoa-sinh-nhat"
                className="nav-link-item"
              >
                Hoa sinh nhật
              </Link>
              <Link
                href="/hoa-8-3"
                className="nav-link-item"
              >
                Hoa 8/3
              </Link>
              <Link
                href="/hoa-tiec"
                className="nav-link-item"
              >
                Hoa tiệc
              </Link>
              <Link
                href="/hoa-valentine"
                className="nav-link-item"
              >
                Hoa Valentine
              </Link>
            </div>

            {/* Nút giả lập để giao diện cân đối */}
            <button className="hidden md:block px-4 py-2 text-sm font-semibold text-white bg-slate-600 rounded-full hover:bg-rose-700 transition-all">
              Liên hệ ngay
            </button>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
