import { GameWorldModifier } from "../../swipeforfuture.com/src/game/ContentTypes"
import { WorldQuery, CardData, cardRef, setModifier, CardTree } from "./"
import { cardsFromTree } from "./card-tree"
import { combineWorldQueries } from "./card-utils"

/**
 * TODO:
 *
 * 1) ✅ Create CardSequence with support for linking cards
 * - ✅ fix bug to only show final card in sequence once
 * - (maybe) fix removing unused flags after they have been used to trigger cards in the sequence
 *
 * 2) ✅ Add support to execute different modifiers on left and right (implemented by CardTree)
 *
 * 3) ✅ Add support for CardTree within the CardSequenuce. If a node is a CardTree, then recursively call the cardsFromTree() function to build that subtree.
 * 4) Add support for CardSequence within the CardTree. If a node is a CardSequence, then then recursively call the cardsFromSequence() function to build that subsequence.
 */

export interface CardSequence {
    sequence: CardTree[]
}

/**
 * @param sequence The CardSequence to turn into an array of cards
 *
 * NOTE: The following params should only be used internally by the content utils
 * to connect the CardTrees. Define content within your CardTrees.
 *
 * @param _startConditions Internal WorldQuery[] to control when to start showing this CardSequence.
 * @param _endModifiers Internal GameWorldModifier[] to apply when all nodes of this CardSequence has been completed.
 */
export function cardsFromSequence(
    { sequence }: CardSequence,
    _startConditions: WorldQuery[] = [],
    _endModifiers: GameWorldModifier[] = [],
): CardData[] {
    const sequenceRefs = sequence.map((tree) =>
        cardRef(tree.card.title + " sequence"),
    )

    const cards = sequence.flatMap((tree, i) => {
        const prevRef = sequenceRefs[i - 1]
        const currentRef = sequenceRefs[i]

        const conditions = getStartConditions(prevRef, currentRef)
        const isAvailableWhen =
            i > 0
                ? conditions
                : conditions.flatMap((c) =>
                      _startConditions.map((sc) => combineWorldQueries(c, sc)),
                  )

        const endModifiers = [
            ...(i === sequence.length - 1 && _endModifiers?.length
                ? _endModifiers
                : []),
            ...getEndModifiers(currentRef),
        ]

        return cardsFromTree(tree, isAvailableWhen, endModifiers)
    })

    return cards
}

function getStartConditions(prevRef: string, currentRef: string) {
    return [
        {
            flags: {
                ...(prevRef ? { [prevRef]: true } : {}),
                ...(currentRef ? { [currentRef]: false } : {}),
            },
        },
    ]
}

function getEndModifiers(currentRef: string) {
    return [
        setModifier(
            {},
            {
                ...(currentRef ? { [currentRef]: true } : {}),
            },
        ),
    ]
}
