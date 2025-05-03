import { test, expect, mock } from "bun:test"
import { toJSONSchema } from "./index.js"

// Mock for a Zod 4 schema with standard compatibility
const mockZod4Schema = {
  "~standard": {
    vendor: "zod",
    value: {}
  }
}

// Mock the zod module with toJSONSchema function
mock.module("zod", () => {
  return {
    toJSONSchema: (schema: any) => {
      return {
        type: "object",
        properties: {
          name: { type: "string" },
          age: { type: "number" }
        },
        required: ["name", "age"],
        additionalProperties: false,
        $schema: "http://json-schema.org/draft-07/schema#"
      }
    }
  }
})

test("handles Zod 4 schema with built-in toJSONSchema", async () => {
  const result = await toJSONSchema(mockZod4Schema)
  
  expect(result).toMatchObject({
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" }
    },
    required: ["name", "age"],
    additionalProperties: false,
    $schema: "http://json-schema.org/draft-07/schema#"
  })
})
