// index.js
import { Octokit } from "@octokit/core";
import myPlugin from "./lib/my-plugin.js";
import octokitPluginExample from "octokit-plugin-example";
const MyOctokit = Octokit.plugin(
  myPlugin,
  octokitPluginExample
);

const octokit = new MyOctokit({ greeting: "Moin moin" });
octokit.helloWorld(); // logs "Moin moin, world!"
octokit.request("GET /"); // logs "GET / - 200 in 123ms"

// lib/my-plugin.js
const plugin = (octokit, options = { greeting: "Hello" }) => {
  // hook into the request lifecycle
  octokit.hook.wrap("request", async (request, options) => {
    const time = Date.now();
    const response = await request(options);
    console.log(
      `${options.method} ${options.url} – ${response.status} in ${Date.now() -
      time}ms`
    );
    return response;
  });

  // add a custom method
  return {
    helloWorld: () => console.log(`${options.greeting}, world!`)
  }
};
export default plugin;
