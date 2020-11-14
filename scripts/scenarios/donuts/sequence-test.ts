import {
    cardContent,
    cardsFromSequence,
    CardSequence,
} from "../../content-utils"

function quickCard(name: string, left: string, right: string) {
    return cardContent("", name, name, name, [left, right])
}

export const sequence: CardSequence = {
    sequence: [
        { card: quickCard("1", "1_L", "1_R") },
        { card: quickCard("2", "2_L", "2_R") },
        { card: quickCard("3", "3_L", "3_R") },
    ],
}

export const cards = cardsFromSequence(sequence)