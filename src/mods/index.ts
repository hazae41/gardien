import { Guard } from "./guard/index.js"
import { parse } from "./parse/index.js"
import { array, optional, readonly, string } from "./toolbox/index.js"

export namespace ZeroHexStringGuard {

  export function asOrThrow(value: string): `0x${string}`

  export function asOrThrow(value: `0x${string}`): `0x${string}`

  export function asOrThrow(value: string): `0x${string}` {
    if (!value.startsWith("0x"))
      throw new Error()
    return value as `0x${string}`
  }

}

Guard.asOrThrow(parse(null), null)
Guard.asOrThrow(parse("hello" as const), "hello")
Guard.asOrThrow(parse(123 as const), 123)
Guard.asOrThrow(parse(123n as const), 123n)
Guard.asOrThrow(parse(string()), "hello")
Guard.asOrThrow(parse(array(string())), ["hello"] as const)

const MyObjectGuard = parse({
  hello: readonly("world" as const),
  world: optional(string)
})

const myObject = Guard.asOrThrow(MyObjectGuard, { hello: "world", world: "aaa" })