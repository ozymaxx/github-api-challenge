import fetch from "node-fetch";
import { postData } from "./ingest-common";

(async () => {
  console.log("**** Querying Commits from Github ****");

  const commits = await fetch(
    "https://api.github.com/repos/blockprotocol/blockprotocol/pulls/277/commits"
  ).then((resp) => resp.json());

  console.log("**** Posting Commits Data ****");
  await postData(commits);
})();
