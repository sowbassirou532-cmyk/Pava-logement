import { NextRequest, NextResponse } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Accès administrateur requis.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="PAVA LOGEMENT ADMIN"',
      "Cache-Control": "no-store",
    },
  });
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminUsername || !adminPassword) {
    return new NextResponse(
      "Configuration administrateur manquante.",
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  try {
    const encodedCredentials = authorization.slice(6);
    const decodedCredentials = Buffer.from(
      encodedCredentials,
      "base64"
    ).toString("utf-8");

    const separatorIndex = decodedCredentials.indexOf(":");

    if (separatorIndex === -1) {
      return unauthorizedResponse();
    }

    const username = decodedCredentials.slice(0, separatorIndex);
    const password = decodedCredentials.slice(separatorIndex + 1);

    if (
      username !== adminUsername ||
      password !== adminPassword
    ) {
      return unauthorizedResponse();
    }

    return NextResponse.next();
  } catch {
    return unauthorizedResponse();
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
