import {
    CardData,
    EventCard,
    WorldEvent,
    WorldQuery,
    worldQuery,
    cardContent,
    cardLogic,
    addModifier,
    unsplashImage,
} from "../../content-utils"
import * as Stats from "./stats"

const alwaysState: WorldQuery["state"] = { [Stats.environment]: [0, 100] }

const images = {
    campaignAdvisor: unsplashImage("1573497019940-1c28c88b4f3e"),
    coalMiner: unsplashImage("1529088746738-c4c0a152fb2c"),
    environmentallyMindedCitizen: unsplashImage("1546541612-82d19b258cd5"),
    undecidedVoter: unsplashImage("1584799235813-aaf50775698c"),
}

const mockCard = (card: any) => {
    return cardLogic(
        card,
        [
            worldQuery({
                ...alwaysState,
            }),
        ],
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
    mockCard(Hello_Player),
    mockCard(How_to_Swipe),
    mockCard(Story_1),
    mockCard(Story_2),
    mockCard(Story_3),
    mockCard(UI_1),
    mockCard(UI_Jobs),
    mockCard(UI_Envi),
    mockCard(UI_Money),
    mockCard(UI_Popularity),
    mockCard(UI_Green),
    mockCard(UI_Test),
    mockCard(UI_Test2),
    mockCard(UI_TestWind),
    mockCard(UI_TestSolar),
    mockCard(UI_Test_3),
    mockCard(Intro_FocusGroup1),
    mockCard(Intro_FocusGroup2),
    mockCard(Intro_FocusGroup_Miner),
    mockCard(Intro_FocusGroup_Enviro),
    mockCard(Intro_FocusGroup_Unde),
    mockCard(Intro_FocusGroupFinal),
    mockCard(Intro_Happiness),
    mockCard(Intro_Listen),
    mockCard(Intro_Final),
]

export const eventCards: { [x: string]: EventCard } = {}
export const events: WorldEvent[] = []
