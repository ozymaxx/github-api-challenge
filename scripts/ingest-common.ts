import fetch from "node-fetch";

import { baseUrl } from "../src/config";

export const postData = async (data: any) => {
  await fetch(`${baseUrl}/post`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((resp) => {
    if (resp.ok) {
      console.log("Data was posted successfully");
    } else {
      console.error(
        `Something went wrong when posting the data: ${JSON.stringify(resp)}`
      );
    }
  });
};
