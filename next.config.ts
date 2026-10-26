
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "pava-logement-21gy-eight.vercel.app",
          },
        ],
        destination: "https://www.pavalogementsn.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
