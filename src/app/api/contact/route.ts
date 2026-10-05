import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      phone,
      subject,
      message,
    } = body;

    if (!name || !message) {
      return NextResponse.json(
        {
          error: "Nom et message requis.",
        },
        {
          status: 400,
        }
      );
    }

    const [row] = await db
      .insert(contactMessages)
      .values({
        name: String(name).trim(),
        email: email
          ? String(email).trim()
          : null,
        phone: phone
          ? String(phone).trim()
          : null,
        subject: subject
          ? String(subject).trim()
          : null,
        message: String(message).trim(),
      })
      .returning();

    return NextResponse.json({
      ok: true,
      messageId: row.id,
    });
  } catch (error) {
    console.error("Erreur contact :", error);

    return NextResponse.json(
      {
        error: "Erreur serveur.",
      },
      {
        status: 500,
      }
    );
  }
}
