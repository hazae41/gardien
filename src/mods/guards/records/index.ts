import { Guard } from "mods/guard/index.js"
import { parse } from "mods/parse/index.js"
import { Property } from "mods/props/index.js"
import { Parentest, Related, Restruct } from "mods/super/index.js"
import { optional, readonly } from "mods/toolbox/index.js"
import { NumberGuard } from "../primitives/index.js"

export class RecordGuard<T extends { [k: PropertyKey]: Property<Guard<any, any>> }> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow(value: Guard.Overloaded.AllWeakOrSelf<Property.AllUnwrapped<T>>): Guard.Overloaded.AllOutputOrSelf<Property.AllUnwrapped<T>>

  asOrThrow(value: Guard.Overloaded.AllStrongOrSelf<Property.AllUnwrapped<T>>): Guard.Overloaded.AllOutputOrSelf<Property.AllUnwrapped<T>>

  asOrThrow(value: Guard.Overloaded.AllWeakOrSelf<Property.AllUnwrapped<T>>): Guard.Overloaded.AllOutputOrSelf<Property.AllUnwrapped<T>> {
    const result: Record<PropertyKey, unknown> = {}

    let cause = []

    for (const key of Reflect.ownKeys(this.guard)) {
      const guard = this.guard[key]

      if (guard instanceof Property.Optional) {
        if (key in value === false)
          continue
        if ((value as any)[key] === undefined)
          continue

        try {
          result[key] = guard.value.asOrThrow((value as any)[key])
          continue
        } catch (e: unknown) {
          cause.push(e)
          continue
        }
      }

      if (guard instanceof Property.Readonly) {
        if (key in value === false) {
          cause.push(new Error())
          continue
        }

        try {
          result[key] = guard.value.asOrThrow((value as any)[key])
          continue
        } catch (e: unknown) {
          cause.push(e)
          continue
        }
      }

      if (key in value === false) {
        cause.push(new Error())
        continue
      }

      try {
        result[key] = guard.asOrThrow((value as any)[key])
        continue
      } catch (e: unknown) {
        cause.push(e)
        continue
      }
    }

    if (cause.length > 0)
      throw new Error(undefined, { cause })

    return result as Guard.Overloaded.AllOutputOrSelf<Property.AllUnwrapped<T>>
  }

}

type Y = {
  a: number,
  b?: number,
  c: number,
  d: 456
}

type F<T, U> = Related<T, { [K in keyof U]: K extends keyof T ? Parentest<T[K], U[K]> : U[K] }>

function f<X>(z: F<X, Y>) { }

f({ a: null as unknown, b: null as unknown, c: 123, d: 456 } as const)
f({ a: null as unknown, b: 23, c: 123, d: 456 } as const)
f({ a: 123, b: "", c: 123, d: 456 } as const)

// const arg = { a: null as unknown, b: 23, c: 123 } as const

// type A<T, U> = { [K in keyof T]: K extends keyof U ? Related<T[K], U[K]> : T[K] }

// type X = A<typeof arg, Y>

type G<T, U> = Related<T, { [K in keyof U]: K extends keyof T ? Parentest<T[K], U[K]> : U[K] }>

function g<X>(z: G<X, Restruct<X, string & { length: 12 }>>): X { return z }

g(null as any as string)
g("")
g(123)
g(null as unknown)

type H<T, U> = Related<T, { [K in keyof U]: K extends keyof T ? Parentest<T[K], U[K]> extends never ? U[K] : Parentest<T[K], U[K]> : U[K] }>

function h<X>(z: H<X, Restruct<X, readonly number[]>>): X { return z }

h([null as unknown, 44,] as const)

type X = Parentest<string, number>

const result = Guard.asOrThrow(
  parse({
    a: NumberGuard,
    b: optional(NumberGuard),
    c: readonly(NumberGuard),
  }),
  {
    a: null as unknown,
    b: 123,
    c: 123,
  } as const
)

