import {
    EventCard,
    WorldEvent,
    worldQuery,
    cardRef,
    cardContent,
    eventCardLogic,
    eventCardAction,
    setAction,
    addAction,
} from '../../../content-utils'
import {
    introductionComplete,
    staffPatience,
} from "./admin-state"
import {
    getImage,
} from '../image'
import * as Stats from '../stats'

const welcome = cardRef('welcome')
const welcomeLoop = cardRef('welcome-loop')
const welcomeLunch = cardRef('welcome-lunch')

export const events: WorldEvent[] = [
    {
        initialEventCardId: welcome,
        isAvailableWhen: [
            worldQuery({}, { [introductionComplete]: false }),
        ],
        probability: 1,
    }
];

const welcomeCard = cardContent(
    getImage('maria'),
    'Welcome!',
    'Hi! My name is Maria. You must be the new president. Do you want to take a lunch to get up to speed with your new duties?',
    'In parilament',
    [
        "Nah. I'm good. I think I can handle things on my own.",
        "That sounds great. Let's do it ASAP"
    ]
)

const enforceLunchCard = cardContent(
    getImage('maria'),
    'Seriously!',
    'We need to talk! Get your head in the game. Do you want to take a lunch to get up to speed with your new duties?',
    'In parilament',
    [
        "Get off my back.",
        "Alright. Let's do this."
    ]
)

const welcomeLunchCard = cardContent(
    getImage('maria'),
    'The lunch meeting',
    'Really nice lunch! Now your first big decision has come. Should you prioritize the economy or environment?',
    'In parilament',
    [
        "Nice talk. Love the economy!",
        "Nice talk. We should think about our future."
    ]
)

export const eventCards: {[x: string]: EventCard} = {
    [welcome]: eventCardLogic(
        welcomeCard,
        [
            eventCardAction(setAction(), welcomeLoop),
            eventCardAction(setAction(), welcomeLunch)
        ]
    ),
    [welcomeLoop]: eventCardLogic(
        enforceLunchCard,
        [
            eventCardAction(addAction({[staffPatience]: -1}), welcomeLoop),
            eventCardAction(setAction(), welcomeLunch)
        ]
    ),
    [welcomeLunch]: eventCardLogic(
        welcomeLunchCard,
        [
            eventCardAction(
                setAction(
                    { [Stats.money]: 70, [Stats.popularity]: 52 },
                    { [introductionComplete]: true },
                ),
            ),
            eventCardAction(
                setAction(
                    { [Stats.environment]: 70, [Stats.popularity]: 65 },
                    { [introductionComplete]: true },
                ),
            )
        ]
    )
};