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
 * 2) Add support to execute different modifiers on left and right
 *
 * 3) Add support for CardTree within the CardSequenuce. If a node is a CardTree, then recursively call the cardsFromTree() function to build that subtree.
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

        console.log(startConditions)

        const endModifiers = nextRef
            ? getEndModifiers(currentRef, nextRef)
            : _endModifiers?.length
            ? _endModifiers
            : []

        return cardsFromTree(tree, startConditions, endModifiers)
    })

    return cards

    /*

        _startConditions = [{}]
        _endModifiers = [{}]
    
        for (node, index of sequence)
        
            if node is CardTree

                if (index === 0)

                cardsFromTree(node)
    
    */

    // return sequence.map((cardTree) => {
    //     // TODO: Maybe we need to set the start/end based on the prev/next card?
    //     const startConditions = {}
    //     const endModifiers = {}
    //     return cardsFromTree(cardTree, startConditions, endModifiers)
    // })

    // map to create cardsFromTree(card, startConditions, endModifiers)

    // - - - - X 1 2 3 -

    /*
        if CardTree is found in sequence
            pass onFinishAction to cardsFromSequence() to automatically add this as the last action on CardLeafs
            // this will ensure we know the onFinishAction in the outside context,
            // allowing the next card in the sequence to show up when the CardTree has been completed.

    */
}
