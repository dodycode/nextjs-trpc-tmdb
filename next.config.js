/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
    ],
    // minimum cache time forever for remote images
    minimumCacheTTL: 31536000,
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  headers: async () => {
    return [
      {
        source: "/details/tv/:slug",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, s-maxage=2628000, max-age=2628000, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/details/movie/:slug",
        headers: [
          {
            key: "Cache-Control",
            value:
              "public, s-maxage=2628000, max-age=2628000, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default config;
