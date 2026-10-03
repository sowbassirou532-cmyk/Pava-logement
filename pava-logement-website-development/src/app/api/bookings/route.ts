import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { propertyId, propertyTitle, fullName, phone, email, checkIn, checkOut, guests, stayType, message, totalEstimated } = body;
    if (!fullName || !phone) {
      return NextResponse.json({ error: "Nom et téléphone requis." }, { status: 400 });
    }
    const [row] = await db
      .insert(bookings)
      .values({
        propertyId: propertyId || null,
        propertyTitle: propertyTitle || null,
        fullName,
        phone,
        email: email || null,
        checkIn: checkIn || null,
        checkOut: checkOut || null,
        guests: guests ? Number(guests) : 1,
        stayType: stayType || "court",
        message: message || null,
        totalEstimated: totalEstimated ? Number(totalEstimated) : null,
        status: "nouveau",
      })
      .returning();
    return NextResponse.json({ ok: true, booking: row });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  const rows = await db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(100);
  return NextResponse.json({ bookings: rows });
}
