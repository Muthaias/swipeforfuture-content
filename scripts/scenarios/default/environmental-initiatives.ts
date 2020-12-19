import {
    CardData,
    WorldQuery,
    worldQuery,
    cardContent,
    cardLogic,
    addModifier,
    BaseCard,
} from "../../content-utils"
import { getImage } from "../donuts/image"
import { ENVIRONMENT, PEOPLE, SECURITY, MONEY } from "./stats"

const alwaysState: WorldQuery["state"] = { [ENVIRONMENT]: [0, 100] }
function mockCard(card: BaseCard) {
    return cardLogic(
        card,
        [
            worldQuery({
                ...alwaysState,
            }),
        ],
        [addModifier(), addModifier()],
        100,
    )
}

// Reference: http://climateinitiativesplatform.org/index.php/21st_Century_Truck_Partnership
const truckPartnershipInit = cardContent(
    getImage("envira"),
    "21st Century Truck Partnership",
    "This initiative aims to combine efforts from government and industry to reduce fuel usage and emissions and increase safety by targeted support of research of commercially viable products.",
    "In parliament",
    ["Move along", "Interesting. Tell me more"],
)

// Reference: http://climateinitiativesplatform.org/index.php/ACT_Assessing_Low-Carbon_Transition
const actInit = cardContent(
    getImage("envira"),
    "Assessing low Carbon Transition",
    "ACT is an initiative that creates an accountability framework and sectorial methodologies to assess how companies' strategies and actions are contributing to the Paris Agreement mitigation goals.",
    "In parliament",
    ["Do we need it?", "How do we apply it?"],
)

export const cards: CardData[] = [
    mockCard(truckPartnershipInit),
    mockCard(actInit),
]
