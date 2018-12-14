import * as React from "react";
import * as Quack from "../../types";
import { Color } from "figma-api";
import { getColor } from "../../utils/index";
import Import from "./Import";

interface TextProps {
  data: Quack.IText;
}

interface TextState {}

export default class Text extends React.Component<TextProps, TextState> {
  render() {
    const data = this.props.data;
    const absoluteBoundingBox = data.absoluteBoundingBox;
    const font = data.style;

    const textAlign =
      font.textAlignHorizontal === "JUSTIFIED"
        ? "justify"
        : font.textAlignHorizontal;

    const color = getColor(this.props.data.fills[0].color as Color);

    const style = {
      position: "absolute",
      left: absoluteBoundingBox.x + "px",
      top: absoluteBoundingBox.y + "px",
      width: absoluteBoundingBox.width + "px",
      height: absoluteBoundingBox.height + "px",
      fontFamily: '"' + font.fontFamily + '"',
      fontSize: font.fontSize,
      fontWeight: font.fontWeight,
      fontStyle: font.italic ? "italic" : "normal",
      letterSpacing: font.letterSpacing,
      textAlign: textAlign,
      color: color,
      margin: 0
    };

    return (
      <div>
        <Import font={font.fontFamily} />
        <p style={style}>{data.characters}</p>
      </div>
    );
  }
}
