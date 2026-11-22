---
title: AI learning tools
description: Read GIS lessons as Markdown and use browser tools for guided learning.
date: 2026-11-04
---

# AI learning tools

Interactive Learner GIS publishes the same lessons for readers and AI assistants.
All lesson content is public and requires no account or API key.

## Read lesson Markdown

Use the [page index](/llms.txt) to find Markdown for every lesson and exercise.
For example, <a href="/lessons/projections.md" target="_blank" rel="noopener">the projections lesson in Markdown</a> has the lesson text,
source links and practice questions. Quiz answer keys are omitted.

You can also request a lesson URL with `Accept: text/markdown`. Browsers receive
HTML by default. Negotiated responses include `Vary: Accept`.

## Learn with browser tools

In a browser that supports WebMCP, an assistant can use these tools:

| Tool | Use |
| --- | --- |
| `get_page_markdown` | Read the current lesson. |
| `list_visualizations` | Read the available controls, current settings and loading state. |
| `update_visualization` | Demonstrate a different projection, map scale, classification, color scheme or other supported setting. |
| `read_quiz_results` | Read your attempted answers and feedback to help explain difficult concepts. |

Visualization changes appear on the page, and you can continue changing the
controls yourself. The tools cannot submit or change quiz answers. Unanswered
questions do not expose answer keys through the results tool.

Your quiz attempts live only in the current page session. Leaving the page or
reloading clears them. The site does not send them to its remote MCP server.
When you ask an assistant to read your results, its browser integration receives
the returned results.

WebMCP uses the W3C polyfill and the Web Machine Learning Community Group's
TypeScript definitions. A compatible browser integration is required to connect
an assistant; installing the polyfill alone does not connect one.

## Remote MCP

The separate documentation MCP server provides `search_docs`, `list_topics` and
`get_doc`, plus Markdown resources. Search uses the actual lesson text and returns
ranked excerpts and source links. It cannot read browser quiz results or change
visualizations.

The server exposes `/mcp`, `/mcp/server-card` and `/health` on its own host.
When the site's build is configured with its public URL, the
<a href="/.well-known/api-catalog" target="_blank" rel="noopener">API catalog</a> and
[AI catalog](/.well-known/ai-catalog.json) advertise that service.

## Discovery

- <a href="/.well-known/api-catalog" target="_blank" rel="noopener">API catalog</a>
- [OpenAPI description of Markdown endpoints](/openapi.json)
- [AI catalog](/.well-known/ai-catalog.json)
- [GIS tutoring skill index](/.well-known/agent-skills/index.json)

The AI catalog, skill discovery format and WebMCP are evolving community
specifications. This site does not provide an OAuth authorization service or an
A2A agent. DNS discovery records are managed separately by the domain operator.
