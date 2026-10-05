"use client";

import { useEffect, useState } from "react";
import { upload } from "@vercel/blob/client";
import { WHATSAPP_LINK } from "@/lib/site";
import {
  Building2,
  Camera,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileCheck,
  HandCoins,
  ImagePlus,
  KeyRound,
  MessageCircle,
  MoonStar,
  Phone,
  Ruler,
  ShieldCheck,
  Users,
  Wallet,
  X,
} from "lucide-react";

export function StayModes() {
  return (
    <section
      id="sejours"
      className="mx-auto max-w-7xl px-4 py-12 scroll-mt-24 sm:px-6"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl bg-[#0a3f44] p-8 text-white">
          <MoonStar
            size={120}
            className="absolute -right-6 -top-6 opacity-10"
          />

          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#E9B44C]">
            Court séjour
          </p>

          <h3 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
            Une solution flexible pour quelques nuits
          </h3>

          <p className="mt-3 text-[14px] leading-relaxed text-teal-50/80">
            Découvrez les logements disponibles pour un court séjour
            et recherchez selon votre quartier, votre budget et vos
            besoins.
          </p>

          <ul className="mt-4 space-y-2 text-[14px] font-medium">
            {[
              "Recherche par quartier et budget",
              "Informations du logement affichées avant la demande",
              "Contact direct avec PAVA pour vérifier la disponibilité",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-300"
                />
                {item}
              </li>
            ))}
          </ul>

          <a
            href="#logements"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-extrabold text-[#0a3f44] transition hover:bg-teal-50"
          >
            Voir les courts séjours
          </a>
        </div>

        <div className="relative overflow-hidden rounded-3xl border bg-white p-8">
          <KeyRound
            size={120}
            className="absolute -right-6 -top-6 opacity-[0.06]"
          />

          <p className="text-[13px] font-extrabold uppercase tracking-[0.16em] text-[#E2681B]">
            Long séjour
          </p>

          <h3 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight text-[#0a3f44]">
            Trouver un logement pour s&apos;installer
          </h3>

          <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
            Consultez les logements proposés pour une location
            longue durée et contactez PAVA pour connaître les
            conditions de location et la disponibilité.
          </p>

          <ul className="mt-4 space-y-2 text-[14px] font-medium text-slate-700">
            {[
              "Prix mensuel affiché lorsqu'il est renseigné",
              "Informations sur le logement et ses caractéristiques",
              "Demande de contact directement auprès de PAVA",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#006b75]"
                />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="#logements"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0a3f44] px-6 py-3 font-extrabold text-white transition hover:bg-[#006b75]"
            >
              Voir les longues durées
            </a>

            <a
              href={WHATSAPP_LINK(
                "Bonjour, je cherche une location longue durée à Dakar. Budget : ... Quartier : ..."
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#0a3f44] px-6 py-3 font-extrabold text-[#0a3f44] transition hover:bg-[#0a3f44] hover:text-white"
            >
              Être accompagné
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function GestionLocative() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    propertyType: "Appartement",
    neighborhood: "Almadies",
    address: "",
    stayType: "long",
    pricePerNight: "",
    pricePerMonth: "",
    bedrooms: "1",
    bathrooms: "1",
    surfaceM2: "",
    furnished: "Non meublé",
    availableFrom: "",
    message: "",
  });

  const [selectedFiles, setSelectedFiles] = useState<
    { file: File; preview: string }[]
  >([]);

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    return () => {
      selectedFiles.forEach((item) => {
        URL.revokeObjectURL(item.preview);
      });
    };
  }, [selectedFiles]);

  const updateForm = (key: string, value: string) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const incoming = Array.from(files);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    const invalidType = incoming.find(
      (file) => !allowedTypes.includes(file.type)
    );

    if (invalidType) {
      alert(
        "Format non accepté. Utilisez uniquement JPG, PNG ou WebP."
      );
      return;
    }

    const tooLarge = incoming.find(
      (file) => file.size > 8 * 1024 * 1024
    );

    if (tooLarge) {
      alert(
        "Une photo dépasse 8 Mo. Choisissez des images plus légères."
      );
      return;
    }

    const availableSlots = 8 - selectedFiles.length;

    if (availableSlots <= 0) {
      alert("Vous pouvez ajouter au maximum 8 photos.");
      return;
    }

    const filesToAdd = incoming.slice(0, availableSlots);

    const newItems = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setSelectedFiles((current) => [
      ...current,
      ...newItems,
    ]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles((current) => {
      const item = current[index];

      if (item) {
        URL.revokeObjectURL(item.preview);
      }

      return current.filter((_, i) => i !== index);
    });
  };

  const submit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setSending(true);

    try {
      let imageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        imageUrls = await Promise.all(
          selectedFiles.map(async ({ file }) => {
            const safeName = file.name.replace(
              /[^a-zA-Z0-9._-]/g,
              "-"
            );

            const blob = await upload(
              `owner-leads/${crypto.randomUUID()}-${safeName}`,
              file,
              {
                access: "private",
                handleUploadUrl: "/api/blob/upload",
                contentType: file.type,
              }
            );

            return blob.url;
          })
        );
      }

      const stayLabel =
        form.stayType === "court"
          ? "Court séjour"
          : form.stayType === "long"
          ? "Long séjour"
          : "Court + long séjour";

      const details = [
        "===== DEMANDE AJOUT DE LOGEMENT =====",
        `Type de séjour : ${stayLabel}`,
        `Prix / nuit : ${
          form.pricePerNight || "Non renseigné"
        } FCFA`,
        `Prix / mois : ${
          form.pricePerMonth || "Non renseigné"
        } FCFA`,
        `Chambres : ${form.bedrooms}`,
        `Salles de bain : ${form.bathrooms}`,
        `Surface : ${
          form.surfaceM2 || "Non renseignée"
        } m²`,
        `Meublé : ${form.furnished}`,
        `Disponible à partir du : ${
          form.availableFrom || "Non renseigné"
        }`,
        `Nombre de photos envoyées : ${imageUrls.length}`,
        "",
        "Description :",
        form.message || "Aucune description",
      ].join("\n");

      const res = await fetch(
        "/api/owner-leads",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: form.fullName,
            phone: form.phone,
            email: form.email,
            propertyType: form.propertyType,
            neighborhood: form.neighborhood,
            address: form.address,
            stayType: form.stayType,
            pricePerNight: form.pricePerNight,
            pricePerMonth: form.pricePerMonth,
            bedrooms: form.bedrooms,
            bathrooms: form.bathrooms,
            surfaceM2: form.surfaceM2,
            furnished: form.furnished,
            availableFrom: form.availableFrom,
            message: details,
            images: imageUrls,
          }),
        }
      );

      if (!res.ok) {
        alert(
          "Impossible d'envoyer la demande pour le moment. Réessayez ou contactez PAVA sur WhatsApp."
        );
        return;
      }

      setSent(true);
    } catch (error) {
      console.error(error);

      alert(
        "Une erreur est survenue pendant l'envoi. Vérifiez vos photos ou contactez PAVA sur WhatsApp."
      );
    } finally {
      setSending(false);
    }
  };

  const whatsappMessage =
    `Bonjour PAVA LOGEMENT, je souhaite proposer un logement.\n\n` +
    `Nom : ${form.fullName || "..."}\n` +
    `Téléphone : ${form.phone || "..."}\n` +
    `Type : ${form.propertyType || "..."}\n` +
    `Quartier : ${form.neighborhood || "..."}\n` +
    `Séjour : ${
      form.stayType === "court"
        ? "Court séjour"
        : form.stayType === "long"
        ? "Long séjour"
        : "Court + long séjour"
    }\n` +
    `Prix / nuit : ${
      form.pricePerNight || "..."
    } FCFA\n` +
    `Prix / mois : ${
      form.pricePerMonth || "..."
    } FCFA`;

  return (
    <section
      id="gestion"
      className="scroll-mt-24 border-y bg-white"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-1.5 rounded-full border border-orange-100 bg-orange-50 px-3.5 py-1.5 text-[13px] font-bold text-[#b34a0e]">
            <Building2 size={15} />
            Propriétaires · Publiez votre bien
          </p>

          <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold leading-tight tracking-tight text-[#0a3f44]">
            Ajoutez votre logement sur PAVA LOGEMENT.
          </h2>

          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Présentez-nous votre bien en quelques minutes.
            PAVA étudie les informations transmises et vous
            contacte avant toute publication.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              {
                title: "Simple",
                description:
                  "Quelques informations suffisent pour commencer.",
              },
              {
                title: "Vérifié",
                description:
                  "Chaque logement est étudié avant publication.",
              },
              {
                title: "Sans engagement",
                description:
                  "La demande ne constitue pas une publication automatique.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-slate-50 p-4 text-center"
              >
                <p className="text-[20px] font-extrabold text-[#0a3f44]">
                  {item.title}
                </p>

                <p className="mt-1 text-[13px] leading-snug text-slate-500">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {[
              {
                icon: Camera,
                title: "Photos du logement",
                description:
                  "Ajoutez les photos que vous souhaitez faire examiner par PAVA.",
              },
              {
                icon: FileCheck,
                title: "Vérification avant publication",
                description:
                  "Le logement reste en attente tant que PAVA ne l'a pas validé.",
              },
              {
                icon: HandCoins,
                title: "Court ou long séjour",
                description:
                  "Indiquez la durée de location que vous souhaitez proposer.",
              },
              {
                icon: ShieldCheck,
                title: "Une présentation claire",
                description:
                  "Les informations validées pourront ensuite être présentées sur le catalogue.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-3.5 rounded-2xl border bg-white p-4 shadow-sm"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-[#006b75]">
                  <item.icon size={20} />
                </span>

                <div>
                  <p className="text-[15px] font-extrabold">
                    {item.title}
                  </p>

                  <p className="text-[13px] text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#062e32] p-7 text-white shadow-2xl sm:p-8 lg:sticky lg:top-24">
          <h3 className="text-[21px] font-extrabold tracking-tight">
            Ajouter mon logement
          </h3>

          <p className="mt-1.5 text-[14px] text-teal-50/70">
            Remplissez les informations principales de votre bien.
          </p>

          {!sent ? (
            <form
              onSubmit={submit}
              className="mt-5 space-y-4"
            >
              <div>
                <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#E9B44C]">
                  Vos coordonnées
                </p>

                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Nom complet *"
                    value={form.fullName}
                    onChange={(e) =>
                      updateForm(
                        "fullName",
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none placeholder:text-teal-50/40 focus:border-[#E9B44C]"
                  />

                  <input
                    required
                    placeholder="Téléphone / WhatsApp *"
                    value={form.phone}
                    onChange={(e) =>
                      updateForm(
                        "phone",
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none placeholder:text-teal-50/40 focus:border-[#E9B44C]"
                  />
                </div>

                <input
                  type="email"
                  placeholder="E-mail (optionnel)"
                  value={form.email}
                  onChange={(e) =>
                    updateForm(
                      "email",
                      e.target.value
                    )
                  }
                  className="mt-3 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none placeholder:text-teal-50/40 focus:border-[#E9B44C]"
                />
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#E9B44C]">
                  Votre logement
                </p>

                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <select
                    value={form.propertyType}
                    onChange={(e) =>
                      updateForm(
                        "propertyType",
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none focus:border-[#E9B44C] [&>option]:text-slate-900"
                  >
                    {[
                      "Appartement",
                      "Studio",
                      "Duplex",
                      "Chambre",
                      "Villa",
                      "Maison",
                    ].map((item) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <select
                    value={form.neighborhood}
                    onChange={(e) =>
                      updateForm(
                        "neighborhood",
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none focus:border-[#E9B44C] [&>option]:text-slate-900"
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
                      "Ouest Foire",
                      "Wakam",
                      "Mame El Hadji",
                      "Autre",
                    ].map((item) => (
                      <option key={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <input
                  placeholder="Adresse du logement (optionnel)"
                  value={form.address}
                  onChange={(e) =>
                    updateForm(
                      "address",
                      e.target.value
                    )
                  }
                  className="mt-3 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none placeholder:text-teal-50/40 focus:border-[#E9B44C]"
                />

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <label className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
                    <span className="text-[11px] font-bold text-teal-50/60">
                      Chambres
                    </span>

                    <input
                      type="number"
                      min={0}
                      value={form.bedrooms}
                      onChange={(e) =>
                        updateForm(
                          "bedrooms",
                          e.target.value
                        )
                      }
                      className="mt-1 w-full bg-transparent text-[14px] font-bold outline-none"
                    />
                  </label>

                  <label className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
                    <span className="text-[11px] font-bold text-teal-50/60">
                      SDB
                    </span>

                    <input
                      type="number"
                      min={0}
                      value={form.bathrooms}
                      onChange={(e) =>
                        updateForm(
                          "bathrooms",
                          e.target.value
                        )
                      }
                      className="mt-1 w-full bg-transparent text-[14px] font-bold outline-none"
                    />
                  </label>

                  <label className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5">
                    <span className="text-[11px] font-bold text-teal-50/60">
                      Surface
                    </span>

                    <input
                      type="number"
                      min={0}
                      placeholder="m²"
                      value={form.surfaceM2}
                      onChange={(e) =>
                        updateForm(
                          "surfaceM2",
                          e.target.value
                        )
                      }
                      className="mt-1 w-full bg-transparent text-[14px] font-bold outline-none placeholder:text-teal-50/30"
                    />
                  </label>

                  <select
                    value={form.furnished}
                    onChange={(e) =>
                      updateForm(
                        "furnished",
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-white/15 bg-white/10 px-3 py-2.5 text-[13px] outline-none focus:border-[#E9B44C] [&>option]:text-slate-900"
                  >
                    <option value="Non meublé">
                      Non meublé
                    </option>
                    <option value="Meublé">
                      Meublé
                    </option>
                    <option value="Semi-meublé">
                      Semi-meublé
                    </option>
                  </select>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#E9B44C]">
                  Location
                </p>

                <select
                  value={form.stayType}
                  onChange={(e) =>
                    updateForm(
                      "stayType",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none focus:border-[#E9B44C] [&>option]:text-slate-900"
                >
                  <option value="court">
                    Court séjour
                  </option>

                  <option value="long">
                    Long séjour
                  </option>

                  <option value="both">
                    Court + long séjour
                  </option>
                </select>

                {(form.stayType === "court" ||
                  form.stayType === "both") && (
                  <div className="mt-3">
                    <label className="mb-1.5 block text-[12px] font-bold text-teal-50/60">
                      Prix par nuit
                    </label>

                    <div className="flex items-center rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                      <input
                        type="number"
                        min={0}
                        value={form.pricePerNight}
                        onChange={(e) =>
                          updateForm(
                            "pricePerNight",
                            e.target.value
                          )
                        }
                        placeholder="Ex. 15000"
                        className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-teal-50/30"
                      />

                      <span className="whitespace-nowrap text-[12px] font-bold text-teal-50/50">
                        FCFA / nuit
                      </span>
                    </div>
                  </div>
                )}

                {(form.stayType === "long" ||
                  form.stayType === "both") && (
                  <div className="mt-3">
                    <label className="mb-1.5 block text-[12px] font-bold text-teal-50/60">
                      Prix par mois
                    </label>

                    <div className="flex items-center rounded-xl border border-white/15 bg-white/10 px-4 py-3">
                      <input
                        type="number"
                        min={0}
                        value={form.pricePerMonth}
                        onChange={(e) =>
                          updateForm(
                            "pricePerMonth",
                            e.target.value
                          )
                        }
                        placeholder="Ex. 150000"
                        className="w-full bg-transparent text-[14px] font-semibold outline-none placeholder:text-teal-50/30"
                      />

                      <span className="whitespace-nowrap text-[12px] font-bold text-teal-50/50">
                        FCFA / mois
                      </span>
                    </div>
                  </div>
                )}

                <label className="mt-3 block">
                  <span className="flex items-center gap-1.5 text-[12px] font-bold text-teal-50/60">
                    <CalendarDays size={13} />
                    Disponible à partir du
                  </span>

                  <input
                    type="date"
                    value={form.availableFrom}
                    onChange={(e) =>
                      updateForm(
                        "availableFrom",
                        e.target.value
                      )
                    }
                    className="mt-1.5 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none focus:border-[#E9B44C]"
                  />
                </label>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#E9B44C]">
                  Description
                </p>

                <textarea
                  required
                  placeholder="Décrivez votre logement : pièces, équipements, étage, accès, proximité, particularités…"
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    updateForm(
                      "message",
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-[14px] outline-none placeholder:text-teal-50/40 focus:border-[#E9B44C]"
                />
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[13px] font-extrabold uppercase tracking-wider text-[#E9B44C]">
                  Photos du logement
                </p>

                <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.04] px-5 py-6 text-center transition hover:bg-white/[0.07]">
                  <ImagePlus
                    size={28}
                    className="text-[#E9B44C]"
                  />

                  <span className="mt-2 text-[14px] font-extrabold">
                    Ajouter des photos
                  </span>

                  <span className="mt-1 text-[12px] text-teal-50/60">
                    JPG, PNG ou WebP · jusqu'à 8 photos · 8 Mo par photo
                  </span>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    className="hidden"
                    onChange={(e) =>
                      handleFiles(e.target.files)
                    }
                  />
                </label>

                {selectedFiles.length > 0 && (
                  <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {selectedFiles.map(
                      (item, index) => (
                        <div
                          key={item.preview}
                          className="relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-white/5"
                        >
                          <img
                            src={item.preview}
                            alt={`Photo ${index + 1}`}
                            className="h-full w-full object-contain"
                          />

                          <button
                            type="button"
                            onClick={() =>
                              removeFile(index)
                            }
                            className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/70 text-white hover:bg-black"
                            aria-label={`Supprimer la photo ${
                              index + 1
                            }`}
                          >
                            <X size={15} />
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}

                <p className="mt-2 text-[12px] leading-relaxed text-teal-50/50">
                  Les photos sont conservées dans un stockage
                  privé et examinées par PAVA avant toute publication.
                </p>
              </div>

              <button
                disabled={sending}
                className="w-full rounded-xl bg-[#E2681B] py-3.5 font-extrabold transition hover:bg-[#c85a15] disabled:opacity-60"
              >
                {sending
                  ? selectedFiles.length > 0
                    ? "Envoi des photos et de la demande…"
                    : "Envoi de votre demande…"
                  : "Envoyer mon logement à PAVA"}
              </button>

              <a
                href={WHATSAPP_LINK(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/50 bg-[#25D366]/10 px-4 py-3 font-extrabold text-[#b8ffd3] transition hover:bg-[#25D366]/20"
              >
                <MessageCircle size={17} />
                Préférer WhatsApp
              </a>

              <p className="text-center text-[12px] text-teal-50/50">
                Sans engagement · Votre logement est vérifié avant toute
                publication
              </p>
            </form>
          ) : (
            <div className="mt-5 rounded-2xl border border-emerald-300/30 bg-emerald-400/10 p-6 text-center">
              <p className="text-[26px]">🎉</p>

              <p className="text-[18px] font-extrabold">
                Votre demande a bien été reçue !
              </p>

              <p className="mt-2 text-[14px] leading-relaxed text-teal-50/75">
                Merci{" "}
                {form.fullName.split(" ")[0] || ""}. PAVA va
                examiner les informations et les photos de votre
                logement, puis vous contacter pour la vérification
                avant publication.
              </p>

              <a
                href={WHATSAPP_LINK(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-[14px] font-bold text-white"
              >
                <MessageCircle size={15} />
                Continuer sur WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Annonces examinées",
      description:
        "Les logements proposés par les propriétaires sont examinés avant publication.",
    },
    {
      icon: Camera,
      title: "Photos et informations",
      description:
        "Les annonces peuvent présenter les photos et les caractéristiques transmises pour le logement.",
    },
    {
      icon: MessageCircle,
      title: "Contact avec PAVA",
      description:
        "Vous pouvez demander des informations complémentaires ou vérifier la disponibilité.",
    },
    {
      icon: SearchIcon,
      title: "Recherche simplifiée",
      description:
        "Cherchez selon le quartier, le type de logement, la durée et le budget.",
    },
    {
      icon: Wallet,
      title: "Des conditions visibles",
      description:
        "Les prix et informations disponibles sont affichés directement sur les annonces.",
    },
    {
      icon: Phone,
      title: "Accompagnement",
      description:
        "PAVA reste votre point de contact pour les demandes effectuées depuis la plateforme.",
    },
  ];

  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-4 py-14 scroll-mt-24 sm:px-6"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-[13px] font-bold text-[#006b75]">
          Services PAVA
        </p>

        <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-[#0a3f44]">
          Un parcours plus simple pour rechercher un logement
        </h2>

        <p className="mt-2 text-[15px] text-slate-600">
          PAVA centralise les informations utiles pour vous aider
          à trouver un logement et à prendre contact.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(6,46,50,0.1)]"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0a3f44] text-white shadow-lg">
              <item.icon size={22} />
            </span>

            <h3 className="mt-4 text-[16px] font-extrabold">
              {item.title}
            </h3>

            <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SearchIcon({
  size,
}: {
  size?: number;
}) {
  return (
    <svg
      width={size || 22}
      height={size || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function About() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="apropos"
      className="scroll-mt-24 border-y bg-[#f3ece0]/60"
    >
      <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6">
        <p className="inline-flex items-center gap-1.5 rounded-full border bg-white px-3.5 py-1.5 text-[13px] font-bold text-[#006b75]">
          <ShieldCheck size={15} />
          À propos de PAVA LOGEMENT
        </p>

        <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-[#0a3f44]">
          Se loger ne devrait pas être un parcours du combattant.
        </h2>

        <p className="mx-auto mt-3 max-w-3xl text-[16px] leading-relaxed text-slate-600">
          PAVA LOGEMENT est une plateforme pensée pour simplifier
          la recherche et la proposition de logements à Dakar,
          avec des informations plus claires et un processus de
          vérification avant publication.
        </p>

        <button
          onClick={() => setOpen(!open)}
          className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-[#0a3f44] px-6 py-2.5 font-bold text-[#0a3f44] transition hover:bg-[#0a3f44] hover:text-white"
        >
          {open
            ? "Masquer"
            : "En savoir plus sur PAVA"}

          <ChevronDown
            size={17}
            className={`transition ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {open && (
          <div className="mt-7 grid gap-4 text-left md:grid-cols-2 animate-fade-up">
            {[
              {
                title: "Une approche digitale",
                description:
                  "La plateforme permet de consulter les logements depuis un même espace et de rechercher selon plusieurs critères.",
              },
              {
                title: "Une vérification avant publication",
                description:
                  "Les propriétaires transmettent leurs informations et leurs photos. La publication intervient après examen par PAVA.",
              },
              {
                title: "Court ou long séjour",
                description:
                  "Le catalogue est pensé pour différentes durées de location et différents types de logements.",
              },
              {
                title: "Un contact simple",
                description:
                  "Les visiteurs peuvent utiliser les demandes présentes sur le site ou contacter PAVA sur WhatsApp.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border-l-4 border-l-[#E2681B] bg-white p-5 shadow-sm"
              >
                <p className="font-extrabold text-[#0a3f44]">
                  {item.title}
                </p>

                <p className="mt-1.5 text-[14px] leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            ["Dakar", "Zone de lancement"],
            ["Court & long séjour", "Durées proposées"],
            ["Vérification", "Avant publication"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border bg-white px-4 py-4"
            >
              <p className="font-extrabold text-[#0a3f44]">
                {value}
              </p>

              <p className="text-[13px] text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-[13px] font-bold text-[#006b75]">
          Vos premiers retours
        </p>

        <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-[#0a3f44]">
          Les premiers avis arrivent bientôt
        </h2>

        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">
          PAVA préfère afficher de vrais retours de clients plutôt
          que d&apos;inventer des témoignages.
        </p>

        <a
          href={WHATSAPP_LINK(
            "Bonjour PAVA LOGEMENT, je souhaite laisser un retour sur mon expérience."
          )}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0a3f44] px-6 py-3 font-extrabold text-white transition hover:bg-[#006b75]"
        >
          <MessageCircle size={16} />
          Partager mon expérience
        </a>
      </div>
    </section>
  );
}

const FAQS = [
  {
    q: "Comment trouver un logement ?",
    a: "Utilisez les filtres du catalogue pour rechercher par type de logement, quartier, durée de séjour et budget. Vous pouvez ensuite ouvrir une annonce pour consulter ses informations.",
  },
  {
    q: "Les logements sont-ils vérifiés ?",
    a: "Pour les logements proposés depuis le formulaire propriétaire, PAVA examine les informations et les photos avant publication.",
  },
  {
    q: "Puis-je proposer mon propre logement ?",
    a: "Oui. Utilisez la section « Ajouter mon logement », renseignez les informations demandées et joignez vos photos. La demande reste en attente jusqu'à sa vérification.",
  },
  {
    q: "Comment contacter PAVA ?",
    a: "Vous pouvez utiliser les boutons de contact présents sur le site ou écrire directement à PAVA sur WhatsApp.",
  },
  {
    q: "Les photos des propriétaires sont-elles publiques immédiatement ?",
    a: "Non. Les photos envoyées dans une demande propriétaire sont conservées dans un stockage privé et examinées avant toute publication.",
  },
  {
    q: "Comment fonctionnent les paiements ?",
    a: "Les conditions de paiement dépendent du logement et du propriétaire. Avant tout versement, vérifiez les modalités applicables à l'annonce et confirmez-les avec PAVA.",
  },
  {
    q: "Puis-je demander des informations supplémentaires ?",
    a: "Oui. Vous pouvez demander à PAVA des précisions sur la disponibilité, les caractéristiques du logement, les conditions de location ou les modalités de réservation.",
  },
  {
    q: "Le catalogue contient-il uniquement des locations longue durée ?",
    a: "Non. PAVA est pensé pour le court séjour et le long séjour. Les logements disponibles dépendent des annonces effectivement validées et publiées.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="mx-auto max-w-4xl px-4 pb-14 scroll-mt-24 sm:px-6"
    >
      <div className="text-center">
        <h2 className="text-[clamp(1.7rem,3.5vw,2.4rem)] font-extrabold tracking-tight text-[#0a3f44]">
          Questions fréquentes
        </h2>

        <p className="mt-2 text-[15px] text-slate-600">
          Les réponses essentielles avant de commencer une
          recherche.
        </p>
      </div>

      <div className="mt-7 space-y-3">
        {FAQS.map((item, index) => (
          <div
            key={item.q}
            className={`overflow-hidden rounded-2xl border bg-white transition ${
              open === index
                ? "border-[#006b75]/30 shadow-lg"
                : "shadow-sm"
            }`}
          >
            <button
              onClick={() =>
                setOpen(
                  open === index ? null : index
                )
              }
              className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-[15px] font-extrabold text-slate-900"
            >
              {item.q}

              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${
                  open === index
                    ? "bg-[#0a3f44] text-white"
                    : "bg-slate-100"
                }`}
              >
                <ChevronDown
                  size={17}
                  className={`transition ${
                    open === index
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </span>
            </button>

            {open === index && (
              <p className="px-5 pb-5 text-[14px] leading-relaxed text-slate-600 animate-fade-up">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
