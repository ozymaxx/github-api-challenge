import {v4 as uuidv4} from 'uuid';

/*
 * Controller is a class that implements the graph builder logic asked in this assignment.
 * Basically, we assume that:
 * - Github explicitly expresses all the entity names in the url fields of their responses,
 * - "repo" is a starting point for us to discover the rest of the entities,
 * - there could be entities outside of the scope of "repos",
 * - and there could be those belonging to the "repo"s.
 */
export class Controller {
    static KEYWORDS_EXCLUDED = new Set<string>(["trees", "git"]);
    static REPO_ROOT_ENTITY_NAME = "repos"

    private entityNames: Set<string>;
    private links: [string, string][];
    private id2Entity: { [id: string]: {} };
    private repoEntityId: string;

    constructor() {
        // add the "pull-request" entity name as the initial entity name
        this.entityNames = new Set<string>();
        this.entityNames.add(Controller.REPO_ROOT_ENTITY_NAME);

        this.links = [];
        this.id2Entity = {};

        // generate the id of the repo in advance
        this.repoEntityId = uuidv4();
    }

    private extractEntityNameAndContent(urlStr: string): [string, string] {
        const tokens = urlStr.split("/")
        // check first if the given url points to a non-repo-related entity
        if (tokens.length < 5) {
            return ["", ""];
        }
        // if the given url is not repo-related, this means the entity is something outside
        // of the repo context. try to infer what is next to the https://api.github.com prefix
        if (tokens[3] != Controller.REPO_ROOT_ENTITY_NAME) {
            return [tokens[3], tokens[4]];
        }
        // otherwise we can assume that this is potentially a repo-related entity. check if
        // the url has expected length
        if (tokens.length < 8) {
            return ["", ""];
        }
        return [tokens[6], tokens[7]];
    }

    // this function recursively iterates through the given object
    private eachRecursive(parentEntityId: string, obj: {[key: string]: {}}) {
        // traverse the whole map and extract entity names
        for (var k in obj)
        {
            if (typeof obj[k] == "object" && obj[k] !== null)
                this.eachRecursive(parentEntityId, obj[k]);
            else if (k == "url") {
                var [entityNamePlural, entityName] = this.extractEntityNameAndContent(obj[k] as string)
                if (Controller.KEYWORDS_EXCLUDED.has(entityNamePlural) || entityNamePlural == "") {
                    continue
                }
                this.entityNames.add(entityNamePlural)
                const id = uuidv4();
                this.id2Entity[id] = {
                    type: entityNamePlural,
                    content: entityName
                }
                this.links.push([parentEntityId, id])
                if (typeof obj[k] == "object") {
                    this.eachRecursive(id, obj[k])
                }
            }
        }
    }

    public processEntity(data: {}) {
        // start traversing the GH response with the parent entity ID being equal to the
        // repo entity ID generated during construction
        this.eachRecursive(this.repoEntityId, data);
    }

    public getLinks(): [string, string][] {
        return this.links;
    }

    public getEntities(): { [id: string]: {} } {
        return this.id2Entity;
    }
}