import { db } from "@/db";
import { properties } from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { Navbar, TopBar, Footer, WhatsAppFloat } from "@/components/site-chrome";
import { Hero } from "@/components/hero";
import { Catalog } from "@/components/catalog";
import { StayModes, GestionLocative, Services, About, Testimonials, Faq } from "@/components/home-sections";
import { ContactSection } from "@/components/contact";
import type { PropertyDTO } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let rows: any[] = [];
  try {
    rows = await db.select().from(properties).where(eq(properties.isAvailable, true)).orderBy(sql`${properties.isFeatured} DESC, ${properties.rating} DESC`).limit(30);
  } catch {
    rows = [];
  }
  const initial: PropertyDTO[] = rows.map((r) => ({
    ...r,
    amenities: (r.amenities as string[]) || [],
    images: (r.images as string[]) || [],
  }));

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
