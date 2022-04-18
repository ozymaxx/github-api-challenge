require("dotenv").config();
import fetch from "node-fetch";

import { postData } from "./ingest-common";

(async () => {
  console.log(
    "**** Querying Data associated with Pull Request #252 from Github ****"
  );

  const pull_requests = await fetch(
    "https://api.github.com/repos/blockprotocol/blockprotocol/pulls/252",
    {
       headers: {
         Authorization: process.env.PERSONAL_ACCESS_TOKEN,
       }
    }
  ).then((resp) => resp.json());

  console.log("**** Posting Pull Request Data ****");
  await postData(pull_requests);
})();
