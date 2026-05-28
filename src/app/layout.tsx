import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Benny Panamá | Tours Privados y Experiencias Auténticas",
  description: "Descubre Panamá con Benny, tu guía local privado. Tours personalizados a la comunidad Emberá, Canal de Panamá, San Blas, Portobelo y el Casco Viejo.",
  keywords: ["guia de turismo panama", "tours privados panama", "embera panama", "san blas tours", "canal de panama privado", "benny panama"],
  authors: [{ name: "Benny Panama" }],
  openGraph: {
    title: "Benny Panamá | Tours Privados y Experiencias Auténticas",
    description: "Vive Panamá de una forma única y real. Explora selvas, islas paradisíacas e historia colonial con un guía local apasionado.",
    images: ["/assets/hero_bg.png"],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} scroll-smooth`}
    >
      <body className="font-body bg-light text-dark min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
