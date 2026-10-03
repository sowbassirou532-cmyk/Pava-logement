import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "PAVA LOGEMENT — Location court & long séjour à Dakar | Appartements, Villas, Chambres",
  description:
    "PAVA LOGEMENT, agence de location à Dakar : appartements meublés, studios, duplex, chambres, villas et maisons pour courts séjours et location longue durée. Gestion locative, paiement Wave & Orange Money, charges incluses.",
  keywords: [
    "location Dakar",
    "appartement meublé Dakar",
    "court séjour Dakar",
    "location longue durée Sénégal",
    "villa Almadies",
    "gestion locative Dakar",
    "PAVA LOGEMENT",
  ],
  openGraph: {
    title: "PAVA LOGEMENT — Votre logement idéal à Dakar",
    description:
      "Appartements, studios, villas et chambres vérifiés à Dakar. Court séjour dès 12 000 FCFA/nuit, longue durée, gestion locative de confiance.",
    type: "website",
    locale: "fr_SN",
  },
  metadataBase: new URL("https://pava-logement.netlify.app"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,700;9..144,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#faf7f1] text-slate-900 antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "PAVA LOGEMENT",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Médina Rue 6 x Angle 17",
                addressLocality: "Dakar",
                addressCountry: "SN",
              },
              telephone: "+221782931667",
              email: "pavalogement@gmail.com",
              areaServed: "Dakar, Sénégal",
              priceRange: "12000 - 650000 FCFA",
            }),
          }}
        />
      </body>
    </html>
  );
}
