
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  MessageCircle,
  Clock,
  Home,
} from "lucide-react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/site";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.1V2h-3.44v13.67a2.9 2.9 0 0 1-2.9 2.9 2.9 2.9 0 1 1 2.9-2.9c0-.2-.02-.4-.06-.59V11.5a6.34 6.34 0 1 0 3.5 5.67V9.99a8.16 8.16 0 0 0 4.77 1.53V8.09a4.84 4.84 0 0 1-1-.1Z" />
    </svg>
  );
}

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
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
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.5c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.2H7.3V13h2.8v8h3.4Z" />
    </svg>
  );
}

function LinkedInIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M5.2 3a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4ZM3.3 9h3.8v12H3.3V9Zm6.1 0H13v1.6h.1c.5-.9 1.7-2 3.6-2 3.9 0 4.6 2.5 4.6 5.7V21h-3.8v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.4V9Z" />
    </svg>
  );
}

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="Pava Logement - Accueil"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white">
        <Home size={24} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-xl font-extrabold tracking-tight text-slate-900">
          Pava <span className="text-emerald-700">Logement</span>
        </span>
        <span className="text-xs text-slate-500">
          Trouvez votre prochain logement
        </span>
      </span>
    </Link>
  );
}

export function TopBar() {
  return (
    <div className="hidden bg-emerald-950 text-sm text-white md:block">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 lg:px-8">
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
            className="flex items-center gap-2 hover:text-emerald-200"
          >
            <Phone size={15} />
            <span>{CONTACT.phones[0]}</span>
          </a>
          <a
            href={`mailto:${CONTACT.emails[0]}`}
            className="flex items-center gap-2 hover:text-emerald-200"
          >
            <Mail size={15} />
            <span>{CONTACT.emails[0]}</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={15} />
          <span>Dakar, Sénégal</span>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/#logements", label: "Nos logements" },
    { href: "/#comment-ca-marche", label: "Comment ça marche" },
    { href: "/#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 transition hover:text-emerald-700"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={WHATSAPP_LINK("Bonjour, je souhaite contacter Pava Logement.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            <MessageCircle size={17} />
            Nous contacter
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 md:hidden"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={WHATSAPP_LINK("Bonjour, je souhaite contacter Pava Logement.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white"
            >
              <MessageCircle size={17} />
              Nous contacter sur WhatsApp
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/pavalogement",
      icon: <InstagramIcon size={20} />,
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@pavalogementsn",
      icon: <TikTokIcon size={20} />,
    },
    {
      name: "Facebook",
      href: "https://web.facebook.com/profile.php?id=61592014130890",
      icon: <FacebookIcon size={20} />,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/146758061",
      icon: <LinkedInIcon size={20} />,
    },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="mb-4 inline-block rounded-xl bg-white p-2">
            <Logo />
          </div>
          <p className="max-w-sm text-sm leading-6 text-slate-400">
            Pava Logement vous accompagne dans votre recherche de logement à
            Dakar et dans les quartiers environnants.
          </p>
          <div className="mt-5 flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                title={social.name}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-emerald-500 hover:bg-emerald-700 hover:text-white"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Navigation</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-emerald-400">
                Accueil
              </Link>
            </li>
            <li>
              <Link href="/#logements" className="hover:text-emerald-400">
                Nos logements
              </Link>
            </li>
            <li>
              <Link
                href="/#comment-ca-marche"
                className="hover:text-emerald-400"
              >
                Comment ça marche
              </Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-emerald-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>{CONTACT.address}</span>
            </li>
            {CONTACT.phones.map((phone) => (
              <li key={phone} className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-emerald-400" />
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="hover:text-emerald-400"
                >
                  {phone}
                </a>
              </li>
            ))}
            {CONTACT.emails.map((email) => (
              <li key={email} className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-emerald-400" />
                <a
                  href={`mailto:${email}`}
                  className="break-all hover:text-emerald-400"
                >
                  {email}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">Nos engagements</h3>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <Clock size={17} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Un accompagnement réactif</span>
            </li>
            <li className="flex items-start gap-2">
              <Home size={17} className="mt-0.5 shrink-0 text-emerald-400" />
              <span>Des logements présentés avec soin</span>
            </li>
            <li>Un service adapté à vos besoins</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© {currentYear} {CONTACT.brand}. Tous droits réservés.</p>
          <p>Dakar, Sénégal</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_LINK("Bonjour, je souhaite contacter Pava Logement.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacter Pava Logement sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
    >
      <MessageCircle size={28} />
    </a>
  );
}
