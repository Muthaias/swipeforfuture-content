import {
    ScenarioBuilder,
    Scenario,
    combineDefaultEntries,
} from "../../content-utils"
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
import * as BrownCoalPlant from "./brown-coal-plant"

export const builder: ScenarioBuilder = {
    run() {
        const scenario: Scenario = {
            id: "default",
            stats: Object.values(STATS),
            cards: [
                // ...BrownCoalPlant.mockCards,
                ...BrownCoalPlant.cards,
                // ...catastrophicCards,
                // ...enviraCards,
                // ...infranCards,
                // ...otherCards,
            ],
            events: [
                ...mariaEvents,
                // ...endGameEvents,
                // ...infranEvents,
                // ...enviraEvents,
                ...BrownCoalPlant.events,
            ],
            eventCards: {
                ...mariaEventCards,
                // ...endGameEventCards,
                // ...enviraEventCards,
                // ...infranEventCards,
                ...BrownCoalPlant.eventCards,
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
                    ...combineDefaultEntries([...BrownCoalPlant.defaultVars]),
                },
                flags: {
                    [FLAGS.LUNCH_MEETING_COMPLETED]: false,
                    [FLAGS.ENVIRA_INIT]: false,
                    [FLAGS.INFRAN_INIT]: false,
                    ...combineDefaultEntries([...BrownCoalPlant.defaultFlags]),
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
        return scenario
    },
}
