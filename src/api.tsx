import * as Figma from "figma-api";
const config = require("./config.json");

const api = new Figma.Api({
  personalAccessToken: config.figmaId
});

export default api;
