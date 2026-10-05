import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      propertyId,
      propertyTitle,
      fullName,
      phone,
      email,
      checkIn,
      checkOut,
      guests,
      stayType,
      message,
      totalEstimated,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Nom et téléphone requis." },
        { status: 400 }
      );
    }

    const [row] = await db
      .insert(bookings)
      .values({
        propertyId: propertyId || null,
        propertyTitle: propertyTitle || null,
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : null,
        checkIn: checkIn || null,
        checkOut: checkOut || null,
        guests: guests ? Number(guests) : 1,
        stayType: stayType || "court",
        message: message || null,
        totalEstimated: totalEstimated
          ? Number(totalEstimated)
          : null,
        status: "nouveau",
      })
      .returning();

    return NextResponse.json({
      ok: true,
      bookingId: row.id,
    });
  } catch (error) {
    console.error("Erreur réservation :", error);

    return NextResponse.json(
      { error: "Erreur serveur." },
      { status: 500 }
    );
  }
}
