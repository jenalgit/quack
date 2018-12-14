import * as React from "react";
import * as Quack from "../../types";
import { Color } from "figma-api";
import { getColor, fetchImage } from "../../utils/index";

interface LineProps {
  data: Quack.ILine;
}

interface LineState {
  hasImageFill: boolean;
  imageURL: string;
}

export default class Line extends React.Component<LineProps, LineState> {
  render() {
    const data = this.props.data;
    const { width, x, y } = data.absoluteBoundingBox;

    const svgStyle = {
      position: "absolute",
      left: x + "px",
      top: y + "px",
      width: width + "px",
      height: data.strokeWeight + "px"
    };

    const lineStyle = {
      position: "absolute",
      stroke: getColor(data.strokes[0].color as Color)
    };

    return (
      <svg style={svgStyle} width={width} height={data.strokeWeight}>
        <line x1={0} x2={width} y1={0} y2={0} style={lineStyle} />
      </svg>
    );
  }
}
