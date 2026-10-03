export const CONTACT = {
  brand: "PAVA LOGEMENT",
  tagline: "Se loger à Dakar, sans stress.",
  phones: ["+221 78 293 16 67", "+221 76 358 02 42"],
  whatsapp: "221782931667",
  emails: ["pavalogement@gmail.com", "sowbachir293@gmail.com"],
  address: "Médina Rue 6 x Angle 17, Dakar — Sénégal",
  hours: "Lun – Sam · 8h30 – 20h00 · Urgences 7j/7",
  site: "https://pava-logement.netlify.app",
  founder: "Bassirou Sow",
};

export const WHATSAPP_LINK = (msg: string) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export function formatFCFA(n: number | null | undefined) {
  if (!n || n === 0) return "—";
  return new Intl.NumberFormat("fr-SN").format(n) + " FCFA";
}

export const TYPE_LABELS: Record<string, string> = {
  appartement: "Appartement",
  studio: "Studio",
  duplex: "Duplex",
  chambre: "Chambre",
  villa: "Villa",
  maison: "Maison",
};

export const STAY_LABELS: Record<string, string> = {
  court: "Court séjour",
  long: "Long séjour",
  both: "Court & long séjour",
};

export const QUARTIERS = [
  "Médina",
  "Plateau",
  "Mermoz",
  "Almadies",
  "Ngor",
  "Ouakam",
  "Yoff",
  "Sacré-Cœur",
  "Keur Massar",
];

export type PropertyDTO = {
  id: string;
  title: string;
  slug: string;
  type: string;
  stayType: string;
  neighborhood: string;
  address: string | null;
  pricePerNight: number | null;
  pricePerMonth: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  surfaceM2: number | null;
  maxGuests: number | null;
  description: string | null;
  amenities: string[];
  images: string[];
  isAvailable: boolean | null;
  isFeatured: boolean | null;
  rating: number | null;
  reviewsCount: number | null;
};
