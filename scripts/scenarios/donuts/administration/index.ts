import * as Introduction from './introduction'
import * as DailyGrind from './daily-grind'
export * from './admin-state'

export const cards = [
    ...DailyGrind.cards,
]

export const events = [
    ...Introduction.events,
]

export const eventCards = {
    ...Introduction.eventCards,
}