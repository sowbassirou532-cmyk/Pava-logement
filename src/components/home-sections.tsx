"use client";

import { useState } from "react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/site";
import {
  MoonStar, KeyRound, FileCheck, Building2, HandCoins, Camera, BrushCleaning,
  Plane, ShieldCheck, ChevronDown, Star, Quote, BadgeCheck, Clock, Wallet, ArrowRight, CheckCircle2
} from "lucide-react";

export function StayModes() {
  return (
    <section id="sejours" className="mx-auto max-w-7xl px-4 sm:px-6 py-12 scroll-mt-24">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a3f44] p-8 text-white">
          <MoonStar size={120} className="absolute -right-6 -top-6 opacity-10" />
          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#E9B44C]">Court séjour · Type Airbnb</p>
          <h3 className="mt-2 text-[26px] font-extrabold tracking-tight leading-tight">Nuitée flexible, arrivée même le soir</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-teal-50/80">Chambres dès 12 000 FCFA/nuit, studios et appartements meublés avec check-in 7j/7, accueil aéroport, draps + serviettes fournis, ménage inclus. Idéal vacances, missions, escales, Tabaski & Magal.</p>
          <ul className="mt-4 space-y-2 text-[14px] font-medium">
            {["Remise des clés en main propre, 7j/7 jusqu'à 23h", "Paiement Wave / Orange Money avec reçu instantané", "Ménage + changement de linge 2x/semaine"].map((x, i) => (
              <li key={i} className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-emerald-300" /> {x}</li>
            ))}
          </ul>
          <a href="#logements" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-extrabold text-[#0a3f44] hover:bg-teal-50 transition">Voir les courts séjours <ArrowRight size={17} /></a>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-white border p-8">
          <KeyRound size={120} className="absolute -right-6 -top-6 opacity-[0.06]" />
          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#E2681B]">Longue durée · 6 mois à 3 ans</p>
          <h3 className="mt-2 text-[26px] font-extrabold tracking-tight text-[#0a3f44] leading-tight">Bail clair, loyer stable, zéro surprise</h3>
          <p className="mt-3 text-[14px] leading-relaxed text-slate-600">Appartements, maisons et villas pour s'installer à Dakar : visite accompagnée, dossier simple (pièce + avance), bail écrit + état des lieux, SAV dépannage sous 48h.</p>
          <ul className="mt-4 space-y-2 text-[14px] font-medium text-slate-700">
            {["Caution encadrée + état des lieux avec photos", "Loyer avec charges : eau, électricité, Wi-Fi, gardien", "Accompagnement emménagement (Woyofal, fibre, transport)"].map((x, i) => (
              <li key={i} className="flex gap-2"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#006b75]" /> {x}</li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a href="#logements" className="inline-flex items-center gap-2 rounded-xl bg-[#0a3f44] px-6 py-3 font-extrabold text-white hover:bg-[#006b75] transition">Voir les longues durées <ArrowRight size={17} /></a>
            <a href={WHATSAPP_LINK("Bonjour, je cherche une location longue durée à Dakar. Budget : ... Quartier : ...")} target="_blank" className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0a3f44] px-6 py-3 font-extrabold text-[#0a3f44] hover:bg-[#0a3f44] hover:text-white transition">Être accompagné</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GestionLocative() {
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", propertyType: "Appartement", neighborhood: "Almadies", address: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/owner-leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) setSent(true);
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="gestion" className="bg-white border-y scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-100 px-3.5 py-1.5 text-[13px] font-bold text-[#b34a0e]"><Building2 size={15} /> Propriétaires · Rentabilité sans gestion</p>
          <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-[#0a3f44] leading-tight">Confiez-nous votre bien, touchez vos loyers chaque mois.</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">PAVA LOGEMENT gère tout : photos pro, annonce, sélection des locataires, contrats, encaissements Wave/OM, ménage, maintenance et reversement mensuel avec relevé. Vous suivez tout sur WhatsApp.</p>
          <div className="mt-6 grid sm:grid-cols-3 gap-3">
            {[
              { t: "8% – 12%", d: "Commission selon formule, sans frais cachés" },
              { t: "+32%", l: "Revenu moyen en court séjour vs vide", d: "Optimisation tarifaire nuit/mois" },
              { t: "48h", d: "Mise en location express après visite" },
            ].map((s: any, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 border p-4 text-center">
                <p className="text-[22px] font-extrabold text-[#0a3f44]">{s.t || s.l}</p>
                <p className="mt-1 text-[13px] text-slate-500 leading-snug">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {[
              { icon: Camera, t: "Mise en valeur pro", d: "Shooting, annonce optimisée, diffusion + réseau PAVA." },
              { icon: FileCheck, t: "Sélection & contrats", d: "Vérification identité, bail, état des lieux, caution sécurisée." },
              { icon: HandCoins, t: "Loyers garantis & reversés", d: "Encaissement Wave/OM/espèces, relevé mensuel, reversement avant le 10." },
              { icon: BrushCleaning, t: "Entretien & conciergerie", d: "Ménage, linge, petites réparations, gardiennage coordonné." },
            ].map((s, i) => (
              <div key={i} className="flex gap-3.5 rounded-2xl border bg-white p-4 shadow-sm">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-[#006b75]"><s.icon size={20} /></span>
                <div><p className="font-extrabold text-[15px]">{s.t}</p><p className="text-[13px] text-slate-500">{s.d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:sticky lg:top-24 rounded-3xl bg-[#062e32] p-7 sm:p-8 text-white shadow-2xl">
          <h3 className="text-[20px] font-extrabold tracking-tight">Estimation gratuite de votre loyer</h3>
          <p className="mt-1.5 text-[14px] text-teal-50/70">Réponse sous 24h avec potentiel court + long séjour.</p>
          {!sent ? (
            <form onSubmit={submit} className="mt-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input required placeholder="Nom complet *" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] placeholder:text-teal-50/40 outline-none focus:border-[#E9B44C]" />
                <input required placeholder="Téléphone *" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] placeholder:text-teal-50/40 outline-none focus:border-[#E9B44C]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={form.propertyType} onChange={(e) => setForm({ ...form, propertyType: e.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none focus:border-[#E9B44C] [&>option]:text-slate-900">
                  {["Appartement", "Studio", "Duplex", "Chambre", "Villa", "Maison", "Immeuble"].map((t) => <option key={t}>{t}</option>)}
                </select>
                <select value={form.neighborhood} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })} className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none focus:border-[#E9B44C] [&>option]:text-slate-900">
                  {["Almadies", "Ngor", "Mermoz", "Plateau", "Médina", "Ouakam", "Yoff", "Sacré-Cœur", "Autre"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <input placeholder="Adresse du bien (optionnel)" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] placeholder:text-teal-50/40 outline-none focus:border-[#E9B44C]" />
              <textarea placeholder="Décrivez votre bien : pièces, meublé ?, dispo quand ?" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] placeholder:text-teal-50/40 outline-none focus:border-[#E9B44C]" />
              <button disabled={sending} className="w-full rounded-xl bg-[#E2681B] py-3.5 font-extrabold hover:bg-[#c85a15] transition disabled:opacity-60">{sending ? "Envoi…" : "Recevoir mon estimation gratuite"}</button>
              <p className="text-center text-[12px] text-teal-50/50">Sans engagement · Vos données restent confidentielles</p>
            </form>
          ) : (
            <div className="mt-5 rounded-2xl bg-emerald-400/10 border border-emerald-300/30 p-6 text-center">
              <p className="text-[26px]">🎉</p>
              <p className="font-extrabold text-[17px]">Demande bien reçue, {form.fullName.split(" ")[0]} !</p>
              <p className="mt-1.5 text-[14px] text-teal-50/75">Un expert PAVA vous appelle sous 24h pour estimer votre bien à {form.neighborhood}.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const items = [
    { icon: BrushCleaning, t: "Ménage & blanchisserie", d: "Ménage pro avant chaque arrivée, linge frais, réassort consommables." },
    { icon: Plane, t: "Accueil aéroport LSS", d: "Prise en charge à l'arrivée, navette climatisée, remise des clés même à 2h du matin." },
    { icon: Wallet, t: "Paiement flexible", d: "Wave, Orange Money, espèces. Acompte 30%, solde aux clés, reçu systématique." },
    { icon: ShieldCheck, t: "Sécurité 24h/24", d: "Résidences gardiennées, serrures sécurisées, assistance 7j/7 sur WhatsApp." },
    { icon: Clock, t: "Check-in / Check-out flexibles", d: "Early check-in, late check-out et consigne bagages selon dispo." },
    { icon: FileCheck, t: "Contrats & factures", d: "Contrat de séjour, bail longue durée, factures pour entreprises & ONG." },
  ];
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 sm:px-6 py-14 scroll-mt-24">
      <div className="text-center max-w-2xl mx-auto">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-3.5 py-1.5 text-[13px] font-bold text-[#006b75]">Nos services inclus</p>
        <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-[#0a3f44]">Bien plus qu'une simple location</h2>
        <p className="mt-2 text-slate-600 text-[15px]">Une expérience hôtelière avec la chaleur de l'accueil sénégalais — teranga garantie.</p>
      </div>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((s, i) => (
          <div key={i} className="rounded-3xl bg-white border p-6 hover:shadow-[0_18px_45px_rgba(6,46,50,0.1)] hover:-translate-y-1 transition">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0a3f44] to-[#006b75] text-white shadow-lg"><s.icon size={22} /></span>
            <h3 className="mt-4 font-extrabold text-[16px]">{s.t}</h3>
            <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  const [open, setOpen] = useState(false);
  return (
    <section id="apropos" className="bg-[#f3ece0]/60 border-y scroll-mt-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-14 text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white border px-3.5 py-1.5 text-[13px] font-bold text-[#006b75]"><BadgeCheck size={15} /> À propos · Fondée à Dakar par {CONTACT.founder}</p>
        <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-[#0a3f44]">Se loger ne devrait pas être un parcours du combattant.</h2>
        <p className="mx-auto mt-3 max-w-3xl text-[16px] leading-relaxed text-slate-600">
          Après des expériences en France et en Allemagne où tout se fait en quelques clics, notre fondateur a voulu apporter la même fluidité au Sénégal : <strong>annonces transparentes, prix affichés, contrats clairs, paiement tracé.</strong>
        </p>
        <button onClick={() => setOpen(!open)} className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#0a3f44] px-6 py-2.5 font-bold text-[#0a3f44] hover:bg-[#0a3f44] hover:text-white transition">
          {open ? "Masquer notre histoire" : "En savoir plus sur notre histoire"} <ChevronDown size={17} className={`transition ${open ? "rotate-180" : ""}`} />
        </button>
        {open && (
          <div className="mt-7 grid md:grid-cols-2 gap-4 text-left animate-fade-up">
            {[
              { t: "Une expertise digitale unique", d: "Plateforme moderne, photos réelles, réservation WhatsApp en 5 minutes. Fini les journées perdues dans les agences physiques." },
              { t: "La rigueur administrative", d: "Bail écrit, état des lieux avec photos, reçus Wave/OM à chaque paiement. Une sécurité inédite pour locataires et propriétaires." },
              { t: "Des solutions pour tous budgets", d: "Chambre à 12 000 FCFA/nuit pour les petits budgets, villa avec piscine pour les familles — même exigence de propreté partout." },
              { t: "Un accompagnement humain", d: "Équipe joignable 7j/7 par téléphone et WhatsApp, accueil aéroport, conseils quartiers, aide emménagement." },
            ].map((c, i) => (
              <div key={i} className="rounded-2xl bg-white border-l-4 border-l-[#E2681B] border p-5 shadow-sm">
                <p className="font-extrabold text-[#0a3f44]">{c.t}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">{c.d}</p>
              </div>
            ))}
            <p className="md:col-span-2 rounded-2xl bg-[#0a3f44] p-5 text-center font-bold text-white">Rejoignez 4 800+ voyageurs et résidents qui nous font confiance à Dakar. <a className="underline text-[#E9B44C]" href="#logements">Voir les logements →</a></p>
          </div>
        )}
        <div className="mt-8 grid grid-cols-3 gap-3 max-w-2xl mx-auto">
          {[["Médina Rue 6x17", "Siège agence"], ["7j/7", "Disponibilité"], ["100%", "Annonces vérifiées"]].map((s, i) => (
            <div key={i} className="rounded-2xl bg-white border px-4 py-4"><p className="font-extrabold text-[#0a3f44]">{s[0]}</p><p className="text-[13px] text-slate-500">{s[1]}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const avis = [
    { n: "Aïssatou D.", o: "Dakar · Long séjour", t: "Appartement conforme aux photos, bail clair, gardien adorable. L'équipe a même aidé pour la fibre. Je recommande les yeux fermés.", s: 5 },
    { n: "Julien M.", o: "Paris · Mission 3 semaines", t: "Arrivée à 23h, clés remises à l'aéroport, studio impeccable au Plateau. Paiement Wave avec reçu, très pro. Mieux qu'Airbnb.", s: 5 },
    { n: "Fatou & Moussa", o: "Vacances en famille", t: "Villa avec piscine à Ngor pour 8 personnes. Ménage parfait, gardien discret. Les enfants veulent déjà revenir !", s: 5 },
    { n: "Ibrahima S.", o: "Propriétaire Mermoz", t: "Ils gèrent mon F3 depuis 1 an : photos pro, locataires sérieux, loyer reversé avant le 10 chaque mois avec relevé. Zéro stress.", s: 5 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-100 px-3.5 py-1.5 text-[13px] font-bold text-amber-800"><Star size={14} className="fill-amber-400 text-amber-400" /> 4.8/5 sur 480+ avis</p>
          <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-[#0a3f44]">Ils nous font confiance</h2>
        </div>
        <a href={WHATSAPP_LINK("Bonjour, je veux laisser un avis / réserver comme ces clients")} target="_blank" className="inline-flex items-center gap-2 font-bold text-[#006b75] hover:underline">Devenir le prochain avis 5★ <ArrowRight size={16} /></a>
      </div>
      <div className="mt-7 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {avis.map((a, i) => (
          <figure key={i} className="flex flex-col rounded-3xl bg-white border p-6 shadow-sm hover:shadow-lg transition">
            <Quote size={26} className="text-[#E2681B]/30" />
            <div className="mt-2 flex gap-0.5">{Array.from({ length: a.s }).map((_, j) => <Star key={j} size={15} className="fill-amber-400 text-amber-400" />)}</div>
            <blockquote className="mt-2.5 flex-1 text-[14px] leading-relaxed text-slate-700">“{a.t}”</blockquote>
            <figcaption className="mt-4 border-t pt-3"><p className="font-extrabold text-[14px]">{a.n}</p><p className="text-[13px] text-slate-500">{a.o}</p></figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const FAQS = [
  { q: "Quels sont les modes de paiement acceptés ?", a: "Wave, Orange Money et espèces à la remise des clés. Chaque versement donne lieu à un reçu écrit (photo WhatsApp + papier). Acompte de 30% pour bloquer vos dates en court séjour, solde à l'arrivée." },
  { q: "Les charges sont-elles incluses ?", a: "Oui. L'eau, l'électricité, le Wi-Fi fibre et le ménage de départ sont inclus dans tous nos tarifs affichés. Pas de surprise à l'arrivée — c'est notre engagement transparence." },
  { q: "Quelle est la différence entre court et long séjour ?", a: "Court séjour : à la nuit, meublé tout inclus, idéal vacances/missions (12 000 à 75 000 FCFA/nuit). Long séjour : au mois avec bail de 6 mois à 3 ans, parfait pour s'installer (90 000 à 650 000 FCFA/mois)." },
  { q: "Puis-je visiter avant de payer ?", a: "Absolument. Visite physique 7j/7 avec un agent, ou visite vidéo en direct sur WhatsApp si vous êtes à l'étranger. Nous ne demandons jamais de paiement avant visite ou contrat." },
  { q: "Proposez-vous l'accueil à l'aéroport ?", a: "Oui. Nous venons vous chercher à l'aéroport Blaise Diagne (ou LSS), navette climatisée + remise des clés directement, même tard le soir. Prévenez-nous 24h avant." },
  { q: "Je suis propriétaire, comment confier mon bien ?", a: "Remplissez le formulaire Gestion locative ci-dessus ou écrivez-nous sur WhatsApp. Visite gratuite sous 48h, shooting photo, estimation court + long séjour, puis mise en location. Commission 8-12% seulement si loué." },
  { q: "Fournissez-vous des contrats et factures ?", a: "Oui : contrat de séjour pour le court terme, bail + état des lieux pour la longue durée, et factures pour entreprises, ONG et ambassades. Idéal pour notes de frais et visas." },
  { q: "Que se passe-t-il en cas d'annulation ?", a: "Annulation gratuite jusqu'à 72h avant l'arrivée (remboursement intégral de l'acompte). Passé ce délai, l'acompte est conservé ou reporté une fois sans frais." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="mx-auto max-w-4xl px-4 sm:px-6 pb-14 scroll-mt-24">
      <div className="text-center">
        <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-extrabold tracking-tight text-[#0a3f44]">Questions fréquentes</h2>
        <p className="mt-2 text-slate-600 text-[15px]">Tout ce qu'il faut savoir avant de réserver. Une autre question ? <a className="font-bold text-[#006b75] underline" target="_blank" href={WHATSAPP_LINK("Bonjour, j'ai une question : ...")}>WhatsApp direct</a></p>
      </div>
      <div className="mt-7 space-y-3">
        {FAQS.map((f, i) => (
          <div key={i} className={`overflow-hidden rounded-2xl border bg-white transition ${open === i ? "shadow-lg border-[#006b75]/30" : "shadow-sm"}`}>
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left font-extrabold text-[15px] text-slate-900">
              {f.q}
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${open === i ? "bg-[#0a3f44] text-white" : "bg-slate-100"}`}><ChevronDown size={17} className={`transition ${open === i ? "rotate-180" : ""}`} /></span>
            </button>
            {open === i && <p className="px-5 pb-5 text-[14px] leading-relaxed text-slate-600 animate-fade-up">{f.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
