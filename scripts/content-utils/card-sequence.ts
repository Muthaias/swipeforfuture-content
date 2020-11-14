import { GameWorldModifier } from "../../swipeforfuture.com/src/game/ContentTypes"
import { WorldQuery, CardData, cardRef, setModifier, CardTree } from "./"
import { cardsFromTree } from "./card-tree"

/**
 * TODO:
 *
 * 1) ✅ Create CardSequence with support for linking cards
 * - fix bug to only show final card in sequence once
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

// TODO: Document params and explain how to work with the internal params.
export function cardsFromSequence(
    { sequence }: CardSequence,
    _startConditions?: WorldQuery[],
    _endModifiers: GameWorldModifier[] = [],
): CardData[] {
    const sequenceRefs = sequence.map((tree) =>
        cardRef(tree.card.title + " sequence"),
    )

    const cards = sequence.flatMap((tree, i) => {
        const prevRef = sequenceRefs[i - 1]
        const currentRef = sequenceRefs[i]
        const nextRef = sequenceRefs[i + 1]

        // if we don't need prevRef or nextRef
        //      Then we can simplify the code below
        //      to either use default _startConditions and _endModifiers
        //      or generate them based on currentRef

        const startConditions =
            i === 0 && _startConditions?.length
                ? _startConditions
                : getStartConditions(prevRef, currentRef)

        // TODO: Ensure that _endModifiers are applied at the end of a CardTree within a sequence are remainig intact, even when used within a Sequence.

        // if we need to support passing down endModifies and startConditions multiple levels into nested CardTrees and CardSequences,
        // then one possible solution might be to store everything needed in a object, passed as the final argument, where each level can add its references, modifiers, conditions etc.
        // Then as the levels are resolved, keys and values are removed from the object to only keep relevant data there during runtime.

        const endModifiers = [
            ...(_endModifiers?.length ? _endModifiers : []),
            ...getEndModifiers(currentRef, nextRef),
        ]

        console.log(endModifiers)

        return cardsFromTree(tree, startConditions, endModifiers)
    })

    return cards
}

// TODO: remove unused params and simplify functions if possible.
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

function getEndModifiers(currentRef: string, nextRef: string) {
    return [
        setModifier(
            {},
            {
                ...(currentRef ? { [currentRef]: true } : {}),
                // ...(nextRef ? { [nextRef]: true } : {}),
            },
        ),
    ]
}
