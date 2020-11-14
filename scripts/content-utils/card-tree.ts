import {
    BaseCard,
    WorldQuery,
    CardData,
    GameWorldModifier,
    cardRef,
    cardLogic,
    setModifier,
    combineWorldQueries,
} from "./"

export type CardTree = {
    card: BaseCard
    left?: CardTree | CardLeaf
    right?: CardTree | CardLeaf
    conditions?: WorldQuery[]
} & CardLeaf

export type CardLeaf = {
    modifiers?: GameWorldModifier | GameWorldModifier[]
}

/**
 *
 * @param tree The CardTree to recursively turn into an array of cards
 *
 * NOTE: The following params should only be used internally by the content utils
 * to connect CardTrees within other structures, like for example CardSequences.
 *
 * For actual content, use `tree.conditions` and `tree.modifiers` instead:
 * @param _startConditions Internal WorldQuery[] to control when to show this CardTree node. Useful when you want to complete the previous node in a CardSequence before starting the CardTree.
 * @param _endModifiers Internal GameWorldModifier[] to apply to all CardTree leaf nodes. Useful when you want to complete a CardTree within a CardSequence before moving on to the next node in the CardSequence.
 */
export function cardsFromTree(
    tree: Omit<CardTree, "modifiers">,
    _startConditions?: WorldQuery[],
    _endModifiers: GameWorldModifier[] = [],
): CardData[] {
    // HACK: retrieving the bindRef from the first _startConditions is hack
    // that should be improved to ensure we get the correct reference in case we have multiple _startConditions.

    // IDEA: Possibly we should update types for _startConditions and _endModifiers to only ever contain one item
    // This would reduce complexity of `cardsFromTree()`, while still providing us with most of the same functionality
    // Since these are only supposed to be used internally, I currently don't see a good use case to support multiple _startConditions or _endModifiers.

    const bindRef = _startConditions?.length
        ? _startConditions[0]["flags"] &&
          Object.keys(_startConditions[0]["flags"])[0]
        : undefined
    const leftRef = cardRef(tree.card.title + " left")
    const rightRef = cardRef(tree.card.title + " right")
    const triggerRef = bindRef
        ? undefined
        : cardRef(tree.card.title + " origin")

    const conditions = tree.conditions ? tree.conditions : [{}]

    const leftStartConditions = getStartConditions(leftRef, triggerRef, false)
    const rightStartConditions = getStartConditions(rightRef, triggerRef, false)

    _startConditions = _startConditions?.length
        ? _startConditions
        : getStartConditions(bindRef, triggerRef, !!triggerRef)

    const isAvailableWhen = conditions.flatMap((c) =>
        _startConditions
            ? _startConditions.map((sc) => combineWorldQueries(c, sc))
            : c,
    )

    return [
        cardLogic(tree.card, isAvailableWhen, [
            action([
                ...mixToArray(tree.left?.modifiers),
                ...(!tree?.left?.hasOwnProperty("card") ? _endModifiers : []),
                getRefRemovalModifier(leftRef, bindRef, triggerRef),
            ]),
            action([
                ...mixToArray(tree.right?.modifiers),
                ...(!tree?.right?.hasOwnProperty("card") ? _endModifiers : []),
                getRefRemovalModifier(rightRef, bindRef, triggerRef),
            ]),
        ]),
        ...(tree.left && "card" in tree.left
            ? cardsFromTree(tree.left, leftStartConditions, _endModifiers)
            : []),
        ...(tree.right && "card" in tree.right
            ? cardsFromTree(tree.right, rightStartConditions, _endModifiers)
            : []),
    ]
}

function getStartConditions(
    bindRef: string | undefined,
    triggerRef: string | undefined,
    isOrigin?: boolean,
) {
    let flag = {}
    if (triggerRef) {
        if (
            (isOrigin && triggerRef.includes("origin")) ||
            (!isOrigin && !triggerRef.includes("origin"))
        ) {
            flag = { [triggerRef]: false }
        }
    }

    return [
        {
            flags: {
                ...(bindRef
                    ? {
                          [bindRef]: true,
                      }
                    : {}),
                ...flag,
            },
        },
    ]
}

function getRefRemovalModifier(
    primaryRef: string,
    bindRef: string | undefined,
    triggerRef: string | undefined,
) {
    const triggerRefRemoval = triggerRef ? { [triggerRef]: true } : {}
    const bindRefRemoval = bindRef ? { [bindRef]: false } : {}

    return setModifier(
        {},
        {
            [primaryRef]: true,
            ...bindRefRemoval,
            ...triggerRefRemoval,
        },
    )
}

function mixToArray<T>(data?: T | T[]): T[] {
    return data ? (Array.isArray(data) ? data : [data]) : []
}

/**
 * Keeping old implementation for now to make testing easier.
 */
export function OLD_cardsFromTree(
    tree: Omit<CardTree, "modifiers">,
    bindRef?: string,
): CardData[] {
    const leftRef = cardRef(tree.card.title + " left")
    const rightRef = cardRef(tree.card.title + " right")
    const triggerRef = bindRef
        ? undefined
        : cardRef(tree.card.title + " origin")
    const triggerRefRemoval = triggerRef ? { [triggerRef]: true } : {}
    const bindRefRemoval = bindRef ? { [bindRef]: false } : {}
    const conditions = tree.conditions ? tree.conditions : [{}]

    return [
        cardLogic(
            tree.card,
            conditions.map((c) =>
                combineWorldQueries(c, {
                    flags: {
                        ...(bindRef
                            ? {
                                  [bindRef]: true,
                              }
                            : {}),
                        ...(triggerRef
                            ? {
                                  [triggerRef]: false,
                              }
                            : {}),
                    },
                }),
            ),
            [
                [
                    ...mixToArray(tree.left?.modifiers),
                    setModifier(
                        {},
                        {
                            [leftRef]: true,
                            ...bindRefRemoval,
                            ...triggerRefRemoval,
                        },
                    ),
                ],
                [
                    ...mixToArray(tree.right?.modifiers),
                    setModifier(
                        {},
                        {
                            [rightRef]: true,
                            ...bindRefRemoval,
                            ...triggerRefRemoval,
                        },
                    ),
                ],
            ],
        ),
        ...(tree.left && "card" in tree.left
            ? OLD_cardsFromTree(tree.left, leftRef)
            : []),
        ...(tree.right && "card" in tree.right
            ? OLD_cardsFromTree(tree.right, rightRef)
            : []),
    ]
}
