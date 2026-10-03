"use client";

import { useState } from "react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/site";
import { MapPin, CalendarDays, Users, Search, ShieldCheck, Star, BadgeCheck, Phone } from "lucide-react";

export function Hero() {
  const [quartier, setQuartier] = useState("Almadies");
  const [stay, setStay] = useState("court");
  const [budget, setBudget] = useState("250000");

  const scrollSearch = () => {
    document.getElementById("logements")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="accueil" className="relative overflow-hidden bg-[#062e32]">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8134745/pexels-photo-8134745.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt="Résidence moderne Dakar"
          className="h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062e32]/60 via-[#062e32]/72 to-[#062e32]" />
        <div className="absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full bg-[#E2681B]/25 blur-[90px]" />
        <div className="absolute top-40 -left-24 h-[300px] w-[300px] rounded-full bg-teal-400/20 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur px-3.5 py-1.5 text-[13px] font-bold text-white">
                <BadgeCheck size={15} className="text-emerald-300" /> 250+ logements gérés à Dakar
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur px-3.5 py-1.5 text-[13px] font-bold text-white">
                <Star size={14} className="fill-amber-300 text-amber-300" /> 4.8/5 · 480+ avis vérifiés
              </span>
            </div>
            <h1 className="mt-5 text-white font-extrabold tracking-tight leading-[1.05] text-[clamp(2.1rem,5.2vw,3.9rem)]">
              Trouvez votre logement idéal à Dakar,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9B44C] to-[#E2681B]">
                en quelques minutes.
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-teal-50/85">
              Appartements meublés, studios, duplex, chambres, villas & maisons — pour <strong className="text-white">court séjour</strong> comme <strong className="text-white">longue durée</strong>. Visités, propres, sécurisés, charges incluses. Réservation directe sur WhatsApp.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-teal-50/80">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-300" /> Photos réelles vérifiées</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-300" /> Wave · Orange Money · Reçu</span>
              <span className="inline-flex items-center gap-1.5"><ShieldCheck size={15} className="text-emerald-300" /> Remise des clés 7j/7</span>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#logements" className="inline-flex items-center gap-2 rounded-2xl bg-[#E2681B] px-7 py-3.5 font-extrabold text-white shadow-[0_14px_35px_rgba(226,104,27,0.4)] hover:bg-[#c85a15] hover:-translate-y-0.5 transition">
                <Search size={18} /> Voir les logements
              </a>
              <a href={WHATSAPP_LINK("Bonjour PAVA LOGEMENT, je cherche un logement à Dakar pour ces dates : ...")} target="_blank" className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-extrabold text-[#0a3f44] hover:bg-teal-50 hover:-translate-y-0.5 transition">
                <Phone size={18} /> Appeler l'agence
              </a>
            </div>
            <p className="mt-4 text-[13px] text-teal-50/60">📍 {CONTACT.address} · {CONTACT.phones.join(" / ")} · {CONTACT.hours}</p>
          </div>

          {/* Carte recherche */}
          <div className="animate-fade-up rounded-[26px] bg-white p-6 sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)]" style={{ animationDelay: "0.15s" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[18px] tracking-tight text-slate-900">Rechercher un logement</h3>
              <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-1 text-[12px] font-bold text-emerald-700">● Dispo aujourd'hui</span>
            </div>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5"><MapPin size={14} className="text-[#006b75]" /> Quartier</span>
                <select value={quartier} onChange={(e) => setQuartier(e.target.value)} className="mt-1.5 w-full rounded-xl border bg-slate-50 px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75] focus:bg-white">
                  {["Almadies", "Ngor", "Mermoz", "Plateau", "Médina", "Ouakam", "Yoff", "Sacré-Cœur", "Keur Massar"].map((q) => <option key={q}>{q}</option>)}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5"><CalendarDays size={14} className="text-[#006b75]" /> Durée</span>
                  <select value={stay} onChange={(e) => setStay(e.target.value)} className="mt-1.5 w-full rounded-xl border bg-slate-50 px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75]">
                    <option value="court">Court séjour</option>
                    <option value="long">Long séjour</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5"><Users size={14} className="text-[#006b75]" /> Budget max/mois</span>
                  <select value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-1.5 w-full rounded-xl border bg-slate-50 px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75]">
                    <option value="100000">100 000 FCFA</option>
                    <option value="180000">180 000 FCFA</option>
                    <option value="250000">250 000 FCFA</option>
                    <option value="350000">350 000 FCFA</option>
                    <option value="650000">650 000 FCFA</option>
                  </select>
                </label>
              </div>
              <button onClick={scrollSearch} className="w-full rounded-xl bg-[#0a3f44] py-3.5 font-extrabold text-white hover:bg-[#006b75] transition inline-flex items-center justify-center gap-2">
                <Search size={18} /> Lancer la recherche à {quartier}
              </button>
              <a href={WHATSAPP_LINK(`Bonjour, je cherche un logement à ${quartier} en ${stay === "court" ? "court séjour" : "longue durée"}, budget max ${budget} FCFA/mois.`)} target="_blank" className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 py-3 font-extrabold text-[#128C4B] hover:bg-[#25D366] hover:text-white transition">
                Demande express sur WhatsApp
              </a>
              <p className="text-center text-[12px] text-slate-400">Estimation gratuite · Sans engagement · Réponse en 5 min</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { v: "250+", l: "Logements gérés" },
            { v: "4 800+", l: "Séjours réussis" },
            { v: "4.8/5", l: "Note moyenne vérifiée" },
            { v: "9", l: "Quartiers couverts à Dakar" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur px-5 py-4 text-center">
              <p className="text-[24px] font-extrabold text-white">{s.v}</p>
              <p className="text-[13px] font-medium text-teal-50/70">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bandeau confiance */}
      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-3.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] font-semibold text-teal-50/75">
          <span>✓ Eau + Électricité incluses</span>
          <span>✓ Wi-Fi fibre + Canal+</span>
          <span>✓ Gardiennage 24h/24</span>
          <span>✓ Ménage départ inclus</span>
          <span>✓ Bail & reçu pour longue durée</span>
        </div>
      </div>
    </section>
  );
}
