import * as React from "react";
import * as Quack from "../../types";
import { Color } from "@dustinnewman98/figma-api";
import { getColor, fetchImage } from "../../utils/index";

interface RectangleProps {
  data: Quack.IRectangle;
}

interface RectangleState {
  hasImageFill: boolean;
  imageURL: string;
}

export default class Rectangle extends React.Component<
  RectangleProps,
  RectangleState
> {
  constructor(props: RectangleProps) {
    super(props);

    this.state = { hasImageFill: false, imageURL: "" };
  }
  getImageFill = () => {
    fetchImage(this.props.data.id)
      .then(src => `url("${src}")`)
      .then(url => {
        this.setState({
          hasImageFill: true,
          imageURL: url
        });
      });
  };

  getBackground = () => {
    const fills = this.props.data.fills[0];
    const type = fills ? fills.type : null;
    if (type === "SOLID") {
      return getColor(fills.color as Color);
    } else if (type === "IMAGE") {
      this.getImageFill();
      return "linear-gradient(#FA71CD, #C471F5)";
    } else {
      return "transparent";
    }
  };

  getBorder = () => {
    const borderWidth = this.props.data.strokeWeight;
    const borderColor = getColor(this.props.data.strokes[0] ?this.props.data.strokes[0].color as Color: {r: 0, g: 0, b: 0, a: 0} as Color);

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
      background: this.state.hasImageFill
        ? this.state.imageURL
        : this.getBackground(),
      border: this.getBorder(),
      borderRadius: data.cornerRadius + "px"
    };

    return <div style={style} />;
  }
}
