import fetch from "node-fetch";

import { postData } from "./ingest-common";

(async () => {
  console.log("**** Querying Pull Requests from Github ****");

  const pull_requests = await fetch(
    "https://api.github.com/repos/blockprotocol/blockprotocol/pulls/277"
  ).then((resp) => resp.json());

  console.log("**** Posting Pull Request Data ****");
  await postData(pull_requests);
})();
