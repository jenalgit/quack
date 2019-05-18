import * as React from "react";
import * as Quack from "../../types";
import { Color } from "@dustinnewman98/figma-api";
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
    const { width, height, x, y } = data.absoluteBoundingBox;

    const svgStyle = {
      position: "absolute",
      left: x + "px",
      top: y + "px"
    };

    if (width === 0) {
      svgStyle.width = `${data.strokeWeight}px`;
    }

    if (height === 0) {
      svgStyle.height = `${data.strokeWeight}px`
    }

    const lineStyle = {
      position: "absolute",
      stroke: getColor(data.strokes[0].color as Color)
    };

    const strokecap = data.strokeCap ? data.strokeCap.toLowerCase() : "";
    const linecap =
      strokecap === "round" ? "round" : strokecap === "square" ? "square" : "butt";

    return (
      <svg style={svgStyle} viewBox={width === 0 ? `-${Math.ceil(data.strokeWeight / 2)} 0 ${data.strokeWeight} ${height + data.strokeWeight}` : `0 -${Math.ceil(data.strokeWeight / 2)} ${width + data.strokeWeight} ${data.strokeWeight}`}>
        <line
          x1={width === 0 ? 0 : data.strokeWeight / 2}
          x2={width}
          y1={width === 0 ? data.strokeWeight / 2 : 0}
          y2={height}
          style={lineStyle}
          strokeWidth={data.strokeWeight}
          strokeLinecap={linecap}
        />
      </svg>
    );
  }
}
