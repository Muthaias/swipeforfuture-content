import { propRef, defaultState } from '../../../content-utils'

export const climateChange = propRef('Climate Change')
export const oceanAcidification = propRef('Ocean Acidification')
export const chemicalPollution = propRef('Chemical Pollution')
export const nitrogenAndPhosphorusLoading = propRef('Nitrogen And Phosphorus Loading')
export const freshwaterWithdrawals = propRef('Freshwater Withdrawals')
export const landConversion = propRef('Land Conversion')
export const biodiversityLoss = propRef('Biodiversity Loss')
export const airPollution = propRef('Air Pollution')
export const ozoneLayerDepletion = propRef('Ozone layer depletion')

export const defaultStates = [
    defaultState(climateChange, 50),
    defaultState(oceanAcidification, 50),
    defaultState(chemicalPollution, 50),
    defaultState(nitrogenAndPhosphorusLoading, 50),
    defaultState(freshwaterWithdrawals, 50),
    defaultState(landConversion, 50),
    defaultState(biodiversityLoss, 50),
    defaultState(airPollution, 50),
    defaultState(ozoneLayerDepletion, 50),
]

export const defaultFlags = []