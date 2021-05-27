import {
    loadFile,
    toString,
    toNumber,
    toStringArray,
    toLowerCaseString,
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
    Weight: number
}

function loadStandadFile(path: string): DataDescription[] {
    return loadFile<DataDescription>(
        path,
        {
            "Card Name": toLowerCaseString(""),
            "Card Type": toString(""),
            Character: toString(""),
            "Text of card": toString(""),
            "Swipe Left Text": toString(""),
            "Swipe Right Text": toString(""),
            "Image Desc": toString(""),
            "Left Effect": toStringArray(";", toLowerCaseString("")),
            "Right Effect": toStringArray(";", toLowerCaseString("")),
            "Left Step": toLowerCaseString(undefined),
            "Right Step": toLowerCaseString(undefined),
            Location: toString(""),
            Title: toString(""),
            When: toStringArray(";", toLowerCaseString("")),
            Weight: toNumber,
        },
        {
            sheetIds: ["init"],
        },
    )
}

function parseGameWorldModifiers(data: string[]): GameWorldModifier[] {
    const { add, set, flags, _unknown } = data.reduce<{
        add: { id: string; value: number }[]
        set: { id: string; value: number }[]
        flags: { [id: string]: boolean }
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
                const flagMatch = entry.match(/(\w+)\s*=\s*(true|false)/)
                if (flagMatch) {
                    acc.flags[flagMatch[1]] = flagMatch[2] === "true"
                } else {
                    acc._unknown.push(entry)
                }
            }
            return acc
        },
        { add: [], set: [], _unknown: [], flags: {} },
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
            flags: flags,
        },
    ]
    return mods
}

function parseWorldQuery(data: string): WorldQuery | undefined {
    type WQState = {
        [x: string]: [number, number]
    }
    type WQFlag = {
        [x: string]: boolean
    }
    const dataEntries = data
        .split(",")
        .map((e) => e.trim())
    const entries = dataEntries
        .map<WQState | undefined>((e) => {
            const match = e.match(/(\w+)\s*=\s*(\d+)\s*-\s*(\d+)/)
            if (match) {
                return {
                    [match[1]]: [parseFloat(match[2]), parseFloat(match[3])],
                }
            }
            return undefined
        })
        .filter(
            (
                e,
            ): e is WQState => e !== undefined,
        )
    const flags = dataEntries
        .map<WQFlag | undefined>((e) => {
            const match = e.match(/(\w+)\s*=\s*(true|false)/)
            if (match) {
                return {
                    [match[1]]: match[2] === "true",
                }
            }
            return undefined
        })
        .filter(
            (
                e,
            ): e is WQFlag => e !== undefined,
        )

    if (
        entries.length === 0 &&
        flags.length === 0
    ) return undefined

    const wq = {
        ...entries.reduce<WorldQuery>(
            (acc, entry) => {
                acc.state = {
                    ...acc.state,
                    ...entry,
                }
                return acc
            },
            { state: {} },
        ),
        ...flags.reduce<WorldQuery>(
            (acc, entry) => {
                acc.flags = {
                    ...acc.flags,
                    ...entry,
                }
                return acc
            },
            { state: {} },
        )
    }
    return wq
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
            entry.Weight
        )
    })
    return cards
}

const rawData = loadStandadFile("./data/test.xlsx")

export const cards = toCardData(rawData)
