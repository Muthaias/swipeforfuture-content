import * as Tutorial from "./tutorial"
import * as Stats from "./stats"
import * as FromData from "./from-data"

import {
    Scenario,
    combineDefaultEntries,
} from "../../content-utils"

const scenario: Scenario = {
    id: "coal-mining",
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
            type: "cycle",
            id: "daycycle",
            length: 4,
        },
        {
            type: "debug",
        },
    ],
}

export default scenario
