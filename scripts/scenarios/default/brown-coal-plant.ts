import {
    propRef,
    cardContent,
    worldQuery,
    addAction,
    cardLogic,
    eventCardLogic,
    defaultState,
    defaultFlag,
} from "../../content-utils"
import { getImage } from "./image"
import { ENVIRONMENT, PEOPLE, SECURITY, MONEY, POPULARITY } from "./stats"

const logicTicker = propRef("ticker")
const coleIntroduced = propRef("Cole is introduced")
const investment = propRef("Brown coal investment")
const reducedPrice = propRef("Reduce price of brown coal investment")

const coleIntroduction_0 = cardContent(
    getImage("cole"),
    "Let me introduce myself",
    "I'm Cole, and I represent the energy sector. More specifically, Cole Inc. We might have an offer for you in the future.",
    "In parliament",
    ["Hmm...", "Interesting..."],
)
// TODO: set flag to enable card 1, but don't show it immediately (low probability)

const investInCheapBrownCoal_1 = cardContent(
    getImage("cole"),
    "Investment opportunity",
    "With our offer you get cheap electricity from brown coal and earn a quick profit at the same time. Will you invest?",
    "In parliament",
    [
        "I won't accept any more dirty coal. We need to decrease our emissions!",
        "We have a deal! Cash is king.",
    ],
)

const didInvest_2 = cardContent(
    getImage("powerplant", "coal"),
    "Visit your powerplant",
    "The powerplant is up and running! We're getting a good income thanks to the stable powerproduction. This will power the cooling systems during hot summer days.",
    "Working class district",
    ["I'm not proud of this", "Haha yeah let's enjoy this money"],
)

const notInvestedYet_3 = cardContent(
    getImage("maria"),
    "The future is safe?",
    "Great desicion! The future will thank us. However... that money would have been really sweet. Oh, and they offer an even better deal. Shouldn't we accept?",
    "In parliament",
    [
        "I'm sure. Coal has no future!",
        "Actually, I've changed my mind. Let's buy the coal!",
    ],
)

const reallyNotInvested_4 = cardContent(
    getImage("envira"),
    "Greener future",
    "Thank you for protecting our future.",
    "Outside parliament",
    ["It's all business", "The future is green"],
)

const investmentBlockade_5 = cardContent(
    getImage("envira"),
    "This will not stand",
    "This is unacceptable! The consequences for the environment are huge.",
    "Outside parliament",
    ["Mind your own business", "Let's move along"],
)

export const cards = [
    coleIntroduction_0,
    investInCheapBrownCoal_1,
    didInvest_2,
    notInvestedYet_3,
    reallyNotInvested_4,
    investmentBlockade_5,
].map((cardContent, index) =>
    cardLogic(
        cardContent,
        [
            worldQuery({
                [logicTicker]: [index, index],
            }),
        ],
        [
            addAction({
                [logicTicker]: 1,
            }),
            addAction({
                [logicTicker]: 1,
            }),
        ],
    ),
)

export const eventCards = []

export const defaultVars = [defaultState(logicTicker, 0)]

export const defaultFlags = [
    defaultFlag(coleIntroduced, false),
    defaultFlag(investment, false),
    defaultFlag(reducedPrice, false),
]
