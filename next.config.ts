import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages, served under https://<owner>.github.io/monedo/.
 * Every route is prerendered (dynamic routes use generateStaticParams with
 * dynamicParams = false), so `next build` writes a self-contained site to out/.
 */
const basePath = "/monedo";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // Each route becomes <route>/index.html, which every static host serves reliably.
  trailingSlash: true,
  // No image optimisation server on a static host.
  images: { unoptimized: true },
  // Exposed so plain <a>/<img> tags (not next/link or next/image) can prefix asset paths.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
