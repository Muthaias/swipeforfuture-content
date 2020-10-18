import {
    propRef,
    defaultFlag,
    defaultState,
} from '../../../content-utils'

export const introductionComplete = propRef('Introduction Complete')
export const staffPatience = propRef('Staff Patience')

export const defaultStates = [
    defaultState(staffPatience, 100),
]

export const defaultFlags = [
    defaultFlag(introductionComplete, false),
]