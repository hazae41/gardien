import { Guard } from "mods/guard/index.js"
import { Property } from "mods/props/index.js"
import { Related } from "mods/super/index.js"

export class RecordGuard<T extends { [k: PropertyKey]: Property<Guard<any, any>> }> {

  constructor(
    readonly guard: T
  ) { }

  // @ts-ignore
  asOrThrow(value: Guard.Overloaded.AllWeakOrSelf<Property.AllUnwrapped<T>>): Guard.Overloaded.AllOutputOrSelf<Property.AllUnwrapped<T>>

  // @ts-ignore
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
}

type AllRelated<T, U> =
  T extends object ? (
    U extends object ? (
      { [K in keyof T]: K extends keyof U ? Related<T[K], U[K]> : T[K] }
    ) : (
      never
    )
  ) : (
    Related<T, U & { [K in keyof T]: K extends keyof U ? Related<T[K], U[K]> : T[K] }>
  )

/**
 * Restructure `T` to have the same keys as `S`
 */
type Restruct<S, T> = T extends readonly (infer U)[] ? { [K in keyof S]: U } : T

function f<X>(z: AllRelated<X, Y>) { }

f({ a: null as unknown, b: "", c: 123 } as const)

function g<X>(z: AllRelated<X, Restruct<X, string & { length: 123 }>>): X { return z }

g(null as any as string & { length: 123 })

function h<X>(z: AllRelated<X, Restruct<X, readonly number[]>>): X { return z }

h([null as unknown, 123] as const)

// Guard.asOrThrow(
//   new RecordGuard({
//     a: NumberGuard,
//     b: optional(NumberGuard),
//     c: readonly(NumberGuard),
//   }),
//   {
//     a: null as unknown,
//     b: 123,
//     c: 123,
//   } as const
// )

