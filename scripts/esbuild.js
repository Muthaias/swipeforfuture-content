import { execFile } from "child_process"
import esbuild from "esbuild"
import { emptyDir } from "fs-extra"
import _glob from "glob"
import { resolve } from "path"
import { promisify } from "util"

const glob = promisify(_glob)
const outdir = "./compiled"
const compiledDir = resolve(outdir)

await emptyDir(compiledDir)

const args = process.argv.slice(2)
const mode = args.includes("--watch") ? "watch" : "build"
// const ids = args.filter((item) => item !== "--watch")
const ids = ['new-world']

// TODO: Temporarily disable importing all scenarios and focus only on the `new-world` which uses the new content format.
// TODO: Add support for old scenarios in the future too.
// const scenarioPaths = await glob('./scripts/scenarios/**/*.ts')
const scenarioPaths = await glob('./scripts/scenarios/new-world/**/*.ts')

/**
 * Export JSON files for selected scenarios.
 *
 * @param {string[]} ids Scenario ids to build.
 */
function exportScenarioJSON(ids) {
    execFile(
        "node",
        [
            "--experimental-specifier-resolution=node",
            "compiled/scripts/build-scenario.js",
            ...ids,
        ],
        (error, stdout, stderr) => {
            if (error) console.error(error)
            else if (stdout) console.log(stdout)
            else if (stderr) console.log(stderr)
        },
    )
}

esbuild
    .build({
        entryPoints: [
            ...scenarioPaths,
            ...(await glob("./scripts/content-utils/*.ts")),
            "./scripts/scenarios/index.ts",
            "./scripts/build-scenario.ts",
            "./swipeforfuture.com/src/game/ContentTypes.ts",
        ],
        outdir,
        bundle: false,
        sourcemap: false,
        minify: false,
        splitting: false,
        format: "esm",
        target: ["esnext"],
        platform: "node",
        watch:
            mode === "watch"
                ? {
                      onRebuild(error, result) {
                          if (error) console.error("watch build failed:", error)
                          else {
                              // Rebuild TS files when changes are detected
                              console.log("watch build succeeded:", result)
                              exportScenarioJSON(ids)
                          }
                      },
                  }
                : undefined,
    })
    .then(() => exportScenarioJSON(ids))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
