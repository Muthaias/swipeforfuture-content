import {
    Card,
    worldQuery,
    createCardFromTemplate,
    unsplashImage,
    createCardTemplate,
    addModifier,
    action,
    cardRef,
} from "../../content-utils"
import { statIds } from "./stats"

export const catTemplate = createCardTemplate({
    image: unsplashImage("1548247416-ec66f4900b2e"),
    location: "",
    weight: 1,
})

export const catastrophicCards = statIds.map<Card>((stat) => {
    const partial: Omit<Card, 'id' | 'image' | 'location' | 'weight'> = {
        title: `Look at me! I'm ${stat.toUpperCase()} Cat`,
        text:
            "Your cat needs some love and tenderness. Try to make time in your busy schedule",
        isAvailableWhen: [
            worldQuery({
                [stat]: [0, 100],
            }),
        ],
        actions: {
            left: action(addModifier({ [stat]: -30 })),
            right: action(addModifier({ [stat]: 30 })),
        },
    }
    return createCardFromTemplate(cardRef('cat'), catTemplate, partial)
})
