"use client";

import { useState } from "react";
import { CONTACT, WHATSAPP_LINK, QUARTIERS } from "@/lib/site";
import {
  MapPin,
  CalendarDays,
  Users,
  Search,
  ShieldCheck,
  Phone,
  BadgeCheck,
} from "lucide-react";

function setNativeSelectValue(
  select: HTMLSelectElement,
  value: string
) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLSelectElement.prototype,
    "value"
  )?.set;

  if (setter) {
    setter.call(select, value);
  } else {
    select.value = value;
  }

  select.dispatchEvent(
    new Event("change", {
      bubbles: true,
    })
  );
}

export function Hero() {
  const [quartier, setQuartier] = useState("Almadies");
  const [stay, setStay] = useState<"court" | "long">("court");
  const [budget, setBudget] = useState("50000");

  const budgetOptions =
    stay === "court"
      ? [
          {
            value: "10000",
            label: "10 000 FCFA / nuit",
          },
          {
            value: "15000",
            label: "15 000 FCFA / nuit",
          },
          {
            value: "20000",
            label: "20 000 FCFA / nuit",
          },
          {
            value: "30000",
            label: "30 000 FCFA / nuit",
          },
          {
            value: "50000",
            label: "50 000 FCFA / nuit",
          },
        ]
      : [
          {
            value: "100000",
            label: "100 000 FCFA / mois",
          },
          {
            value: "150000",
            label: "150 000 FCFA / mois",
          },
          {
            value: "200000",
            label: "200 000 FCFA / mois",
          },
          {
            value: "250000",
            label: "250 000 FCFA / mois",
          },
          {
            value: "350000",
            label: "350 000 FCFA / mois",
          },
          {
            value: "500000",
            label: "500 000 FCFA / mois",
          },
        ];

  const applyCatalogFilters = () => {
    const catalog = document.getElementById("logements");

    if (!catalog) {
      return;
    }

    const selects =
      catalog.querySelectorAll<HTMLSelectElement>(
        "select"
      );

    /*
     * Ordre des sélecteurs du catalogue :
     * 0 = type
     * 1 = quartier
     * 2 = séjour
     * 3 = budget
     */
    const typeSelect = selects[0];
    const quartierSelect = selects[1];
    const staySelect = selects[2];
    const budgetSelect = selects[3];

    if (typeSelect) {
      setNativeSelectValue(typeSelect, "all");
    }

    if (quartierSelect) {
      setNativeSelectValue(
        quartierSelect,
        quartier
      );
    }

    if (staySelect) {
      setNativeSelectValue(staySelect, stay);
    }

    catalog.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    /*
     * Le changement de séjour modifie les options
     * de budget dans le catalogue. On attend donc
     * un court instant avant d'appliquer le budget.
     */
    window.setTimeout(() => {
      const updatedSelects =
        catalog.querySelectorAll<HTMLSelectElement>(
          "select"
        );

      const updatedBudgetSelect =
        updatedSelects[3];

      if (updatedBudgetSelect) {
        setNativeSelectValue(
          updatedBudgetSelect,
          budget
        );
      }
    }, 100);
  };

  const handleStayChange = (
    value: "court" | "long"
  ) => {
    setStay(value);

    if (value === "court") {
      setBudget("50000");
    } else {
      setBudget("250000");
    }
  };

  const whatsappMessage = `Bonjour PAVA LOGEMENT, je cherche un logement à Dakar, dans le quartier ${quartier}, pour un ${
    stay === "court"
      ? "court séjour"
      : "long séjour"
  }, avec un budget maximum de ${Number(
    budget
  ).toLocaleString("fr-FR")} FCFA / ${
    stay === "court" ? "nuit" : "mois"
  }.`;

  return (
    <section
      id="accueil"
      className="relative overflow-hidden bg-[#062e32]"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/8134745/pexels-photo-8134745.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
          alt="Illustration d’un intérieur résidentiel"
          className="h-full w-full object-cover opacity-35"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#062e32]/60 via-[#062e32]/72 to-[#062e32]" />

        <div className="absolute -top-24 -right-24 h-[380px] w-[380px] rounded-full bg-[#E2681B]/25 blur-[90px]" />

        <div className="absolute top-40 -left-24 h-[300px] w-[300px] rounded-full bg-teal-400/20 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 sm:pb-14 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] font-bold text-white backdrop-blur">
                <BadgeCheck
                  size={15}
                  className="text-emerald-300"
                />
                Logements proposés sur PAVA
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-[13px] font-bold text-white backdrop-blur">
                <ShieldCheck
                  size={14}
                  className="text-emerald-300"
                />
                Demandes vérifiées avant publication
              </span>
            </div>

            <h1 className="mt-5 text-[clamp(2.1rem,5.2vw,3.9rem)] font-extrabold leading-[1.05] tracking-tight text-white">
              Trouvez votre logement à Dakar,{" "}
              <span className="bg-gradient-to-r from-[#E9B44C] to-[#E2681B] bg-clip-text text-transparent">
                simplement.
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-teal-50/85 sm:text-[17px]">
              Chambres, studios, appartements, villas et
              maisons, pour{" "}
              <strong className="text-white">
                court séjour
              </strong>{" "}
              comme pour{" "}
              <strong className="text-white">
                longue durée
              </strong>
              . Recherchez selon votre quartier,
              votre durée de séjour et votre budget.
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
                Photos du logement
              </span>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={applyCatalogFilters}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#E2681B] px-7 py-3.5 font-extrabold text-white shadow-[0_14px_35px_rgba(226,104,27,0.4)] transition hover:-translate-y-0.5 hover:bg-[#c85a15]"
              >
                <Search size={18} />
                Voir les logements
              </button>

              <a
                href={WHATSAPP_LINK(
                  whatsappMessage
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-7 py-3.5 font-extrabold text-[#0a3f44] transition hover:-translate-y-0.5 hover:bg-teal-50"
              >
                <Phone size={18} />
                Nous contacter
              </a>
            </div>

            <p className="mt-4 text-[13px] text-teal-50/60">
              {CONTACT.address} ·{" "}
              {CONTACT.phones.join(" / ")} ·{" "}
              {CONTACT.hours}
            </p>

            <p className="mt-2 text-[11px] text-teal-50/45">
              Image d’illustration.
            </p>
          </div>

          <div
            className="animate-fade-up rounded-[26px] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-7"
            style={{ animationDelay: "0.15s" }}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[18px] font-extrabold tracking-tight text-slate-900">
                Rechercher un logement
              </h3>

              <span className="rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[12px] font-bold text-emerald-700">
                Dakar
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600">
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
                  {QUARTIERS.map((q) => (
                    <option
                      key={q}
                      value={q}
                    >
                      {q}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600">
                    <CalendarDays
                      size={14}
                      className="text-[#006b75]"
                    />
                    Durée
                  </span>

                  <select
                    value={stay}
                    onChange={(e) =>
                      handleStayChange(
                        e.target.value as
                          | "court"
                          | "long"
                      )
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
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600">
                    <Users
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
                    {budgetOptions.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      )
                    )}
                  </select>
                </label>
              </div>

              <button
                type="button"
                onClick={applyCatalogFilters}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a3f44] py-3.5 font-extrabold text-white transition hover:bg-[#006b75]"
              >
                <Search size={18} />
                Voir les logements
              </button>

              <a
                href={WHATSAPP_LINK(
                  whatsappMessage
                )}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 py-3 font-extrabold text-[#128C4B] transition hover:bg-[#25D366] hover:text-white"
              >
                Demander sur WhatsApp
              </a>

              <p className="text-center text-[12px] text-slate-400">
                Les critères choisis sont appliqués au
                catalogue.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            {
              title:
                "Des logements pour différents besoins",
              text:
                "Chambre, studio, appartement, villa ou maison.",
            },
            {
              title: "Court ou long séjour",
              text:
                "Choisissez la durée qui correspond à votre recherche.",
            },
            {
              title: "Une mise en relation simple",
              text:
                "Consultez les logements puis contactez PAVA.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/[0.07] px-5 py-4 backdrop-blur"
            >
              <p className="text-[15px] font-extrabold text-white">
                {item.title}
              </p>

              <p className="mt-1 text-[13px] leading-relaxed text-teal-50/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-6 py-3.5 text-[13px] font-semibold text-teal-50/75">
          <span>✓ Photos du logement</span>
          <span>✓ Informations vérifiées</span>
          <span>✓ Court séjour</span>
          <span>✓ Long séjour</span>
          <span>✓ Contact direct PAVA</span>
        </div>
      </div>
    </section>
  );
}
