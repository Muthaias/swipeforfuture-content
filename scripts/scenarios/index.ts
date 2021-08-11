import defaultScenario from "./default"
import donuts from "./donuts"
import coalMining from "./coal-mining"

import { Scenario } from '../content-utils'

const scenarios: { [id: string]: Scenario } = {
    [defaultScenario.id]: defaultScenario,
    [donuts.id]: donuts,
    [coalMining.id]: coalMining,
}

export default scenarios
