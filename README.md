# Swipe for Future Content

This project contains community scenarios for Swipe for Future.

## How to install and get started

1. `npm install && git submodule update --init --recursive`

For the following steps, replace `SCENARIO_ID` with the name of the folder in `scripts/scenarios/` where your scenario exists. For example, use `default` to get started.

2. Use `npm run build` to turn scenarios from `scripts/scenarios/[SCENARIO_ID]` into playable scenarios in JSON format that will be available in `dist/[SCENARIO_ID]`.

3. Use `npm run serve` to serve scenarios on `http://localhost:5000`

4. Try playing the scenario using `https://swipeforfuture.com/?path=http://localhost:5000/[SCENARIO_ID]`
