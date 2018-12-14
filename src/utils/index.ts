import { Color } from "figma-api";
import { IFigmaMetadata } from "../types";
import api from "../api";

export function getColor(colorSrc: Color) {
  let red = colorSrc.r * 255;
  let green = colorSrc.g * 255;
  let blue = colorSrc.b * 255;
  let alpha = colorSrc.a;

  let color = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
  return color;
}

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

export function fetchImage(imageRef: Quack.nodeId, nodeId: Quack.nodeId) {
  return api
    .getImage(imageRef, { ids: nodeId, scale: 1, format: "jpg" })
    .then(([err, imageRes]) => {
      if (imageRes) {
        // access file data
        return imageRes.images.nodeId;
      }
    });
  // {"err":null,"images":{"1:134":"https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/bc98/8bad/c9705450234193bfa9679775600bdc1e"}}
}
/*
function createImage(data: Quack.IImageType) {
  const currFill: Quack.IFillObject = data.fills[0];
  const src = fetchImage(currFill, data.nodeId);
  const title = data.name;

  let { x, y, width, height } = data.absoluteBoundingBox;

  let style = {
    position: "absolute",
    marginLeft: x,
    marginTop: y,
    width: width,
    height: height
  };

  return <img src={src} alt={title} style={style} />;
}
*/
