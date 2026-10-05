import Link from "next/link";

const SITE_URL =
  "https://pava-logement-21gy-eight.vercel.app";

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-[#faf7f1] text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-3"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[#0a3f44] to-[#006b75]">
              <svg
                viewBox="0 0 32 32"
                className="h-7 w-7"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M6 20 L16 8 L26 20"
                  stroke="#E2681B"
                  strokeWidth={3.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 20 L16 14 L21 20"
                  stroke="#fff"
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="14.6"
                  y="20"
                  width="2.8"
                  height="6"
                  rx="1"
                  fill="#E9B44C"
                />
              </svg>
            </span>

            <span>
              <span className="block text-[18px] font-extrabold tracking-tight text-[#0a3f44]">
                PAVA{" "}
                <span className="text-[#E2681B]">
                  LOGEMENT
                </span>
              </span>

              <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                PAVA GROUP
              </span>
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-full bg-[#0a3f44] px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#006b75]"
          >
            Retour au site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="rounded-[28px] border bg-white p-6 shadow-sm sm:p-10">
          <p className="inline-flex rounded-full border border-teal-100 bg-teal-50 px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-wider text-[#006b75]">
            Informations légales
          </p>

          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight tracking-tight text-[#0a3f44]">
            Mentions légales
          </h1>

          <p className="mt-3 text-[14px] text-slate-500">
            Dernière mise à jour : 5 octobre 2026
          </p>

          <div className="mt-10 space-y-9 text-[15px] leading-relaxed text-slate-700">
            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                1. Identification du site
              </h2>

              <div className="mt-3 space-y-1.5">
                <p>
                  <strong>Nom du site :</strong> PAVA LOGEMENT
                </p>

                <p>
                  <strong>Marque :</strong> PAVA GROUP
                </p>

                <p>
                  <strong>Activité présentée :</strong> plateforme de mise en
                  relation pour la recherche et la proposition de logements à
                  Dakar.
                </p>

                <p>
                  <strong>Adresse :</strong> Médina Rue 6 x Angle 17, Dakar —
                  Sénégal
                </p>

                <p>
                  <strong>Téléphone :</strong>{" "}
                  <a
                    href="tel:+221782931667"
                    className="font-semibold text-[#006b75] hover:underline"
                  >
                    +221 78 293 16 67
                  </a>
                </p>

                <p>
                  <strong>Téléphone :</strong>{" "}
                  <a
                    href="tel:+221763580242"
                    className="font-semibold text-[#006b75] hover:underline"
                  >
                    +221 76 358 02 42
                  </a>
                </p>

                <p>
                  <strong>Email :</strong>{" "}
                  <a
                    href="mailto:pavalogement@gmail.com"
                    className="font-semibold text-[#006b75] hover:underline"
                  >
                    pavalogement@gmail.com
                  </a>
                </p>

                <p>
                  <strong>Site :</strong>{" "}
                  <a
                    href={SITE_URL}
                    className="font-semibold text-[#006b75] hover:underline"
                  >
                    {SITE_URL}
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                2. Statut du projet
              </h2>

              <p className="mt-3">
                PAVA LOGEMENT est actuellement un projet exploité sous la
                marque PAVA GROUP. À la date de mise à jour de cette page,
                PAVA GROUP n'est pas présenté comme une société ou une
                personne morale immatriculée.
              </p>

              <p className="mt-3">
                Aucune dénomination sociale, forme juridique, numéro RCCM ou
                NINEA n'est donc indiqué sur le site tant que la structure
                juridique correspondante n'est pas officiellement constituée.
              </p>

              <p className="mt-3">
                <strong>Responsable du site :</strong> Bassirou Sow.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                3. Objet du site
              </h2>

              <p className="mt-3">
                PAVA LOGEMENT permet de consulter des logements proposés à
                Dakar, d'effectuer des recherches selon différents critères
                et de transmettre des demandes à PAVA.
              </p>

              <p className="mt-3">
                Les propriétaires peuvent également transmettre les
                informations et les photos de leur logement afin que PAVA
                puisse les examiner avant une éventuelle publication.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                4. Informations publiées
              </h2>

              <p className="mt-3">
                Les informations affichées dans les annonces sont issues des
                éléments transmis à PAVA et examinés avant publication.
              </p>

              <p className="mt-3">
                La disponibilité d'un logement, ses conditions de location,
                son prix et les modalités de paiement doivent être confirmés
                avant toute réservation ou tout versement.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                5. Transactions et paiements
              </h2>

              <p className="mt-3">
                Le site ne propose actuellement pas de paiement en ligne
                intégré pour la réservation des logements.
              </p>

              <p className="mt-3">
                Les conditions de paiement, les éventuels acomptes, cautions
                et autres conditions de location doivent être confirmés avec
                PAVA avant tout versement.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                6. Propriété intellectuelle
              </h2>

              <p className="mt-3">
                Les éléments propres à PAVA LOGEMENT, notamment le nom, le
                logo, les textes, la présentation graphique et les éléments
                techniques du site, sont destinés à l'utilisation de PAVA
                LOGEMENT et ne peuvent être reproduits ou réutilisés sans
                autorisation lorsque cela est applicable.
              </p>

              <p className="mt-3">
                Les photographies transmises par les propriétaires restent
                sous la responsabilité de leurs ayants droit. Le propriétaire
                qui transmet une photographie à PAVA doit disposer des droits
                nécessaires pour permettre son examen et, le cas échéant, sa
                publication.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                7. Responsabilité
              </h2>

              <p className="mt-3">
                PAVA met en place un processus d'examen des informations
                transmises avant publication, mais cet examen ne constitue pas
                une garantie absolue concernant l'état du logement, sa
                disponibilité ou les conditions convenues entre les parties.
              </p>

              <p className="mt-3">
                L'utilisateur doit vérifier les informations importantes avec
                PAVA avant toute décision de réservation ou de paiement.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                8. Contact
              </h2>

              <p className="mt-3">
                Pour toute question concernant le site ou une demande relative
                à un logement :
              </p>

              <p className="mt-3">
                <a
                  href="mailto:pavalogement@gmail.com"
                  className="font-bold text-[#006b75] hover:underline"
                >
                  pavalogement@gmail.com
                </a>
                <br />
                +221 78 293 16 67
                <br />
                +221 76 358 02 42
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                9. Données personnelles
              </h2>

              <p className="mt-3">
                Les modalités de collecte et d'utilisation des données
                personnelles sont détaillées dans la{" "}
                <Link
                  href="/politique-confidentialite"
                  className="font-bold text-[#006b75] hover:underline"
                >
                  Politique de confidentialité
                </Link>
                .
              </p>
            </section>
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t pt-7">
            <Link
              href="/"
              className="rounded-full bg-[#0a3f44] px-5 py-3 text-[14px] font-extrabold text-white hover:bg-[#006b75] transition"
            >
              Retour au site
            </Link>

            <Link
              href="/politique-confidentialite"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-[14px] font-extrabold text-slate-700 hover:border-[#006b75] hover:text-[#006b75] transition"
            >
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
