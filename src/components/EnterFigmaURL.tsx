import * as React from "react";
import * as Quack from "../types";
import { ParentComponent } from "./ParentComponent";
import { parseFigmaURL } from "../utils";
import api from "../api";

interface EnterFigmaURLProps {}

interface EnterFigmaURLState {
  id?: string;
  data?: Figma.GetFileResult;
  submitted: boolean;
}

export class EnterFigmaURL extends React.Component<
  EnterFigmaURLProps,
  EnterFigmaURLState
> {
  constructor(props: EnterFigmaURLProps) {
    super(props);
    this.state = { id: "", data: {}, submitted: false };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  private handleOnChange(event: any): void {
    let id = parseFigmaURL(event.target.value).id;
    this.setState({ id: id });
  }

  private handleKeyPress(): void {
    // get figma data
    let id = this.state.id ? this.state.id : "";

    api.getFile(id).then(([err, file]) => {
      if (file) {
        // access file data
        console.log(file);
        this.setState({ submitted: true, data: file });
      }
    });
  }

  private resetOrigin(
    object: Quack.IGenericFigmaNode,
    offset: Quack.ICoordinate
  ) {
    object.absoluteBoundingBox.x = object.absoluteBoundingBox.x - offset.x;
    object.absoluteBoundingBox.y = object.absoluteBoundingBox.y - offset.y;
    const len = object.children ? object.children.length : 0;
    for (let i = 0; i < len; i++) {
      this.resetOrigin(object.children[i], offset);
    }
  }

  private resetOriginWrapper(canvas: Quack.IGenericFigmaNode) {
    if (canvas.children == undefined || canvas.children[0].type !== "FRAME") {
      console.log("YEET RESET ORIGIN WRAPPEER");
      return;
    }
    const frame = canvas.children[0];
    const offset: Quack.ICoordinate = {
      x: frame.absoluteBoundingBox.x,
      y: frame.absoluteBoundingBox.y
    };
    this.resetOrigin(frame, offset);
  }

  private renderPage() {
    let child = this.state.data.document.children[0];
    while (child.type != "CANVAS") {
      child = child.children[0];
    }
    this.resetOriginWrapper(child);
    return <ParentComponent data={child} />;
  }

  private renderInput() {
    return (
      <div
        style={{
          borderRadius: "13px",
          backgroundImage: "linear-gradient(#FA71CD, #C471F5)",
          height: "21%",
          width: "43%",
          padding: "20px 10px 30px 10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <h2
          style={{
            color: "white",
            fontFamily: "Helvetica",
            fontWeight: "bold",
            letterSpacing: "0.7px",
            marginTop: "0px"
          }}
        >
          Enter Figma URL:
        </h2>
        <input
          type="url"
          value={this.state.url}
          placeholder="figma.com/file/..."
          onChange={e => this.handleOnChange(e)}
          onKeyPress={this.handleKeyPress}
          style={{
            borderRadius: "8px",
            backgroundColor: "white",
            border: 0,
            padding: "4px",
            font: "24px Inconsolata"
          }}
        />
      </div>
    );
  }

  render() {
    return this.state.submitted ? this.renderPage() : this.renderInput();
  }
}
