import * as React from "react";
import * as Quack from "../../types";
import { Color } from "figma-api";
import { getColor } from "../../utils/index";

interface TextProps {
  data: Quack.IText;
}

interface TextState {}

export default class Text extends React.Component<TextProps, TextState> {
  render() {
    const data = this.props.data;
    const absoluteBoundingBox = data.absoluteBoundingBox;
    const inpStyle = data.style;

    const textAlign =
      inpStyle.textAlignHorizontal === "JUSTIFIED"
        ? "justify"
        : inpStyle.textAlignHorizontal;

    const color = getColor(this.props.data.fills[0].color as Color);

    const style = {
      position: "absolute",
      left: absoluteBoundingBox.x + "px",
      top: absoluteBoundingBox.y + "px",
      width: absoluteBoundingBox.width + "px",
      height: absoluteBoundingBox.height + "px",
      fontFamily: inpStyle.fontFamily,
      fontSize: inpStyle.fontSize,
      fontWeight: inpStyle.fontWeight,
      fontStyle: inpStyle.italic ? "italic" : "normal",
      letterSpacing: inpStyle.letterSpacing,
      textAlign: textAlign,
      color: color
    };

    return <p style={style}>{data.characters}</p>;
  }
}
