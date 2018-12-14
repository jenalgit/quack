import * as React from "react";
import { EnterFigmaURL } from "./components/EnterFigmaURL";

export class App extends React.Component<undefined, undefined> {
  render() {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <EnterFigmaURL />
      </div>
    );
  }
}
