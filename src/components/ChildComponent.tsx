import * as React from "react";
import * as Quack from "../types";
import Rectangle from "./components/Rectangle";
import Text from "./components/Text";
import Ellipse from "./components/Ellipse";
import Line from "./components/Line";
import { ParentComponent } from "./ParentComponent";
import Vector from './components/Vector';

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

  renderLine = () => {
    return <Line data={this.props.data as Quack.ILine} />;
  };

  renderVector = () => {
    return <Vector data={this.props.data as Quack.IVector} />;
  };

  render() {
    let ele;
    switch (this.props.data.type) {
      case "GROUP":
      case "FRAME":
      case "COMPONENT":
      case "INSTANCE":
        ele = this.renderParent();
        break;
      case "VECTOR":
        ele = this.renderVector();
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
      case "LINE":
        ele = this.renderLine();
        break;
    }
    return <div className={this.props.data.name}>{ele}</div>;
  }
}
