import { Color } from "figma-api";

export function getColor(colorSrc: Color) {
  let red = colorSrc.r * 255;
  let green = colorSrc.g * 255;
  let blue = colorSrc.b * 255;
  let alpha = colorSrc.a;

  let color = "rgba(" + red + ", " + green + ", " + blue + ", " + alpha + ")";
  return color;
}
