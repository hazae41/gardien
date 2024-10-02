# Gardien

Type-safe runtime schema validation and parsing

<!-- ```bash
npm i @hazae41/gardien
``` -->

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/gardien)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies
- Rust-like patterns
- Fully type-safe
- Unit-tested
- Zod-like syntax

## Usage

```typescript
import { Guard, z } from "@hazae41/gardien"

const RpcRequestGuard = z.record({
  jsonrpc: z.strong("2.0"),
  id: z.union([z.strong(null), z.number(), z.string()]),
  method: z.string(),
  params: z.optional(z.unknown())
} as const)

function onMessage(message: string) {
  const request = Guard.asOrThrow(RpcRequestGuard, JSON.parse(message) as unknown)

  if (request.method === "example")
    return void example(request)
  
  throw new Error("Unknown method")
}
```
