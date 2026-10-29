import type { NextConfig } from "next";

// URLs from the client's previous WordPress site (its Yoast sitemaps), mapped to the new pages so
// existing Google results and bookmarks keep working after the domain moves. Sources are written
// without a trailing slash because Next.js strips the slash (308) before redirects are matched.
const wordpressRedirects: [string, string][] = [
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/career", "/careers"],
  ["/testing-commissioning", "/services/testing-and-commissioning"],
  ["/testing", "/services/testing-and-commissioning"],
  ["/high-voltage-design", "/services/high-voltage-design"],
  ["/high-voltage-switching-services", "/services/high-voltage-switching"],
  ["/maintenance-and-support-services", "/services/maintenance-and-support"],
  ["/earth-tests", "/services/earth-testing"],
  ["/thermographic-imaging", "/services/thermographic-imaging"],
  ["/hello-world", "/"],
  ["/category/:path*", "/"],
  ["/author/:path*", "/"],
  ["/sitemap_index.xml", "/sitemap.xml"],
  ["/wp-sitemap.xml", "/sitemap.xml"],
  ["/page-sitemap.xml", "/sitemap.xml"],
  ["/post-sitemap.xml", "/sitemap.xml"],
  ["/category-sitemap.xml", "/sitemap.xml"],
  ["/author-sitemap.xml", "/sitemap.xml"],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async redirects() {
    return wordpressRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
