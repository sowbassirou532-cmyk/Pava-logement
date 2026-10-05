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
      images,
    } = body;

    if (!fullName || !phone) {
      return NextResponse.json(
        { error: "Nom et téléphone requis." },
        { status: 400 }
      );
    }

    const toNumberOrNull = (value: unknown) => {
      if (
        value === "" ||
        value === null ||
        value === undefined
      ) {
        return null;
      }

      const number = Number(value);

      return Number.isFinite(number) ? number : null;
    };

    const parsedImages = Array.isArray(images)
      ? images.filter(
          (image): image is string =>
            typeof image === "string" &&
            image.trim().length > 0
        )
      : [];

    const [row] = await db
      .insert(ownerLeads)
      .values({
        fullName: String(fullName).trim(),
        phone: String(phone).trim(),
        email: email ? String(email).trim() : null,

        propertyType: propertyType
          ? String(propertyType)
          : null,

        neighborhood: neighborhood
          ? String(neighborhood)
          : null,

        address: address
          ? String(address).trim()
          : null,

        stayType: stayType
          ? String(stayType)
          : null,

        pricePerNight: toNumberOrNull(pricePerNight),
        pricePerMonth: toNumberOrNull(pricePerMonth),

        bedrooms: toNumberOrNull(bedrooms),
        bathrooms: toNumberOrNull(bathrooms),
        surfaceM2: toNumberOrNull(surfaceM2),

        furnished: furnished
          ? String(furnished)
          : null,

        availableFrom: availableFrom
          ? String(availableFrom)
          : null,

        message: message
          ? String(message)
          : null,

        images: parsedImages,

        status: "pending",
      })
      .returning();

    return NextResponse.json({
      ok: true,
      lead: row,
    });
  } catch (error: any) {
    console.error(
      "Erreur création demande propriétaire :",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Erreur lors de l'enregistrement de la demande.",
      },
      { status: 500 }
    );
  }
}
