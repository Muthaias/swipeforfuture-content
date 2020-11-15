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
 * @param tree The CardTree to recursively turn into an array of cards
 *
 * NOTE: The following params should only be used internally by the content utils
 * to connect CardTrees within other structures, like for example CardSequences.
 *
 * For actual content, use `tree.conditions` and `tree.modifiers` instead:
 * @param _startConditions Internal WorldQuery[] to control when to show this CardTree node. Useful when you want to complete the previous node in a CardSequence before starting the CardTree.
 * @param _endModifiers Internal GameWorldModifier[] to apply to all CardTree leaf nodes. Useful when you want to complete a CardTree within a CardSequence before moving on to the next node in the CardSequence.
 * @param _bindRef Internal cardRef to the parent card.
 */
export function cardsFromTree(
    tree: Omit<CardTree, "modifiers">,
    _startConditions: WorldQuery[] = [],
    _endModifiers: GameWorldModifier[] = [],
    _bindRef?: string,
): CardData[] {
    const leftRef = cardRef(tree.card.title + " left")
    const rightRef = cardRef(tree.card.title + " right")
    const triggerRef = _bindRef
        ? undefined
        : cardRef(tree.card.title + " origin")

    const leftStartConditions = getStartConditions(leftRef, triggerRef, false)
    const rightStartConditions = getStartConditions(rightRef, triggerRef, false)

    const treeConditions = tree.conditions?.length ? tree.conditions : []
    const startConditions = getStartConditions(
        _bindRef,
        triggerRef,
        !!triggerRef,
    )

    const conditions = treeConditions.length
        ? startConditions.flatMap((c) =>
              treeConditions.map((tc) => combineWorldQueries(c, tc)),
          )
        : startConditions

    const isAvailableWhen = _startConditions.length
        ? conditions.flatMap((c) =>
              _startConditions.map((sc) => combineWorldQueries(c, sc)),
          )
        : conditions

    return [
        cardLogic(tree.card, isAvailableWhen, [
            action([
                ...mixToArray(tree.left?.modifiers),
                ...(!tree?.left?.hasOwnProperty("card") ? _endModifiers : []),
                getRefRemovalModifier(leftRef, _bindRef, triggerRef),
            ]),
            action([
                ...mixToArray(tree.right?.modifiers),
                ...(!tree?.right?.hasOwnProperty("card") ? _endModifiers : []),
                getRefRemovalModifier(rightRef, _bindRef, triggerRef),
            ]),
        ]),
        ...(tree.left && "card" in tree.left
            ? cardsFromTree(
                  tree.left,
                  leftStartConditions,
                  _endModifiers,
                  leftRef,
              )
            : []),
        ...(tree.right && "card" in tree.right
            ? cardsFromTree(
                  tree.right,
                  rightStartConditions,
                  _endModifiers,
                  rightRef,
              )
            : []),
    ]
}

function getStartConditions(
    bindRef: string | undefined,
    triggerRef: string | undefined,
    isOrigin?: boolean,
): WorldQuery[] {
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
): GameWorldModifier {
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
