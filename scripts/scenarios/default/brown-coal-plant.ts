import {
    propRef,
    cardContent,
    worldQuery,
    addAction,
    cardLogic,
    eventCardLogic,
    defaultState,
    defaultFlag,
    WorldEvent,
    cardRef,
    EventCards,
    eventCardAction,
    CardData,
    setAction,
} from "../../content-utils"
import { getImage } from "./image"
import { FLAGS } from "./flags"
import { ENVIRONMENT, PEOPLE, SECURITY, MONEY, POPULARITY } from "./stats"

enum Decision {
    Undecided = 0,
    No = 1,
    Yes = 2,
}

const logicTicker = propRef("ticker")
const investment = propRef("Brown coal investment")
const reducedPriceOffer = propRef("Reduce price of brown coal investment")

const coleIntroduction_0 = cardContent(
    getImage("cole"),
    "Let me introduce myself",
    "I'm Cole, and I represent the energy sector. More specifically, Cole Inc. We might have an offer for you in the future.",
    "In parliament",
    ["Hmm...", "Interesting..."],
)

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
    [
        "Mind your own business",
        "True, but it's too late to change it now anyway",
    ],
)

export const mockCards = [
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

export const events: WorldEvent[] = [
    {
        initialEventCardId: coleIntroduction_0.id,
        isAvailableWhen: [
            worldQuery(
                {},
                {
                    [coleIntroduction_0.id]: false,
                    [FLAGS.LUNCH_MEETING_COMPLETED]: true,
                },
            ),
        ],
        probability: 0.5,
    },
]

export const cards: CardData[] = [
    cardLogic(
        investInCheapBrownCoal_1,
        [
            worldQuery(
                { [investment]: [Decision.Undecided, Decision.Undecided] },
                { [coleIntroduction_0.id]: true },
            ),
        ],
        // TODO: Add addAction to make payment and other effects
        [
            setAction({
                [investment]: Decision.No,
                [reducedPriceOffer]: Decision.Undecided,
            }),
            setAction({ [investment]: Decision.Yes }),
        ],
        1,
    ),
    cardLogic(
        didInvest_2,
        [
            worldQuery(
                { [investment]: [Decision.Yes, Decision.Yes] },
                { [didInvest_2.id]: false },
            ),
        ],
        [
            addAction({ [ENVIRONMENT]: -30 }, { [didInvest_2.id]: true }),
            addAction({ [ENVIRONMENT]: -30 }, { [didInvest_2.id]: true }),
        ],
    ),
    cardLogic(
        notInvestedYet_3,
        [
            worldQuery({
                [investment]: [Decision.No, Decision.No],
                [reducedPriceOffer]: [Decision.Undecided, Decision.Undecided],
            }),
        ],
        [
            setAction({ [reducedPriceOffer]: Decision.No }),
            setAction({
                [investment]: Decision.Yes,
                [reducedPriceOffer]: Decision.Yes,
            }),
        ],
    ),
    cardLogic(
        reallyNotInvested_4,
        [
            worldQuery(
                {
                    [investment]: [Decision.No, Decision.No],
                    [reducedPriceOffer]: [Decision.No, Decision.No],
                },
                { [reallyNotInvested_4.id]: false },
            ),
        ],
        [
            addAction({ [POPULARITY]: 15 }, { [reallyNotInvested_4.id]: true }),
            addAction({ [POPULARITY]: 25 }, { [reallyNotInvested_4.id]: true }),
        ],
    ),
    cardLogic(
        investmentBlockade_5,
        [
            worldQuery(
                { [investment]: [Decision.Yes, Decision.Yes] },
                { [investmentBlockade_5.id]: false },
            ),
        ],
        [
            addAction(
                { [POPULARITY]: -40 },
                { [investmentBlockade_5.id]: true },
            ),
            addAction(
                { [POPULARITY]: -30 },
                { [investmentBlockade_5.id]: true },
            ),
        ],
    ),
]
export const eventCards: EventCards = {
    [coleIntroduction_0.id]: eventCardLogic(coleIntroduction_0, [
        eventCardAction(addAction({}, { [coleIntroduction_0.id]: true })),
        eventCardAction(addAction({}, { [coleIntroduction_0.id]: true })),
    ]),
}

export const defaultVars = [
    defaultState(logicTicker, 0),
    defaultState(investment, Decision.Undecided),
    defaultState(reducedPriceOffer, Decision.Undecided),
]
export const defaultFlags = []
