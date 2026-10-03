import { NextResponse } from "next/server";
import { db } from "@/db";
import { ownerLeads } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, phone, email, propertyType, neighborhood, address, message } = body;
    if (!fullName || !phone) return NextResponse.json({ error: "Nom et téléphone requis." }, { status: 400 });
    const [row] = await db
      .insert(ownerLeads)
      .values({ fullName, phone, email, propertyType, neighborhood, address, message })
      .returning();
    return NextResponse.json({ ok: true, lead: row });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erreur" }, { status: 500 });
  }
}
