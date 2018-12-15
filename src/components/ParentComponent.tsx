import * as React from "react";
import * as Quack from "../types";
import Frame from "./components/Frame";
import { ChildComponent } from "./ChildComponent";
import { FRAME } from "@dustinnewman98/figma-api";

interface ComponentHandlerProps {
  data: Quack.IGenericFigmaNode;
}

interface ComponentHandlerState {}

// The parent component is basically anything with
// a `child` property
export class ParentComponent extends React.Component<
  ComponentHandlerProps,
  ComponentHandlerState
> {
  renderChildren = () => {
    let ele = [];
    let len = this.props.data.children ? this.props.data.children.length : 0;
    for (let i = 0; i < len; i++) {
      let temp = <ChildComponent data={this.props.data.children[i]} />;
      ele.push(temp);
    }
    return <div>{ele}</div>;
  };

  renderFrame = () => {
    return (
      <Frame data={(this.props.data as unknown) as FRAME}>
        {this.renderChildren()}
      </Frame>
    );
  };

  render() {
    if (this.props.data.type === "FRAME") {
      return this.renderFrame();
    } else {
      return this.renderChildren();
    }
  }
}
