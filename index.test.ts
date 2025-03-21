import { test, expect } from "bun:test"
import { toJSONSchema } from "./index.js"
import * as fixtures from "./examples.js"

test("snapshots", async () => {
  expect(
    Object.fromEntries(
      await Promise.all(Object.entries(fixtures).map(([k, v]) => toJSONSchema(v).then((v) => [k, v]))),
    ),
  ).toMatchSnapshot()
})
