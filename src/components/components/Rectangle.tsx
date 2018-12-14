import * as React from "react";
import * as Quack from "../../types";
import { Color } from "figma-api";
import { getColor, fetchImage } from "../../utils/index";

interface RectangleProps {
  data: Quack.IRectangle;
}

interface RectangleState {}

export default class Rectangle extends React.Component<
  RectangleProps,
  RectangleState
> {
  getBackground = () => {
    const fills = this.props.data.fills[0];
    const type = fills ? fills.type : null;
    if (type === "SOLID") {
      return getColor(this.props.data.fills[0].color as Color);
    } else if (type === "IMAGE") {
      const imgSrc = fetchImage(
        this.props.data.fills[0].imageRef,
        this.props.data.id
      );
      return `url("${imgSrc}")`;
    } else {
      return "transparent";
    }
  };

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
      backgroundColor: this.getBackground(),
      borderRadius: data.cornerRadius + "px"
    };

    return <div style={style} />;
  }
}
