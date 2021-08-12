import { outputFile } from "fs-extra"
import { resolve } from "path"
import { fileURLToPath } from "url"

import scenarios from "./scenarios"
import { Scenario, ScenarioManifest } from "./content-utils"

const MANIFEST_FILENAME = "scenarios.json"

async function buildScenarioManifest(
    scenarios: { [id: string]: Scenario },
    outputDir: string,
) {
    const manifest: ScenarioManifest = {
        buildDate: new Date().toISOString(),
        scenarios: Object.fromEntries(
            Object.keys(scenarios).map((id) => [id, {}]),
        ),
    }

    return outputFile(
        resolve(outputDir, MANIFEST_FILENAME),
        JSON.stringify(manifest, null, 4),
    )
}

export async function buildScenarios(ids: string[], outputDir: string) {
    return Promise.all(
        Object.values(scenarios)
            .filter((scenario) => ids.includes(scenario.id))
            .map(async (scenario) => {
                const outputPath = resolve(outputDir, `${scenario.id}.json`)
                await outputFile(outputPath, JSON.stringify(scenario))

                console.log(`✅ Built "${scenario.id}"   -->   ${outputPath}`)
            }),
    )
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url)

if (isMainModule) {
    const ids = process.argv.slice(2)
    console.log("Building:", ids)
    const outputDir = resolve(process.cwd(), "dist")

    Promise.all([
        buildScenarios(ids, outputDir),
        buildScenarioManifest(scenarios, outputDir),
    ]).catch((reason: string) => {
        console.error("❌ Build error: ", reason)
    })
}
