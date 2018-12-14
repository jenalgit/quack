export { getColor } from "./getColor";
export { fetchImage } from "./fetchImage";
export { parseFigmaURL } from "./parseFigmaURL";
export { isWebsafe } from "./isWebsafe";
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
