import { NextResponse } from "next/server";
import { db } from "@/db";
import { ownerLeads } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      phone,
      email,
      propertyType,
      neighborhood,
      address,
      stayType,
      pricePerNight,
      pricePerMonth,
      bedrooms,
      bathrooms,
      surfaceM2,
      furnished,
      availableFrom,
      message,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Nom et téléphone requis." },
        { status: 400 }
      );
    }

    const parsedPricePerNight =
      pricePerNight !== "" &&
      pricePerNight !== null &&
      pricePerNight !== undefined
        ? Number(pricePerNight)
        : null;

    const parsedPricePerMonth =
      pricePerMonth !== "" &&
      pricePerMonth !== null &&
      pricePerMonth !== undefined
        ? Number(pricePerMonth)
        : null;

    const parsedBedrooms =
      bedrooms !== "" &&
      bedrooms !== null &&
      bedrooms !== undefined
        ? Number(bedrooms)
        : null;

    const parsedBathrooms =
      bathrooms !== "" &&
      bathrooms !== null &&
      bathrooms !== undefined
        ? Number(bathrooms)
        : null;

    const parsedSurfaceM2 =
      surfaceM2 !== "" &&
      surfaceM2 !== null &&
      surfaceM2 !== undefined
        ? Number(surfaceM2)
        : null;

    const parsedAvailableFrom =
      availableFrom !== "" &&
      availableFrom !== null &&
      availableFrom !== undefined
        ? availableFrom
        : null;

    const [row] = await db
      .insert(ownerLeads)
      .values({
        fullName,
        phone,
        email: email || null,
        propertyType: propertyType || null,
        neighborhood: neighborhood || null,
        address: address || null,
        stayType: stayType || null,
        pricePerNight: parsedPricePerNight,
        pricePerMonth: parsedPricePerMonth,
        bedrooms: parsedBedrooms,
        bathrooms: parsedBathrooms,
        surfaceM2: parsedSurfaceM2,
        furnished: furnished || null,
        availableFrom: parsedAvailableFrom,
        message: message || null,
        images: [],
        status: "pending",
      })
      .returning();

    return NextResponse.json({
      ok: true,
      lead: row,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e?.message || "Erreur lors de l'enregistrement de la demande.",
      },
      { status: 500 }
    );
  }
}
