// Source:
// https://github.com/mermaid-js/mermaid/blob/ecf9ea11343905b32407d861a2a6b091aaa90a41/packages/mermaid/src/docs/.vitepress/theme/mermaid.ts
import mermaid, { type MermaidConfig } from "mermaid";

mermaid.registerIconPacks([
  {
    name: "logos",
    loader: () =>
      fetch("https://unpkg.com/@iconify-json/logos/icons.json").then((res) =>
        res.json()
      ),
  },
]);

export const render = async (
  id: string,
  code: string,
  config: MermaidConfig
): Promise<string> => {
  mermaid.initialize(config);
  const { svg } = await mermaid.render(id, code);
  return svg;
};
