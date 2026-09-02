import type { NextConfig } from "next";

/**
 * The marketing site (`/`) is a separate static deploy — the
 * `fittr-landing` Vercel project, one directory up in this repo. This app
 * owns everything else on the domain (`/join`, `/r/*`, `/status/*`,
 * `/api/*`). `beforeFiles` runs ahead of this app's own filesystem routes,
 * so it takes over `/` before `src/app/page.tsx` ever runs — see the note
 * there.
 */
const MARKETING_SITE = "https://fittr-landing.vercel.app";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: `${MARKETING_SITE}/` },
        { source: "/styles.css", destination: `${MARKETING_SITE}/styles.css` },
        { source: "/app.js", destination: `${MARKETING_SITE}/app.js` },
        { source: "/favicon.svg", destination: `${MARKETING_SITE}/favicon.svg` },
      ],
    };
  },
};

export default nextConfig;
