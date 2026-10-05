import { handleUpload } from "@vercel/blob/client";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      request,
      body,

      onBeforeGenerateToken: async (pathname) => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
          ],
          maximumSizeInBytes: 8 * 1024 * 1024,
          addRandomSuffix: true,
          validUntil: Date.now() + 15 * 60 * 1000,
          tokenPayload: JSON.stringify({
            pathname,
          }),
        };
      },

      onUploadCompleted: async () => {
        // Les URLs des photos seront ensuite enregistrées
        // dans la demande propriétaire.
      },
    });

    return Response.json(jsonResponse);
  } catch (error) {
    console.error("Erreur upload Blob :", error);

    return Response.json(
      {
        error: "Impossible de préparer l'envoi de la photo.",
      },
      { status: 400 }
    );
  }
}
