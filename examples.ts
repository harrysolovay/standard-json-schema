import * as v from "valibot"
import { type } from "arktype"
import { Schema } from "effect"
import { z } from "zod"
import { toJSONSchema } from "./index.js"

console.log(
  "Zod",
  await toJSONSchema(
    z.object({
      a: z.string(),
      b: z.object({
        c: z.number(),
      }),
      d: z.boolean().array(),
    }),
  ),
)

console.log(
  "Arktype",
  await toJSONSchema(
    type({
      a: "string",
      b: {
        c: "number",
      },
      d: "boolean[]",
    }),
  ),
)

console.log(
  "Effect",
  await toJSONSchema(
    Schema.Struct({
      a: Schema.String,
      b: Schema.Struct({
        c: Schema.Number,
      }),
      d: Schema.Array(Schema.Boolean),
    }),
  ),
)

console.log(
  "Valibot",
  await toJSONSchema(
    v.object({
      a: v.string(),
      b: v.object({
        c: v.number(),
      }),
      d: v.array(v.boolean()),
    }),
  ),
)
