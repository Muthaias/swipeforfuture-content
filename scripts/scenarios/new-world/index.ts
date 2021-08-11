import { createCardsMap, Scenario } from "../../content-utils"
import {
    ENVIRONMENT,
    PEOPLE,
    SECURITY,
    MONEY,
    POPULARITY,
    STATS,
} from "./stats"

import { catastrophicCards } from "./cat"
import { endGameCards } from "./endgame"

const scenario: Scenario = {
    id: "new-world",
    stats: Object.values(STATS),
    cards: createCardsMap([...catastrophicCards, ...endGameCards]),
    defaultState: {
        state: {
            [ENVIRONMENT]: 40,
            [PEOPLE]: 60,
            [SECURITY]: 75,
            [MONEY]: 55,
            [POPULARITY]: 53,
        },
        flags: {},
    },
    worldStateModifiers: [
        {
            type: "round",
        },
        {
            type: "cycle",
            id: "hourOfDay",
            length: 24,
        },
        {
            type: "debug",
        },
    ],
}

export default scenario
