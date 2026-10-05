"use client";

import { useState } from "react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/site";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";

export function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Demande de logement",
    message: "",
  });

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="bg-[#062e32] scroll-mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14">
        <div className="text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3.5 py-1.5 text-[13px] font-bold text-white">
            Contact
          </p>

          <h2 className="mt-3 text-[clamp(1.7rem,3.5vw,2.5rem)] font-extrabold tracking-tight text-white">
            Parlons de votre projet logement
          </h2>

          <p className="mt-2 text-teal-50/70 text-[15px]">
            Appelez, écrivez ou utilisez WhatsApp pour votre demande.
          </p>
        </div>

        <div className="mt-8 grid lg:grid-cols-[0.9fr_1.1fr] gap-5">
          <div className="rounded-3xl bg-white/[0.06] border border-white/10 backdrop-blur p-7 text-white">
            <h3 className="font-extrabold text-[18px]">
              Nos coordonnées
            </h3>

            <ul className="mt-5 space-y-4 text-[14px]">
              <li className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E2681B]">
                  <MapPin size={18} />
                </span>

                <span>
                  <strong>Adresse</strong>
                  <br />
                  <span className="text-teal-50/75">
                    {CONTACT.address}
                  </span>
                  <br />

                  <a
                    href="https://maps.google.com/?q=Médina+Dakar"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#E9B44C] font-bold hover:underline text-[13px]"
                  >
                    → Voir sur Google Maps
                  </a>
                </span>
              </li>

              <li className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E2681B]">
                  <Phone size={18} />
                </span>

                <span>
                  <strong>Téléphone & WhatsApp</strong>
                  <br />

                  <span className="text-teal-50/75">
                    {CONTACT.phones.join(" · ")}
                  </span>
                </span>
              </li>

              <li className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E2681B]">
                  <Mail size={18} />
                </span>

                <span>
                  <strong>Email</strong>
                  <br />

                  <span className="text-teal-50/75">
                    {CONTACT.emails[0]}
                  </span>
                </span>
              </li>

              <li className="flex gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E2681B]">
                  <Clock size={18} />
                </span>

                <span>
                  <strong>Disponibilités</strong>
                  <br />

                  <span className="text-teal-50/75">
                    {CONTACT.hours}
                  </span>
                </span>
              </li>
            </ul>

            <a
              href={WHATSAPP_LINK(
                "Bonjour PAVA LOGEMENT, je veux discuter d'un logement."
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-3.5 font-extrabold hover:brightness-95 transition"
            >
              <MessageCircle size={19} />
              Discuter sur WhatsApp
            </a>

            <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="PAVA LOGEMENT Dakar"
                src="https://www.google.com/maps?q=M%C3%A9dina+Dakar+S%C3%A9n%C3%A9gal&output=embed"
                className="h-[190px] w-full grayscale-[0.2]"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-3xl bg-white p-7 sm:p-8">
            <h3 className="font-extrabold text-[18px] text-slate-900">
              Envoyez-nous un message
            </h3>

            <p className="mt-1 text-[14px] text-slate-500">
              Décrivez simplement votre demande et les informations utiles
              à votre recherche.
            </p>

            {!sent ? (
              <form onSubmit={submit} className="mt-5 space-y-3.5">
                <div className="grid sm:grid-cols-2 gap-3.5">
                  <input
                    required
                    placeholder="Votre nom *"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="rounded-xl border bg-slate-50 px-4 py-3 text-[14px] outline-none focus:border-[#006b75] focus:bg-white"
                  />

                  <input
                    placeholder="Téléphone / WhatsApp"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        phone: e.target.value,
                      })
                    }
                    className="rounded-xl border bg-slate-50 px-4 py-3 text-[14px] outline-none focus:border-[#006b75] focus:bg-white"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3.5">
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="rounded-xl border bg-slate-50 px-4 py-3 text-[14px] outline-none focus:border-[#006b75] focus:bg-white"
                  />

                  <select
                    value={form.subject}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        subject: e.target.value,
                      })
                    }
                    className="rounded-xl border bg-slate-50 px-4 py-3 text-[14px] font-medium outline-none focus:border-[#006b75]"
                  >
                    <option>Demande de logement</option>
                    <option>Court séjour</option>
                    <option>Longue durée</option>
                    <option>Proposer un logement</option>
                    <option>Partenariat entreprise</option>
                    <option>Autre demande</option>
                  </select>
                </div>

                <textarea
                  required
                  rows={5}
                  placeholder="Votre message… (dates, quartier, budget, nombre de personnes)"
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border bg-slate-50 px-4 py-3 text-[14px] outline-none focus:border-[#006b75] focus:bg-white"
                />

                <button
                  disabled={sending}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0a3f44] py-3.5 font-extrabold text-white hover:bg-[#006b75] transition disabled:opacity-60"
                >
                  <Send size={17} />
                  {sending ? "Envoi…" : "Envoyer le message"}
                </button>

                <p className="text-center text-[12px] text-slate-400">
                  En envoyant, vous acceptez d'être recontacté par PAVA
                  LOGEMENT.
                </p>
              </form>
            ) : (
              <div className="mt-5 rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center">
                <p className="text-[30px]">✅</p>

                <p className="font-extrabold text-emerald-900 text-[18px]">
                  Message envoyé !
                </p>

                <p className="mt-1.5 text-[14px] text-emerald-800">
                  Merci {form.name.split(" ")[0]}. Votre demande a bien été
                  transmise à PAVA LOGEMENT.
                </p>

                <a
                  href={WHATSAPP_LINK(
                    `Bonjour, je suis ${form.name}. ${form.message}`
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 font-bold text-white"
                >
                  <MessageCircle size={17} />
                  Continuer sur WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
