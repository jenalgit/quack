import * as React from "react";
import { Color, FRAME } from "@dustinnewman98/figma-api";
import { getColor } from "../../utils/index";

interface FrameProps {
  data: FRAME;
}

interface FrameState {}

export default class Frame extends React.Component<FrameProps, FrameState> {
  render() {
    const data = this.props.data;
    const absoluteBoundingBox = data.absoluteBoundingBox;

    const style = {
      left: absoluteBoundingBox.x + "px",
      top: absoluteBoundingBox.y + "px",
      width: absoluteBoundingBox.width + "px",
      height: absoluteBoundingBox.height + "px",
      backgroundColor: getColor(this.props.data.backgroundColor as Color)
    };

    return (
      <div className={data.name} style={style}>
        {this.props.children}
      </div>
    );
  }
}
