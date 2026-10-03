import { db } from "@/db";
import { bookings, contactMessages, ownerLeads, properties } from "@/db/schema";
import { desc, sql } from "drizzle-orm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let bk: any[] = [], msgs: any[] = [], leads: any[] = [], countProps = 0;
  try {
    bk = await db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(50);
    msgs = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(50);
    leads = await db.select().from(ownerLeads).orderBy(desc(ownerLeads.createdAt)).limit(50);
    const c = await db.select({ n: sql<number>`count(*)` }).from(properties);
    countProps = Number(c[0]?.n || 0);
  } catch {}

  const fmt = (d: any) => (d ? new Date(d).toLocaleString("fr-SN", { dateStyle: "short", timeStyle: "short" }) : "—");

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[14px] font-bold text-[#006b75] hover:underline"><ArrowLeft size={16} /> Retour au site</Link>
        <h1 className="mt-3 text-[28px] font-extrabold tracking-tight">Tableau de bord — PAVA LOGEMENT</h1>
        <p className="text-slate-500 text-[14px]">Suivi des demandes de réservation, messages et leads propriétaires.</p>
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { v: countProps, l: "Logements en ligne" },
            { v: bk.length, l: "Demandes réservation" },
            { v: msgs.length, l: "Messages contact" },
            { v: leads.length, l: "Leads propriétaires" },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl bg-white border p-5 text-center shadow-sm"><p className="text-[26px] font-extrabold">{s.v}</p><p className="text-[13px] text-slate-500">{s.l}</p></div>
          ))}
        </div>

        <div className="mt-6 rounded-3xl bg-white border overflow-hidden">
          <h2 className="px-6 py-4 font-extrabold border-b">Dernières demandes de réservation ({bk.length})</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead><tr className="bg-slate-50 text-left text-slate-500"><th className="px-4 py-3">Date</th><th className="px-4 py-3">Client</th><th className="px-4 py-3">Tél</th><th className="px-4 py-3">Logement</th><th className="px-4 py-3">Séjour</th><th className="px-4 py-3">Arrivée → Départ</th><th className="px-4 py-3">Estimation</th></tr></thead>
              <tbody>
                {bk.map((b) => (
                  <tr key={b.id} className="border-t hover:bg-slate-50">
                    <td className="px-4 py-2.5 whitespace-nowrap">{fmt(b.createdAt)}</td>
                    <td className="px-4 py-2.5 font-bold">{b.fullName}</td>
                    <td className="px-4 py-2.5">{b.phone}</td>
                    <td className="px-4 py-2.5 max-w-[220px] truncate">{b.propertyTitle || "—"}</td>
                    <td className="px-4 py-2.5">{b.stayType} · {b.guests} pers.</td>
                    <td className="px-4 py-2.5 whitespace-nowrap">{b.checkIn || "—"} → {b.checkOut || "—"}</td>
                    <td className="px-4 py-2.5 font-bold">{b.totalEstimated ? Number(b.totalEstimated).toLocaleString("fr-SN") + " F" : "—"}</td>
                  </tr>
                ))}
                {bk.length === 0 && <tr><td colSpan={7} className="px-6 py-8 text-center text-slate-400">Aucune demande pour le moment — testez le formulaire de réservation.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-5 grid md:grid-cols-2 gap-5">
          <div className="rounded-3xl bg-white border overflow-hidden">
            <h2 className="px-6 py-4 font-extrabold border-b">Messages contact ({msgs.length})</h2>
            <div className="max-h-[380px] overflow-y-auto divide-y">
              {msgs.map((m) => (
                <div key={m.id} className="px-6 py-4"><p className="font-bold text-[14px]">{m.name} <span className="font-medium text-slate-400">· {fmt(m.createdAt)}</span></p><p className="text-[13px] text-[#006b75] font-semibold">{m.subject} · {m.phone} · {m.email}</p><p className="mt-1 text-[13px] text-slate-600">{m.message}</p></div>
              ))}
              {msgs.length === 0 && <p className="px-6 py-8 text-center text-slate-400 text-[13px]">Aucun message.</p>}
            </div>
          </div>
          <div className="rounded-3xl bg-white border overflow-hidden">
            <h2 className="px-6 py-4 font-extrabold border-b">Leads propriétaires ({leads.length})</h2>
            <div className="max-h-[380px] overflow-y-auto divide-y">
              {leads.map((l) => (
                <div key={l.id} className="px-6 py-4"><p className="font-bold text-[14px]">{l.fullName} <span className="font-medium text-slate-400">· {fmt(l.createdAt)}</span></p><p className="text-[13px] text-[#006b75] font-semibold">{l.propertyType} · {l.neighborhood} · {l.phone}</p><p className="mt-1 text-[13px] text-slate-600">{l.address} — {l.message}</p></div>
              ))}
              {leads.length === 0 && <p className="px-6 py-8 text-center text-slate-400 text-[13px]">Aucun lead.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
