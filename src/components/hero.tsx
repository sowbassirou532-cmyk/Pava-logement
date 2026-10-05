"use client";

import { useState } from "react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/site";
import {
  MapPin,
  CalendarDays,
  Search,
  ShieldCheck,
  MessageCircle,
  WalletCards,
} from "lucide-react";

export function Hero() {
  const [quartier, setQuartier] = useState("Almadies");
  const [stay, setStay] = useState("court");
  const [budget, setBudget] = useState("30000");

  const scrollSearch = () => {
    document
      .getElementById("logements")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const budgetOptions =
    stay === "court"
      ? [
          { value: "5000", label: "5 000 FCFA / nuit" },
          { value: "10000", label: "10 000 FCFA / nuit" },
          { value: "15000", label: "15 000 FCFA / nuit" },
          { value: "20000", label: "20 000 FCFA / nuit" },
          { value: "30000", label: "30 000 FCFA / nuit" },
          { value: "50000", label: "50 000 FCFA / nuit" },
        ]
      : [
          { value: "30000", label: "30 000 FCFA / mois" },
          { value: "50000", label: "50 000 FCFA / mois" },
          { value: "100000", label: "100 000 FCFA / mois" },
          { value: "150000", label: "150 000 FCFA / mois" },
          { value: "200000", label: "200 000 FCFA / mois" },
          { value: "250000", label: "250 000 FCFA / mois" },
          { value: "350000", label: "350 000 FCFA / mois" },
          { value: "500000", label: "500 000 FCFA / mois" },
        ];

  const handleStayChange = (value: string) => {
    setStay(value);

    setBudget(value === "court" ? "30000" : "250000");
  };

  const whatsappMessage =
    stay === "court"
      ? `Bonjour PAVA LOGEMENT, je cherche un logement à Dakar dans le quartier ${quartier}, pour un court séjour, avec un budget maximum de ${budget} FCFA / nuit.`
      : `Bonjour PAVA LOGEMENT, je cherche un logement à Dakar dans le quartier ${quartier}, pour une longue durée, avec un budget maximum de ${budget} FCFA / mois.`;

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[#062e32]"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8134745/pexels-photo-8134745.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt="Illustration d’un intérieur résidentiel"
          className="h-full w-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#062e32]/65 via-[#062e32]/80 to-[#062e32]" />

        <div className="absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full bg-[#E2681B]/25 blur-[90px]" />

        <div className="absolute top-40 -left-24 h-[300px] w-[300px] rounded-full bg-teal-400/20 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-10 sm:pt-16 sm:pb-14">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur px-3.5 py-1.5 text-[13px] font-bold text-white">
                <ShieldCheck
                  size={15}
                  className="text-emerald-300"
                />
                Informations examinées avant publication
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur px-3.5 py-1.5 text-[13px] font-bold text-white">
                <MapPin
                  size={14}
                  className="text-[#E9B44C]"
                />
                Dakar
              </span>
            </div>

            <h1 className="mt-5 text-white font-extrabold tracking-tight leading-[1.05] text-[clamp(2.1rem,5.2vw,3.9rem)]">
              Trouvez votre logement à Dakar,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E9B44C] to-[#E2681B]">
                {" "}
                simplement.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[16px] sm:text-[17px] leading-relaxed text-teal-50/85">
              Chambres, studios, appartements, villas et maisons, pour{" "}
              <strong className="text-white">
                court séjour
              </strong>{" "}
              comme pour{" "}
              <strong className="text-white">
                longue durée
              </strong>
              . Recherchez selon votre quartier, votre durée de
              séjour et votre budget.
            </p>

            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-teal-50/80">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  size={15}
                  className="text-emerald-300"
                />
                Informations vérifiées avant publication
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  size={15}
                  className="text-emerald-300"
                />
                Contact direct avec PAVA
              </span>

              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck
                  size={15}
                  className="text-emerald-300"
                />
                Photos du logement lorsqu’elles sont disponibles
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#logements"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#E2681B] px-7 py-3.5 font-extrabold text-white shadow-[0_14px_35px_rgba(226,104,27,0.4)] hover:bg-[#c85a15] hover:-translate-y-0.5 transition"
              >
                <Search size={18} />
                Voir les logements
              </a>

              <a
                href={WHATSAPP_LINK(
                  "Bonjour PAVA LOGEMENT, je cherche un logement à Dakar."
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-extrabold text-[#0a3f44] hover:bg-teal-50 hover:-translate-y-0.5 transition"
              >
                <MessageCircle size={18} />
                Nous contacter
              </a>
            </div>

            <p className="mt-4 text-[13px] text-teal-50/60">
              📍 {CONTACT.address} ·{" "}
              {CONTACT.phones.join(" / ")}
            </p>

            <p className="mt-2 text-[11px] text-teal-50/45">
              Image d’illustration.
            </p>
          </div>

          <div
            className="animate-fade-up rounded-[26px] bg-white p-6 sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-extrabold text-[18px] tracking-tight text-slate-900">
                Rechercher un logement
              </h3>

              <span className="rounded-full bg-slate-100 border px-2.5 py-1 text-[12px] font-bold text-slate-600">
                Dakar
              </span>
            </div>

            <p className="mt-1.5 text-[13px] text-slate-500">
              Choisissez vos critères avant de consulter le catalogue.
            </p>

            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5">
                  <MapPin
                    size={14}
                    className="text-[#006b75]"
                  />
                  Quartier
                </span>

                <select
                  value={quartier}
                  onChange={(e) =>
                    setQuartier(e.target.value)
                  }
                  className="mt-1.5 w-full rounded-xl border bg-slate-50 px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75] focus:bg-white"
                >
                  {[
                    "Almadies",
                    "Ngor",
                    "Mermoz",
                    "Plateau",
                    "Médina",
                    "Ouakam",
                    "Yoff",
                    "Sacré-Cœur",
                    "Keur Massar",
                  ].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5">
                    <CalendarDays
                      size={14}
                      className="text-[#006b75]"
                    />
                    Durée
                  </span>

                  <select
                    value={stay}
                    onChange={(e) =>
                      handleStayChange(e.target.value)
                    }
                    className="mt-1.5 w-full rounded-xl border bg-slate-50 px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75]"
                  >
                    <option value="court">
                      Court séjour
                    </option>

                    <option value="long">
                      Long séjour
                    </option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-[13px] font-bold text-slate-600 flex items-center gap-1.5">
                    <WalletCards
                      size={14}
                      className="text-[#006b75]"
                    />
                    Budget max
                  </span>

                  <select
                    value={budget}
                    onChange={(e) =>
                      setBudget(e.target.value)
                    }
                    className="mt-1.5 w-full rounded-xl border bg-slate-50 px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75]"
                  >
                    {budgetOptions.map((option) => (
                      <option
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <button
                onClick={scrollSearch}
                className="w-full rounded-xl bg-[#0a3f44] py-3.5 font-extrabold text-white hover:bg-[#006b75] transition inline-flex items-center justify-center gap-2"
              >
                <Search size={18} />
                Voir les logements à {quartier}
              </button>

              <a
                href={WHATSAPP_LINK(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 py-3 font-extrabold text-[#128C4B] hover:bg-[#25D366] hover:text-white transition"
              >
                <MessageCircle size={17} />
                Demander sur WhatsApp
              </a>

              <p className="text-center text-[12px] text-slate-400">
                La disponibilité et les conditions sont à confirmer avec
                PAVA.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              title: "Court séjour",
              text: "Pour quelques nuits selon les logements disponibles.",
            },
            {
              title: "Long séjour",
              text: "Pour une installation plus durable à Dakar.",
            },
            {
              title: "Propriétaires",
              text: "Proposez votre logement pour examen avant publication.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white/[0.07] border border-white/10 backdrop-blur px-5 py-4"
            >
              <p className="text-[16px] font-extrabold text-white">
                {item.title}
              </p>

              <p className="mt-1.5 text-[13px] leading-relaxed text-teal-50/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-3.5 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] font-semibold text-teal-50/75">
          <span>✓ Informations examinées avant publication</span>
          <span>✓ Court et long séjour</span>
          <span>✓ Contact direct avec PAVA</span>
          <span>✓ Conditions à confirmer avant tout paiement</span>
        </div>
      </div>
    </section>
  );
}
