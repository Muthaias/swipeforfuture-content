import {
    BaseCard,
    WorldQuery,
    CardData,
    GameWorldModifier,
    cardRef,
    cardLogic,
    action,
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

export function cardsFromTree(
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
                action([
                    ...mixToArray(tree.left?.modifiers),
                    setModifier(
                        {},
                        {
                            [leftRef]: true,
                            ...bindRefRemoval,
                            ...triggerRefRemoval,
                        },
                    ),
                ]),
                action([
                    ...mixToArray(tree.right?.modifiers),
                    setModifier(
                        {},
                        {
                            [rightRef]: true,
                            ...bindRefRemoval,
                            ...triggerRefRemoval,
                        },
                    ),
                ]),
            ],
        ),
        ...(tree.left && "card" in tree.left
            ? cardsFromTree(tree.left, leftRef)
            : []),
        ...(tree.right && "card" in tree.right
            ? cardsFromTree(tree.right, rightRef)
            : []),
    ]
}

function mixToArray<T>(data?: T | T[]): T[] {
    return data ? (Array.isArray(data) ? data : [data]) : []
}
