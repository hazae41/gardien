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
- Under-engineered
- Unit-tested
- Zod-like syntax

## Usage

### Parsing a number

We can parse something as a number and then validate it

```typescript
import { asOrThrow, $numberable, $number } from "@hazae41/gardien"

const value = asOrThrow($numberable().then($number.nonNegative()), "0x123")
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
import { asOrThrow, $string } from "@hazae41/gardien"

asOrThrow($string().then($length.minmax(6, 24, "Password must be between 6 and 24 characters")), password)
```

This is like

```typescript
if (typeof password !== "string")
  throw new Error()
if (password.length < 6 || password.length > 24)
  throw new Error("Password must be between 6 and 24 characters")
```

### Validating a record

We can define complex guards that include other guards

```typescript
const RpcRequestGuard = $object().then($record({
  jsonrpc: $strong("2.0"),
  id: $either([$strong(null), $number(), $string()]),
  method: $string(),
  params: $pass()
} as const))

function onMessage(message: string) {
  const request = asOrThrow(RpcRequestGuard, JSON.parse(message) as unknown)

  if (request.method === "example")
    return void example(request)
  
  throw new Error("Unknown method")
}
```

### Validating a generic record

We can define high-order guards that dynamically include other guards

```typescript
import { Guard } from "@hazae41/gardien"

const RpcRequestGuard = <M extends Guard<unknown, string>, P extends Guard<unknown, unknown>>(method: M, params: P) => $object().then($record({
  jsonrpc: $strong("2.0"),
  id: $union([$strong(null), $number(), $string()]),
  method: method,
  params: params
} as const))

const ExampleRequestGuard = RpcRequestGuard($strong("example"), $object().then($record({
  example: $string()
} as const)))

const request = asOrThrow(ExampleRequestGuard, JSON.parse(message) as unknown)
```

### Validating with your own logic

Make your own guard 

```tsx
export interface Guard<I = any, O = any> {
  asOrThrow(value: I): O
}
```

```tsx
export class IPv4Guard {

  static asOrThrow(value: string): string {
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value))
      throw new Error()
    return value
  }

}
```

Then make an helper (optional)

```tsx
import { $error } from "@hazae41/gardien"

export function $ipv4(message?: string) {
  return $error(IPv4Guard, message)
}
```

Then use it as you wish

```tsx
asOrThrow($string().then($ipv4("This is not an IPv4 address")), input)
```

### Parsing with your own logic

You can parse and transform with your own logic

```tsx
export class ZeroHexlifyGuard {

  static asOrThrow(value: any): `0x${string}` {
    return `0x${BigInt(value).toString(16)}`
  }

}
```

```tsx
console.log(asOrThrow(ZeroHexlifyGuard, "12345")) // 0x3039
```