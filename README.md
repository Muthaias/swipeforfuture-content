# Swipe for Future Content

This project contains community scenarios for Swipe for Future.

## How to install

1. `npm install && git submodule update --init --recursive`

---

## Scenario development

For the following steps, replace `[SCENARIO_ID]` with the name of the folder in `scripts/scenarios/` where your scenario exists. For example, use `default` to get started.

1. `npm run dev` will automatically rebuild scenarios from `scripts/scenarios/[SCENARIO_ID]` into playable scenarios in JSON format that will be available in `dist/[SCENARIO_ID]`.
2. In another terminal, start `npm run serve` to serve scenarios on `http://localhost:5000`
3. Test scenarios using `https://swipeforfuture.com/?path=http://localhost:5000/[SCENARIO_ID]`

---

## Deploy new scenarios to `gh-pages` static hosting

1. `git checkout master && git pull` to ensure you have the latest content available.
2. `npm run deploy` to publish new content.

---

## Update game module (included as a git submodule) to latest version

1. In the root of the content repo, use `npm run update` to use the latest submodule version.
2. Commit the changes to save the new submodule version that should be included.
