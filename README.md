# Standard JSON Schema

> Turn standard types into JSON schemas

```ts
import { toJSONSchema } from "standard-json-schema"

await toJSONSchema(YourStandardType)
```

## Supported Standard Types

- [x] [zod](https://github.com/colinhacks/zod?tab=readme-ov-file) (v3 and v4)
- [x] [arktype](https://github.com/arktypeio/arktype)
- [x] [Effect Schema](https://github.com/Effect-TS/effect)
- [x] [typebox](https://github.com/sinclairzx81/typebox)
- [ ] [**request another library**](http://github.com/harrysolovay/standard-json-schema/issues/new)

## How?

Under the hood, `toJSONSchema` determines the standard type's vendor and
delegates to vendor-specific producers.

### Zod Support

This library supports both Zod v3 and Zod v4:

- **Zod v3**: Uses the `zod-to-json-schema` package (install as a peer dependency)
- **Zod v4**: Uses Zod's built-in `toJSONSchema` function (no additional dependencies needed)

```ts
// Works with both Zod v3 and v4
import { z } from "zod"
import { toJSONSchema } from "standard-json-schema"

const schema = z.object({
  name: z.string(),
  age: z.number(),
})

await toJSONSchema(schema)
```

---

## **License**

Standard JSON Schema is [Apache-licensed](LICENSE).
