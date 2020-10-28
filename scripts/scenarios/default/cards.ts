import {
    CardData,
    worldQuery,
    addAction,
    unsplashImage,
    pexelsImage,
} from "../../content-utils"
import { ENVIRONMENT, MONEY, PEOPLE, SECURITY, POPULARITY } from "./stats"
import { VARS } from "./vars"
import { FLAGS } from "./flags"

export const otherCards: CardData[] = [
    {
        type: "card",
        image: unsplashImage("1497435334941-8c899ee9e8e9"),
        title: "Our solar project is ready!",
        location: "The greener other side",
        text:
            "Congratulations! We beat the initial German energy expansion. Would you like to take the opportunity to make further investments?",
        weight: 100,
        isAvailableWhen: [
            worldQuery(
                {
                    [VARS.SOLAR_INVESTMENTS]: [1, 1],
                },
                {
                    [FLAGS.INFRAN_INIT]: true,
                },
            ),
        ],
        actions: {
            left: addAction(
                {
                    [ENVIRONMENT]: 20,
                    [PEOPLE]: 12,
                    [SECURITY]: 10,
                    [MONEY]: 5,
                    [POPULARITY]: 17,
                    [VARS.SOLAR_INVESTMENTS]: 100,
                },
                {},
                "Nah, this will do",
            ),
            right: addAction(
                {
                    [ENVIRONMENT]: 30,
                    [PEOPLE]: 15,
                    [SECURITY]: 15,
                    [MONEY]: -5,
                    [POPULARITY]: 20,
                    [VARS.SOLAR_INVESTMENTS]: 100,
                },
                {},
                "Let's do it!",
            ),
        },
    },
]
