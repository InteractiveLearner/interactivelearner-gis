/// <reference types="@cloudflare/workers-types" />

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { McpAgent } from "agents/mcp";
import { z } from "zod";

// Cloudflare Worker environment bindings
interface Env {
  MCP_OBJECT: DurableObjectNamespace;
}

// Documentation index with pre-extracted content
interface DocEntry {
  title: string;
  description: string;
  url: string;
  keywords: string[];
  content: string;
}

const BASE_URL = "https://interactivelearner-gis.com";

const DOCS_INDEX: DocEntry[] = [
  {
    title: "Spatial data and its types",
    description: "Check out the key elements of spatial data and its types.",
    url: "/lessons/spatial-data",
    keywords: [
      "spatial",
      "data",
      "raster",
      "vector",
      "points",
      "lines",
      "polygons",
      "geojson",
      "shapefile",
      "geotiff",
      "basemap",
      "tiles",
      "continuous",
      "discrete",
      "elevation",
      "dem",
    ],
    content:
      "Spatial data have two main components: where (location) and what (information). Types include raster (grid of cells, pixels, continuous data like elevation DEMs, satellite images, GeoTIFF) and vector (points, lines, polygons, discrete data like boundaries, roads, GeoJSON, Shapefile, KML, CSV). Basemaps provide geographical context. Can convert between raster and vector using GIS software.",
  },
  {
    title: "Projections",
    description:
      "Discover the projections that convert curved 3D surfaces to flat 2D surfaces.",
    url: "/lessons/projections",
    keywords: [
      "projection",
      "crs",
      "coordinate",
      "reference",
      "system",
      "epsg",
      "wgs84",
      "mercator",
      "datum",
      "distortion",
      "cylindrical",
      "conical",
      "azimuthal",
      "equidistant",
      "conformal",
      "equal-area",
      "latitude",
      "longitude",
    ],
    content:
      "Projections transform 3D curved surfaces to 2D flat surfaces causing distortion. Types: Equidistant (preserves distance), Azimuth (preserves direction), Conformal (preserves shape/angle), Equal-Area (preserves area). Techniques: Cylindrical, Conical, Azimuthal/Planar. CRS defines how coordinates relate to real places. EPSG codes identify CRS like EPSG:4326 (WGS 84) and EPSG:3857 (Web Mercator). Datums include WGS 84 and NAD 83.",
  },
  {
    title: "Scale",
    description: "Learn about the concept of scale in maps.",
    url: "/lessons/scale",
    keywords: [
      "scale",
      "ratio",
      "large",
      "small",
      "resolution",
      "detail",
      "zoom",
      "representative",
      "fraction",
    ],
    content:
      "Scale represents the ratio between map distance and real-world distance. Large scale maps show more detail of smaller areas. Small scale maps show less detail of larger areas. Scale affects the level of detail visible on a map.",
  },
  {
    title: "Types of maps",
    description: "Explore the different types of maps used in GIS.",
    url: "/lessons/map-types",
    keywords: [
      "map",
      "types",
      "thematic",
      "choropleth",
      "dot",
      "proportional",
      "isopleth",
      "cartogram",
      "reference",
      "topographic",
      "political",
    ],
    content:
      "Types of thematic maps include choropleth (shaded areas by value), dot density, proportional symbols, isopleth (contour lines), cartograms, flow maps. Reference maps show locations and features. Topographic maps show terrain. Political maps show boundaries.",
  },
  {
    title: "Classification",
    description:
      "Learn about data classification methods for thematic mapping.",
    url: "/lessons/classification",
    keywords: [
      "classification",
      "natural",
      "breaks",
      "jenks",
      "equal",
      "interval",
      "quantile",
      "standard",
      "deviation",
      "manual",
      "classes",
      "legend",
    ],
    content:
      "Classification methods for thematic mapping: Natural Breaks/Jenks (minimizes variance within classes), Equal Interval (equal range per class), Quantile (equal count per class), Standard Deviation (based on mean and deviation), Manual (user-defined breaks). Choice affects map interpretation.",
  },
  {
    title: "Data visualization",
    description:
      "Understand principles of effective data visualization in maps.",
    url: "/lessons/data-visualization",
    keywords: [
      "visualization",
      "color",
      "symbology",
      "legend",
      "design",
      "cartography",
      "visual",
      "variables",
      "hue",
      "saturation",
      "value",
    ],
    content:
      "Visual variables in cartography include position, size, shape, value/lightness, hue, saturation, orientation, texture. Color theory and color blindness considerations. Effective legend design. Map layout and composition principles.",
  },
  {
    title: "Misleading maps",
    description: "Learn how maps can mislead and how to avoid common pitfalls.",
    url: "/lessons/misleading",
    keywords: [
      "misleading",
      "bias",
      "manipulation",
      "propaganda",
      "ethics",
      "accuracy",
      "truth",
      "deception",
    ],
    content:
      "Maps can mislead through inappropriate projections, classification choices, color schemes, omitted data, or deliberate manipulation. Understanding map literacy helps identify misleading representations. Ethical considerations in cartography.",
  },
  {
    title: "Relational databases",
    description: "Learn about relational databases and their role in GIS.",
    url: "/lessons/relational-db",
    keywords: [
      "database",
      "relational",
      "sql",
      "table",
      "join",
      "attribute",
      "query",
      "primary",
      "key",
      "foreign",
    ],
    content:
      "Relational databases store data in tables with rows and columns. Primary keys uniquely identify records. Foreign keys link tables. SQL queries data. Spatial databases like PostGIS extend relational DBs with geometry types. Attribute joins link spatial and tabular data.",
  },
  {
    title: "Remote sensing",
    description: "Introduction to remote sensing and satellite imagery.",
    url: "/lessons/remote-sensing",
    keywords: [
      "remote",
      "sensing",
      "satellite",
      "imagery",
      "aerial",
      "spectral",
      "bands",
      "ndvi",
      "landsat",
      "sentinel",
      "resolution",
    ],
    content:
      "Remote sensing captures Earth data from satellites or aircraft. Spectral bands capture different wavelengths. NDVI measures vegetation health. Satellites include Landsat, Sentinel. Resolution types: spatial, spectral, temporal, radiometric. Applications in land use, agriculture, environmental monitoring.",
  },
  {
    title: "Spatial statistics",
    description: "Learn about spatial statistics and analysis methods.",
    url: "/lessons/spatial-stats",
    keywords: [
      "statistics",
      "spatial",
      "analysis",
      "autocorrelation",
      "moran",
      "cluster",
      "hotspot",
      "interpolation",
      "kriging",
      "pattern",
    ],
    content:
      "Spatial statistics analyze geographic patterns. Spatial autocorrelation measures clustering (Moran's I). Hotspot analysis identifies significant clusters. Interpolation estimates values at unmeasured locations (IDW, Kriging). Point pattern analysis examines point distributions.",
  },
  {
    title: "Web GIS Introduction",
    description: "Introduction to Web GIS concepts and architecture.",
    url: "/lessons/web-GIS/",
    keywords: [
      "web",
      "gis",
      "internet",
      "browser",
      "client",
      "server",
      "architecture",
      "services",
      "api",
    ],
    content:
      "Web GIS delivers geographic information through web browsers. Client-server architecture. Web services provide data and functionality. APIs enable programmatic access. Benefits include accessibility, collaboration, and real-time updates.",
  },
  {
    title: "Web mapping libraries",
    description:
      "Explore popular web mapping libraries for building interactive maps.",
    url: "/lessons/web-GIS/web-mapping-libraries",
    keywords: [
      "leaflet",
      "maplibre",
      "openlayers",
      "arcgis",
      "mapbox",
      "google",
      "maps",
      "javascript",
      "library",
      "cesium",
      "deck.gl",
      "turf",
      "d3",
    ],
    content:
      "Web mapping libraries: Open-source - Leaflet (simple, lightweight), MapLibre GL JS (vector tiles), OpenLayers (full-featured), turf.js (spatial analysis), D3.js (custom viz), CesiumJS (3D), deck.gl (large datasets). Commercial - ArcGIS Maps SDK, Google Maps API, Mapbox GL JS. Choose based on needs.",
  },
  {
    title: "Frontend frameworks",
    description:
      "Learn about frontend frameworks for web mapping applications.",
    url: "/lessons/web-GIS/frontend-frameworks",
    keywords: [
      "frontend",
      "framework",
      "react",
      "vue",
      "angular",
      "svelte",
      "component",
      "spa",
      "single",
      "page",
      "application",
    ],
    content:
      "Frontend frameworks like React, Vue, Angular, and Svelte help build complex web mapping applications. Component-based architecture. State management. Integration with mapping libraries. Single-page applications provide smooth user experience.",
  },
  {
    title: "Rendering and hosting",
    description: "Understand map rendering and hosting options.",
    url: "/lessons/web-GIS/rendering-and-hosting",
    keywords: [
      "rendering",
      "hosting",
      "tile",
      "server",
      "cloud",
      "cdn",
      "deployment",
      "performance",
      "caching",
    ],
    content:
      "Map rendering can be client-side or server-side. Tile servers serve pre-rendered or vector tiles. Hosting options include cloud providers, CDNs. Performance optimization through caching, tile pyramids. Deployment considerations for web maps.",
  },
  {
    title: "Learn QGIS",
    description: "Get started with QGIS desktop GIS software.",
    url: "/exercises/desktop/learn-qgis",
    keywords: [
      "qgis",
      "desktop",
      "gis",
      "software",
      "free",
      "open",
      "source",
      "install",
      "download",
    ],
    content:
      "QGIS is free, open-source desktop GIS software. Download and installation instructions. Interface overview. Creating projects. Available for Windows, Mac, Linux.",
  },
  {
    title: "QGIS basics",
    description: "Learn basic tasks in QGIS using vector data.",
    url: "/exercises/desktop/qgis-basics",
    keywords: [
      "qgis",
      "basics",
      "layer",
      "add",
      "navigate",
      "pan",
      "zoom",
      "plugin",
      "quickmapservices",
      "basemap",
      "project",
      "save",
    ],
    content:
      "QGIS basics: Create new project, add vector layers (GeoJSON), navigate (pan/zoom), install plugins like QuickMapServices for basemaps. Save projects as .qgz files. Set CRS/projection. Example exercise with San Diego drinking water data creating a choropleth map.",
  },
  {
    title: "Vector operations in QGIS",
    description: "Learn vector analysis operations in QGIS.",
    url: "/exercises/desktop/vector",
    keywords: [
      "vector",
      "analysis",
      "buffer",
      "clip",
      "intersect",
      "union",
      "dissolve",
      "merge",
      "geoprocessing",
      "attribute",
      "table",
    ],
    content:
      "Vector operations in QGIS: Buffer creates zones around features. Clip extracts features within boundary. Intersect finds overlapping areas. Union combines features. Dissolve merges by attribute. Attribute table editing. Geoprocessing tools.",
  },
  {
    title: "Raster operations in QGIS",
    description: "Learn raster analysis operations in QGIS.",
    url: "/exercises/desktop/raster",
    keywords: [
      "raster",
      "analysis",
      "dem",
      "slope",
      "aspect",
      "hillshade",
      "terrain",
      "calculator",
      "mosaic",
      "resample",
    ],
    content:
      "Raster operations in QGIS: Terrain analysis (slope, aspect, hillshade from DEM). Raster calculator for math operations. Mosaic combines rasters. Resample changes resolution. Reclassify changes values. Zonal statistics.",
  },
  {
    title: "Publish a web map",
    description: "Learn how to publish an interactive web map.",
    url: "/exercises/web/publish-a-web-map",
    keywords: [
      "publish",
      "web",
      "map",
      "github",
      "pages",
      "hosting",
      "deploy",
      "html",
      "online",
    ],
    content:
      "Publish web maps using GitHub Pages for free hosting. Create HTML with mapping library. Push to GitHub repository. Enable GitHub Pages in settings. Access your map online. Alternative hosting options available.",
  },
];

// Simple tokenization and normalization
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

// Calculate term frequency
function termFrequency(term: string, tokens: string[]): number {
  const count = tokens.filter((t) => t === term).length;
  return count / tokens.length;
}

// Calculate inverse document frequency
function inverseDocumentFrequency(term: string, allDocs: string[][]): number {
  const docsWithTerm = allDocs.filter((doc) => doc.includes(term)).length;
  if (docsWithTerm === 0) return 0;
  return Math.log(allDocs.length / docsWithTerm);
}

// Calculate TF-IDF score for a query against a document
function calculateScore(
  query: string,
  doc: DocEntry,
  allDocTokens: string[][],
): number {
  const queryTokens = tokenize(query);
  const docText = `${doc.title} ${doc.description} ${doc.keywords.join(" ")} ${doc.content}`;
  const docTokens = tokenize(docText);

  let score = 0;
  for (const term of queryTokens) {
    const tf = termFrequency(term, docTokens);
    const idf = inverseDocumentFrequency(term, allDocTokens);
    score += tf * idf;

    // Boost for exact keyword matches
    if (doc.keywords.includes(term)) {
      score += 0.5;
    }
    // Boost for title matches
    if (doc.title.toLowerCase().includes(term)) {
      score += 0.3;
    }
  }

  return score;
}

// Search function
function searchDocs(
  query: string,
  limit: number = 5,
): Array<{ doc: DocEntry; score: number }> {
  // Pre-compute all document tokens
  const allDocTokens = DOCS_INDEX.map((doc) =>
    tokenize(
      `${doc.title} ${doc.description} ${doc.keywords.join(" ")} ${doc.content}`,
    ),
  );

  // Score all documents
  const scored = DOCS_INDEX.map((doc) => ({
    doc,
    score: calculateScore(query, doc, allDocTokens),
  }));

  // Sort by score and return top results
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Define our MCP agent with tools
export class MyMCP extends McpAgent<Env> {
  server = new McpServer({
    name: "GIS Documentation Search",
    version: "1.0.0",
  });

  async init() {
    // Documentation search tool
    this.server.tool(
      "search_docs",
      {
        query: z
          .string()
          .describe(
            "Search query for GIS documentation (e.g., 'projections', 'vector data', 'QGIS basics')",
          ),
        limit: z
          .number()
          .optional()
          .default(5)
          .describe("Maximum number of results to return (default: 5)"),
      },
      async ({ query, limit }: { query: string; limit?: number }) => {
        const results = searchDocs(query, limit ?? 5);

        if (results.length === 0) {
          return {
            content: [
              {
                type: "text",
                text: `No documentation found for "${query}". Try different keywords related to GIS, mapping, spatial data, QGIS, or web mapping.`,
              },
            ],
          };
        }

        const formatted = results
          .map(
            ({ doc, score }, idx) =>
              `${idx + 1}. **${doc.title}**\n   ${doc.description}\n   URL: ${BASE_URL}${doc.url}\n   Relevance: ${(score * 100).toFixed(1)}%\n   Summary: ${doc.content.slice(0, 200)}...`,
          )
          .join("\n\n");

        return {
          content: [
            {
              type: "text",
              text: `Found ${results.length} relevant documentation pages for "${query}":\n\n${formatted}`,
            },
          ],
        };
      },
    );

    // List all documentation topics
    this.server.registerTool("list_topics", {}, async () => {
      const topics = DOCS_INDEX.map(
        (doc) =>
          `- **${doc.title}**: ${doc.description} (${BASE_URL}${doc.url})`,
      ).join("\n");

      return {
        content: [
          {
            type: "text",
            text: `Available GIS Documentation Topics:\n\n${topics}`,
          },
        ],
      };
    });
  }
}

export default {
  fetch(request: Request, env: Env, ctx: ExecutionContext) {
    const url = new URL(request.url);

    if (url.pathname === "/mcp") {
      return MyMCP.serve("/mcp").fetch(request, env, ctx);
    }

    return new Response("Not found", { status: 404 });
  },
};
