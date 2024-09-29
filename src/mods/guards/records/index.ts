import { Finalize } from "libs/finalize/index.js"
import { Guard } from "mods/guard/index.js"
import { parse } from "mods/parse/index.js"
import { Property } from "mods/props/index.js"
import { Inf, Restruct, Sup } from "mods/super/index.js"
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

type FI<T, U> = Sup<T, { [K in keyof U]: K extends keyof T ? Sup<T[K], U[K]> : U[K] }>
type FO<T, U> = Inf<U, U & { [K in keyof T]: K extends keyof U ? Inf<T[K], U[K]> : T[K] }>

function f<X>(z: FI<X, Y>): Finalize<FO<X, Y>> { return null as any }

f({ a: null as unknown, b: null as unknown, c: 123, d: 456 } as const)
f({ a: null as unknown, b: 23, c: 123, d: 456 } as const)
f({ a: 123, b: "", c: 123, d: 456 } as const)

type GI<T, U> = Sup<T, { [K in keyof U]: K extends keyof T ? Sup<T[K], U[K]> : U[K] }>
type GO<T, U> = Inf<{ [K in keyof U]: K extends keyof T ? Inf<T[K], U[K]> : U[K] }, { [K in keyof T]: K extends keyof U ? Inf<U[K], T[K]> : T[K] }>

function g<X>(z: GI<X, Restruct<X, string>>): GO<X, string & { length: 12 }> { return z as any }

function json(x: string & { length: 12 }) {
  return JSON.parse(x)
}

g(null as any as string & { length: 12 })

g("")
g(123)
g(null as unknown)

type HI<T, U> = Sup<T, { [K in keyof U]: K extends keyof T ? Sup<T[K], U[K]> : U[K] }>
type HO<T, U> = Inf<U, U & { [K in keyof T]: K extends keyof U ? Inf<T[K], U[K]> : T[K] }>

function h<X>(z: HI<X, Restruct<X, readonly number[]>>): HO<X, Restruct<X, readonly number[]>> { return z as any }

const [a, b] = h([null as unknown, 456] as const)

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

