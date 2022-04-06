import fetch from "node-fetch";

import { baseUrl } from "../src/config";

(async () => {
  console.log("**** TESTING THE GRAPH ENDPOINT ****");

  const graphResults = await fetch(`${baseUrl}/graph/1?depth=3`).then((resp) =>
    resp.json()
  );
  console.log(`Graph results: ${graphResults}`);

  console.log("**** TESTING THE STRUCTURE MATCHING ENDPOINT ****");
  const object = {
    // @todo INSERT STRUCTURE WE EXPECT TO BE FOUND IN ENTITIES
  };
  const urlEncodedObject = encodeURIComponent(JSON.stringify(object));
  const structureResults = await fetch(
    `${baseUrl}/entities?object=${urlEncodedObject}`
  ).then((resp) => resp.json());
  console.log(`Structural match results: ${structureResults}`);
})();
