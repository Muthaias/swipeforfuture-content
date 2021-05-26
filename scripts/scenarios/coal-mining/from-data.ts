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
    GameWorldModifier,
    WorldQuery,
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
    When: string[]
}

function parseGameWorldModifiers(data: string[]): GameWorldModifier[] {
    const { add, set, _unknown } = data.reduce<{
        add: { id: string; value: number }[]
        set: { id: string; value: number }[]
        _unknown: string[]
    }>(
        (acc, entry) => {
            const match = entry.match(/(\w+)\s*([+-=])\s*([-]?\d+)/)
            if (match) {
                const separator = match[2]
                const type: "add" | "set" =
                    {
                        "+": "add" as "add",
                        "-": "add" as "add",
                        "=": "set" as "set",
                    }[separator] || "set"
                acc[type].push({
                    id: match[1],
                    value: (separator === "-" ? -1 : 1) * parseFloat(match[3]),
                })
            } else {
                acc._unknown.push(entry)
            }
            return acc
        },
        { add: [], set: [], _unknown: [] },
    )

    if (_unknown.length > 0) {
        console.warn(_unknown)
    }

    const mods: GameWorldModifier[] = [
        {
            type: "add",
            state: add.reduce<{ [x: string]: number }>((acc, entry) => {
                acc[entry.id] = entry.value
                return acc
            }, {}),
        },
        {
            type: "set",
            state: set.reduce<{ [x: string]: number }>((acc, entry) => {
                acc[entry.id] = entry.value
                return acc
            }, {}),
        },
    ]
    return mods
}

function parseWorldQuery(data: string): WorldQuery | undefined {
    const entries = data
        .split(",")
        .map((e) => e.trim())
        .map((e) => {
            const match = e.match(/(\w+)\s*=\s*(\d+)\s*-\s*(\d+)/)
            if (match) {
                return {
                    [match[1]]: [parseFloat(match[2]), parseFloat(match[3])],
                }
            } else {
                console.warn("Unable to parse query: ", e)
            }
            return undefined
        })
        .filter(
            (
                e,
            ): e is {
                [x: string]: [number, number]
            } => e !== undefined,
        )

    if (entries.length === 0) return undefined

    return entries.reduce<WorldQuery>(
        (acc, entry) => {
            acc.state = {
                ...acc.state,
                ...entry,
            }
            return acc
        },
        { state: {} },
    )
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
        return linkLogic(
            card,
            entry["When"]
                .map((q) => parseWorldQuery(q))
                .filter((q): q is WorldQuery => q !== undefined),
            [
                [
                    ...parseGameWorldModifiers(entry["Left Effect"]),
                    { next: left },
                ],
                [
                    ...parseGameWorldModifiers(entry["Right Effect"]),
                    { next: right },
                ],
            ],
        )
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
        When: toStringArray(),
    },
    {
        sheetIds: ["init"],
    },
)

export const cards = toCardData(rawData)
