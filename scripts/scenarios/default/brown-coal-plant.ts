import {
    propRef,
    cardContent,
    pexelsImage,
    worldQuery,
    addAction,
    cardLogic,
    eventCardLogic,
} from "../../content-utils"
import { getImage } from "./image"
import { ENVIRONMENT, PEOPLE, SECURITY, MONEY, POPULARITY } from "./stats"
import { enviraTemplate } from "./envira"

const brownCoal = {
    investment: propRef("Brown coal investment"),
    reducedPrice: propRef("Reduce price of brown coal investment"),
}

const investInCheapBrownCoal_1 = cardContent(
    getImage("cole"),
    "Investment opportunity",
    "We can get cheap electricity from brown coal - and earn a quick profit at the same time. Invest?",
    "In parliament",
    [
        "I won't accept any more dirty coal. We need to decrease our emissions!",
        "We have a deal! Cash is king.",
    ],
)

const didInvest_2 = cardContent(
    getImage("powerplant", "coal"),
    "Visit your powerplant",
    "Wow, that's a lot of money! Not sure what the environmentalists will think of this, but at least they can power their electric cars... *evil laugh*",
    "Working class district",
    ["I'm not proud of this", "Haha yeah let's enjoy this money"],
)

const notInvestedYet_3 = cardContent(
    getImage("maria"),
    "The future is safe?",
    "Great desicion! The future will thank us. But that money would have been sweet, woudln't it? Oh, and they offer an even better deal. Should we accept?",
    "In parliament",
    [
        "Actually, I've changed my mind. Let's buy the coal!",
        "I'm sure. Coal has no future!",
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
    "This is unacceptable. The consequences for the environment is huge.",
    "Outside parliament",
    ["Mind your own business", "Let's move along"],
)

export const cards = [
    cardLogic(
        investInCheapBrownCoal_1,
        [
            worldQuery({
                [ENVIRONMENT]: [21, 100],
                [MONEY]: [15, 100],
            }),
        ],
        [
            addAction(),
            addAction(
                {},
                {
                    [brownCoal.investment]: true,
                },
            ),
        ],
    ),
]

export const eventCards = []

const a = {
    type: "card",
    image: pexelsImage("3044473"),
    title: "Cheap but dirty brown coal for sale",
    location: "Working class district",
    text:
        "We've got an interesting offer: Buy a modern brown coal power plant cheaply to generate electricity. Deal? Great! (WATCH OUT FOR ENVIRA though...)",
    weight: 100,
    isAvailableWhen: [],
    actions: {
        left: addAction({}, {}, "Keep it clean. Give me other options"),
        right: addAction(
            {
                [ENVIRONMENT]: -20,
                [PEOPLE]: -15,
                [SECURITY]: -10,
                [MONEY]: 40,
                [POPULARITY]: -20,
            },
            {},
            "Let's generate some energy",
        ),
    },
}

/**
 * 
 * 1) card: We can get cheap electricity from brown coal - and earn a quick profit at the same time. Invest?
 * 
 * 1.1) Sounds like we have a deal! Cash is king.
 * 1.2) I won't accept any more dirty coal. We have enough already.
 * 
 * - normal card, trigger flag that will add card 2+3 to availableCards
 * - card 2+3 has probability to show the event card matching your choice, either start at 2 or 3
 * 
 * 
 * 2) event card: if invested
 * 
 * Wow, that's a lot of money! Not sure what the environmentalists will think of this, but at least they can power their electric cars... *evil laugh*
 * 
 * 2.1) Haha yeah let's enjoy this money
 * 2.2) I'm not proud of this, but we
 * 
 * -> trigger envira card with blockade that damages the economy and decrease popularity (card 5)
 * 
 * 
 * 
 * 3) event card: if not invested
 * 
 * Great desicion. The future will thank us. But that money would have been sweet, woudln't it?
 * Oh, and they offer an even better deal. Sure we don't want to take it?
 * 
 * 3.1) Actually, I've changed my mind. Let's buy the coal!
 * -> show card 2 next (invested)
 * -> add additional money that would not have been gained by going straight to card 2)
 * 
 * 3.2) I'm sure. Coal has no future!
 * -> get environmental increase
 * -> set flag to add card 4 to the card stack. With probability, show envira congratulation in a few swipes.
 * 
 * 
 * 4)event card: envira + activists
 * - thank you for protecting the future. blabh blah.
 * -> get popularity
 * 
 * 
 * 5) envira card with blockade that damages the economy and decrease popularity
 *  
 * createCardFromTemplate(enviraTemplate, {
    title: "Keep it in the ground!",
    text:
        "This is insane! Are you really investing in this brown coal plant and prioritizing short-term profits over the future of the planet - and your people!?",
    isAvailableWhen: [
        worldQuery(
            { [VARS.BROWN_COAL_PLANTS]: [1, 1] },
            { [FLAGS.ENVIRA_INIT]: true },
        ),
    ],
    actions: {
        // TODO: improve how this works.
        // Instead of disabling the brown coal power plant cards from appearing again using the state 100,
        // consider using a flag to disable it in a clearer way. Booleans are much better on/off switches than arbitrary numbers that could be misinterpreted
        left: addAction({
            [ENVIRONMENT]: 10,
            [PEOPLE]: 10,
            [SECURITY]: 5,
            [VARS.BROWN_COAL_PLANTS]: 100,
        }),
        right: addAction({
            [ENVIRONMENT]: -15,
            [PEOPLE]: -15,
            [SECURITY]: -5,
            [MONEY]: 35,
            [VARS.BROWN_COAL_PLANTS]: 0,
        }),
    },
}),

*/

/*
IDEAS for Cole the climate lobbyist:

- if you don't invest in coal power plant:
    - EFFECT 1: YOU NEED MORE ENERGY, SO YOU WILL HAVE TO INVEST IN SOLAR NO MATTER THE COST
    - Cole, the lobbyist gets fired since he failed to convince you to make the investment. Now he asks you to take a beer with him.
    - if you accept
        - you lose popularity because- what president will accept a beer with an lobbyist whose offer you just turned down?
            - maria asks you: is this really a good idea?
                - yes
                    - take a beer and continue branch
                - no
                    - you don't continue the branch, and will automatically trigger the event (COLE_IN_THE_NEWS)
        - you meet for a beer, have a laugh
        - Over the next few cards, Cole is really an environmentalist deep within, but stuck at the company, Cole Inc. for way too long, trying to change from within without getting noticed.
        - he actually thanks you for not accepting his offer - getting him fired and giving him a way out
        - he mentions that he knows sensitive information about coal indudstry
        - do you want me to leak it?
            - if yes
                - trigger event the next day about a massive anonomuys leak
                - *in the news* - trigger the next morning. You smile as you understand who's behind it.
                - this crashes coal internationally, giving large boost to environment
                - IDEA: ADD SYNERGY FOR GERMAN SOLAR EXPANSION - "since coal is expensive/cheap, we have to do X" this will change preconditions and outcomes
                - EFFECT 2: COAL DROPS IN PRICE which will make solar much better and easier. No one wants to be stuck with old coal.
            - if no
                - something else happens
    - (COLE_IN_THE_NEWS) if you dont accept a beer with Cole, nothing happens
        - Cole does something small for the environment, a public statment or something
        - gives some effect, but nothing like what you could get if you take the beer with the lobbyist.
        - in the news, but nothing big

*/

/*

IDEA for default scenario MVP

- intro with maria, improve it to actually teach players how to play.
    - allow to skip, but let it be available for those who want it.
    - plus maybe give slight stat bonus for beginners completing tutorial. this will also explain the stat concept.

- 2 major decisions with related branching narrative
    - 1) cole the coal powerplant lobbyist
    - 2) german solar expansion

- for MVP default scenario, when all three major decisions have been made, show the end screen
    - implement an end screen feature, showing up instead of the card stack with stats
        - this could show major decisions with big green checkmark for each succesful decision
            - "✅ Prevented the coal powerplant"
            - "❌ Beat the German solar expansion"

        - (future idea) perhaps show secrets depending on narrative branches you explored too:
            - Of course this would only show the secrets you've unlocked, and keep the rest hidden
            - Story secrets discovered (1/7):
            - "✅ had a laugh with Cole the lobbyist and made him destroy the international coal industry by leaking sensitive information"
            - showing the "1/7" will motivate players to play more times and try different paths

        - achievements (global across multiple sesssions, save to localStorage)
            - add achievements even for "bad" actions to encourage exploration and play.
            - "WHAT are our worldleaders thinking, making all these bad decisions!?"
            - "Play Swipe for Future and you'll know!"
*/
