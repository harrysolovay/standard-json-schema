# Standard JSON Schema

> Turn standard types into JSON schemas

```ts
import { toJSONSchema } from "standard-json-schema"

await toJSONSchema(YourStandardType)
```

## Supported Standard Types

- [x] [zod](https://github.com/colinhacks/zod?tab=readme-ov-file)
- [x] [arktype](https://github.com/arktypeio/arktype)
- [x] [Effect Schema](https://github.com/Effect-TS/effect)
- [x] [typebox](https://github.com/sinclairzx81/typebox)
- [ ] [**request another library**](http://github.com/harrysolovay/standard-json-schema/issues)

## How?

Under the hood, `toJSONSchema` determines the standard type's vendor and
delegates to vendor-specific producers.

---

## **License**

Standard JSON Schema is [Apache-licensed](LICENSE).
