import * as Market from './market'
import * as SocialFoundation from "./social-foundation"
import * as EcologicalCeiling from "./ecological-ceiling"
import * as Stats from "./stats";

import {
    ScenarioBuilder,
    Scenario,
    stateFromDefaultStates,
} from '../../content-utils'
export const builder: ScenarioBuilder = {
    run() {
        const scenario: Scenario = {
            id: 'donuts',
            stats: Object.values(Stats.definitions),
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
                state: stateFromDefaultStates([
                    ...Stats.defaultStates,
                    ...SocialFoundation.defaultStates,
                    ...EcologicalCeiling.defaultStates,
                ]),
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
