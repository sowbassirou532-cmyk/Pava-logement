import { NextResponse } from "next/server";

import { db } from "@/db";
import { properties } from "@/db/schema";
import { and, eq, ilike, lte, or, sql } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const quartier = searchParams.get("quartier");
  const stay = searchParams.get("stay"); // court | long | both
  const maxBudget = searchParams.get("maxBudget");
  const q = searchParams.get("q");

  const conds: any[] = [eq(properties.isAvailable, true)];

  // Type de logement
  if (type && type !== "all") {
    conds.push(eq(properties.type, type));
  }

  // Quartier
  if (quartier && quartier !== "all") {
    conds.push(eq(properties.neighborhood, quartier));
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
        ilike(properties.neighborhood, `%${q}%`),
        ilike(properties.description, `%${q}%`)
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

  return NextResponse.json({
    properties: rows,
    count: rows.length,
  });
}
