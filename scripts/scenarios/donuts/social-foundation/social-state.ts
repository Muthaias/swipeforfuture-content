import { propRef, defaultState } from '../../../content-utils'

export const foodSecurity = propRef('Food Security')
export const health = propRef('Health')
export const education = propRef('Education')
export const incomeAndWork = propRef('Income And Work')
export const peaceAndJustice = propRef('Peace And Justice')
export const politicalVoice = propRef('Political Voice')
export const socialEquality = propRef('Social Equality')
export const genderEquality = propRef('Gender Equality')
export const housing = propRef('Housing')
export const networks = propRef('Networks')
export const energy = propRef('Energy')
export const water = propRef('Water')

export const defaultStates = [
    defaultState(foodSecurity, 50),
    defaultState(health, 50),
    defaultState(education, 50),
    defaultState(incomeAndWork, 50),
    defaultState(peaceAndJustice, 50),
    defaultState(politicalVoice, 50),
    defaultState(socialEquality, 50),
    defaultState(genderEquality, 50),
    defaultState(housing, 50),
    defaultState(networks, 50),
    defaultState(energy, 50),
    defaultState(water, 50),
]