import * as React from "react";
import * as Quack from "../types";
import { ChildComponent } from "./ChildComponent";

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
  render() {
    let ele = [];
    let len = this.props.data.children.length;
    console.log("oh hi hellow i am the parent");
    console.log(this.props.data);
    for (let i = 0; i < len; i++) {
      let temp = <ChildComponent data={this.props.data.children[i]} />;
      console.log("temp is");
      console.log(temp);
      ele.push(temp);
    }
    console.log("ele is ");
    console.log(ele);
    return <div>{ele}</div>;
  }
}
