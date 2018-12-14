import * as React from "react";
import { Helmet } from "react-helmet";

import { isWebsafe } from "../../utils";

interface ImportProps {
  font: string;
}

interface ImportState {}

export default class Import extends React.Component<ImportProps, ImportState> {
  parseProps = (): string => {
    return this.props.font.replace(/\s/g, "+");
  };

  render() {
    if (isWebsafe(this.props.font)) {
      return null;
    }

    const font = this.parseProps();
    const link = "https://fonts.googleapis.com/css?family=" + font;

    return (
      <Helmet>
        <link href={link} rel="stylesheet" />
      </Helmet>
    );
  }
}
