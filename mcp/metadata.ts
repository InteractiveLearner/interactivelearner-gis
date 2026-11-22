export function serverCard(origin: string) {
  return {
    $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
    name: 'com.interactivelearner-gis/docs', version: '1.1.0', title: 'Interactive Learner GIS',
    description: 'Search and read public GIS lessons and exercises.',
    websiteUrl: 'https://interactivelearner-gis.com/ai',
    remotes: [{ type: 'streamable-http', url: `${origin}/mcp`, supportedProtocolVersions: ['2025-11-25', '2025-06-18', '2025-03-26'] }],
  };
}

export function apiCatalog(origin: string) {
  return { linkset: [{ anchor: `${origin}/mcp`, 'service-doc': [{ href: 'https://interactivelearner-gis.com/ai', type: 'text/html' }],
    'service-desc': [{ href: `${origin}/mcp/server-card`, type: 'application/mcp-server-card+json' }], status: [{ href: `${origin}/health`, type: 'application/json' }] }] };
}
