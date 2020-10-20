import * as Market from "./market"
import * as SocialFoundation from "./social-foundation"
import * as EcologicalCeiling from "./ecological-ceiling"
import * as Administration from "./administration"
import * as Stats from "./stats"

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
            cards: [
                ...Market.cards,
                ...SocialFoundation.cards,
                ...EcologicalCeiling.cards,
                ...Administration.cards,
            ],
            events: [
                ...Market.events,
                ...SocialFoundation.events,
                ...EcologicalCeiling.events,
                ...Administration.events,
            ],
            eventCards: {
                ...Market.eventCards,
                ...SocialFoundation.eventCards,
                ...EcologicalCeiling.eventCards,
                ...Administration.eventCards,
            },
            defaultState: {
                state: combineDefaultEntries([
                    ...Stats.defaultStates,
                    ...SocialFoundation.defaultStates,
                    ...EcologicalCeiling.defaultStates,
                    ...Administration.defaultStates,
                ]),
                flags: combineDefaultEntries([
                    ...SocialFoundation.defaultFlags,
                    ...EcologicalCeiling.defaultFlags,
                    ...Administration.defaultFlags,
                ]),
            },
            worldStateModifiers: [
                {
                    type: "round",
                },
                {
                    type: "cycle",
                    id: Stats.workHour,
                    length: 8,
                },
                {
                    type: "debug",
                },
            ],
        }
        return scenario
    },
}
