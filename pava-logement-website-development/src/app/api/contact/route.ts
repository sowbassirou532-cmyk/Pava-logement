import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;
    if (!name || !message) return NextResponse.json({ error: "Nom et message requis." }, { status: 400 });
    const [row] = await db.insert(contactMessages).values({ name, email, phone, subject, message }).returning();
    return NextResponse.json({ ok: true, message: row });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || "Erreur" }, { status: 500 });
  }
}

export async function GET() {
  const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(100);
  return NextResponse.json({ messages: rows });
}
