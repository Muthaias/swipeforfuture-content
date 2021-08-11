import fse from "fs-extra"
import { resolve } from "path"
import { fileURLToPath } from "url"

import scenarios from "./scenarios"
import { Scenario, ScenarioManifest } from './content-utils'

const { outputFile, readdir, stat } = fse
const MANIFEST_FILENAME = "scenarios.json"

async function getScenarioIds(path: string): Promise<string[]> {
    const entries = await readdir(path)
    return entries.filter(async (entry) => {
        const stats = await stat(resolve(path, entry))
        return stats.isDirectory()
    })
}

async function buildScenarioManifest(scenarios: { [id: string]: Scenario }, outputDir: string) {
    const manifest: ScenarioManifest = {
        buildDate: new Date().toISOString(),
        scenarios: Object.fromEntries(Object.keys(scenarios).map(id => ([id, {}])))
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

                console.log(
                    `✅ Successfully exported scenario "${scenario.id}" to ${outputPath}`,
                )
            }),
    )
}

const isMainModule = process.argv[1] === fileURLToPath(import.meta.url)

if (isMainModule) {
    const id = process.argv.length >= 3 ? process.argv[2] : "*"
    const outputDir = resolve(
        process.cwd(),
        process.argv.length >= 4 ? process.argv[3] : "dist",
    )
    const scenariosDir = resolve(process.cwd(), "scripts", "scenarios")
    const allScenarioIds = await getScenarioIds(scenariosDir)
    const ids = id === "*" ? allScenarioIds : [id]

    Promise.all([
        buildScenarios(ids, outputDir),
        buildScenarioManifest(scenarios, outputDir),
    ]).catch((reason: string) => {
        console.error("❌ Build error: ", reason)
    })
}
