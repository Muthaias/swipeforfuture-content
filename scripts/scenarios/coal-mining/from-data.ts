import {
    loadFile,
    toString,
    toStringArray,
    toStringOrUndefined,
} from "../../content-utils/xlsx-utils"
import {
    CardData,
    BaseCard,
    cardContent,
    createIdContext,
} from "../../content-utils"
import { createLinkContext } from "./utils"
import { getImage } from "./images"

const { linkLogic } = createLinkContext(createIdContext("from-data"))

type DataDescription = {
    "Card Name": string
    "Card Type": string
    Character: string
    "Text of card": string
    "Swipe Left Text": string
    "Swipe Right Text": string
    "Image Desc": string
    "Left Effect": string[]
    "Right Effect": string[]
    "Left Step"?: string
    "Right Step"?: string
    Location: string
    Title: string
}

function toCardData(data: DataDescription[]): CardData[] {
    const cardMap = data.reduce((acc, entry) => {
        const card = cardContent(
            getImage(entry["Character"]),
            entry["Title"],
            entry["Text of card"],
            entry["Location"],
            [entry["Swipe Left Text"], entry["Swipe Right Text"]],
        )
        acc.set(card, entry)
        return acc
    }, new Map<BaseCard, DataDescription>())

    const cardIdMap = Array.from(cardMap.entries()).reduce(
        (acc, [card, entry]) => {
            acc.set(entry["Card Name"], card)
            return acc
        },
        new Map<string, BaseCard>(),
    )

    const cards = Array.from(cardMap.entries()).map(([card, entry]) => {
        const left = entry["Left Step"]
            ? cardIdMap.get(entry["Left Step"])
            : undefined
        const right = entry["Right Step"]
            ? cardIdMap.get(entry["Right Step"])
            : undefined
        return linkLogic(card, [], [{ next: left }, { next: right }])
    })
    return cards
}

const rawData = loadFile<DataDescription>(
    "./data/test.xlsx",
    {
        "Card Name": toString,
        "Card Type": toString,
        Character: toString,
        "Text of card": toString,
        "Swipe Left Text": toString,
        "Swipe Right Text": toString,
        "Image Desc": toString,
        "Left Effect": toStringArray(),
        "Right Effect": toStringArray(),
        "Left Step": toStringOrUndefined,
        "Right Step": toStringOrUndefined,
        Location: toString,
        Title: toString,
    },
    {
        sheetIds: ["init"],
    },
)

export const cards = toCardData(rawData)
