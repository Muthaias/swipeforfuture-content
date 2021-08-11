import { Scenario } from "../../content-utils"
import {
    ENVIRONMENT,
    PEOPLE,
    SECURITY,
    MONEY,
    POPULARITY,
    STATS,
} from "./stats"
import { FLAGS } from './flags'

import { catastrophicCards } from "./cat"
import { mariaCards } from "./maria"
import { endGameCards } from "./endgame"

const scenario: Scenario = {
    id: "new-world",
    stats: Object.values(STATS),
    cards: [...mariaCards, ...catastrophicCards, ...endGameCards],
    defaultState: {
        state: {
            [ENVIRONMENT]: 40,
            [PEOPLE]: 60,
            [SECURITY]: 75,
            [MONEY]: 55,
            [POPULARITY]: 53,
        },
        flags: {
            [FLAGS.LUNCH_MEETING_COMPLETED]: false
        },
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
