import { resolve, join } from "path"
import { promises, readdirSync, statSync } from "fs"
const { writeFile, mkdir } = promises

import { GameWorld, ScenarioBuilder, Scenario } from "./content-utils"

async function buildScenario(id: string) {
    try {
        const builder: ScenarioBuilder = (
            await import(`./scenarios/${id}/index.ts`)
        ).builder

        const scenario = builder.run()
        console.log(`✅ Successfully built scenario "${id}"`)

        return scenario
    } catch (e) {
        throw new Error(`Error: Failed to build scenario "${id}" - ${e}`)
    }
}

async function exportScenario(outputDir: string, scenario: Scenario) {
    type Parts = {
        [K in keyof GameWorld]: string
    }

    const scenarioParts: Parts = {
        cards: "cards",
        eventCards: "event-cards",
        events: "events",
        defaultState: "default-state",
        stats: "stats",
        worldStateModifiers: "modifiers",
    }

    await mkdir(outputDir, { recursive: true })

    await Promise.all(
        Object.entries(scenarioParts).map(([part, fileName]) =>
            writeFile(
                resolve(join(outputDir, `${fileName}.json`)),
                JSON.stringify(scenario[part as keyof GameWorld], null, 4),
            ),
        ),
    )

    console.log(
        `✅ Successfully exported scenario "${scenario.id}" to ${outputDir}`,
    )
}

async function buildAll() {
    // IDEA: One future improvement could be to only re-build the scenarios that changed.
    // But it shouldn't matter for a while until we get 10+ large scenarios.
    const getDirectories = (p: string) =>
        readdirSync(p).filter((f) => statSync(join(p, f)).isDirectory())

    const scenarios = join(__dirname, "scenarios")
    for (const id of getDirectories(scenarios)) {
        buildOne(id)
    }
}

async function buildOne(id: string) {
    const basePath = process.argv.length >= 4 ? process.argv[3] : "dist"

    buildScenario(id).then((scenario: Scenario) => {
        const path = resolve(join(basePath, id))
        exportScenario(path, scenario)
    })
}

if (require.main === module) {
    const id = process.argv.length >= 3 ? process.argv[2] : "*"

    if (id === "*") {
        buildAll()
    } else {
        buildOne(id)
    }
}
