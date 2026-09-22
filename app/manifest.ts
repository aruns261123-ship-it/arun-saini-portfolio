import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arun Saini — SEO Expert & Front-End Developer",
    short_name: "Arun Saini",
    description:
      "SEO professional combining technical SEO, content optimization and modern web development.",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#050508",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
