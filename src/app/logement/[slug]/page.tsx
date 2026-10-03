import { db } from "@/db";
import { properties } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar, TopBar, Footer, WhatsAppFloat } from "@/components/site-chrome";
import { CONTACT, WHATSAPP_LINK, formatFCFA, TYPE_LABELS } from "@/lib/site";
import { MapPin, BedDouble, Bath, Ruler, Users, Star, Check, ShieldCheck, ArrowLeft, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const [p] = await db.select().from(properties).where(eq(properties.slug, slug)).limit(1);
    if (!p) return { title: "Logement introuvable — PAVA LOGEMENT" };
    return {
      title: `${p.title} — ${p.neighborhood} | PAVA LOGEMENT Dakar`,
      description: `${p.title} à ${p.neighborhood}, Dakar. ${p.pricePerNight ? formatFCFA(p.pricePerNight) + "/nuit" : ""} ${p.pricePerMonth ? formatFCFA(p.pricePerMonth) + "/mois" : ""}. Charges incluses, réservation WhatsApp.`,
    };
  } catch {
    return { title: "PAVA LOGEMENT Dakar" };
  }
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [p] = await db.select().from(properties).where(eq(properties.slug, slug)).limit(1);
  if (!p) notFound();
  const images = (p.images as string[]) || [];
  const amenities = (p.amenities as string[]) || [];

  return (
    <div className="min-h-screen bg-[#faf7f1]">
      <TopBar />
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <Link href="/#logements" className="inline-flex items-center gap-2 text-[14px] font-bold text-[#006b75] hover:underline">
          <ArrowLeft size={16} /> Retour aux logements
        </Link>
        <div className="mt-4 overflow-hidden rounded-3xl bg-white border shadow-sm">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-[300px] md:h-[440px] bg-slate-100">
              {images[0] && <img src={images[0]} alt={p.title} className="h-full w-full object-cover" />}
              <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[13px] font-extrabold">{TYPE_LABELS[p.type]} · {p.neighborhood}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 p-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative h-[145px] md:h-[216px] overflow-hidden rounded-2xl bg-slate-100">
                  {images[i] && <img src={images[i]} alt={`${p.title} ${i}`} className="h-full w-full object-cover" loading="lazy" />}
                </div>
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8 p-6 sm:p-10">
            <div>
              <h1 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold tracking-tight text-slate-900 leading-tight">{p.title}</h1>
              <p className="mt-2 flex items-center gap-1.5 font-semibold text-slate-500"><MapPin size={16} /> {p.address}, Dakar · <span className="inline-flex items-center gap-1"><Star size={14} className="fill-amber-400 text-amber-400" /> {(Number(p.rating) / 10).toFixed(1)} ({p.reviewsCount} avis)</span></p>
              <div className="mt-5 grid grid-cols-4 gap-2 text-center">
                {[
                  { icon: BedDouble, v: p.bedrooms, l: "Chambres" },
                  { icon: Bath, v: p.bathrooms, l: "SDB" },
                  { icon: Ruler, v: p.surfaceM2 ? `${p.surfaceM2} m²` : "—", l: "Surface" },
                  { icon: Users, v: p.maxGuests, l: "Pers." },
                ].map((s, i) => (
                  <div key={i} className="rounded-2xl bg-slate-50 border p-3.5"><s.icon size={19} className="mx-auto text-[#006b75]" /><p className="mt-1 font-extrabold">{s.v}</p><p className="text-[12px] text-slate-500">{s.l}</p></div>
                ))}
              </div>
              <p className="mt-6 text-[15px] leading-relaxed text-slate-700">{p.description}</p>
              <h2 className="mt-7 font-extrabold text-[18px]">Équipements</h2>
              <div className="mt-3 grid sm:grid-cols-2 gap-2">
                {amenities.map((a, i) => (
                  <span key={i} className="inline-flex items-center gap-2 rounded-xl bg-teal-50 border border-teal-100 px-3.5 py-2.5 text-[14px] font-semibold"><Check size={15} className="text-emerald-600" /> {a}</span>
                ))}
              </div>
              <div className="mt-7 rounded-2xl bg-[#062e32] p-6 text-[14px] text-teal-50/85">
                <p className="font-extrabold text-white flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-300" /> Garanties PAVA LOGEMENT</p>
                <ul className="mt-3 space-y-1.5"><li>✓ Visite physique ou vidéo avant tout paiement</li><li>✓ Contrat + reçu Wave / Orange Money</li><li>✓ État des lieux + remise des clés 7j/7</li><li>✓ Assistance WhatsApp pendant tout le séjour : {CONTACT.phones[0]}</li></ul>
              </div>
            </div>
            <div>
              <div className="lg:sticky lg:top-24 rounded-3xl border bg-slate-50/60 p-6">
                {p.pricePerNight ? <p><span className="text-[26px] font-extrabold">{formatFCFA(p.pricePerNight)}</span> <span className="text-slate-500">/ nuit</span></p> : null}
                {p.pricePerMonth ? <p className="mt-1"><span className="text-[26px] font-extrabold text-[#E2681B]">{formatFCFA(p.pricePerMonth)}</span> <span className="text-slate-500">/ mois</span></p> : null}
                <p className="mt-1 text-[13px] font-semibold text-emerald-700">Charges incluses · Ménage départ inclus</p>
                <a href={WHATSAPP_LINK(`Bonjour PAVA LOGEMENT, je veux réserver : ${p.title} (${p.neighborhood}). Disponible ?`)} target="_blank" className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 font-extrabold text-white hover:brightness-95"><MessageCircle size={18} /> Réserver sur WhatsApp</a>
                <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="mt-2.5 flex items-center justify-center gap-2 rounded-xl bg-[#0a3f44] py-3.5 font-extrabold text-white hover:bg-[#006b75]">Appeler : {CONTACT.phones[0]}</a>
                <div className="mt-4 rounded-2xl bg-white border p-4 text-[13px]">
                  <p className="font-bold">Paiement : Wave · Orange Money · Espèces</p>
                  <p className="mt-1 text-slate-500">Acompte 30% pour bloquer, solde aux clés avec reçu. Annulation gratuite -72h.</p>
                </div>
                <p className="mt-3 text-center text-[12px] text-slate-400">Réf : {p.slug} · Agence : {CONTACT.address}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
