import {
    cardContent,
    cardsFromSequence,
    CardSequence,
    addModifier,
    propRef,
    defaultFlag,
} from "../../content-utils"

function quickCard(name: string, left: string, right: string) {
    return cardContent("", name, name, name, [left, right])
}

export const sequence: CardSequence = {
    sequence: [
        {
            card: quickCard("1", "1:L", "1:R"),
            left: {
                card: quickCard("1:L", "1:L:L", "1:L:R"),
                left: {
                    card: quickCard("1:L:L", "1:L:L:L", "1:L:L:R"),
                    // 1:L:L:L and
                    // 1:L:L:R should both move on to 2
                },
                // 1:L:R should move on to 2
            },
            // 1:R should move on to 2
        },
        { card: quickCard("2", "2:L", "2:R") },
        { card: quickCard("3", "3:L", "3:R") },
    ],
}

const SEQUENCE_END_MODIFIER_RUN = propRef("SEQUENCE_END_MODIFIER_RUN")

export const defaultFlags = [defaultFlag(SEQUENCE_END_MODIFIER_RUN, false)]

export const cards = cardsFromSequence(
    sequence,
    [
        {
            flags: {
                [SEQUENCE_END_MODIFIER_RUN]: false,
            },
        },
    ],
    [addModifier({}, { [SEQUENCE_END_MODIFIER_RUN]: true })],
)
