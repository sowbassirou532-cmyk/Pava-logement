"use client";

import { useEffect, useState } from "react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/site";
import { Phone, Mail, MapPin, Menu, X, MessageCircle, Clock, ShieldCheck, Star, Globe, AtSign } from "lucide-react";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#accueil" className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0a3f44] to-[#006b75] shadow-lg shadow-teal-900/20 overflow-hidden">
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
          <path d="M6 20 L16 8 L26 20" stroke="#E2681B" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 20 L16 14 L21 20" stroke="#fff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
          <rect x="14.6" y="20" width="2.8" height="6" rx="1" fill="#E9B44C" />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block text-[19px] font-extrabold tracking-tight ${light ? "text-white" : "text-[#0a3f44]"}`}>
          PAVA <span className="text-[#E2681B]">LOGEMENT</span>
        </span>
        <span className={`block text-[11px] font-semibold tracking-[0.18em] uppercase mt-1 ${light ? "text-teal-100/80" : "text-slate-500"}`}>
          Dakar · Court & Long séjour
        </span>
      </span>
    </a>
  );
}

export function TopBar() {
  return (
    <div className="hidden md:block bg-[#062e32] text-[13px] text-teal-50/90">
      <div className="mx-auto max-w-7xl px-6 py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-5">
          <span className="inline-flex items-center gap-1.5"><MapPin size={14} className="text-[#E9B44C]" /> {CONTACT.address}</span>
          <span className="inline-flex items-center gap-1.5"><Clock size={14} className="text-[#E9B44C]" /> {CONTACT.hours}</span>
        </div>
        <div className="flex items-center gap-5">
          <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-white"><Phone size={14} /> {CONTACT.phones[0]}</a>
          <a href={`mailto:${CONTACT.emails[0]}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail size={14} /> {CONTACT.emails[0]}</a>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-semibold"><ShieldCheck size={13} className="text-emerald-300" /> Agence vérifiée Dakar</span>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [
    { href: "#logements", label: "Logements" },
    { href: "#sejours", label: "Court / Long séjour" },
    { href: "#gestion", label: "Gestion locative" },
    { href: "#services", label: "Services" },
    { href: "#apropos", label: "À propos" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className={`sticky top-0 z-50 transition-all ${scrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(6,46,50,0.12)]" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Logo />
        <nav className="hidden lg:flex items-center gap-1 text-[14px] font-semibold text-slate-700">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-2 rounded-full hover:bg-teal-50 hover:text-[#006b75] transition">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href={WHATSAPP_LINK("Bonjour PAVA LOGEMENT, je cherche un logement à Dakar. Pouvez-vous m'aider ?")}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[14px] font-bold text-white shadow-lg shadow-green-600/20 hover:brightness-95 transition"
          >
            <MessageCircle size={17} /> WhatsApp
          </a>
          <a
            href="#logements"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a3f44] px-5 py-2.5 text-[14px] font-bold text-white hover:bg-[#006b75] transition"
          >
            Réserver
          </a>
        </div>
        <button onClick={() => setOpen(!open)} className="lg:hidden grid h-11 w-11 place-items-center rounded-xl bg-slate-100" aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t bg-white px-6 py-4 space-y-1 shadow-xl">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 font-semibold text-slate-800 hover:bg-teal-50">
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <a href={WHATSAPP_LINK("Bonjour PAVA LOGEMENT")} target="_blank" className="flex-1 text-center rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white">WhatsApp</a>
            <a href="#logements" onClick={() => setOpen(false)} className="flex-1 text-center rounded-xl bg-[#0a3f44] px-4 py-3 font-bold text-white">Réserver</a>
          </div>
          <p className="pt-3 text-center text-[13px] text-slate-500">{CONTACT.phones.join(" · ")}</p>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#062e32] text-teal-50/90">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 text-[14px] leading-relaxed text-teal-50/70">
            Plateforme de gestion et location d'hébergements à Dakar. Appartements, studios, duplex, chambres, villas et maisons — vérifiés, meublés, sécurisés.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-bold"><Star size={14} className="text-amber-300" /> 4.8/5 · 480+ avis</span>
          </div>
          <div className="mt-4 flex gap-2">
            {[
              { icon: Globe, href: "https://facebook.com/pavalogement", label: "Facebook" },
              { icon: AtSign, href: "https://instagram.com/pavalogement", label: "Instagram" },
            ].map((s, i) => (
              <a key={i} href={s.href} target="_blank" aria-label={s.label} className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-[#E2681B] transition">
                <s.icon size={18} />
              </a>
            ))}
            <a href="https://tiktok.com/@pavalogement" target="_blank" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-[#E2681B] transition font-extrabold text-[14px]">TT</a>
          </div>
        </div>
        <div>
          <h4 className="font-extrabold text-white tracking-tight">Nos offres</h4>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li><a href="#logements" className="hover:text-white">Court séjour (nuitée)</a></li>
            <li><a href="#logements" className="hover:text-white">Location longue durée</a></li>
            <li><a href="#gestion" className="hover:text-white">Gestion locative propriétaires</a></li>
            <li><a href="#services" className="hover:text-white">Conciergerie & ménage</a></li>
            <li><a href="#services" className="hover:text-white">Accueil aéroport</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-extrabold text-white tracking-tight">Quartiers desservis</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-[14px]">
            {["Médina", "Plateau", "Mermoz", "Almadies", "Ngor", "Ouakam", "Yoff", "Sacré-Cœur"].map((q) => (
              <li key={q}><a href="#logements" className="hover:text-white">{q}</a></li>
            ))}
          </ul>
          <div className="mt-4 rounded-2xl bg-white/5 p-3 text-[13px] leading-relaxed border border-white/10">
            <p className="font-bold text-white">Paiements acceptés</p>
            <p className="mt-1 flex flex-wrap gap-1.5">
              <span className="rounded-full bg-[#0033A0]/80 px-2.5 py-1 font-bold text-white">Wave</span>
              <span className="rounded-full bg-[#FF7900] px-2.5 py-1 font-bold text-white">Orange Money</span>
              <span className="rounded-full bg-white/15 px-2.5 py-1 font-bold">Espèces</span>
            </p>
          </div>
        </div>
        <div>
          <h4 className="font-extrabold text-white tracking-tight">Contact direct</h4>
          <ul className="mt-4 space-y-3 text-[14px]">
            <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-[#E9B44C]" /> {CONTACT.address}</li>
            <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0 text-[#E9B44C]" /> <span>{CONTACT.phones[0]}<br />{CONTACT.phones[1]}</span></li>
            <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0 text-[#E9B44C]" /> <span>{CONTACT.emails[0]}<br />{CONTACT.emails[1]}</span></li>
          </ul>
          <a href={WHATSAPP_LINK("Bonjour, je veux réserver un logement")} target="_blank" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white hover:brightness-95">
            <MessageCircle size={18} /> Discuter sur WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[13px] text-teal-50/60">
          <p>© 2026 PAVA LOGEMENT · Dakar, Sénégal — Tous droits réservés. Fondée par {CONTACT.founder}.</p>
          <p>Charges incluses : eau · électricité · Wi-Fi · ménage départ · gardiennage</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 2500);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div className="max-w-[240px] rounded-2xl rounded-br-md bg-white p-3.5 text-[13px] shadow-2xl border animate-fade-up">
        <p className="font-bold text-slate-900">Besoin d'un logement ce soir ?</p>
        <p className="mt-1 text-slate-600">Réponse en ~5 min sur WhatsApp, 7j/7.</p>
      </div>
      <a
        href={WHATSAPP_LINK("Bonjour PAVA LOGEMENT, je cherche un logement disponible rapidement à Dakar.")}
        target="_blank"
        className="group grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.5)] hover:scale-105 transition"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} />
        <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#E2681B] text-[11px] font-bold">1</span>
      </a>
    </div>
  );
}
