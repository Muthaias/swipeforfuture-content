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
    left?: CardTree
    right?: CardTree
    conditions?: WorldQuery[]
    action?: GameWorldModifier
}

export function cardsFromTree(tree: CardTree, bindRef?: string): CardData[] {
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
                action(
                    setModifier(
                        {},
                        {
                            [leftRef]: true,
                            ...bindRefRemoval,
                            ...triggerRefRemoval,
                        },
                    ),
                ),
                action(
                    setModifier(
                        {},
                        {
                            [rightRef]: true,
                            ...bindRefRemoval,
                            ...triggerRefRemoval,
                        },
                    ),
                ),
            ],
        ),
        ...(tree.left ? cardsFromTree(tree.left, leftRef) : []),
        ...(tree.right ? cardsFromTree(tree.right, rightRef) : []),
    ]
}
