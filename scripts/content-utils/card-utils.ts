import {
    CardData,
    EventCard,
    CardActionData,
    WorldQuery,
    addAction,
    cardRef,
    GameWorldModifier,
} from "."
import { EventCardActionData } from "../../swipeforfuture.com/src/game/ContentTypes"

export type BaseCard = Omit<CardData, "type" | "isAvailableWhen"> & {
    id: string
}

/**
 * Adds or updates the value of a flag in a world state modifier
 *
 * @param modifier The game world modifier to update
 * @param flagId The id of the flag to set
 * @param flagValue The value to set
 */
export function setModifierFlag(
    modifier: GameWorldModifier,
    flagId: string,
    flagValue: boolean,
): GameWorldModifier {
    return {
        ...modifier,
        flags: {
            ...(modifier.flags ?? {}),
            [flagId]: flagValue,
        },
    }
}

/**
 * Creates a complete card given only the artistic content
 *
 * @param image The image url to use for the card
 * @param title The title of the card
 * @param text The main text of the card
 * @param location The location where the card takes place
 * @param [left, right] Descriptions of left and right actions
 */
export function cardContent(
    image: string,
    title: string,
    text: string,
    location: string,
    [left, right]: [string, string],
): BaseCard {
    return {
        id: cardRef(title),
        image: image,
        title: title,
        text: text,
        location: location,
        actions: {
            left: addAction({}, {}, left),
            right: addAction({}, {}, right),
        },
        weight: 1,
    }
}

/**
 * Given a generic card this creates a new card with updated logic content.
 *
 * @param card A card template that contains artistic content
 * @param isAvailableWhen The worldqueries for when the card is availables
 * @param [left, right] The left and right world actions
 * @param weight The weight of the card
 * @param showOnce Hide the card after one appearance. We use the convention of setting a flag with the same Id as the card to true.
 */
export function cardLogic(
    card: BaseCard,
    isAvailableWhen: WorldQuery[],
    [left, right]: [CardActionData, CardActionData],
    weight: number = 1,
    showOnce: boolean = false,
): CardData & BaseCard {
    return {
        ...card,
        weight,
        isAvailableWhen: showOnce
            ? isAvailableWhen.map((wq) => ({
                  ...wq,
                  flags: {
                      ...(wq.flags ?? {}),
                      [card.id]: false,
                  },
              }))
            : isAvailableWhen,
        actions: {
            left: {
                ...left,
                ...(showOnce
                    ? setModifierFlag(left.modifier, card.id, true)
                    : {}),
                description: card.actions.left.description,
            },
            right: {
                ...right,
                ...(showOnce
                    ? setModifierFlag(right.modifier, card.id, true)
                    : {}),
                description: card.actions.right.description,
            },
        },
        type: "card",
    }
}

/**
 * Given a generic card this creates a new event card with updated logic content.
 *
 * @param card A card template that contains artistic content
 * @param [left, right] The left and right world actions
 * @param showOnce Hide the card after one appearance. We use the convention of setting a flag with the same Id as the card to true.
 */
export function eventCardLogic(
    card: BaseCard,
    [left, right]: [EventCardActionData, EventCardActionData],
): EventCard & BaseCard {
    return {
        ...card,
        actions: {
            left: {
                ...left,
                description: card.actions.left.description,
            },
            right: {
                ...right,
                description: card.actions.right.description,
            },
        },
        type: "event",
    }
}
