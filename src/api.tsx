import * as Figma from "@dustinnewman98/figma-api";
const config = require("./config.json");

const api = new Figma.Api({
  personalAccessToken: config.figmaId
});

export default api;
