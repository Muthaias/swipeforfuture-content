import {
    CardData,
    BaseCard,
    EventCard,
    WorldEvent,
    WorldQuery,
    cardContent,
    cardLogic,
    addModifier,
    unsplashImage,
    createIdContext,
    GameWorldModifier,
    combineWorldQueries,
} from "../../content-utils"
import * as Stats from "./stats"

const alwaysState: WorldQuery["state"] = { [Stats.environment]: [0, 100] }
const getId = createIdContext("tutorial")

const images = {
    campaignAdvisor: unsplashImage("1573497019940-1c28c88b4f3e"),
    coalMiner: unsplashImage("1529088746738-c4c0a152fb2c"),
    environmentallyMindedCitizen: unsplashImage("1546541612-82d19b258cd5"),
    undecidedVoter: unsplashImage("1584799235813-aaf50775698c"),
}

function chainCards<T extends BaseCard>(endCard?: T) {
    return (card: T, index: number, cards: T[]) => {
        const next = cards[index + 1] || endCard
        return linkLogic(
            card,
            [],
            [{next}, {next}]
        )
    }
}

function link(card: BaseCard): WorldQuery {
    const id = getId(card)
    return {
        flags: {
            [id]: true,
        }
    }
}

function linkTo(card: BaseCard): GameWorldModifier {
    const id = getId(card)
    return {
        type: "set",
        flags: {
            [id]: true
        }
    }
}

function linkVisited(card: BaseCard): GameWorldModifier {
    const id = getId(card)
    return {
        type: "set",
        flags: {
            [id]: false
        }
    }
}

type ModifierWithNextCard = GameWorldModifier & {next?: BaseCard}

function linkLogic(
    card: BaseCard,
    isAvailableWhen: WorldQuery[],
    [left, right]: [
        ModifierWithNextCard | ModifierWithNextCard[],
        ModifierWithNextCard | ModifierWithNextCard[],
    ],
    weight: number = 1,
): CardData {
    return cardLogic(
        card,
        isAvailableWhen.length > 0 ? (
            isAvailableWhen.map(wq => combineWorldQueries(
                wq,
                link(card)
            ))
        ) : (
            [link(card)]
        ),
        [
            [
                ...(Array.isArray(left) ? left : [left]).map(wm => [
                    {
                        ...wm,
                        next: undefined
                    },
                    ...(wm.next ? [linkTo(wm.next)] : [])
                ]).flat(),
                linkVisited(card),
            ],
            [
                ...(Array.isArray(right) ? right : [right]).map(wm => [
                    {
                        ...wm,
                        next: undefined
                    },
                    ...(wm.next ? [linkTo(wm.next)] : [])
                ]).flat(),
                linkVisited(card),
            ]
        ],
        weight
    )
}

const mockCard = (card: BaseCard) => {
    return cardLogic(
        card,
        [link(card)],
        [addModifier(), addModifier()],
        1,
    )
}

const Actions = {
    Continue: "Continue",
}

// const Locations = {}

const Title = {
    Tutorial: "Tutorial",
}

const Hello_Player = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "What a crazy election. Now that we are in office, we can get started with important work, Governor. ",
    "",
    [Actions.Continue, Actions.Continue],
)

const How_to_Swipe = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "We have a lot of choices to make. You can choose by swiping the card left or right. Try now.",
    "",
    [Actions.Continue, Actions.Continue],
)

const Story_1 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "The people elected because you promised to convert the country to green energy (swipe to continue)",
    "",
    [Actions.Continue, Actions.Continue],
)

const Story_2 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "But, we barely won the election. Our country relies heavily on coal energy for jobs and power...",
    "",
    [Actions.Continue, Actions.Continue],
)

const Story_3 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "We promised to convert to green energy, but you will need to keep the citizens happy and employed too...",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_1 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "These are the world stats. If any of them drop to 0, our country will collapse! (swipe to continue)",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Jobs = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "This is the economy icon. It represents the jobs, production, and trade power of the country.",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Envi = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "This is the environment icon. Pollution and dirty energy can negatively impact our environment.",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Money = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "This is the money icon. It shows how much money your government has to spend on different projects.",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Popularity = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "The popularity icons show how much the three groups (environmentalist, miners, undecided voters) like you.",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Green = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "Finally, the green energy icon shows what percent of our country's energy is green.",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Test = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "You job as governor is to make the right choices. Every choice affects the world stats. Let's try it out.  (swipe to continue)",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Test2 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "We have a large grant to build our first green energy plant. Would you like to build a wind farm or a solar farm?",
    "",
    ["Build a wind farm", "Build a solar farm"],
)

const UI_TestWind = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "Congratulations! You have built a wind farm",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_TestSolar = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "Congratulations! You have built a solar farm.",
    "",
    [Actions.Continue, Actions.Continue],
)

const UI_Test_3 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "Great job! You've increased the green energy to 10%. We need to reach 80% to save our country.",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_FocusGroup1 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "We also need to keep people happy. There are three groups: miners, environmentalists, and undecided voters.",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_FocusGroup2 = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "I put together a focus group, so you can hear what these groups have to say. Do you want to meet them?",
    "",
    ["No. I want to get started", "Yes. Let's meet them"],
)

const Intro_FocusGroup_Miner = cardContent(
    images.coalMiner,
    Title.Tutorial,
    "As a coal miner, I don't know much about the environment, but my family and friends depend on those jobs.",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_FocusGroup_Enviro = cardContent(
    images.environmentallyMindedCitizen,
    Title.Tutorial,
    "As an environmentalist, protecting our planet is the most important issue to me. ",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_FocusGroup_Unde = cardContent(
    images.undecidedVoter,
    Title.Tutorial,
    "I don't know who I will vote for next time. I am really on the fence about the green energy plans.",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_FocusGroupFinal = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "The focus group will let you know what different groups think about your recent big decisions.",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_Happiness = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "You will need to keep 2 groups at 50% or more happiness to get reelected. If any group drops to 0, we will lose!",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_Listen = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "Listen to the opinions of the people and your advisors. This is a hard job and will take hard choices.",
    "",
    [Actions.Continue, Actions.Continue],
)

const Intro_Final = cardContent(
    images.campaignAdvisor,
    Title.Tutorial,
    "Remember, you only have XXXXXXXXX turns to get to 80% green energy. Good luck! (Ready to begin?)",
    "",
    ["No, I want to hear the tutorial again", "Yes, I am ready to play!"],
)

export const cards: CardData[] = [
    Hello_Player,
    How_to_Swipe,
    Story_1,
    Story_2,
    Story_3,
    UI_1,
    UI_Jobs,
    UI_Envi,
    UI_Money,
    UI_Popularity,
    UI_Green,
    UI_Test,
].map(
    chainCards(UI_Test2)
).concat([
    linkLogic(
        UI_Test2,
        [],
        [{next: UI_TestWind}, {next:UI_TestSolar}],
    ),
    linkLogic(
        UI_TestWind,
        [],
        [{next: UI_Test_3}, {next: UI_Test_3}],
    ),
    linkLogic(
        UI_TestSolar,
        [],
        [{next: UI_Test_3}, {next: UI_Test_3}],
    )
]).concat([
    UI_Test_3,
    Intro_FocusGroup1,
].map(
    chainCards(Intro_FocusGroup2))
).concat([
    linkLogic(
        Intro_FocusGroup2,
        [],
        [{next: Intro_FocusGroupFinal}, {next: Intro_FocusGroup_Miner}]
    )
]).concat([
    Intro_FocusGroup_Miner,
    Intro_FocusGroup_Enviro,
    Intro_FocusGroup_Unde,
].map(
    chainCards(Intro_FocusGroupFinal))
).concat([
    Intro_FocusGroupFinal,
    Intro_Happiness,
    Intro_Listen,
    Intro_Final,
].map(
    chainCards())
)

export const eventCards: { [x: string]: EventCard } = {}
export const events: WorldEvent[] = []
