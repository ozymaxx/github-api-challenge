require("dotenv").config();
import fetch from "node-fetch";

import { postData } from "./ingest-common";

(async () => {
  console.log(
    "**** Querying Commits associated with Pull Request #252 from Github ****"
  );

  const commits = await fetch(
    "https://api.github.com/repos/blockprotocol/blockprotocol/pulls/252/commits"
    // {
    //   headers: {
    //     Authorization: process.env.PERSONAL_ACCESS_TOKEN,
    //   },
    // }
  ).then((resp) => resp.json());

  console.log("**** Posting Commits Data ****");
  await postData(commits);
})();
