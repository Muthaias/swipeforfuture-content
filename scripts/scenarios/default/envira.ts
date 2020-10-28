import {
    CardData,
    EventCards,
    WorldEvent,
    createCardTemplate,
    unsplashImage,
    cardRef,
    addAction,
    eventCardAction,
    createEventCardFromTemplate,
    worldQuery,
    createCardFromTemplate,
} from "../../content-utils"
import { ENVIRONMENT, PEOPLE, SECURITY, MONEY } from "./stats"
import { FLAGS } from "./flags"
import { VARS } from "./vars"

export const enviraTemplate = createCardTemplate({
    image: unsplashImage("1546541612-82d19b258cd5"),
    location: "Outside parliament",
    weight: 100,
})

// NOTE: These card refs might be hard to track. Could be nice to group them together in an object, to easily know that they are card refs.
// Compare `CARDS.enviraIntro` vs `enviraIntro`
const enviraIntro = cardRef("envira-intro")

export const enviraCards: CardData[] = []

export const enviraEvents: WorldEvent[] = [
    {
        initialEventCardId: enviraIntro,
        isAvailableWhen: [
            worldQuery(
                {},
                {
                    [FLAGS.ENVIRA_INIT]: false,
                    [FLAGS.LUNCH_MEETING_COMPLETED]: true,
                },
            ),
        ],
        probability: 0.5,
    },
]

export const enviraEventCards: EventCards = {
    [enviraIntro]: createEventCardFromTemplate(enviraTemplate, {
        title: "The activist",
        text:
            "Hi! My name is Envira and I'm a climate lobbyist. You'll see me from time to time. I wish you good luck and I hope we'll have constructive meetings in the future.",
        actions: {
            left: eventCardAction(
                addAction(
                    { [ENVIRONMENT]: -10 },
                    { [FLAGS.ENVIRA_INIT]: true },
                ),
            ),
            right: eventCardAction(
                addAction({ [ENVIRONMENT]: 10 }, { [FLAGS.ENVIRA_INIT]: true }),
            ),
        },
    }),
}
