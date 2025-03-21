import type { Type as Arktype } from "arktype"
import type { BaseIssue, BaseSchema } from "valibot"
import type { ZodType } from "zod"
import type { StandardSchemaV1 } from "@standard-schema/spec"
import type { Schema } from "effect"

export async function toJSONSchema<I, O>(type: StandardSchemaV1<I, O> | Schema.Schema<O, I>): Promise<object> {
  if ("~standard" in type) {
    const { vendor } = type["~standard"]
    switch (vendor) {
      case "zod": {
        const { zodToJsonSchema } = await ensureInstalled("zod-to-json-schema", import("zod-to-json-schema"))
        return zodToJsonSchema(type as ZodType)
      }
      case "arktype": {
        return (type as Arktype).toJsonSchema()
      }
      case "valibot": {
        const { toJsonSchema } = await ensureInstalled("@valibot/to-json-schema", import("@valibot/to-json-schema"))
        return toJsonSchema(type as BaseSchema<I, O, BaseIssue<unknown>>)
      }
      case "typebox": {
        return type
      }
      default: {
        unsupported(vendor)
      }
    }
  } else {
    const { Schema } = await ensureInstalled("effect", import("effect"))
    if (Schema.isSchema(type)) {
      return import("effect/JSONSchema").then((JSONSchema) => JSONSchema.make(type))
    }
    unsupported()
  }
}

async function ensureInstalled<T>(dependency: string, pending: Promise<T>) {
  try {
    return await pending
  } catch (e: unknown) {
    throw new Error(`Could not find module "${dependency}"; please install.`)
  }
}

function unsupported(vendor?: string): never {
  throw new Error(
    `Vendor ${vendor ? `"${vendor}"` : ""}is not yet supported. Please open an issue: http://github.com/harrysolovay/standard-json-schema/issues/new.`,
  )
}
