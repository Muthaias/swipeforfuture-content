// import defaultScenario from "./default"
// import donuts from "./donuts"
// import coalMining from "./coal-mining"
import newWorld from "./new-world"

import { Scenario } from "../content-utils"
const allScenarios = [newWorld]

const scenarios: Record<string, Scenario> = allScenarios.reduce(
    (prev: Record<string, Scenario>, scenario) => {
        prev[scenario.id] = scenario
        return prev
    },
    {},
)

export default scenarios
