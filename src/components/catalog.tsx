"use client";

import { useMemo, useState, useEffect } from "react";
import {
  WHATSAPP_LINK,
  formatFCFA,
  TYPE_LABELS,
  STAY_LABELS,
  QUARTIERS,
  type PropertyDTO,
} from "@/lib/site";
import {
  MapPin,
  BedDouble,
  Bath,
  Ruler,
  Users,
  Star,
  Search,
  SlidersHorizontal,
  X,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MessageCircle,
  Sparkles,
  Check,
} from "lucide-react";

function ratingDisplay(
  rating: number | null,
  reviewsCount: number | null
) {
  if (!rating || !reviewsCount) return "Nouveau";
  return (rating / 10).toFixed(1);
}

function propertyPriceText(p: PropertyDTO) {
  if (p.pricePerNight && p.pricePerMonth) {
    return `${formatFCFA(p.pricePerNight)} / nuit · ${formatFCFA(
      p.pricePerMonth
    )} / mois`;
  }

  if (p.pricePerNight) {
    return `${formatFCFA(p.pricePerNight)} / nuit`;
  }

  if (p.pricePerMonth) {
    return `${formatFCFA(p.pricePerMonth)} / mois`;
  }

  return "Tarif à confirmer";
}

export function Catalog({ initial }: { initial: PropertyDTO[] }) {
  const [items, setItems] = useState<PropertyDTO[]>(initial);
  const [type, setType] = useState("all");
  const [quartier, setQuartier] = useState("all");
  const [stay, setStay] = useState("all");
  const [budget, setBudget] = useState("all");
  const [customBudget, setCustomBudget] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<PropertyDTO | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);

      try {
        const params = new URLSearchParams();

        if (type !== "all") {
          params.set("type", type);
        }

        if (quartier !== "all") {
          params.set("quartier", quartier);
        }

        if (stay !== "all") {
          params.set("stay", stay);
        }

        const effectiveBudget =
          budget === "custom"
            ? customBudget.replace(/\D/g, "")
            : budget;

        if (effectiveBudget && effectiveBudget !== "all") {
          params.set("maxBudget", effectiveBudget);
        }

        if (query.trim()) {
          params.set("q", query.trim());
        }

        const res = await fetch(
          `/api/properties?${params.toString()}`
        );

        if (!res.ok) {
          throw new Error("Erreur lors du chargement des logements.");
        }

        const data = await res.json();

        if (data.properties) {
          setItems(data.properties);
        }
      } catch (error) {
        console.error("Erreur catalogue :", error);
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => clearTimeout(t);
  }, [type, quartier, stay, budget, customBudget, query]);

  const count = items.length;
  const isCustomBudget = budget === "custom";

  const courtBudgetOptions = [
    { value: "5000", label: "≤ 5 000 FCFA" },
    { value: "10000", label: "≤ 10 000 FCFA" },
    { value: "15000", label: "≤ 15 000 FCFA" },
    { value: "20000", label: "≤ 20 000 FCFA" },
    { value: "30000", label: "≤ 30 000 FCFA" },
    { value: "50000", label: "≤ 50 000 FCFA" },
  ];

  const longBudgetOptions = [
    { value: "30000", label: "≤ 30 000 FCFA" },
    { value: "50000", label: "≤ 50 000 FCFA" },
    { value: "100000", label: "≤ 100 000 FCFA" },
    { value: "150000", label: "≤ 150 000 FCFA" },
    { value: "200000", label: "≤ 200 000 FCFA" },
    { value: "250000", label: "≤ 250 000 FCFA" },
    { value: "350000", label: "≤ 350 000 FCFA" },
    { value: "500000", label: "≤ 500 000 FCFA" },
  ];

  const currentBudgetOptions =
    stay === "court"
      ? courtBudgetOptions
      : stay === "long"
      ? longBudgetOptions
      : [];

  const resetFilters = () => {
    setType("all");
    setQuartier("all");
    setStay("all");
    setBudget("all");
    setCustomBudget("");
    setQuery("");
  };

  const handleStayChange = (value: string) => {
    setStay(value);
    setBudget("all");
    setCustomBudget("");
  };

  return (
    <section
      id="logements"
      className="mx-auto max-w-7xl px-4 sm:px-6 py-14 scroll-mt-24"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-3.5 py-1.5 text-[13px] font-bold text-[#006b75]">
            <Sparkles size={15} />
            Annonces examinées avant publication
          </p>

          <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.6rem)] font-extrabold tracking-tight text-[#0a3f44] leading-tight">
            Logements proposés à Dakar
          </h2>

          <p className="mt-2 max-w-2xl text-[15px] text-slate-600 leading-relaxed">
            Consultez les logements proposés pour un court ou un long séjour.
            Les informations affichées correspondent aux éléments transmis et
            examinés avant publication.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-600">
          <span className="rounded-full bg-white border px-4 py-2 shadow-sm">
            {count} logement{count > 1 ? "s" : ""} trouvé
            {count > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Filtres */}
      <div className="mt-7 rounded-3xl bg-white border shadow-[0_18px_50px_rgba(6,46,50,0.08)] p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <label className="flex items-center gap-2.5 rounded-2xl bg-slate-50 border px-4 py-3 focus-within:border-[#006b75] focus-within:bg-white transition">
            <Search size={18} className="text-slate-400 shrink-0" />

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher : Almadies, villa piscine, studio…"
              className="w-full bg-transparent outline-none text-[14px] font-medium placeholder:text-slate-400"
            />
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="rounded-2xl bg-slate-50 border px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75]"
          >
            <option value="all">Tous types</option>
            <option value="appartement">Appartement</option>
            <option value="studio">Studio</option>
            <option value="duplex">Duplex</option>
            <option value="chambre">Chambre</option>
            <option value="villa">Villa</option>
            <option value="maison">Maison</option>
          </select>

          <select
            value={quartier}
            onChange={(e) => setQuartier(e.target.value)}
            className="rounded-2xl bg-slate-50 border px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75]"
          >
            <option value="all">Tous quartiers</option>

            {QUARTIERS.map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>

          <select
            value={stay}
            onChange={(e) => handleStayChange(e.target.value)}
            className="rounded-2xl bg-slate-50 border px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75]"
          >
            <option value="all">Court + Long séjour</option>
            <option value="court">Court séjour (nuit)</option>
            <option value="long">Long séjour (mois)</option>
          </select>

          <select
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);

              if (e.target.value !== "custom") {
                setCustomBudget("");
              }
            }}
            disabled={stay === "all"}
            className="rounded-2xl bg-slate-50 border px-4 py-3 text-[14px] font-semibold outline-none focus:border-[#006b75] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {stay === "all" ? (
              <option value="all">
                Choisir le séjour d'abord
              </option>
            ) : (
              <>
                <option value="all">
                  {stay === "court"
                    ? "Tous budgets / nuit"
                    : "Tous budgets / mois"}
                </option>

                {currentBudgetOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}

                <option value="custom">
                  Prix personnalisé
                </option>
              </>
            )}
          </select>
        </div>

        {isCustomBudget && stay !== "all" && (
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-2.5">
            <label className="text-[13px] font-bold text-slate-600">
              Budget maximum{" "}
              {stay === "court" ? "par nuit" : "par mois"}
            </label>

            <div className="flex items-center gap-2 rounded-2xl bg-slate-50 border px-4 py-2.5 max-w-xs focus-within:border-[#006b75] focus-within:bg-white transition">
              <input
                type="text"
                inputMode="numeric"
                value={customBudget}
                onChange={(e) =>
                  setCustomBudget(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder={
                  stay === "court" ? "Ex. 12000" : "Ex. 85000"
                }
                className="w-full bg-transparent outline-none text-[14px] font-semibold"
              />

              <span className="text-[13px] font-bold text-slate-500 whitespace-nowrap">
                FCFA / {stay === "court" ? "nuit" : "mois"}
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-[13px]">
          <span className="inline-flex items-center gap-1.5 font-bold text-slate-500">
            <SlidersHorizontal size={14} />
            Filtres rapides :
          </span>

          {[
            { label: "Piscine", q: "piscine" },
            { label: "Almadies / Ngor", q: "Almadies" },
            { label: "Studio", t: "studio" },
            { label: "Villa", t: "villa" },
            { label: "Chambre", t: "chambre" },
          ].map((f, i) => (
            <button
              key={i}
              onClick={() => {
                if (f.q) {
                  setQuery(f.q);
                }

                if (f.t) {
                  setType(f.t);
                }
              }}
              className="rounded-full border bg-white px-3.5 py-1.5 font-semibold text-slate-700 hover:border-[#006b75] hover:text-[#006b75] transition"
            >
              {f.label}
            </button>
          ))}

          {(type !== "all" ||
            quartier !== "all" ||
            stay !== "all" ||
            budget !== "all" ||
            customBudget ||
            query) && (
            <button
              onClick={resetFilters}
              className="rounded-full bg-slate-900 px-3.5 py-1.5 font-bold text-white"
            >
              Réinitialiser
            </button>
          )}
        </div>
      </div>

      {/* Grille */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {loading && items.length === 0 ? (
          [1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-[420px] animate-pulse rounded-3xl bg-white border"
            />
          ))
        ) : items.length === 0 ? (
          <div className="col-span-full rounded-3xl bg-white border p-12 text-center">
            <p className="text-lg font-extrabold text-slate-800">
              Aucun logement ne correspond… pour l'instant.
            </p>

            <p className="mt-2 text-slate-500">
              Contactez PAVA pour nous communiquer vos critères de recherche.
            </p>

            <a
              href={WHATSAPP_LINK(
                "Bonjour, je cherche un logement avec ces critères : " +
                  (query || "à préciser")
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white"
            >
              <MessageCircle size={18} />
              Demander sur WhatsApp
            </a>
          </div>
        ) : (
          items.map((p) => (
            <PropertyCard
              key={p.id}
              p={p}
              onOpen={() => setSelected(p)}
            />
          ))
        )}
      </div>

      {selected && (
        <PropertyModal
          p={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

export function PropertyCard({
  p,
  onOpen,
}: {
  p: PropertyDTO;
  onOpen: () => void;
}) {
  const img = p.images?.[0] || "";
  const hasReviews = !!p.reviewsCount;

  return (
    <article className="group overflow-hidden rounded-3xl bg-white border shadow-[0_10px_35px_rgba(6,46,50,0.07)] hover:shadow-[0_20px_60px_rgba(6,46,50,0.14)] hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div
        className="relative h-[240px] overflow-hidden bg-slate-100 cursor-pointer"
        onClick={onOpen}
      >
        {img ? (
          <img
            src={img}
            alt={p.title}
            className="prop-img h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full place-items-center text-slate-400 font-semibold">
            Photos à venir
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <span className="rounded-full bg-white/95 backdrop-blur px-3 py-1.5 text-[12px] font-extrabold text-[#0a3f44]">
            {TYPE_LABELS[p.type] || p.type}
          </span>

          {p.isFeatured && (
            <span className="rounded-full bg-[#E2681B] px-3 py-1.5 text-[12px] font-extrabold text-white">
              ★ Coup de cœur
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-2.5 py-1.5 text-[12px] font-bold text-white">
          {hasReviews ? (
            <>
              <Star
                size={13}
                className="fill-amber-300 text-amber-300"
              />

              {ratingDisplay(p.rating, p.reviewsCount)}

              <span className="font-medium opacity-80">
                ({p.reviewsCount})
              </span>
            </>
          ) : (
            "Nouveau"
          )}
        </div>

        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#062e32]/85 backdrop-blur px-3 py-1.5 text-[12px] font-bold text-white">
          <MapPin size={13} />
          {p.neighborhood}
        </div>

        {p.images && p.images.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-[12px] font-bold">
            +{p.images.length - 1} photos
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#006b75]">
          {STAY_LABELS[p.stayType] || p.stayType}
        </p>

        <h3
          onClick={onOpen}
          className="mt-1.5 cursor-pointer text-[17px] font-extrabold leading-snug tracking-tight text-slate-900 hover:text-[#006b75] line-clamp-2"
        >
          {p.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] font-medium text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <BedDouble
              size={15}
              className="text-slate-400"
            />
            {p.bedrooms} ch.
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Bath
              size={15}
              className="text-slate-400"
            />
            {p.bathrooms} SDB
          </span>

          {p.surfaceM2 ? (
            <span className="inline-flex items-center gap-1.5">
              <Ruler
                size={15}
                className="text-slate-400"
              />
              {p.surfaceM2} m²
            </span>
          ) : null}

          {p.maxGuests && p.stayType !== "long" ? (
            <span className="inline-flex items-center gap-1.5">
              <Users
                size={15}
                className="text-slate-400"
              />
              {p.maxGuests} pers.
            </span>
          ) : null}
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {(p.amenities || []).slice(0, 3).map((a, i) => (
            <span
              key={i}
              className="rounded-full bg-teal-50 border border-teal-100 px-2.5 py-1 text-[12px] font-semibold text-teal-900"
            >
              {a}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-dashed pt-4">
          <div>
            {p.pricePerNight ? (
              <p className="text-[15px] font-extrabold text-slate-900">
                {formatFCFA(p.pricePerNight)}

                <span className="text-[13px] font-medium text-slate-500">
                  {" "}
                  / nuit
                </span>
              </p>
            ) : null}

            {p.pricePerMonth ? (
              <p
                className={`text-[15px] font-extrabold ${
                  p.pricePerNight
                    ? "text-[#E2681B]"
                    : "text-slate-900"
                }`}
              >
                {formatFCFA(p.pricePerMonth)}

                <span className="text-[13px] font-medium text-slate-500">
                  {" "}
                  / mois
                </span>
              </p>
            ) : null}

            {!p.pricePerNight && !p.pricePerMonth ? (
              <p className="text-[14px] font-bold text-slate-700">
                Tarif à confirmer
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={onOpen}
            className="rounded-xl bg-[#0a3f44] px-4 py-2.5 text-[14px] font-bold text-white hover:bg-[#006b75] transition"
          >
            Détails
          </button>

          <a
            href={WHATSAPP_LINK(
              `Bonjour PAVA LOGEMENT, je suis intéressé par : ${
                p.title
              } (${p.neighborhood}). ${propertyPriceText(
                p
              )}. Pouvez-vous me confirmer les informations et la disponibilité ?`
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2.5 text-[14px] font-bold text-white hover:brightness-95 transition"
          >
            <MessageCircle size={16} />
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}

function Gallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [idx, setIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="h-[320px] grid place-items-center bg-slate-100 font-bold text-slate-400">
        Photos à venir
      </div>
    );
  }

  return (
    <div className="relative h-[300px] sm:h-[360px] bg-slate-100 overflow-hidden">
      <img
        src={images[idx]}
        alt={title}
        className="h-full w-full object-contain"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setIdx(
                (idx - 1 + images.length) %
                  images.length
              )
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 hover:bg-white shadow"
            aria-label="Photo précédente"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() =>
              setIdx((idx + 1) % images.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-white/90 hover:bg-white shadow"
            aria-label="Photo suivante"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Afficher la photo ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === idx
                    ? "w-7 bg-white"
                    : "w-2 bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function PropertyModal({
  p,
  onClose,
}: {
  p: PropertyDTO;
  onClose: () => void;
}) {
  const hasCourtPrice = !!p.pricePerNight;
  const hasLongPrice = !!p.pricePerMonth;

  const [tab, setTab] = useState<"court" | "long">(
    hasCourtPrice ? "court" : "long"
  );

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    message: "",
  });

  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", esc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [onClose]);

  const nights = useMemo(() => {
    if (!form.checkIn || !form.checkOut) return 0;

    const a = new Date(form.checkIn).getTime();
    const b = new Date(form.checkOut).getTime();

    const d = Math.round((b - a) / 86400000);

    return d > 0 ? d : 0;
  }, [form.checkIn, form.checkOut]);

  const estimated = useMemo(() => {
    if (
      tab === "court" &&
      p.pricePerNight &&
      nights > 0
    ) {
      return p.pricePerNight * nights;
    }

    if (
      tab === "long" &&
      p.pricePerMonth
    ) {
      return p.pricePerMonth;
    }

    return null;
  }, [tab, nights, p]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: p.id,
          propertyTitle: p.title,
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          checkIn: form.checkIn || null,
          checkOut:
            tab === "court" ? form.checkOut || null : null,
          guests: tab === "court" ? form.guests : 1,
          stayType: tab,
          message: form.message,
          totalEstimated: estimated,
        }),
      });

      if (res.ok) {
        setDone(true);
      } else {
        alert(
          "Erreur d'envoi. Réessayez ou passez par WhatsApp."
        );
      }
    } catch (error) {
      console.error("Erreur demande logement :", error);

      alert(
        "Erreur d'envoi. Réessayez ou passez par WhatsApp."
      );
    } finally {
      setSending(false);
    }
  };

  const waMsg =
    tab === "long"
      ? `Bonjour PAVA LOGEMENT, je souhaite louer le logement ${p.title} à ${p.neighborhood} en location mensuelle. Nom du locataire : ${form.fullName || "..."}. Date d’entrée souhaitée : ${form.checkIn || "à préciser"}. Pouvez-vous me confirmer les conditions de location et la disponibilité ?`
      : `Bonjour PAVA LOGEMENT, je suis intéressé par le logement ${p.title} à ${p.neighborhood}. Nom : ${form.fullName || "..."}. Arrivée : ${form.checkIn || "..."}. Départ : ${form.checkOut || "..."}. ${form.guests} voyageur(s). Pouvez-vous me confirmer les informations et la disponibilité ?`;

  const showTabs = hasCourtPrice || hasLongPrice;

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center sm:p-6">
      <div
        className="absolute inset-0 bg-[#062e32]/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl animate-fade-up">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white shadow-lg hover:bg-slate-100"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <Gallery
          images={p.images || []}
          title={p.title}
        />

        <div className="grid md:grid-cols-[1.5fr_1fr] gap-0">
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 text-[12px] font-extrabold">
              <span className="rounded-full bg-teal-50 border border-teal-100 px-3 py-1 text-[#006b75] uppercase tracking-wider">
                {TYPE_LABELS[p.type] || p.type}
              </span>

              <span className="rounded-full bg-orange-50 border border-orange-100 px-3 py-1 text-[#b34a0e] uppercase tracking-wider">
                {STAY_LABELS[p.stayType] || p.stayType}
              </span>

              {p.reviewsCount ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900 px-3 py-1 text-white">
                  <Star
                    size={12}
                    className="fill-amber-300 text-amber-300"
                  />

                  {ratingDisplay(
                    p.rating,
                    p.reviewsCount
                  )}

                  · {p.reviewsCount} avis
                </span>
              ) : (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                  Nouveau
                </span>
              )}
            </div>

            <h3 className="mt-3 text-[22px] sm:text-[26px] font-extrabold tracking-tight text-slate-900 leading-tight">
              {p.title}
            </h3>

            <p className="mt-1.5 flex items-center gap-1.5 text-[14px] font-semibold text-slate-500">
              <MapPin size={15} />
              {p.address || p.neighborhood}, Dakar
            </p>

            <div
              className={`mt-4 grid ${
                tab === "court" ? "grid-cols-4" : "grid-cols-3"
              } gap-2 text-center`}
            >
              {[
                {
                  icon: BedDouble,
                  v:
                    p.bedrooms != null
                      ? `${p.bedrooms}`
                      : "—",
                  l: "Chambres",
                },
                {
                  icon: Bath,
                  v:
                    p.bathrooms != null
                      ? `${p.bathrooms}`
                      : "—",
                  l: "SDB",
                },
                {
                  icon: Ruler,
                  v: p.surfaceM2
                    ? `${p.surfaceM2}m²`
                    : "—",
                  l: "Surface",
                },
                ...(tab === "court"
                  ? [
                      {
                        icon: Users,
                        v: p.maxGuests
                          ? `${p.maxGuests}`
                          : "—",
                        l: "Voyageurs",
                      },
                    ]
                  : []),
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-slate-50 border p-3"
                >
                  <s.icon
                    size={18}
                    className="mx-auto text-[#006b75]"
                  />

                  <p className="mt-1 font-extrabold text-[15px]">
                    {s.v}
                  </p>

                  <p className="text-[12px] text-slate-500 font-medium">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>

            {p.description ? (
              <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
                {p.description}
              </p>
            ) : null}

            {(p.amenities || []).length > 0 && (
              <>
                <h4 className="mt-6 font-extrabold text-slate-900">
                  Équipements indiqués
                </h4>

                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  {(p.amenities || []).map((a, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 rounded-xl bg-teal-50/70 border border-teal-100 px-3.5 py-2.5 text-[13px] font-semibold text-teal-950"
                    >
                      <Check
                        size={15}
                        className="text-emerald-600 shrink-0"
                      />

                      {a}
                    </span>
                  ))}
                </div>
              </>
            )}

            <div className="mt-6 rounded-2xl bg-[#062e32] p-5 text-[13px] text-teal-50/90">
              <p className="font-extrabold text-white">
                Avant toute réservation ou paiement
              </p>

              <ul className="mt-2.5 space-y-2 leading-relaxed">
                <li>
                  ✓ Vérifiez les informations du logement avec PAVA.
                </li>

                <li>
                  ✓ Demandez la confirmation de disponibilité pour vos dates.
                </li>

                <li>
                  ✓ Vérifiez les conditions de location et de paiement avant
                  tout versement.
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t md:border-t-0 md:border-l bg-slate-50/70 p-6 sm:p-7">
            <div className="rounded-2xl bg-white border p-4 shadow-sm">
              {showTabs && (
                <div
                  className={`grid ${
                    hasCourtPrice && hasLongPrice
                      ? "grid-cols-2"
                      : "grid-cols-1"
                  } gap-1 rounded-xl bg-slate-100 p-1 text-[13px] font-bold`}
                >
                  {hasCourtPrice ? (
                    <button
                      type="button"
                      onClick={() => setTab("court")}
                      className={`rounded-lg py-2.5 transition ${
                        tab === "court"
                          ? "bg-white shadow font-extrabold text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      Court séjour
                    </button>
                  ) : null}

                  {hasLongPrice ? (
                    <button
                      type="button"
                      onClick={() => setTab("long")}
                      className={`rounded-lg py-2.5 transition ${
                        tab === "long"
                          ? "bg-white shadow font-extrabold text-slate-900"
                          : "text-slate-500"
                      }`}
                    >
                      Long séjour
                    </button>
                  ) : null}
                </div>
              )}

              <div className="mt-4">
                {tab === "court" && p.pricePerNight ? (
                  <p>
                    <span className="text-[24px] font-extrabold">
                      {formatFCFA(p.pricePerNight)}
                    </span>{" "}
                    <span className="text-slate-500 font-medium">
                      / nuit
                    </span>
                  </p>
                ) : tab === "long" && p.pricePerMonth ? (
                  <p>
                    <span className="text-[24px] font-extrabold">
                      {formatFCFA(p.pricePerMonth)}
                    </span>{" "}
                    <span className="text-slate-500 font-medium">
                      / mois
                    </span>
                  </p>
                ) : (
                  <p className="text-[16px] font-bold text-slate-700">
                    Tarif à confirmer
                  </p>
                )}

                <p className="mt-1 text-[12px] font-medium text-slate-500">
                  Disponibilité et conditions à confirmer avec PAVA.
                </p>

                {estimated ? (
                  <p className="mt-3 rounded-xl bg-orange-50 border border-orange-100 px-3 py-2 text-[13px] font-bold text-[#9a3f0a]">
                    Montant indicatif :{" "}
                    {formatFCFA(estimated)}{" "}
                    {tab === "court"
                      ? `· ${nights} nuit${
                          nights > 1 ? "s" : ""
                        }`
                      : "· 1 mois"}
                  </p>
                ) : null}
              </div>

              {!done ? (
                <form
                  onSubmit={submit}
                  className="mt-4 space-y-2.5"
                >
                  <p className="text-[13px] font-extrabold text-slate-800">
                    {tab === "long"
                      ? "Informations du locataire"
                      : "Informations du voyageur"}
                  </p>

                  <input
                    required
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        fullName: e.target.value,
                      })
                    }
                    placeholder={
                      tab === "long"
                        ? "Nom complet du locataire *"
                        : "Nom complet *"
                    }
                    className="w-full rounded-xl border bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-[#006b75]"
                  />

                  <div
                    className={`grid ${
                      tab === "court"
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    } gap-2.5`}
                  >
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Téléphone *"
                      className="w-full min-w-0 rounded-xl border bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-[#006b75]"
                    />

                    {tab === "court" && (
                      <input
                        type="number"
                        min={1}
                        max={12}
                        value={form.guests}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            guests: Number(e.target.value),
                          })
                        }
                        placeholder="Voyageurs"
                        aria-label="Nombre de voyageurs"
                        className="w-full min-w-0 rounded-xl border bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-[#006b75]"
                      />
                    )}
                  </div>

                  <div
                    className={`grid ${
                      tab === "court"
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    } gap-2.5`}
                  >
                    <label className="block min-w-0">
                      <span className="text-[12px] font-bold text-slate-500 flex items-center gap-1">
                        <CalendarDays size={12} />
                        {tab === "long"
                          ? "Date d’entrée souhaitée"
                          : "Date d’arrivée"}
                      </span>

                      <input
                        required={tab === "long"}
                        type="date"
                        value={form.checkIn}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            checkIn: e.target.value,
                          })
                        }
                        className="mt-1 w-full min-w-0 rounded-xl border bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#006b75]"
                      />
                    </label>

                    {tab === "court" && (
                      <label className="block min-w-0">
                        <span className="text-[12px] font-bold text-slate-500">
                          Départ
                        </span>

                        <input
                          type="date"
                          min={form.checkIn || undefined}
                          value={form.checkOut}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              checkOut: e.target.value,
                            })
                          }
                          className="mt-1 w-full min-w-0 rounded-xl border bg-white px-3 py-2.5 text-[13px] outline-none focus:border-[#006b75]"
                        />
                      </label>
                    )}
                  </div>

                  <textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                    placeholder={
                      tab === "long"
                        ? "Message (optionnel) : durée souhaitée, questions sur le bail…"
                        : "Message (optionnel) : motif du séjour, heure d'arrivée…"
                    }
                    rows={3}
                    className="w-full rounded-xl border bg-white px-3.5 py-2.5 text-[14px] outline-none focus:border-[#006b75]"
                  />

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-xl bg-[#E2681B] px-4 py-3 font-extrabold text-white hover:bg-[#c65a14] transition disabled:opacity-60"
                  >
                    {sending
                      ? "Envoi…"
                      : tab === "long"
                      ? "Envoyer ma demande de location"
                      : "Envoyer ma demande"}
                  </button>

                  <a
                    href={WHATSAPP_LINK(waMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 font-extrabold text-white hover:brightness-95"
                  >
                    <MessageCircle size={17} />
                    Continuer sur WhatsApp
                  </a>

                  <p className="text-center text-[12px] text-slate-500">
                    Votre demande est transmise à PAVA pour vérification des
                    informations et de la disponibilité.
                  </p>
                </form>
              ) : (
                <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-5 text-center">
                  <p className="text-[18px]">✅</p>

                  <p className="font-extrabold text-emerald-900">
                    Demande envoyée !
                  </p>

                  <p className="mt-1 text-[13px] text-emerald-800">
                    Votre demande a bien été transmise à PAVA LOGEMENT.
                  </p>

                  <a
                    href={WHATSAPP_LINK(waMsg)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14px] font-bold text-white"
                  >
                    <MessageCircle size={15} />
                    Continuer sur WhatsApp
                  </a>
                </div>
              )}
            </div>

            <div className="mt-3 rounded-2xl border bg-white p-4 text-[13px]">
              <p className="font-bold">
                Conditions de paiement
              </p>

              <p className="mt-1 text-slate-500">
                Les modalités de paiement, l'éventuel acompte et les conditions
                de location sont à confirmer directement avec PAVA avant tout
                versement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
