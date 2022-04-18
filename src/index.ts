import express from "express";
import bodyParser from "body-parser";
import { port } from "./config";
import { Controller } from "./controller";

const app = express();
app.use(bodyParser.json());
const controller = new Controller();

// ********************* ROUTES ********************* //

/**
 * Accepts a collection of data, as JSON. This data is parsed and transformed into entities, and links are derived.
 */
app.post("/ingest", async (req, res, _next) => {
  const data = req.body;
  controller.processEntity(data);
  res.sendStatus(200);
});

/**
 * Returns the list of entities
 */
app.get("/entities", async (_req, res) => {
  console.log(controller.getEntities());
  res.status(200).send(controller.getEntities());
});

/**
 * Returns the list of links
 *
 * @todo implement me. you may redesign the endpoint
 */
app.get("/links", async (_req, res) => {
  console.log(controller.getLinks());
  res.status(200).send(controller.getLinks());
});

/**
 * --- Optional Extension ---
 *
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
 * --- Optional Extension ---
 *
 * Given a JSON object passed as an URL-encoded query param,
 * find entities that are of or contain the same structure.
 *
 * @todo implement me. you may redesign the endpoint, but must update scripts/query.ts to match
 */
app.get("/entities/structure", async (req, res) => {
  const { object } = req.query;

  res.status(501).send();
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
