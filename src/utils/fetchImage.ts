import api from "../api";
import * as Quack from "../types";

import { documentId } from "../components/EnterFigmaURL";

export function fetchImage(nodeId: Quack.nodeId) {
  return api
    .getImage(documentId, { ids: nodeId, scale: 1, format: "png" })
    .then(([err, imageRes]) => {
      if (err) {
        console.log("ERROR fetching image");
        console.log(err);
      }
      // access file data
      console.log("inside fetch image");
      console.log(imageRes);
      return imageRes.images[nodeId];
    });
  // {"err":null,"images":{"1:134":"https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/bc98/8bad/c9705450234193bfa9679775600bdc1e"}}
}
