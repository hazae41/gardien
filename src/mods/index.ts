import { NumberGuard } from "./guards/primitives/index.js"
import { Json } from "./json/index.js"
import { parse } from "./parse/index.js"
import { Super } from "./super/index.js"

export namespace ZeroHexStringGuard {

  export function asOrThrow<X extends `0x${string}`>(value: X): X

  export function asOrThrow<X extends string>(value: Super<X, `0x${string}`>): `0x${string}`

  export function asOrThrow(value: string): `0x${string}` {
    if (!value.startsWith("0x"))
      throw new Error()
    return value as `0x${string}`
  }

}

parse(() => null).asOrThrow(null)
parse(() => "hello" as const).asOrThrow("hello")
parse(() => 123 as const).asOrThrow(123)
parse(() => 123n as const).asOrThrow(123n)
parse(({ string }) => string).asOrThrow("hello")
parse(({ array, string }) => array(string)).asOrThrow(["hello"])

const MyObjectGuard = parse(({ readonly, optional, string }) => ({
  hello: readonly("world" as const),
  world: optional(string)
}))

const myObject = MyObjectGuard.asOrThrow({ hello: "world", world: "aaa" })

console.log(new Json<number>(JSON.stringify(123)).parseOrThrow(NumberGuard))