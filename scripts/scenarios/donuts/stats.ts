import { stat, defaultState } from '../../content-utils'

export const definitions = {
    environment: stat('Environment', 'GiWheat', '70%'),
    people: stat('People', 'IoIosPeople'),
    security: stat('Security', 'GiAk47'),
    money: stat('Money', 'GiMoneyStack'),
    popularity: stat('Popularity', 'FiSmile', '70%'),
}
export const environment = definitions.environment.id
export const people = definitions.people.id
export const security = definitions.security.id
export const money = definitions.money.id
export const popularity = definitions.popularity.id

export const defaultStates = [
    defaultState(environment, 50),
    defaultState(people, 50),
    defaultState(security, 50),
    defaultState(money, 50),
    defaultState(popularity, 50),
]
