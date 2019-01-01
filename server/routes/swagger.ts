import { Response, Router } from "express";
import { readdirSync, statSync } from "fs";
import { join, resolve } from "path";
import swaggerJSDoc = require("swagger-jsdoc");

export class APIDocsRouter {

  private static getAllRoutes(dir: string, filelist: string[]): string[] {

    const files = readdirSync(dir);
    filelist = filelist || [];

    files
      .map((file) => {

        // filter out .map and hidden files
        if (file.search(".map") < 0 && file.search(/^\./) < 0) {

          if (statSync(join(dir, file)).isDirectory()) {
            filelist = APIDocsRouter.getAllRoutes(join(dir, file), filelist);
          } else {

            if (file.search(".ts") > 0) {
              filelist.push(join(dir, file));
            }
          }
        }
      });

    return filelist;
  }

  private router: Router = Router();

  public getRouter(): Router {

    /**
     * Generate API documentation from JSDOCS comments.
     *
     * Comments specifications.
     *
     * @link https://github.com/OAI/OpenAPI-Specification/tree/master/examples/v2.0/yaml
     */
    this.router.get("/", (_: {}, response: Response) => {

      const urls: string[] = [];

      APIDocsRouter.getAllRoutes(resolve(__dirname), urls);

      const options: {} = {
        apis: urls,
        swaggerDefinition: {
          info: {
            description: "API documentation.",
            title: "API",
            version: "1.0.0",
          },
        },
      };

      response.setHeader("Content-Type", "application/json");
      response.send(swaggerJSDoc(options));
    });

    return this.router;
  }
}
