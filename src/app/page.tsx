import { db } from "@/db";
import { properties } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { Navbar, TopBar, Footer, WhatsAppFloat } from "@/components/site-chrome";
import { Hero } from "@/components/hero";
import { Catalog } from "@/components/catalog";
import {
  StayModes,
  GestionLocative,
  Services,
  About,
  Testimonials,
  Faq,
} from "@/components/home-sections";
import { ContactSection } from "@/components/contact";
import type { PropertyDTO } from "@/lib/site";
import { issueSignedToken, presignUrl } from "@vercel/blob";

export const dynamic = "force-dynamic";

async function getPrivatePreviewUrl(imageUrl: string) {
  try {
    const sourceUrl = new URL(imageUrl);

    // Les images externes/publics restent inchangées.
    if (!sourceUrl.hostname.includes(".blob.vercel-storage.com")) {
      return imageUrl;
    }

    const pathname = decodeURIComponent(sourceUrl.pathname).replace(
      /^\/+/,
      ""
    );

    const validUntil = Date.now() + 24 * 60 * 60 * 1000;

    const token = await issueSignedToken({
      pathname,
      operations: ["get"],
      validUntil,
    });

    const result = await presignUrl(token, {
      pathname,
      operation: "get",
      access: "private",
      validUntil,
    });

    return result.presignedUrl;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  let rows: any[] = [];

  try {
    rows = await db
      .select()
      .from(properties)
      .where(eq(properties.isAvailable, true))
      .orderBy(
        sql`${properties.isFeatured} DESC, ${properties.rating} DESC`
      )
      .limit(30);
  } catch {
    rows = [];
  }

  const initial: PropertyDTO[] = await Promise.all(
    rows.map(async (r) => {
      const rawImages = Array.isArray(r.images)
        ? r.images.filter(
            (value: unknown): value is string =>
              typeof value === "string"
          )
        : [];

      const signedImages = (
        await Promise.all(
          rawImages.map((image) =>
            getPrivatePreviewUrl(image)
          )
        )
      ).filter(
        (image): image is string => Boolean(image)
      );

      return {
        ...r,
        amenities: (r.amenities as string[]) || [],
        images: signedImages,
      };
    })
  );

  return (
    <div className="min-h-screen">
      <TopBar />
      <Navbar />

      <main>
        <Hero />
        <Catalog initial={initial} />
        <StayModes />
        <GestionLocative />
        <Services />
        <About />
        <Testimonials />
        <Faq />
        <ContactSection />
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
