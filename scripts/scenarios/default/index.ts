import { Scenario } from "../../content-utils"
import {
    ENVIRONMENT,
    PEOPLE,
    SECURITY,
    MONEY,
    POPULARITY,
    STATS,
} from "./stats"

import { VARS } from "./vars"
import { FLAGS } from "./flags"

import { catastrophicCards } from "./cat"
import { enviraCards, enviraEventCards, enviraEvents } from "./envira"
import { infranCards, infranEventCards, infranEvents } from "./infran"
import { otherCards } from "./cards"
import { endGameEventCards, endGameEvents } from "./endgame"
import { mariaEventCards, mariaEvents } from "./maria"
import * as EnvironmentInitiatives from "./environmental-initiatives"

const scenario: Scenario = {
    id: "default",
    stats: Object.values(STATS),
    cards: [
        ...catastrophicCards,
        ...enviraCards,
        ...infranCards,
        ...otherCards,
        ...EnvironmentInitiatives.cards,
    ],
    events: [
        ...mariaEvents,
        ...endGameEvents,
        ...infranEvents,
        ...enviraEvents,
    ],
    eventCards: {
        ...mariaEventCards,
        ...endGameEventCards,
        ...enviraEventCards,
        ...infranEventCards,
    },
    defaultState: {
        state: {
            [ENVIRONMENT]: 40,
            [PEOPLE]: 60,
            [SECURITY]: 75,
            [MONEY]: 55,
            [POPULARITY]: 53,
            [VARS.BROWN_COAL_PLANTS]: 0,
            [VARS.ROADS_SUGGESTED]: 0,
            [VARS.ROAD_EXPANSION]: 0,
            [VARS.SOLAR_INVESTMENTS]: 0,
        },
        flags: {
            [FLAGS.LUNCH_MEETING_COMPLETED]: false,
            [FLAGS.ENVIRA_INIT]: false,
            [FLAGS.INFRAN_INIT]: false,
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