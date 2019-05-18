import * as React from "react";
import * as Quack from "../../types";
import { Color } from "@dustinnewman98/figma-api";
import { getColor } from "../../utils/index";

interface VectorProps {
  data: Quack.IVector;
}

interface VectorState {

}

export default class Vector extends React.Component<VectorProps, VectorState> {
  render() {
    const data = this.props.data;
    let { width, height, x, y } = data.absoluteBoundingBox;

    width += (data.strokeWeight ? data.strokeWeight : 0)
    height += (data.strokeWeight ? data.strokeWeight : 0)

    const svgStyle = {
      position: "absolute",
      left: x + "px",
      top: y + "px",
      width: width + "px",
      height: height + "px"
    };

    const pathStyle = {
      fill: data.strokes[0] ? getColor(data.strokes[0].color as Color) : "#fff"
    };

    return (
      <svg viewBox={`
        -${data.relativeTransform 
          ? data.relativeTransform[0][0]
          : 0
        } 
        -${data.relativeTransform 
          ? data.relativeTransform[0][0] 
          : 0
        } ${width} ${height}`} style={svgStyle}>
        <path style={pathStyle} d={data.strokeGeometry[0] ? data.strokeGeometry[0].path : ""}
        />
      </svg>
    );
  }
}
