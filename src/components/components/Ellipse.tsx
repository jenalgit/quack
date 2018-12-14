import * as React from "react";
import * as Quack from "../../types";
import { Color } from "figma-api";
import { getColor } from "../../utils/index";

interface EllipseProps {
  data: Quack.IEllipse;
}

interface EllipseState {}

export default class Ellipse extends React.Component<
  EllipseProps,
  EllipseState
> {
  getBorder = () => {
    const borderWidth = this.props.data.strokeWeight;
    const borderColor = getColor(this.props.data.strokes[0].color as Color);

    let border = borderWidth + "px solid " + borderColor;
    return border;
  };

  render() {
    const data = this.props.data;
    const absoluteBoundingBox = data.absoluteBoundingBox;

    const style = {
      position: "absolute",
      left: absoluteBoundingBox.x + "px",
      top: absoluteBoundingBox.y + "px",
      width: absoluteBoundingBox.width + "px",
      height: absoluteBoundingBox.height + "px",
      backgroundColor: getColor(data.fills[0].color as Color),
      cornerRadius: "50%"
    };

    return <div style={style} />;
  }
}
