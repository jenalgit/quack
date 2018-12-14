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
        //this.renderPage(this.state.data.document);
      }
    });
  }

  private renderPage(data: Quack.IGenericFigmaNode) {
    let child = data.children[0];
    while (child.type != "CANVAS") {
      child = child.children[0];
    }
    //child = child.children;
    console.log("child is");
    console.log(child);
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
    return this.state.submitted
      ? this.renderPage(this.state.data.document)
      : this.renderInput();
  }
}
