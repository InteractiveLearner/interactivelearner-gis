import { defineConfig } from "vitepress";

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: "en-US",
  title: "Interactive Learner GIS",
  description: "Easily learn about GIS in an interactive environment.",
  sitemap: {
    hostname: "https://www.interactivelearner-gis.com",
  },
  head: [
    ["link", { rel: "icon", type: "image/png", href: "/logo192.png" }],
    ["meta", { name: "theme-color", content: "#144d1e" }],
    // Open Graph
    ["meta", { property: "og:title", content: "Interactive Learner GIS" }],
    ["meta", { property: "og:site_name", content: "Interactive Learner GIS" }],
    [
      "meta",
      {
        property: "og:description",
        content: "Easily learn about GIS in an interactive environment.",
      },
    ],
    ["meta", { property: "og:type", content: "website" }],
    [
      "meta",
      {
        property: "og:image",
        content: "https://www.interactivelearner-gis.com/logo512.png",
      },
    ],
    [
      "meta",
      {
        property: "og:url",
        content: "https://www.interactivelearner-gis.com/",
      },
    ],
    ["meta", { property: "og:locale", content: "en" }],
    ["link", { rel: "icon", href: "./favicon.ico" }],
    ["link", { rel: "apple-touch-icon", href: "./logo192.png" }],
    ["link", { rel: "manifest", href: "./manifest.json" }],
    ["link", { rel: "shortcut icon", href: "./favicon.ico" }],
    // Bing Webmaster Tool verification
    [
      "meta",
      { name: "msvalidate.01", content: "F28D7B10FB5236446647B899521D9F78" },
    ],
    // Google Search Console verification
    [
      "meta",
      {
        name: "google-site-verification",
        content: "rGtCWgNz493g9zMLokbID0wxeP58x9hL8M_7jX8A2dI",
      },
    ],
  ],
  themeConfig: {
    logo: { src: "/logo192.png", width: 26, height: 26 },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/InteractiveLearner/interactivelearner-gis/",
      },
    ],
    nav: [
      {
        text: "Lessons",
        items: [{ text: "Projections", link: "/projections" }],
      },
    ],
    footer: {
      copyright: "Copyright © Interactive Learner GIS 2024",
    },
    sidebar: [
      {
        items: [
          { text: "Projections", link: "/projections" },
          // ...
        ],
      },
    ],
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) =>
          tag.startsWith("arcgis-") || tag.startsWith("calcite-"),
      },
    },
  },
});
