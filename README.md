# Gardien

Type-safe runtime schema validation and parsing

```bash
npm i @hazae41/gardien
```

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

### Parsing a number

We can parse something as a number and then validate it

```typescript
import { Guard, z } from "@hazae41/gardien"

const value = Guard.asOrThrow(z.numberable().nonNegative(), "0x123")
```

This is like

```typescript
const value = Number("0x123")

if (value < 0)
  throw new Error()

return value
```

### Validating a string with an error message

```typescript
import { Guard, z } from "@hazae41/gardien"

Guard.asOrThrow(z.string().minmax(6, 24, "Password must be between 6 and 24 characters"), password)
```

This is like

```typescript
if (typeof password !== "string")
  throw new Error()
if (password.length < 6)
  throw new Error("Password must be between 6 and 24 characters")
if (password.length > 24)
  throw new Error("Password must be between 6 and 24 characters")
```

### Validating a complex record

We can define complex guards that include other guards

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

### Validating a complex generic record

We can define high-order guards that dynamically include other guards

```typescript
import { Guard, z } from "@hazae41/gardien"

const RpcRequestGuard = <M extends Guard<string, string>, P extends Guard>(method: M, params: P) => z.record({
  jsonrpc: z.strong("2.0"),
  id: z.union([z.strong(null), z.number(), z.string()]),
  method: method,
  params: params
} as const)

const ExampleParamsGuard = z.record({
  example: z.string()
} as const)

const request = Guard.asOrThrow(RpcRequestGuard(z.strong("example"), ExampleParamsGuard), JSON.parse(message) as unknown)
```

### Validating with your own logic

```typescript
class IPv4Guard {

  static asOrThrow(value: string): string {
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value))
      throw new Error()
    return value
  }

}

Guard.asOrThrow(z.string().pipe(IPv4Guard, "This is not an IPv4 address"), input)
```

### Parsing with your own logic

```typescript
class ZeroHexlifyGuard {

  static asOrThrow(value: any): `0x${string}` {
    return `0x${BigInt(value).toString(16)}`
  }

}

const hex = Guard.asOrThrow(ZeroHexlifyGuard, "12345")
```