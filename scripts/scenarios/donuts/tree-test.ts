import {
    cardContent,
    CardTree,
    cardsFromTree,
    addModifier,
    setModifier,
} from "../../content-utils"
import * as Stats from "./stats"

function quickCard(name: string, left: string, right: string) {
    return cardContent("", name, name, name, [left, right])
}

export const tree: CardTree = {
    card: quickCard("A", "A:L", "A:R"),
    conditions: [
        {
            state: {
                [Stats.environment]: [0, 100],
            },
        },
    ],
    left: {
        card: quickCard("A:L", "A:L:L", "A:L:R"),
        left: {
            card: quickCard("A:L:L", "A:L:L:L", "A:L:L:R"),
            modifiers: addModifier({ left: 1 }),
            left: {
                modifiers: addModifier({ left: 1 }),
            },
            right: {
                modifiers: addModifier({ right: 1 }),
            },
        },
        right: {
            card: quickCard("A:L:R", "A:L:R:L", "A:L:R:R"),
            modifiers: addModifier({ right: 1 }),
            left: {
                modifiers: addModifier({ left: 1 }),
            },
            right: {
                modifiers: addModifier({ right: 1 }),
            },
        },
        modifiers: addModifier({ left: 1 }),
    },
    right: {
        card: quickCard("A:R", "A:R:L", "A:R:R"),
        left: {
            card: quickCard("A:R:L", "A:R:L:L", "A:R:L:R"),
            modifiers: addModifier({ left: 1 }),
            left: {
                modifiers: addModifier({ left: 1 }),
            },
            right: {
                modifiers: addModifier({ right: 1 }),
            },
        },
        right: {
            // By ending the branch earlier, this will cerify that END_MODIFIERS are applied correctly even for shorter branches
            modifiers: addModifier({ right: 1 }),
        },
        modifiers: addModifier({ right: 1 }),
    },
}

export const cards = cardsFromTree(
    tree,
    [{ flags: { "END_MODIFIERS_WORKED!": false } }],
    [
        addModifier({}, { "END_MODIFIERS_WORKED!": true }),
        setModifier({}, { "END_MODIFIERS_ARE_GREAT!": true }),
    ],
)
