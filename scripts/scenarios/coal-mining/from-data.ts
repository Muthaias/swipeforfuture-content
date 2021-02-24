import { loadFile } from "../../content-utils/xlsx-utils"

const rawData = loadFile<{
    "Card Name": string
    "Card Type": string
    Character: string
    "Text of card": string
    "Swipe Left Text": string
    "Swipe Right Text": string
    "Image Desc": string
}>("./scripts/scenarios/coal-mining/data/base.xlsx", {
    "Card Name": toString,
    "Card Type": toString,
    Character: toString,
    "Text of card": toString,
    "Swipe Left Text": toString,
    "Swipe Right Text": toString,
    "Image Desc": toString,
})
console.log(rawData)
