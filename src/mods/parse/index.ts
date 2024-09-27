import { Finalize } from "libs/finalize/index.js"
import { Guard } from "mods/guard/index.js"
import { ArrayAndElementsGuard, BigIntGuard, BooleanGuard, InterGuard, NullGuard, NumberGuard, ObjectGuard, RecordGuard, StrongEqualityGuard, SymbolGuard, TupleGuard, UnionGuard } from "mods/guards/index.js"
import { StringGuard } from "mods/guards/strings/index.js"
import { Property } from "mods/props/index.js"

export type Parsed<T> =
  T extends unknown[] ? never :
  T extends Guard<unknown, unknown> ? T :
  T extends readonly unknown[] ? Guard<unknown, Finalize<Guard.AllOutput<AllParsed<T>>>> :
  T extends object ? Guard<unknown, Finalize<Guard.AllOutput<AllParsed<Property.AllUnwrapped<T>>>>> :
  Guard<unknown, T>

export type AllParsed<T> = { [K in keyof T]: Parsed<T[K]> }

export interface Toolbox {
  readonly boolean: Guard<unknown, boolean>
  readonly string: Guard<unknown, string>
  readonly number: Guard<unknown, number>
  readonly bigint: Guard<unknown, bigint>
  readonly object: Guard<unknown, object>
  readonly symbol: Guard<unknown, symbol>

  readonly optional: <T>(value: T) => Property.Optional<T>
  readonly readonly: <T>(value: T) => Property.Readonly<T>

  readonly array: <T>(inner: T) => Guard<unknown, Guard.Output<Parsed<T>>[]>

  readonly inter: <I, M, O>(a: Guard<I, M>, b: Guard<M, O>) => Guard<I, O>

  readonly union: <I, A, B>(a: Guard<I, A>, b: Guard<I, B>) => Guard<I, A | B>
}

export function parse<T>(f: (toolbox: Toolbox) => T): Parsed<T> {
  const boolean = BooleanGuard
  const string = StringGuard
  const number = NumberGuard
  const bigint = BigIntGuard
  const object = ObjectGuard
  const symbol = SymbolGuard

  function optional<T>(value: T): Property.Optional<T> {
    return new Property.Optional(value)
  }

  function readonly<T>(value: T): Property.Readonly<T> {
    return new Property.Readonly(value)
  }

  function array<T>(inner: T): Guard<unknown, Guard.Output<Parsed<T>>[]> {
    return new ArrayAndElementsGuard(parse(() => inner))
  }

  function inter<I, M, O>(a: Guard<I, M>, b: Guard<M, O>): Guard<I, O> {
    return new InterGuard(a, b)
  }

  function union<I, A, B>(a: Guard<I, A>, b: Guard<I, B>): Guard<I, A | B> {
    return new UnionGuard(a, b)
  }

  const value = f({ boolean, string, number, bigint, object, symbol, optional, readonly, array, inter, union })

  if (value == null)
    return NullGuard as any

  if (Array.isArray(value))
    return new TupleGuard(value.map(x => parse(() => x))) as any

  if (Object.getPrototypeOf(value) === Object.prototype)
    return new RecordGuard(Object.fromEntries(Object.entries(value).map(([k, v]) => {
      if (v instanceof Property.Readonly)
        return [k, readonly(parse(() => v.value))]
      if (v instanceof Property.Optional)
        return [k, optional(parse(() => v.value))]
      return [k, parse(() => v)]
    }))) as any

  if (typeof value === "object" && "asOrThrow" in value)
    return value as any

  return new StrongEqualityGuard(value) as any
}