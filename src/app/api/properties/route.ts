import { NextResponse } from "next/server";

import { db } from "@/db";
import { properties } from "@/db/schema";
import { and, eq, ilike, lte, or, sql } from "drizzle-orm";
import { issueSignedToken, presignUrl } from "@vercel/blob";

export const dynamic = "force-dynamic";

async function getPrivatePreviewUrl(imageUrl: string) {
  try {
    const sourceUrl = new URL(imageUrl);

    // Les images externes/publics restent inchangées.
    if (!sourceUrl.hostname.includes(".blob.vercel-storage.com")) {
      return imageUrl;
    }

    const pathname = decodeURIComponent(sourceUrl.pathname).replace(
      /^\/+/,
      ""
    );

    const validUntil = Date.now() + 24 * 60 * 60 * 1000;

    const token = await issueSignedToken({
      pathname,
      operations: ["get"],
      validUntil,
    });

    const result = await presignUrl(token, {
      pathname,
      operation: "get",
      access: "private",
      validUntil,
    });

    return result.presignedUrl;
  } catch {
    return null;
  }
}

async function signPropertyImages(images: unknown) {
  if (!Array.isArray(images)) {
    return [];
  }

  const urls = images.filter(
    (value: unknown): value is string =>
      typeof value === "string"
  );

  const signed = await Promise.all(
    urls.map((url) => getPrivatePreviewUrl(url))
  );

  return signed.filter(
    (url): url is string => Boolean(url)
  );
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const quartier = searchParams.get("quartier");
  const stay = searchParams.get("stay"); // court | long | both
  const maxBudget = searchParams.get("maxBudget");
  const q = searchParams.get("q");

  const conds: any[] = [
    eq(properties.isAvailable, true),
  ];

  // Type de logement
  if (type && type !== "all") {
    conds.push(eq(properties.type, type));
  }

  // Quartier
  if (quartier && quartier !== "all") {
    conds.push(
      eq(properties.neighborhood, quartier)
    );
  }

  // Type de séjour
  if (stay === "court") {
    conds.push(
      or(
        eq(properties.stayType, "court"),
        eq(properties.stayType, "both")
      )
    );
  }

  if (stay === "long") {
    conds.push(
      or(
        eq(properties.stayType, "long"),
        eq(properties.stayType, "both")
      )
    );
  }

  // Budget maximum
  // Court séjour = prix par nuit
  // Long séjour = prix par mois
  if (maxBudget) {
    const b = parseInt(maxBudget, 10);

    if (!isNaN(b) && b > 0) {
      if (stay === "court") {
        conds.push(
          lte(properties.pricePerNight, b)
        );
      } else if (stay === "long") {
        conds.push(
          lte(properties.pricePerMonth, b)
        );
      } else {
        conds.push(
          or(
            lte(properties.pricePerMonth, b),
            lte(properties.pricePerNight, b)
          )
        );
      }
    }
  }

  // Recherche texte
  if (q && q.trim()) {
    conds.push(
      or(
        ilike(properties.title, `%${q}%`),
        ilike(
          properties.neighborhood,
          `%${q}%`
        ),
        ilike(
          properties.description,
          `%${q}%`
        )
      )
    );
  }

  const rows = await db
    .select()
    .from(properties)
    .where(and(...conds))
    .orderBy(
      sql`${properties.isFeatured} DESC, ${properties.rating} DESC`
    );

  const result = await Promise.all(
    rows.map(async (row) => ({
      ...row,
      amenities:
        (row.amenities as string[]) || [],
      images: await signPropertyImages(
        row.images
      ),
    }))
  );

  return NextResponse.json({
    properties: result,
    count: result.length,
  });
}
