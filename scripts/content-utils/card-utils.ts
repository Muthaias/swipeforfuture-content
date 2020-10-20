import { CardData, EventCard, CardActionData, WorldQuery, addAction } from '.'
import { EventCardActionData } from '../../swipeforfuture.com/src/game/ContentTypes'

export type BaseCard = Omit<CardData, 'type' | 'isAvailableWhen'>

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
 */
export function cardLogic(
    card: BaseCard,
    isAvailableWhen: WorldQuery[],
    [left, right]: [CardActionData, CardActionData],
    weight: number = 1,
): CardData {
    return {
        ...card,
        weight,
        isAvailableWhen,
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
        type: 'card',
    }
}

/**
 * Given a generic card this creates a new event card with updated logic content.
 *
 * @param card A card template that contains artistic content
 * @param [left, right] The left and right world actions
 */
export function eventCardLogic(
    card: BaseCard,
    [left, right]: [EventCardActionData, EventCardActionData],
    weight: CardData['weight'] = 1,
): EventCard {
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
        type: 'event',
    }
}
