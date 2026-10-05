import { db } from "@/db";
import {
  bookings,
  contactMessages,
  ownerLeads,
  properties,
} from "@/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowLeft,
  Building2,
  CheckCircle2,
  Clock3,
  Image as ImageIcon,
  MessageCircle,
  XCircle,
  Eye,
  Phone,
  Mail,
} from "lucide-react";
import { issueSignedToken, presignUrl, get, put } from "@vercel/blob";

export const dynamic = "force-dynamic";

const formatDate = (value: unknown) =>
  value
    ? new Date(value as string | Date).toLocaleString("fr-SN", {
        dateStyle: "short",
        timeStyle: "short",
      })
    : "—";

const formatMoney = (value: unknown) =>
  value
    ? `${Number(value).toLocaleString("fr-SN")} FCFA`
    : "—";

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const normalizeType = (value: string | null) => {
  const type = (value || "logement").trim().toLowerCase();

  const map: Record<string, string> = {
    appartement: "appartement",
    studio: "studio",
    duplex: "duplex",
    chambre: "chambre",
    villa: "villa",
    maison: "maison",
  };

  return map[type] || "appartement";
};

const normalizeStayType = (value: string | null) => {
  if (value === "court") return "court";
  if (value === "both") return "both";
  return "long";
};

async function privateBlobToPublic(
  privateUrl: string,
  leadId: string,
  index: number
) {
  const sourceUrl = new URL(privateUrl);
  const pathname = decodeURIComponent(sourceUrl.pathname).replace(
    /^\/+/,
    ""
  );

  const result = await get(pathname, {
    access: "private",
  });

  if (!result) {
    throw new Error("Photo privée introuvable.");
  }

  if (!result.stream) {
    throw new Error("Flux de la photo indisponible.");
  }

  const extension =
    result.blob.contentType === "image/png"
      ? "png"
      : result.blob.contentType === "image/webp"
      ? "webp"
      : "jpg";

  const destination = `properties/${leadId}/photo-${
    index + 1
  }-${Date.now()}.${extension}`;

  const publicBlob = await put(destination, result.stream, {
    access: "public",
    contentType: result.blob.contentType || "image/jpeg",
  });

  return publicBlob.url;
}

async function getPrivatePreviewUrl(privateUrl: string) {
  try {
    const sourceUrl = new URL(privateUrl);
    const pathname = decodeURIComponent(sourceUrl.pathname).replace(
      /^\/+/,
      ""
    );

    const token = await issueSignedToken({
      pathname,
      operations: ["get"],
    });

    const result = await presignUrl(token, {
      pathname,
      operation: "get",
      validUntil: Date.now() + 30 * 60 * 1000,
    });

    return result.presignedUrl;
  } catch {
    return null;
  }
}

async function approveLead(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");

  if (!id) return;

  const rows = await db
    .select()
    .from(ownerLeads)
    .where(eq(ownerLeads.id, id))
    .limit(1);

  const lead = rows[0];

  if (!lead) return;

  if (
    lead.status !== "pending" &&
    lead.status !== "en attente"
  ) {
    redirect("/admin");
  }

  const privateImages = Array.isArray(lead.images)
    ? lead.images.filter(
        (value): value is string =>
          typeof value === "string" && value.startsWith("http")
      )
    : [];

  let publicImages: string[] = [];

  if (privateImages.length > 0) {
    publicImages = await Promise.all(
      privateImages.map((url, index) =>
        privateBlobToPublic(url, lead.id, index)
      )
    );
  }

  const propertyType = normalizeType(lead.propertyType);

  const neighborhood =
    lead.neighborhood?.trim() || "Dakar";

  const stayType = normalizeStayType(lead.stayType);

  const title =
    lead.propertyType && lead.neighborhood
      ? `${lead.propertyType} à ${neighborhood}`
      : `Logement à ${neighborhood}`;

  const slugBase =
    slugify(title) || "logement-dakar";

  const slug = `${slugBase}-${lead.id.slice(0, 8)}`;

  await db.insert(properties).values({
    title,
    slug,
    type: propertyType,
    stayType,
    neighborhood,
    address: lead.address || null,
    pricePerNight: lead.pricePerNight || null,
    pricePerMonth: lead.pricePerMonth || null,
    bedrooms: lead.bedrooms || 1,
    bathrooms: lead.bathrooms || 1,
    surfaceM2: lead.surfaceM2 || null,
    maxGuests: Math.max(
      1,
      Number(lead.bedrooms || 1) * 2
    ),
    description: lead.message || null,
    amenities: lead.furnished
      ? [lead.furnished]
      : [],
    images: publicImages,
    isAvailable: true,
    isFeatured: false,
    rating: 48,
    reviewsCount: 0,
  });

  await db
    .update(ownerLeads)
    .set({
      status: "approved",
      reviewNotes:
        "Logement validé et publié par PAVA.",
      reviewedAt: new Date(),
    })
    .where(eq(ownerLeads.id, id));

  revalidatePath("/admin");
  revalidatePath("/");

  redirect("/admin");
}

async function rejectLead(formData: FormData) {
  "use server";

  const id = String(formData.get("id") || "");
  const notes = String(formData.get("notes") || "").trim();

  if (!id) return;

  await db
    .update(ownerLeads)
    .set({
      status: "rejected",
      reviewNotes:
        notes ||
        "Demande refusée après vérification.",
      reviewedAt: new Date(),
    })
    .where(eq(ownerLeads.id, id));

  revalidatePath("/admin");

  redirect("/admin");
}

export default async function AdminPage() {
  let bookingsRows: any[] = [];
  let messagesRows: any[] = [];
  let leadsRows: any[] = [];
  let propertiesCount = 0;

  try {
    bookingsRows = await db
      .select()
      .from(bookings)
      .orderBy(desc(bookings.createdAt))
      .limit(50);

    messagesRows = await db
      .select()
      .from(contactMessages)
      .orderBy(desc(contactMessages.createdAt))
      .limit(50);

    leadsRows = await db
      .select()
      .from(ownerLeads)
      .orderBy(desc(ownerLeads.createdAt))
      .limit(30);

    const propertyCountResult = await db
      .select({
        n: sql<number>`count(*)`,
      })
      .from(properties);

    propertiesCount = Number(
      propertyCountResult[0]?.n || 0
    );
  } catch {
    bookingsRows = [];
    messagesRows = [];
    leadsRows = [];
  }

  const pendingLeads = leadsRows.filter(
    (lead) =>
      lead.status === "pending" ||
      lead.status === "en attente"
  );

  const approvedLeads = leadsRows.filter(
    (lead) => lead.status === "approved"
  );

  const rejectedLeads = leadsRows.filter(
    (lead) => lead.status === "rejected"
  );

  const pendingWithPreviews =
    await Promise.all(
      pendingLeads.map(async (lead) => {
        const sourceImages = Array.isArray(lead.images)
          ? lead.images.filter(
              (value): value is string =>
                typeof value === "string" &&
                value.startsWith("http")
            )
          : [];

        const previews = (
          await Promise.all(
            sourceImages
              .slice(0, 8)
              .map(getPrivatePreviewUrl)
          )
        ).filter(
          (url): url is string => Boolean(url)
        );

        return {
          lead,
          previews,
        };
      })
    );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[14px] font-bold text-[#006b75] hover:underline"
        >
          <ArrowLeft size={16} />
          Retour au site
        </Link>

        <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 text-[12px] font-extrabold text-[#006b75]">
              <Building2 size={14} />
              Espace privé PAVA
            </p>

            <h1 className="mt-3 text-[30px] font-extrabold tracking-tight text-[#0a3f44]">
              Tableau de bord PAVA LOGEMENT
            </h1>

            <p className="mt-1 text-[14px] text-slate-500">
              Vérification des demandes propriétaires, réservations et
              messages.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-white border px-4 py-2 text-[13px] font-bold text-slate-600 shadow-sm">
            <Clock3 size={15} />
            {pendingLeads.length} demande
            {pendingLeads.length > 1 ? "s" : ""} en attente
          </div>
        </div>

        {/* Statistiques */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-3">
          {[
            {
              value: propertiesCount,
              label: "Logements en ligne",
            },
            {
              value: pendingLeads.length,
              label: "À vérifier",
            },
            {
              value: approvedLeads.length,
              label: "Validés",
            },
            {
              value: rejectedLeads.length,
              label: "Refusés",
            },
            {
              value: bookingsRows.length,
              label: "Réservations",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white border p-5 shadow-sm"
            >
              <p className="text-[26px] font-extrabold text-[#0a3f44]">
                {item.value}
              </p>

              <p className="mt-1 text-[13px] text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        {/* Demandes propriétaires */}
        <section className="mt-7">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.15em] text-[#006b75]">
                Vérification
              </p>

              <h2 className="mt-1 text-[22px] font-extrabold text-[#0a3f44]">
                Demandes de logements
              </h2>
            </div>

            <span className="rounded-full bg-orange-50 border border-orange-100 px-3 py-1.5 text-[12px] font-extrabold text-[#b34a0e]">
              {pendingLeads.length} en attente
            </span>
          </div>

          <div className="mt-4 space-y-5">
            {pendingWithPreviews.map(
              ({ lead, previews }) => {
                const prices = [];

                if (lead.pricePerNight) {
                  prices.push(
                    `${formatMoney(
                      lead.pricePerNight
                    )} / nuit`
                  );
                }

                if (lead.pricePerMonth) {
                  prices.push(
                    `${formatMoney(
                      lead.pricePerMonth
                    )} / mois`
                  );
                }

                return (
                  <article
                    key={lead.id}
                    className="overflow-hidden rounded-3xl bg-white border shadow-sm"
                  >
                    <div className="grid lg:grid-cols-[1.4fr_1fr]">
                      <div className="p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-orange-50 border border-orange-100 px-3 py-1.5 text-[12px] font-extrabold text-[#b34a0e]">
                            EN ATTENTE
                          </span>

                          <span className="rounded-full bg-teal-50 border border-teal-100 px-3 py-1.5 text-[12px] font-extrabold text-[#006b75]">
                            {lead.propertyType ||
                              "Logement"}
                          </span>

                          <span className="text-[12px] text-slate-400">
                            {formatDate(
                              lead.createdAt
                            )}
                          </span>
                        </div>

                        <h3 className="mt-3 text-[21px] font-extrabold text-slate-900">
                          {lead.propertyType ||
                            "Logement"}{" "}
                          à{" "}
                          {lead.neighborhood ||
                            "Dakar"}
                        </h3>

                        <div className="mt-4 grid sm:grid-cols-2 gap-3">
                          <div className="rounded-2xl bg-slate-50 border p-4">
                            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              Propriétaire
                            </p>

                            <p className="mt-1 font-extrabold">
                              {lead.fullName}
                            </p>

                            <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-slate-600">
                              <Phone size={13} />
                              {lead.phone}
                            </p>

                            {lead.email ? (
                              <p className="mt-1 inline-flex items-center gap-1.5 text-[13px] text-slate-600">
                                <Mail size={13} />
                                {lead.email}
                              </p>
                            ) : null}
                          </div>

                          <div className="rounded-2xl bg-slate-50 border p-4">
                            <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                              Logement
                            </p>

                            <p className="mt-1 font-bold">
                              {lead.neighborhood ||
                                "Dakar"}
                            </p>

                            <p className="mt-1 text-[13px] text-slate-600">
                              {lead.address ||
                                "Adresse non renseignée"}
                            </p>

                            <p className="mt-1 text-[13px] text-slate-600">
                              {lead.bedrooms || 0}{" "}
                              chambre
                              {Number(
                                lead.bedrooms || 0
                              ) > 1
                                ? "s"
                                : ""}{" "}
                              ·{" "}
                              {lead.bathrooms || 0}{" "}
                              SDB ·{" "}
                              {lead.surfaceM2 ||
                                "—"}{" "}
                              m²
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700">
                            Séjour :{" "}
                            {lead.stayType ===
                            "court"
                              ? "Court"
                              : lead.stayType ===
                                "both"
                              ? "Court + long"
                              : "Long"}
                          </span>

                          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[12px] font-bold text-slate-700">
                            {lead.furnished ||
                              "Non précisé"}
                          </span>

                          {prices.map((price) => (
                            <span
                              key={price}
                              className="rounded-full bg-orange-50 px-3 py-1.5 text-[12px] font-bold text-[#9a3f0a]"
                            >
                              {price}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 rounded-2xl border bg-slate-50 p-4">
                          <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                            Description
                          </p>

                          <p className="mt-1.5 whitespace-pre-line text-[13px] leading-relaxed text-slate-700">
                            {lead.message ||
                              "Aucune description."}
                          </p>
                        </div>
                      </div>

                      <div className="border-t lg:border-t-0 lg:border-l bg-slate-50 p-5">
                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center gap-2 text-[13px] font-extrabold text-slate-700">
                            <ImageIcon size={16} />

                            {previews.length} photo
                            {previews.length > 1
                              ? "s"
                              : ""}
                          </div>

                          <span className="text-[12px] text-slate-400">
                            Aperçu privé
                          </span>
                        </div>

                        {previews.length > 0 ? (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {previews.map(
                              (
                                preview,
                                index
                              ) => (
                                <a
                                  key={preview}
                                  href={preview}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="group relative aspect-square overflow-hidden rounded-2xl bg-slate-200 border"
                                >
                                  <img
                                    src={preview}
                                    alt={`Photo ${
                                      index + 1
                                    }`}
                                    className="h-full w-full object-cover transition group-hover:scale-105"
                                  />

                                  <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-1 text-[11px] font-bold text-white">
                                    <Eye
                                      size={12}
                                      className="inline mr-1"
                                    />
                                    Voir
                                  </span>
                                </a>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="mt-3 rounded-2xl border border-dashed bg-white p-8 text-center text-[13px] text-slate-400">
                            Aucune photo disponible.
                          </div>
                        )}

                        <div className="mt-4 space-y-2">
                          <form
                            action={approveLead}
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={lead.id}
                            />

                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a3f44] px-4 py-3 text-[14px] font-extrabold text-white hover:bg-[#006b75] transition">
                              <CheckCircle2
                                size={17}
                              />
                              Valider et publier
                            </button>
                          </form>

                          <form
                            action={rejectLead}
                            className="space-y-2"
                          >
                            <input
                              type="hidden"
                              name="id"
                              value={lead.id}
                            />

                            <input
                              name="notes"
                              placeholder="Motif du refus (optionnel)"
                              className="w-full rounded-xl border bg-white px-3.5 py-2.5 text-[13px] outline-none focus:border-[#006b75]"
                            />

                            <button className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-4 py-3 text-[14px] font-extrabold text-red-700 hover:bg-red-100 transition">
                              <XCircle
                                size={17}
                              />
                              Refuser la demande
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }
            )}

            {pendingWithPreviews.length === 0 && (
              <div className="rounded-3xl bg-white border p-10 text-center">
                <CheckCircle2
                  size={32}
                  className="mx-auto text-emerald-500"
                />

                <p className="mt-3 font-extrabold text-slate-800">
                  Aucune demande en attente.
                </p>

                <p className="mt-1 text-[13px] text-slate-500">
                  Les nouvelles demandes propriétaires
                  apparaîtront ici.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Réservations */}
        <section className="mt-7 rounded-3xl bg-white border overflow-hidden">
          <h2 className="px-6 py-4 font-extrabold border-b text-[#0a3f44]">
            Dernières demandes de réservation (
            {bookingsRows.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-left text-slate-500">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Client</th>
                  <th className="px-4 py-3">Tél</th>
                  <th className="px-4 py-3">Logement</th>
                  <th className="px-4 py-3">Séjour</th>
                  <th className="px-4 py-3">Dates</th>
                  <th className="px-4 py-3">Estimation</th>
                </tr>
              </thead>

              <tbody>
                {bookingsRows.map((booking) => (
                  <tr
                    key={booking.id}
                    className="border-t hover:bg-slate-50"
                  >
                    <td className="px-4 py-2.5 whitespace-nowrap">
                      {formatDate(
                        booking.createdAt
                      )}
                    </td>

                    <td className="px-4 py-2.5 font-bold">
                      {booking.fullName}
                    </td>

                    <td className="px-4 py-2.5">
                      {booking.phone}
                    </td>

                    <td className="px-4 py-2.5 max-w-[220px] truncate">
                      {booking.propertyTitle ||
                        "—"}
                    </td>

                    <td className="px-4 py-2.5">
                      {booking.stayType} ·{" "}
                      {booking.guests} pers.
                    </td>

                    <td className="px-4 py-2.5 whitespace-nowrap">
                      {booking.checkIn || "—"} →{" "}
                      {booking.checkOut || "—"}
                    </td>

                    <td className="px-4 py-2.5 font-bold">
                      {booking.totalEstimated
                        ? formatMoney(
                            booking.totalEstimated
                          )
                        : "—"}
                    </td>
                  </tr>
                ))}

                {bookingsRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-8 text-center text-slate-400"
                    >
                      Aucune demande pour le moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Messages + historique propriétaires */}
        <div className="mt-5 grid lg:grid-cols-2 gap-5">
          <section className="rounded-3xl bg-white border overflow-hidden">
            <h2 className="px-6 py-4 font-extrabold border-b text-[#0a3f44]">
              Messages contact (
              {messagesRows.length})
            </h2>

            <div className="max-h-[420px] overflow-y-auto divide-y">
              {messagesRows.map((message) => (
                <div
                  key={message.id}
                  className="px-6 py-4"
                >
                  <p className="font-bold text-[14px]">
                    {message.name}
                  </p>

                  <p className="mt-1 text-[12px] text-slate-400">
                    {formatDate(
                      message.createdAt
                    )}
                  </p>

                  <p className="mt-1 text-[13px] text-[#006b75] font-semibold">
                    {message.subject ||
                      "Demande"}{" "}
                    · {message.phone || "—"} ·{" "}
                    {message.email || "—"}
                  </p>

                  <p className="mt-1 text-[13px] text-slate-600 whitespace-pre-line">
                    {message.message}
                  </p>
                </div>
              ))}

              {messagesRows.length === 0 && (
                <p className="px-6 py-8 text-center text-slate-400 text-[13px]">
                  Aucun message.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-3xl bg-white border overflow-hidden">
            <h2 className="px-6 py-4 font-extrabold border-b text-[#0a3f44]">
              Historique propriétaires (
              {leadsRows.length})
            </h2>

            <div className="max-h-[420px] overflow-y-auto divide-y">
              {leadsRows.map((lead) => {
                const status =
                  lead.status === "approved"
                    ? "Validé"
                    : lead.status === "rejected"
                    ? "Refusé"
                    : "En attente";

                return (
                  <div
                    key={lead.id}
                    className="px-6 py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-bold text-[14px]">
                        {lead.fullName}
                      </p>

                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                          lead.status === "approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : lead.status ===
                              "rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-orange-50 text-orange-700"
                        }`}
                      >
                        {status}
                      </span>
                    </div>

                    <p className="mt-1 text-[13px] text-[#006b75] font-semibold">
                      {lead.propertyType ||
                        "Logement"}{" "}
                      ·{" "}
                      {lead.neighborhood ||
                        "Dakar"}{" "}
                      · {lead.phone}
                    </p>

                    {lead.reviewNotes ? (
                      <p className="mt-1 text-[12px] text-slate-500">
                        {lead.reviewNotes}
                      </p>
                    ) : null}
                  </div>
                );
              })}

              {leadsRows.length === 0 && (
                <p className="px-6 py-8 text-center text-slate-400 text-[13px]">
                  Aucun lead propriétaire.
                </p>
              )}
            </div>
          </section>
        </div>

        <div className="mt-7 rounded-2xl border bg-white p-4 text-[13px] text-slate-500">
          <span className="inline-flex items-center gap-2 font-bold text-[#0a3f44]">
            <MessageCircle size={15} />
            Contrôle PAVA
          </span>

          <span className="ml-2">
            Une demande n'apparaît dans le catalogue qu'après validation.
          </span>
        </div>
      </div>
    </div>
  );
}
