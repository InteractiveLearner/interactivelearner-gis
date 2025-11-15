import path from "path";
import { defineConfig, createContentLoader, type SiteConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { writeFileSync } from "fs";
import { Feed } from "feed";

const hostname: string = "https://www.interactivelearner-gis.com";

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: "en-US",
  title: "Interactive Learner GIS",
  description: "Easily learn about GIS in an interactive environment.",
  sitemap: {
    hostname: hostname,
  },
  ignoreDeadLinks: [
    /\/lessons\//,
    /\/exercises\//,
  ]
  cleanUrls: true,
  themeConfig: {
    editLink: {
      pattern: "https://github.com/InteractiveLearner/interactivelearner-gis/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    outline: [2, 4],
    logo: { src: "/logo192.png", width: 28, height: 28 },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/InteractiveLearner/interactivelearner-gis/",
      },
      {
        icon: "rss",
        link: "https://www.interactivelearner-gis.com/feed.rss",
      },
    ],
    nav: [
      {
        text: "Lessons",
        items: [
          { text: "Spatial data", link: "/lessons/spatial-data" },
          { text: "Data visualization", link: "/lessons/data-visualization" },
          { text: "Types of maps", link: "/lessons/map-types" },
          { text: "Projections", link: "/lessons/projections" },
          { text: "Scale", link: "/lessons/scale" },
          { text: "Classifying data", link: "/lessons/classification" },
          { text: "Misleading maps", link: "/lessons/misleading" },
          { text: "Remote sensing", link: "/lessons/remote-sensing" },
          { text: "Relational databases", link: "/lessons/relational-db" },
          { text: "Web GIS", link: "/lessons/web-GIS" },
          { text: "Spatial autocorrelation", link: "/lessons/spatial-stats" },
        ],
      },
      {
        text: "Exercises",
        items: [
          { text: "Learn QGIS", link: "/exercises/learn-qgis" },
          { text: "QGIS Basics", link: "/exercises/qgis-basics" },
          { text: "Vector to Raster", link: "/exercises/vector-raster" },
        ],
      },
    ],
    footer: {
      message: "Released under the GPL-3.0 license.",
      copyright: "Copyright © Interactive Learner GIS 2022",
    },
    sidebar: generateSidebar({
      manualSortFileNameByPriority: ['welcome.md', 'lessons', 'exercises'],
      // ============ [ RESOLVING PATHS ] ============
      documentRootPath: "/docs",
      // ============ [ GETTING MENU TITLE ] ============
      useTitleFromFrontmatter: true,
      // ============ [ STYLING MENU TITLE ] ============
      capitalizeFirst: true,
      hyphenToSpace: true,
      includeFolderIndexFile: true,
      collapsed: true,
      // ============ [ SORTING ] ============
      sortMenusByFrontmatterOrder: true,
      frontmatterOrderDefaultValue: 9,
    }),
    search: {
      provider: "local",
    },
  },
  lastUpdated: true,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) =>
          tag.startsWith("arcgis-") || tag.startsWith("calcite-"),
      },
    },
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
  // Credit to https://laros.io/generating-an-rss-feed-with-vitepress for the guide
  buildEnd: async (config: SiteConfig) => {
    const feed = new Feed({
      title: "Interactive Learner GIS",
      description: "Easily learn about GIS in an interactive environment.",
      id: hostname,
      link: hostname,
      language: "en",
      image: `${hostname}/logo192.png`,
      favicon: `${hostname}/favicon.ico`,
      copyright: "Copyright (c) 2022-present, Interactive Learner GIS ",
    });

    const posts = await createContentLoader("**/*.md", {
      excerpt: true,
      render: true,
    }).load();

    posts.sort(
      (a, b) =>
        +new Date(b.frontmatter.date as string) -
        +new Date(a.frontmatter.date as string)
    );

    for (const { url, excerpt, frontmatter, html } of posts) {
      feed.addItem({
        title: frontmatter.title,
        id: `${hostname}${url}`,
        link: `${hostname}${url}`,
        description: excerpt,
        content: html,
        author: [
          {
            name: "Omar Kawach",
            email: "omarkawach@outlook.com",
            link: "https://www.linkedin.com/in/omarkawach/",
          },
        ],
        date: frontmatter.date,
      });
    }
    writeFileSync(path.join(config.outDir, "feed.rss"), feed.rss2());
  },
});
