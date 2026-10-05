"use client";

import { useEffect, useState } from "react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/site";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  MessageCircle,
  Clock,
  Globe2,
} from "lucide-react";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M7.03.084c-1.277.06-2.149.264-2.91.563a5.9 5.9 0 0 0-2.124 1.388a5.9 5.9 0 0 0-1.38 2.127C.321 4.926.12 5.8.064 7.076s-.069 1.688-.063 4.947s.021 3.667.083 4.947c.061 1.277.264 2.149.563 2.911c.308.789.72 1.457 1.388 2.123a5.9 5.9 0 0 0 2.129 1.38c.763.295 1.636.496 2.913.552c1.278.056 1.689.069 4.947.063s3.668-.021 4.947-.082c1.28-.06 2.147-.265 2.91-.563a5.9 5.9 0 0 0 2.123-1.388a5.9 5.9 0 0 0 1.38-2.129c.295-.763.496-1.636.551-2.912c.056-1.28.07-1.69.063-4.948c-.006-3.258-.02-3.667-.081-4.947c-.06-1.28-.264-2.148-.564-2.911a5.9 5.9 0 0 0-1.387-2.123a5.9 5.9 0 0 0-2.128-1.38c-.764-.294-1.636-.496-2.914-.55C15.647.009 15.236-.006 11.977 0S8.31.021 7.03.084m.14 21.693c-1.17-.05-1.805-.245-2.228-.408a3.7 3.7 0 0 1-1.382-.895a3.7 3.7 0 0 1-.9-1.378c-.165-.423-.363-1.058-.417-2.228c-.06-1.264-.072-1.644-.08-4.848c-.006-3.204.006-3.583.061-4.848c.05-1.169.246-1.805.408-2.228c.216-.561.477-.96.895-1.382a3.7 3.7 0 0 1 1.379-.9c.423-.165 1.057-.361 2.227-.417c1.265-.06 1.644-.072 4.848-.08c3.203-.006 3.583.006 4.85.062c1.168.05 1.804.244 2.227.408c.56.216.96.475 1.382.895s.681.817.9 1.378c.165.422.362 1.056.417 2.227c.06 1.265.074 1.645.08 4.848c.005 3.203-.006 3.583-.061 4.848c-.051 1.17-.245 1.805-.408 2.23c-.216.56-.477.96-.896 1.38a3.7 3.7 0 0 1-1.378.9c-.422.165-1.058.362-2.226.418c-1.266.06-1.645.072-4.85.079s-3.582-.006-4.848-.06m9.783-16.192a1.44 1.44 0 1 0 1.437-1.442a1.44 1.44 0 0 0-1.437 1.442M5.839 12.012a6.161 6.161 0 1 0 12.323-.024a6.162 6.162 0 0 0-12.323.024M8 12.008A4 4 0 1 1 12.008 16A4 4 0 0 1 8 12.008" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a9 9 0 0 1 1.141.195v3.325a9 9 0 0 0-.653-.036a27 27 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.7 1.7 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103l-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#accueil" className="flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0a3f44] to-[#006b75] shadow-lg shadow-teal-900/20 overflow-hidden">
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
          <path
            d="M6 20 L16 8 L26 20"
            stroke="#E2681B"
            strokeWidth={3.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11 20 L16 14 L21 20"
            stroke="#fff"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="14.6"
            y="20"
            width="2.8"
            height="6"
            rx="1"
            fill="#E9B44C"
          />
        </svg>
      </span>

      <span className="leading-none">
        <span
          className={`block text-[19px] font-extrabold tracking-tight ${
            light ? "text-white" : "text-[#0a3f44]"
          }`}
        >
          PAVA <span className="text-[#E2681B]">LOGEMENT</span>
        </span>

        <span
          className={`block text-[11px] font-semibold tracking-[0.18em] uppercase mt-1 ${
            light ? "text-teal-100/80" : "text-slate-500"
          }`}
        >
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
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} className="text-[#E9B44C]" />
            {CONTACT.address}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} className="text-[#E9B44C]" />
            {CONTACT.hours}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 hover:text-white"
          >
            <Phone size={14} />
            {CONTACT.phones[0]}
          </a>

          <a
            href={`mailto:${CONTACT.emails[0]}`}
            className="inline-flex items-center gap-1.5 hover:text-white"
          >
            <Mail size={14} />
            {CONTACT.emails[0]}
          </a>
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
    { href: "#gestion", label: "Propriétaires" },
    { href: "#services", label: "Services" },
    { href: "#apropos", label: "À propos" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(6,46,50,0.12)]"
          : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1 text-[14px] font-semibold text-slate-700">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-full hover:bg-teal-50 hover:text-[#006b75] transition"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href={WHATSAPP_LINK(
              "Bonjour PAVA LOGEMENT, je cherche un logement à Dakar. Pouvez-vous m'aider ?"
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-[14px] font-bold text-white shadow-lg shadow-green-600/20 hover:brightness-95 transition"
          >
            <MessageCircle size={17} />
            WhatsApp
          </a>

          <a
            href="#logements"
            className="inline-flex items-center gap-2 rounded-full bg-[#0a3f44] px-5 py-2.5 text-[14px] font-bold text-white hover:bg-[#006b75] transition"
          >
            Voir les logements
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden grid h-11 w-11 place-items-center rounded-xl bg-slate-100"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t bg-white px-6 py-4 space-y-1 shadow-xl">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 font-semibold text-slate-800 hover:bg-teal-50"
            >
              {l.label}
            </a>
          ))}

          <div className="flex gap-2 pt-3">
            <a
              href={WHATSAPP_LINK("Bonjour PAVA LOGEMENT")}
              target="_blank"
              rel="noreferrer"
              className="flex-1 text-center rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white"
            >
              WhatsApp
            </a>

            <a
              href="#logements"
              onClick={() => setOpen(false)}
              className="flex-1 text-center rounded-xl bg-[#0a3f44] px-4 py-3 font-bold text-white"
            >
              Logements
            </a>
          </div>

          <p className="pt-3 text-center text-[13px] text-slate-500">
            {CONTACT.phones.join(" · ")}
          </p>
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
            Plateforme de mise en relation pour la recherche et la proposition
            de logements à Dakar.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <a
              href="https://www.instagram.com/pavalogement"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram PAVA LOGEMENT"
              title="Instagram"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-[#E1306C] transition"
            >
              <InstagramIcon size={19} />
            </a>

            <a
              href="https://www.tiktok.com/@pavalogementsn"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok PAVA LOGEMENT"
              title="TikTok"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-black transition"
            >
              <TikTokIcon size={19} />
            </a>

            <a
              href="https://web.facebook.com/profile.php?id=61592014130890"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook PAVA LOGEMENT"
              title="Facebook"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-[#1877F2] transition"
            >
              <FacebookIcon size={19} />
            </a>

            <a
              href="/"
              aria-label="Site officiel PAVA LOGEMENT"
              title="Site officiel"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white hover:bg-[#E2681B] transition"
            >
              <Globe2 size={19} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-extrabold text-white tracking-tight">
            Navigation
          </h4>

          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li>
              <a href="#logements" className="hover:text-white">
                Court séjour
              </a>
            </li>

            <li>
              <a href="#logements" className="hover:text-white">
                Location longue durée
              </a>
            </li>

            <li>
              <a href="#gestion" className="hover:text-white">
                Proposer un logement
              </a>
            </li>

            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-white tracking-tight">
            Quartiers dans les filtres
          </h4>

          <ul className="mt-4 grid grid-cols-2 gap-2 text-[14px]">
            {[
              "Médina",
              "Plateau",
              "Mermoz",
              "Almadies",
              "Ngor",
              "Ouakam",
              "Yoff",
              "Sacré-Cœur",
              "Keur Massar",
            ].map((q) => (
              <li key={q}>
                <a href="#logements" className="hover:text-white">
                  {q}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-white tracking-tight">
            Contact direct
          </h4>

          <ul className="mt-4 space-y-3 text-[14px]">
            <li className="flex gap-2">
              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-[#E9B44C]"
              />
              <span>{CONTACT.address}</span>
            </li>

            <li className="flex gap-2">
              <Phone
                size={16}
                className="mt-0.5 shrink-0 text-[#E9B44C]"
              />
              <span>{CONTACT.phones.join(" · ")}</span>
            </li>

            <li className="flex gap-2">
              <Mail
                size={16}
                className="mt-0.5 shrink-0 text-[#E9B44C]"
              />
              <span>{CONTACT.emails[0]}</span>
            </li>

            <li className="flex gap-2">
              <Clock
                size={16}
                className="mt-0.5 shrink-0 text-[#E9B44C]"
              />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>

          <a
            href={WHATSAPP_LINK(
              "Bonjour, je veux discuter d'un logement."
            )}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-bold text-white hover:brightness-95"
          >
            <MessageCircle size={18} />
            Discuter sur WhatsApp
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-3 text-center text-[13px] text-teal-50/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © 2026 PAVA LOGEMENT · Dakar, Sénégal — Tous droits réservés.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <a
              href="/mentions-legales"
              className="hover:text-white transition"
            >
              Mentions légales
            </a>

            <a
              href="/politique-confidentialite"
              className="hover:text-white transition"
            >
              Politique de confidentialité
            </a>

            <a
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <Globe2 size={14} />
              Site officiel
            </a>
          </div>
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
        <p className="font-bold text-slate-900">
          Une question sur un logement ?
        </p>

        <p className="mt-1 text-slate-600">
          Écrivez-nous directement sur WhatsApp.
        </p>
      </div>

      <a
        href={WHATSAPP_LINK(
          "Bonjour PAVA LOGEMENT, je cherche un logement à Dakar."
        )}
        target="_blank"
        rel="noreferrer"
        className="group grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(37,211,102,0.5)] hover:scale-105 transition"
        aria-label="WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
