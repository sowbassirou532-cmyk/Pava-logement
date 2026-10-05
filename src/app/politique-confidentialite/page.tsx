import Link from "next/link";

const SITE_URL =
  "https://pava-logement-21gy-eight.vercel.app";

export default function PolitiqueConfidentialitePage() {
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
            Protection des données
          </p>

          <h1 className="mt-4 text-[clamp(2rem,5vw,3rem)] font-extrabold leading-tight tracking-tight text-[#0a3f44]">
            Politique de confidentialité
          </h1>

          <p className="mt-3 text-[14px] text-slate-500">
            Dernière mise à jour : 5 octobre 2026
          </p>

          <div className="mt-10 space-y-9 text-[15px] leading-relaxed text-slate-700">
            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                1. Objet
              </h2>

              <p className="mt-3">
                Cette politique explique comment PAVA LOGEMENT, exploité sous
                la marque PAVA GROUP, collecte et utilise certaines données
                personnelles lorsque vous utilisez le site.
              </p>

              <p className="mt-3">
                PAVA LOGEMENT applique une approche de minimisation : seules les
                informations utiles au traitement d'une demande sont
                demandées.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                2. Responsable du traitement
              </h2>

              <p className="mt-3">
                <strong>Responsable :</strong> Bassirou Sow
              </p>

              <p className="mt-3">
                <strong>Marque :</strong> PAVA GROUP / PAVA LOGEMENT
              </p>

              <p className="mt-3">
                <strong>Adresse :</strong> Médina Rue 6 x Angle 17, Dakar —
                Sénégal
              </p>

              <p className="mt-3">
                <strong>Email :</strong>{" "}
                <a
                  href="mailto:pavalogement@gmail.com"
                  className="font-bold text-[#006b75] hover:underline"
                >
                  pavalogement@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                3. Données que nous pouvons collecter
              </h2>

              <p className="mt-3">
                Selon votre démarche, le site peut recueillir les informations
                suivantes :
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  "Nom et prénom",
                  "Numéro de téléphone",
                  "Adresse email",
                  "Dates de séjour",
                  "Nombre de voyageurs",
                  "Type et caractéristiques d’un logement",
                  "Prix et conditions proposés par un propriétaire",
                  "Adresse ou localisation du logement",
                  "Description du logement",
                  "Photographies transmises par un propriétaire",
                  "Contenu des messages envoyés à PAVA",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border bg-slate-50 px-4 py-3"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                4. Pourquoi ces données sont utilisées
              </h2>

              <p className="mt-3">
                Les données sont utilisées uniquement pour les besoins liés au
                fonctionnement de PAVA, notamment :
              </p>

              <ul className="mt-4 space-y-2 pl-5 list-disc">
                <li>traiter une demande de logement ;</li>
                <li>traiter une demande envoyée par un propriétaire ;</li>
                <li>examiner les informations et les photos avant publication ;</li>
                <li>contacter l'utilisateur au sujet de sa demande ;</li>
                <li>confirmer des informations ou une disponibilité ;</li>
                <li>répondre aux messages envoyés à PAVA ;</li>
                <li>assurer le fonctionnement et la sécurité technique du site.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                5. Photos et informations des propriétaires
              </h2>

              <p className="mt-3">
                Les photos transmises par un propriétaire sont conservées dans
                un espace de stockage privé pendant leur traitement par PAVA.
              </p>

              <p className="mt-3">
                Une photo n'est pas publiée automatiquement au moment de son
                envoi. Les informations et les photos sont examinées avant
                qu'un logement puisse être publié sur le catalogue.
              </p>

              <p className="mt-3">
                Le propriétaire doit disposer des droits nécessaires sur les
                photographies qu'il transmet à PAVA.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                6. Données relatives aux demandes de logement
              </h2>

              <p className="mt-3">
                Lorsqu'un utilisateur envoie une demande concernant un
                logement, certaines informations peuvent être enregistrées
                afin de permettre à PAVA de traiter la demande et de reprendre
                contact avec lui.
              </p>

              <p className="mt-3">
                Cela peut notamment concerner le nom, le téléphone, l'email,
                les dates souhaitées, le nombre de personnes et le contenu du
                message.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                7. Conservation des données
              </h2>

              <p className="mt-3">
                Les données sont conservées pendant la durée nécessaire au
                traitement de la demande, au suivi de la relation avec
                l'utilisateur ou à la gestion du service.
              </p>

              <p className="mt-3">
                Lorsqu'une donnée n'est plus nécessaire, PAVA peut procéder à
                sa suppression ou à son archivage lorsque cela est justifié.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                8. Hébergement et prestataires techniques
              </h2>

              <p className="mt-3">
                Le site utilise des prestataires techniques pour son
                fonctionnement, notamment pour l'hébergement de l'application,
                la base de données et le stockage des photographies.
              </p>

              <p className="mt-3">
                Ces prestataires peuvent techniquement traiter ou stocker
                certaines données nécessaires au fonctionnement du site. PAVA
                limite ces traitements aux besoins du service et met en place
                des mesures destinées à protéger les données.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                9. WhatsApp
              </h2>

              <p className="mt-3">
                Le site peut proposer un contact via WhatsApp. Lorsque vous
                choisissez d'utiliser ce bouton, vous quittez l'environnement
                du site et utilisez le service de WhatsApp selon les
                conditions et la politique de confidentialité de son éditeur.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                10. Sécurité
              </h2>

              <p className="mt-3">
                PAVA met en œuvre des mesures techniques et organisationnelles
                raisonnables pour protéger les informations collectées contre
                les accès, utilisations, modifications ou divulgations non
                autorisés.
              </p>

              <p className="mt-3">
                L'accès aux données administratives et aux photos privées est
                restreint aux fonctionnalités prévues à cet effet.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                11. Vos droits
              </h2>

              <p className="mt-3">
                Conformément au cadre sénégalais applicable à la protection des
                données personnelles, les personnes concernées peuvent
                notamment disposer de droits d'accès, de rectification et
                d'opposition au traitement de leurs données, selon les
                conditions prévues par la réglementation applicable.
              </p>

              <p className="mt-3">
                Pour exercer une demande relative à vos données ou obtenir des
                précisions sur leur traitement, vous pouvez contacter PAVA à
                l'adresse :
              </p>

              <p className="mt-3">
                <a
                  href="mailto:pavalogement@gmail.com"
                  className="font-bold text-[#006b75] hover:underline"
                >
                  pavalogement@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                12. Données des mineurs
              </h2>

              <p className="mt-3">
                Le site n'est pas destiné à recueillir volontairement des
                données personnelles de mineurs. Si vous pensez qu'une
                information concernant un mineur nous a été transmise sans
                autorisation appropriée, contactez PAVA afin que la situation
                puisse être examinée.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                13. Modification de cette politique
              </h2>

              <p className="mt-3">
                Cette politique peut être mise à jour lorsque le fonctionnement
                du site ou les traitements de données évoluent. La date de
                dernière mise à jour indiquée en haut de cette page permet de
                suivre la version applicable.
              </p>
            </section>

            <section>
              <h2 className="text-[19px] font-extrabold text-slate-900">
                14. Contact
              </h2>

              <p className="mt-3">
                Pour toute question concernant cette politique ou le traitement
                de vos données :
              </p>

              <p className="mt-3">
                <strong>PAVA LOGEMENT</strong>
                <br />
                Médina Rue 6 x Angle 17, Dakar — Sénégal
                <br />
                +221 78 293 16 67
                <br />
                +221 76 358 02 42
                <br />
                <a
                  href="mailto:pavalogement@gmail.com"
                  className="font-bold text-[#006b75] hover:underline"
                >
                  pavalogement@gmail.com
                </a>
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
              href="/mentions-legales"
              className="rounded-full border border-slate-200 bg-white px-5 py-3 text-[14px] font-extrabold text-slate-700 hover:border-[#006b75] hover:text-[#006b75] transition"
            >
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
