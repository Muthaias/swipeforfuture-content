import {
    imageDB,
    imageEntry,
    unsplashImage,
    pexelsImage,
} from "../../content-utils"

export const { getImage } = imageDB([
    imageEntry(unsplashImage("1546541612-82d19b258cd5"), "envira"),
    imageEntry(unsplashImage("1573497019940-1c28c88b4f3e"), "campaignAdvisor"),
    imageEntry(unsplashImage("1529088746738-c4c0a152fb2c"), "coalMiner"),
    imageEntry(
        unsplashImage("1546541612-82d19b258cd5"),
        "environmentallyMindedCitizen",
    ),
    imageEntry(unsplashImage("1584799235813-aaf50775698c"), "undecidedVoter"),
    imageEntry(unsplashImage("1573497019940-1c28c88b4f3e"), "Campaign Advisor"),
    imageEntry(unsplashImage("1529088746738-c4c0a152fb2c"), "Coal Miner"),
    imageEntry(
        unsplashImage("1546541612-82d19b258cd5"),
        "Environmentally Minded Citizen",
    ),
    imageEntry(unsplashImage("1584799235813-aaf50775698c"), "Undecided Voter"),
    imageEntry(unsplashImage("1573497019940-1c28c88b4f3e"), "maria"),
    imageEntry(unsplashImage("1529088746738-c4c0a152fb2c"), "infran"),
    imageEntry(unsplashImage("1548247416-ec66f4900b2e"), "cat"),
    imageEntry(unsplashImage("1548247416-ec66f4900b2e"), "default"),
    imageEntry(unsplashImage("1600187777399-220e82950adc"), "Wind Farm", "wind"),
    imageEntry(pexelsImage("3044473"), "powerplant", "coal"),
    imageEntry(
        unsplashImage("1497435334941-8c899ee9e8e9"),
        "Solar Farm",
        "solar",
    ),
])
