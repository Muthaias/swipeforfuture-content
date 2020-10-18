import {
    WorldState,
} from "./external"

export type DefaultState = {
    id: string
    value: number
}

export function defaultState(id: string, value: number): DefaultState {
    return {
        id,
        value,
    }
}

export function stateFromDefaultStates(defaults: DefaultState[]): WorldState["state"] {
    return defaults.reduce((acc, d) => ({
        ...acc,
        [d.id]: d.value,
    }), {});
}