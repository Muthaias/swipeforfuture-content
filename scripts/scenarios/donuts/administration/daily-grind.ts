import {
    CardData,
    worldQuery,
    cardContent,
    cardLogic,
    addAction,
} from '../../../content-utils'
import {
    getImage,
} from '../image'
import * as Stats from '../stats'

const dailyHelloCard = cardContent(
    getImage('maria'),
    'Good morning',
    'Nice to see you today. I hope your morning has been efficient.',
    'In parilament',
    [
        "Not really",
        "Yes! Thank you"
    ]
)

export const cards: CardData[] = [
    cardLogic(
        dailyHelloCard,
        [
            worldQuery({[Stats.environment]: [0, 100]})
        ],
        [
            addAction(),
            addAction(),
        ],
        1,
    )
];