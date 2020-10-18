import {
    CardData,
    CardActionData,
    WorldQuery,
    addAction,
} from '.'


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
): CardData {
    return {
        type: "card",
        isAvailableWhen: [{}],
        image: image,
        title: title,
        text: text,
        location: location,
        weight: 1,
        actions: {
            left: addAction({}, {}, left),
            right: addAction({}, {}, right),
        }
    };
}

/**
 * Given a template card this creates a new card with updated logic content.
 * 
 * @param card A card template that contains artistic content
 * @param isAvailableWhen The worldqueries for when the card is availables
 * @param [left, right] The left and right world actions
 * @param weight The weight of the card
 */
export function cardGameProperties(
    card: CardData,
    isAvailableWhen: WorldQuery[],
    [left, right]: [CardActionData, CardActionData],
    weight: number,
): CardData {
    return {
        ...card,
        weight,
        isAvailableWhen,
        actions: {
            left: {
                ...left,
                description: card.actions.left.description
            },
            right: {
                ...right,
                description: card.actions.right.description,
            }
        }
    }
}
