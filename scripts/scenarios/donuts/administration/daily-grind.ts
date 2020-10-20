import {
    CardData,
    WorldQuery,
    worldQuery,
    cardContent,
    cardLogic,
    addAction,
} from '../../../content-utils'
import { getImage } from '../image'
import { staffPatience } from './admin-state'
import * as Stats from '../stats'

const morningState: WorldQuery['state'] = { [Stats.workHour]: [0, 2] }
const noonState: WorldQuery['state'] = { [Stats.workHour]: [3, 4] }
const afterNoonState: WorldQuery['state'] = { [Stats.workHour]: [5, 7] }
const alwaysState: WorldQuery['state'] = { [Stats.workHour]: [0, 100] }

const dailyHelloCard = cardContent(
    getImage('maria'),
    'Good morning',
    'Nice to see you today. I hope your morning has been efficient.',
    'In parliament',
    ['Not really', 'Yes! Thank you'],
)

const anytimeGreeting = cardContent(
    getImage('maria'),
    'Always good to see you',
    "It's always a pleasure to see you. It fills me with joy to see you performing on the job.",
    'In parliament',
    ['Oh... yes', 'Thank you'],
)

const corridorChatCard = cardContent(
    getImage('maria'),
    'Looking good',
    'You seem sharp today. Keep up the good work',
    'In the parliament corridors',
    ['*shrug*', 'Thanks'],
)

const afternoonChatCard = cardContent(
    getImage('maria'),
    'Nice lunch?',
    'You seem happy. Did you have a good lunch?',
    'In the parliament corridors',
    ['*shrug*', 'Indeed I did'],
)

export const cards: CardData[] = [
    cardLogic(
        anytimeGreeting,
        [
            worldQuery({
                ...alwaysState,
            }),
        ],
        [addAction(), addAction()],
        1,
    ),
    cardLogic(
        dailyHelloCard,
        [
            worldQuery({
                ...morningState,
            }),
        ],
        [addAction(), addAction()],
        1,
    ),
    cardLogic(
        corridorChatCard,
        [
            worldQuery({
                ...noonState,
            }),
        ],
        [addAction({ [staffPatience]: -1 }), addAction()],
        1,
    ),
    cardLogic(
        afternoonChatCard,
        [
            worldQuery({
                ...afterNoonState,
            }),
        ],
        [addAction({ [staffPatience]: -1 }), addAction()],
        1,
    ),
]
