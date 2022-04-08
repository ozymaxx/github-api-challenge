import fetch from "node-fetch";

import { baseUrl } from "../src/config";

(async () => {
  console.log("—————————————————————————————————————————");
  console.log("**** CALLING THE _ENTITIES_ ENDPOINT ****");
  const entityResults = await fetch(`${baseUrl}/entities`)
    .then((resp) => resp.json())
    .catch((err) => console.error(`Error fetching ENTITIES: ${err.message}`));
  console.log(`Entity results: ${entityResults}`);

  console.log("————————————————————————————————————————");
  console.log("***** CALLING THE _LINKS_ ENDPOINT *****");
  const linkResults = await fetch(`${baseUrl}/links`)
    .then((resp) => resp.json())
    .catch((err) => console.error(`Error fetching LINKS: ${err.message}`));
  console.log(`Link results: ${linkResults}`);

  console.log("————————————————————————————————————————");
  console.log("***** CALLING THE _GRAPH_ ENDPOINT *****");
  const graphResults = await fetch(`${baseUrl}/graph/1?depth=3`)
    .then((resp) => resp.json())
    .catch((err) => console.error(`Error fetching GRAPH: ${err.message}`));
  console.log(`Graph results: ${graphResults}`);

  console.log("—————————————————————————————————————————————————");
  console.log("*** CALLING THE _STRUCTURE MATCHING_ ENDPOINT ***");
  const object = {
    commits_url:
      "https://api.github.com/repos/blockprotocol/blockprotocol/pulls/277/commits",
    comments_url:
      "https://api.github.com/repos/blockprotocol/blockprotocol/issues/277/comments",
  };
  const urlEncodedObject = encodeURIComponent(JSON.stringify(object));
  const structureResults = await fetch(
    `${baseUrl}/entities/structure?object=${urlEncodedObject}`
  )
    .then((resp) => resp.json())
    .catch((err) =>
      console.error(`Error fetching MATCHING entities: ${err.message}`)
    );
  console.log(`Structural match results: ${structureResults}`);
  console.log("—————————————————————————————————————————————————");
})();
