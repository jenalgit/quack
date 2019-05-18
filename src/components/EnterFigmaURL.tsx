import * as React from "react";
import * as Quack from "../types";
import { ParentComponent } from "./ParentComponent";
import { parseFigmaURL } from "../utils";
import api from "../api";

interface IEnterFigmaURLProps {}

interface IEnterFigmaURLState {
  id?: string;
  nodes?: string;
  document?: Figma.GetFileResult;
  submitted: boolean;
}

export let documentId: string;

export class EnterFigmaURL extends React.Component<
  IEnterFigmaURLProps,
  IEnterFigmaURLState
> {
  constructor() {
    super();
    this.state = { id: "", document: {}, submitted: false };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  private handleOnChange(event: any): void {
    const { id, nodes } = parseFigmaURL(event.target.value);
    documentId = id;
    this.setState({ id: id, nodes: nodes });
  }

  private handleKeyPress(): void {
    // get figma data
    const id = this.state.id ? this.state.id : "";
    const nodes = this.state.nodes ? this.state.nodes : "";
    console.log("nodes is");
    console.log(nodes);

    api
      .getFileNodes(id, {
        ids: nodes,
        geometry: "paths"
      })
      .then(([err, file]) => {
        if (file) {
          // access file data
          console.log(file);
          let document;
          if (file.nodes) {
            document = file.nodes[this.state.nodes].document;
          } else {
            document = file.document;
          }
          this.setState({ submitted: true, document: document });
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

  private resetOriginWrapper(frame: Quack.IGenericFigmaNode) {
    const offset: Quack.ICoordinate = {
      x: frame.absoluteBoundingBox.x,
      y: frame.absoluteBoundingBox.y
    };
    this.resetOrigin(frame, offset);
  }

  private renderPage() {
    let child = this.state.document;
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
