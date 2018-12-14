import { IFigmaMetadata } from "../types";

export function parseFigmaURL(url: string): IFigmaMetadata {
  const exp = /figma\.com\/file\/(?<figma_id>.*(?=\/))\/(?<doc_name>.+?)\??(node-id=)?(?<node_id>.+?)?/g;

  const data = exp.exec(url);
  const id = data[1];
  const title = data[2];
  const root = data[3] ? decodeURIComponent(data[3]) : "0:1";
  console.log(id);
  console.log(title);

  console.log(root);

  return {
    id,
    title,
    root
  };
}
