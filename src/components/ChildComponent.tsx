import * as React from "react";
import * as Quack from "../types";
import Rectangle from "./components/Rectangle";
import Text from "./components/Text";
import Ellipse from "./components/Ellipse";
import { ParentComponent } from "./ParentComponent";

interface ChildComponentProps {
  data: Quack.IGenericFigmaNode;
}

interface ChildComponentState {}

export class ChildComponent extends React.Component<
  ChildComponentProps,
  ChildComponentState
> {
  renderParent = () => {
    return (
      <ParentComponent data={this.props.data as Quack.IGenericFigmaNode} />
    );
  };
  renderRectangle = () => {
    return <Rectangle data={this.props.data as Quack.IRectangle} />;
  };

  renderText = () => {
    return <Text data={this.props.data as Quack.IText} />;
  };

  renderEllipse = () => {
    return <Ellipse data={this.props.data as Quack.IEllipse} />;
  };

  render() {
    let ele;
    console.log("heheHE i am a child and my data is:");
    console.log(this.props.data);
    switch (this.props.data.type) {
      case "GROUP":
      case "FRAME":
      case "COMPONENT":
      case "INSTANCE":
        ele = this.renderParent();
        break;
      case "RECTANGLE":
        ele = this.renderRectangle();
        break;
      case "TEXT":
        ele = this.renderText();
        break;
      case "ELLIPSE":
        ele = this.renderEllipse();
        break;
    }
    return <div className={this.props.data.name}>{ele}</div>;
  }
}
