import {
    Card,
    createCardTemplate,
    unsplashImage,
    cardRef,
    worldQuery,
    createCardFromTemplate,
    action,
    addModifier,
    CardPriority,
} from "../../content-utils"
import { FLAGS } from "./flags"
import { POPULARITY, MONEY, ENVIRONMENT, PEOPLE } from "./stats"
import { VARS } from "./vars"

export const infranTemplate = createCardTemplate({
    image: unsplashImage("1529088746738-c4c0a152fb2c"),
    location: "On the phone",
    weight: 1000,
})

const infranIntro = cardRef("infran-intro")
const infranSolar = cardRef("infran-solar")
const infranRoad = cardRef("infran-road")

export const infranCards: Card[] = [
    createCardFromTemplate(infranIntro, infranTemplate, {
        title: "The constructor",
        text: "Hello sir! I'm Infran. I'll be sure to keep you updated on the nation's infrastructure. Should we get started right away?",
        actions: {
            left: action(
                addModifier(
                    { [MONEY]: 10, [POPULARITY]: -10 },
                    { [FLAGS.INFRAN_INIT]: true },
                ),
            ),
            right: action(
                addModifier(
                    { [MONEY]: -10, [POPULARITY]: 10 },
                    { [FLAGS.INFRAN_INIT]: true },
                ),
            ),
        },
        isAvailableWhen: [
            worldQuery(
                {},
                {
                    [FLAGS.LUNCH_MEETING_COMPLETED]: true,
                    [FLAGS.INFRAN_INIT]: false,
                },
            ),
        ],
        priority: CardPriority.Event,
    }),
    createCardFromTemplate(infranSolar, infranTemplate, {
        title: "Invest in solar?",
        location: "In the bathroom",
        text: "The Germans are on to us!! We need to invest in solar power. Yay (right) or nay (left)?",
        isAvailableWhen: [
            worldQuery(
                {
                    [ENVIRONMENT]: [60, 100],
                    [MONEY]: [30, 100],
                    [VARS.SOLAR_INVESTMENTS]: [0, 0],
                },
                {
                    [FLAGS.INFRAN_INIT]: true,
                },
            ),
        ],
        actions: {
            left: action(
                addModifier({ [MONEY]: -5, [VARS.SOLAR_INVESTMENTS]: 100 }),
            ),
            right: action(
                addModifier({ [MONEY]: -10, [VARS.SOLAR_INVESTMENTS]: 1 }),
            ),
        },
    }),
    createCardFromTemplate(infranRoad, infranTemplate, {
        title: "Road expansion",
        text: "The people needs roads to support future market growth. Let me take charge and make this happen.",
        isAvailableWhen: [
            worldQuery(
                { [PEOPLE]: [50, 100], [VARS.ROADS_SUGGESTED]: [0, 0] },
                { [FLAGS.INFRAN_INIT]: true },
            ),
            worldQuery(
                { [PEOPLE]: [70, 100], [VARS.ROADS_SUGGESTED]: [1, 1] },
                { [FLAGS.INFRAN_INIT]: true },
            ),
            worldQuery(
                { [PEOPLE]: [90, 100], [VARS.ROADS_SUGGESTED]: [2, 2] },
                { [FLAGS.INFRAN_INIT]: true },
            ),
        ],
        actions: {
            left: action(
                addModifier({
                    [POPULARITY]: -10,
                    [VARS.ROADS_SUGGESTED]: 1,
                    [VARS.ROAD_EXPANSION]: 1,
                }),
            ),
            right: action(
                addModifier({
                    [ENVIRONMENT]: -10,
                    [MONEY]: -10,
                    [PEOPLE]: 20,
                    [VARS.ROADS_SUGGESTED]: 1,
                    [VARS.ROAD_EXPANSION]: 1,
                }),
            ),
        },
    }),
]
