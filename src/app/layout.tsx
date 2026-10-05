import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE_URL = "https://pava-logement-21gy-eight.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title:
    "PAVA LOGEMENT — Trouvez votre logement à Dakar | Court & Long séjour",

  description:
    "PAVA LOGEMENT facilite la recherche et la proposition de logements à Dakar pour les courts et longs séjours. Consultez les logements proposés, recherchez selon votre quartier, votre budget et votre durée, puis contactez PAVA pour vérifier les informations et la disponibilité.",

  keywords: [
    "PAVA LOGEMENT",
    "logement Dakar",
    "location Dakar",
    "court séjour Dakar",
    "long séjour Dakar",
    "appartement Dakar",
    "studio Dakar",
    "villa Dakar",
    "chambre Dakar",
    "maison Dakar",
  ],

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    title:
      "PAVA LOGEMENT — Trouvez votre logement à Dakar",

    description:
      "Consultez les logements proposés à Dakar pour un court ou un long séjour. Recherchez par quartier, durée et budget, puis contactez PAVA pour vérifier les informations et la disponibilité.",

    type: "website",
    locale: "fr_SN",
    url: SITE_URL,
    siteName: "PAVA LOGEMENT",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "PAVA LOGEMENT — Trouvez votre logement à Dakar",
    description:
      "Logements proposés à Dakar pour courts et longs séjours.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />

        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

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
              "@type": "Organization",
              name: "PAVA LOGEMENT",
              url: SITE_URL,
              email: "pavalogement@gmail.com",
              telephone: "+221782931667",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "Médina Rue 6 x Angle 17",
                addressLocality: "Dakar",
                addressCountry: "SN",
              },
              areaServed: {
                "@type": "City",
                name: "Dakar",
              },
              sameAs: [
                "https://www.instagram.com/pavalogement",
                "https://www.tiktok.com/@pavalogementsn",
                "https://web.facebook.com/profile.php?id=61592014130890",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
