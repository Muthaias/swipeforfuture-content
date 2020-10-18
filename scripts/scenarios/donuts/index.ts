import * as Market from './market'
import * as SocialFoundation from "./social-foundation"
import * as EcologicalCeiling from "./ecological-ceiling"
import { STATS } from "./stats";

import { ScenarioBuilder, Scenario } from '../../content-utils'
export const builder: ScenarioBuilder = {
    run() {
        const scenario: Scenario = {
            id: 'default',
            stats: Object.values(STATS),
            cards: [
                ...Market.cards,
                ...SocialFoundation.cards,
                ...EcologicalCeiling.cards
            ],
            events: [
                ...Market.events,
                ...SocialFoundation.events,
                ...EcologicalCeiling.events
            ],
            eventCards: {
                ...Market.eventCards,
                ...SocialFoundation.eventCards,
                ...EcologicalCeiling.eventCards,
            },
            defaultState: {
                state: {
                },
                flags: {
                },
            },
            worldStateModifiers: [
                {
                    type: "round"
                },
                {
                    type: "cycle",
                    id: "hourOfDay",
                    length: 24,
                },
                {
                    type: "debug"
                }
            ]
        }
        return scenario
    },
}
