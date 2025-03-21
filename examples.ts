import * as v from "valibot"
import { type } from "arktype"
import { Schema } from "effect"
import { z } from "zod"
import { toJSONSchema } from "./index.js"

export const ZodType = z.object({
  a: z.string(),
  b: z.object({
    c: z.number(),
  }),
  d: z.boolean().array(),
})

console.log("Zod", await toJSONSchema(ZodType))

export const ArktypeType = type({
  a: "string",
  b: {
    c: "number",
  },
  d: "boolean[]",
})

console.log("Arktype", await toJSONSchema(ArktypeType))

export const EffectSchemaType = Schema.Struct({
  a: Schema.String,
  b: Schema.Struct({
    c: Schema.Number,
  }),
  d: Schema.Array(Schema.Boolean),
})

console.log("Effect", await toJSONSchema(EffectSchemaType))

export const ValibotType = v.object({
  a: v.string(),
  b: v.object({
    c: v.number(),
  }),
  d: v.array(v.boolean()),
})

console.log("Valibot", await toJSONSchema(ValibotType))
