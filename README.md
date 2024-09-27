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

## Usage

```typescript
import { Guard, number, string, optional, unknown } from "@hazae41/gardien"

const RpcRequestGuard = {
  jsonrpc: "2.0",
  id: inter(null, number, string),
  method: string,
  params: optional(unknown)
} as const

function onMessage(message: string) {
  const request = Guard.asOrThrow(RpcRequestGuard, JSON.parse(message))

  if (request.method === "example")
    return void example(request)
  
  throw new Error("Unknown method")
}
```
