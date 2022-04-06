import express from "express";
import bodyParser from "body-parser";
import { port } from "./config";

const app = express();
app.use(bodyParser.json());

// ********************* ROUTES ********************* //

/**
 * Given (a) id of an entity and (b) an integer passed as a query param,
 * provide the graph with the given entity at the root,
 * resolved to a depth specified by the integer.
 *
 * @todo implement me. you may redesign the endpoint, but must update scripts/query.ts to match
 */
app.get("/graph/:entity_id", async (req, res) => {
  const { depth } = req.query;

  res.status(501).send();
});

/**
 * Given a JSON object passed as an URL-encoded query param,
 * find entities that are of or contain the same structure.
 *
 * @todo implement me. you may redesign the endpoint, but must update scripts/query.ts to match
 */
app.get("/entities", async (req, res) => {
  const { object } = req.query;

  res.status(501).send();
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
