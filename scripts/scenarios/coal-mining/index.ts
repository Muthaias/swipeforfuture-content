import * as Tutorial from "./tutorial"
import * as Stats from "./stats"
import * as FromData from "./from-data"

import {
    ScenarioBuilder,
    Scenario,
    combineDefaultEntries,
} from "../../content-utils"
export const builder: ScenarioBuilder = {
    run() {
        const scenario: Scenario = {
            id: "donuts",
            stats: Object.values(Stats.definitions),
            cards: [...FromData.cards],
            events: [...Tutorial.events],
            eventCards: {
                ...Tutorial.eventCards,
            },
            defaultState: {
                state: combineDefaultEntries([...Stats.defaultStates]),
                flags: combineDefaultEntries([...Stats.defaultFlags]),
            },
            worldStateModifiers: [
                {
                    type: "round",
                },
                {
                    type: "debug",
                },
            ],
        }
        return scenario
    },
}
