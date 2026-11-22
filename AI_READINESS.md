## AI readiness and local verification

Use Node 24.22.3 (the version in `.node-version`) and pnpm. Cloudflare Pages reads
the same Node version when building previews. TypeScript stays on 6.0.3 because
Vue tooling and the Markdown exporter use its JavaScript compiler API; the native
TypeScript 7 package does not expose that API. WebMCP types remain on 0.1.11 to
match the published W3C polyfill's supported dependency range.

The sidebar generator's transitive `glob` dependency is overridden to the patched
14.x line; it retains the `globSync` API used by the generator. The lockfile also
refreshes the MCP SDK's transitive HTTP/schema dependencies to patched versions.

`pnpm build` generates Markdown for all pages, `/llms.txt`, discovery metadata,
and a Cloudflare Pages `_worker.js` in `docs/.vitepress/dist`. The Worker handles
`Accept: text/markdown`, preserves HTML as the default, adds `Vary: Accept`, and
publishes discovery/alternate `Link` headers. Direct `.md` URLs also work.
Markdown is derived from lesson sources: figures and citations become links,
quizzes become practice questions without answer keys, and code fences stay intact.

The browser uses `@w3c/webmcp-polyfill` with `webmcp-types`. Four tools are registered
on page load: `get_page_markdown`, `list_visualizations`, `update_visualization`,
and `read_quiz_results`. Visualization adapters share the visible UI state, validate
allowed values, report readiness, and unregister on unmount. Quiz attempts are held
only in the mounted quiz component; the tools cannot answer or reset quizzes.
Only attempted questions return correct-answer feedback. An assistant receives
results only when its browser integration calls the tool. No results are sent to
the remote MCP server. The polyfill needs HTTPS/localhost and a compatible browser
agent integration; it does not establish that connection by itself.

```sh
pnpm dev                  # Development site and Markdown negotiation
pnpm test                 # Content, negotiation, discovery and search regression checks
pnpm typecheck            # Worker and new browser integration types
pnpm build
pnpm preview:cloudflare   # Full production behavior at http://localhost:8792
pnpm mcp:dev              # Separate MCP server at http://localhost:8787/mcp
node tests/mcp-smoke.mjs  # Run while mcp:dev is running
PREVIEW_URL=https://your-preview.pages.dev node tests/preview-smoke.mjs
```

VitePress's plain `pnpm preview` previews static HTML. Use `preview:cloudflare`
to verify negotiation and response headers. The site's Pages configuration is
`wrangler.jsonc`; the existing MCP Worker's configuration is now
`mcp/wrangler.jsonc`. Its Worker name, class, binding and migrations are preserved.
The `mcp:dev`, `mcp:deploy` and `cf-typegen` commands select that config explicitly.
Neither build nor verification deploys either service.

The MCP SDK, Agents SDK and Wrangler/types are updated. The existing legacy
McpAgent transport is retained for compatibility with the deployed Durable Object;
SDK v1 and the SDK v2 packages required by the current Agents release are explicit
dependencies. Search now ranks the real generated
lesson text with BM25, including short terms such as SQL, and returns excerpts
instead of fabricated relevance percentages. `get_doc` and Markdown resources
provide full documents without fetching arbitrary URLs.

The isolated preview check covers response headers, discovery documents, real
WebMCP calls, visible classification/projection changes, quiz feedback, ArcGIS
panels and Mermaid rendering. It uses Chrome on macOS; elsewhere install the
Playwright Chromium browser first. Set `PREVIEW_ARTIFACT_DIR` to save its JSON
report and screenshots to a chosen directory.

### Hosting and discovery

Deploy `docs/.vitepress/dist` to Cloudflare Pages, including its generated
`_worker.js` and `_headers`. The build command remains `pnpm build`. A static-only
host can serve the generated Markdown files but cannot apply the negotiation
handler. Regenerate the MCP index with `pnpm ai:generate` when invoking Wrangler
directly; package scripts do this automatically before build and MCP dev/deploy.

The site advertises the real Markdown API via `/.well-known/api-catalog`,
`/openapi.json`, `/.well-known/ai-catalog.json` and the tutoring skill index at
`/.well-known/agent-skills/index.json`. Its skill digest is SHA-256 over the exact
served bytes. The separate MCP server publishes its own `/mcp/server-card`, legacy
`/.well-known/mcp/server-card.json` alias, API catalog and `/health` endpoint.
Server cards follow the current SEP-2127 extension rather than the older
serverInfo/capabilities shape from the copied checklist.

To advertise the deployed MCP service from the site, set **`MCP_SERVER_URL`** in
the site's build environment to its public HTTPS `/mcp` endpoint and rebuild.
No endpoint is guessed when this setting is absent. For example:

```sh
MCP_SERVER_URL=https://your-mcp-host.example/mcp pnpm build
```

OAuth/OIDC, protected-resource metadata and auth.md are omitted because these APIs
are public and do not have an authorization server or registration flow. DNS-AID
and DNSSEC are configured at the domain level as described below.
The AI catalog and skill discovery formats are evolving community specifications;
no A2A agent or account-registration capability is advertised.

### DNS-AID and DNSSEC configuration (November 4, 2026)

Cloudflare authoritative signing is enabled. Namecheap holds the matching parent
DS record: key tag 2371, algorithm 13 (ECDSA P-256/SHA-256), digest type 2 (SHA-256).
The DS digest was independently calculated from the authoritative DNSKEY and
matched Cloudflare before being published at Namecheap.

The public MCP endpoint was confirmed with the official MCP client:
`https://gis-docs-mcp.omarkawach.workers.dev/mcp`.
This is the existing deployed server; the local code changes above remain undeployed.

The following DNS-only records are published in the Cloudflare zone (TTL 300):

```dns
_mcp._agents.interactivelearner-gis.com. 300 IN SVCB 1 gis-docs-mcp.omarkawach.workers.dev. mandatory=alpn,port alpn="h2,h3" port=443 key65400="mcp" key65401="/mcp"
_mcp._agents.interactivelearner-gis.com. 300 IN TXT "txtvers=1" "proto=mcp" "path=/mcp" "alpn=h2,h3" "title=Interactive Learner GIS"
```

The private-use mapping is `key65400` = `proto` (UTF-8 protocol identifier),
`key65401` = `path` (ASCII HTTP endpoint path). These numbers are local experimental
choices, not IANA assignments. The TXT companion uses the draft's named parameters
so clients need not assume the private-use mapping. Only the registered `alpn` and
`port` parameters are mandatory. Revisit private-use parameters as the DNS-AID and
common discovery parameter drafts evolve. No nonexistent A2A service or undeployed
catalog endpoint is advertised.

Public Cloudflare DNS-over-HTTPS queries returned `AD: true` for the parent DS,
zone DNSKEY and both discovery RRsets. The requested agent-readiness scanner
returned `checks.discoverability.dnsAid.status = "pass"`, with
`dnssecValidated = true`, one valid ServiceMode SVCB record and no validation issues.
The Cloudflare dashboard can show setup pending until its background DS check runs,
even after public validating resolvers authenticate the chain successfully.

### Domain email (November 4, 2026)

Cloudflare Email Routing is enabled for `interactivelearner-gis.com`. Its active
catch-all rule forwards incoming domain mail to the verified destination
`omarkawach@outlook.com`, including `contact@interactivelearner-gis.com` and
`dmarc@interactivelearner-gis.com`.

Cloudflare installed and locked its required MX, SPF and DKIM records. SPF is
`v=spf1 include:_spf.mx.cloudflare.net ~all`, and its routing DKIM selector is
`cf2024-1`. The domain now publishes this DMARC policy:

```text
v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s; rua=mailto:dmarc@interactivelearner-gis.com
```

DMARC aggregate reports use an address on the same domain and reach Outlook
through catch-all forwarding, avoiding a third-party reporting-domain permission
requirement. This setup forwards incoming mail. It does not configure Outlook
to send as an `@interactivelearner-gis.com` address. Replies from the personal
Outlook account continue to use its Outlook identity.

The routing API and dashboard confirm the catch-all is active and the destination
verified. Public DNS checks authenticate the MX, SPF, DKIM and DMARC records using
DNSSEC. An end-to-end message arrival in the Outlook inbox has not been tested.

### WebMCP source review (November 4, 2026)

The initial implementation used the requested W3C polyfill and WebMCP TypeScript
definitions. A subsequent review checked the current
[WebMCP draft](https://webmachinelearning.github.io/webmcp/),
[Chrome documentation](https://developer.chrome.com/docs/ai/webmcp), and Google's
[modern-web-guidance WebMCP guides](https://github.com/GoogleChrome/modern-web-guidance/tree/main/skills/modern-web-guidance/guides/webmcp).

The review retained imperative tools for custom visualization controls and kept
quizzes read-only. It added parameter descriptions and human-readable tool titles,
enforced tool arguments inside execute callbacks, and made Markdown failures
return actionable structured errors. Registration uses an AbortSignal, loads the
requested polyfill on the client, respects native implementations, and cleans up
partial registrations on failure.

Network executions now combine agent cancellation with page-navigation and layout
lifetimes. Opening another lesson aborts stale fetches, and post-await checks keep
an old page's result from being returned as the current page. Unit checks cover
cancellation, recoverable errors, runtime validation and page-scoped tool state;
the in-app browser verifies real tool calls, visible map updates, quiz feedback,
and navigation without duplicate registrations.
