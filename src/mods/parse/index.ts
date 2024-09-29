import { Guard } from "mods/guard/index.js"
import { RecordGuard, StrongEqualityGuard, TupleGuard } from "mods/guards/index.js"
import { Property } from "mods/props/index.js"
import { optional, readonly, string } from "mods/toolbox/index.js"

export type Parsed<T> =
  T extends any[] ? never :
  T extends Guard<any, any> ? T :
  T extends readonly any[] ? TupleGuard<AllSubparsed<T>> :
  T extends { [k: PropertyKey]: Property<any> } ? RecordGuard<AllSubparsed<T>> :
  StrongEqualityGuard<T>

export type Subparsed<T> =
  T extends Property.Optional<infer U> ? Property.Optional<Subparsed<U>> :
  T extends Property.Readonly<infer U> ? Property.Readonly<Subparsed<U>> :
  Parsed<T>

export type AllParsed<T> = { [K in keyof T]: Parsed<T[K]> }

export type AllSubparsed<T> = { [K in keyof T]: Subparsed<T[K]> }

export function parse<T>(value: T): Parsed<T> {
  if (value == null)
    return new StrongEqualityGuard(value) as any

  if (typeof value !== "object")
    return new StrongEqualityGuard(value) as any

  if (Array.isArray(value))
    return new TupleGuard(value.map(x => parse(x)) as any) as any

  if ("asOrThrow" in value)
    return value as any

  function subparse<T>(value: T): Subparsed<T> {
    if (value instanceof Property.Optional)
      return new Property.Optional(subparse(value.value)) as any
    if (value instanceof Property.Readonly)
      return new Property.Readonly(subparse(value.value)) as any
    return parse(value) as any
  }

  return new RecordGuard(Object.fromEntries(Object.entries(value).map(([k, v]) => [k, subparse(v)]))) as any
}

const x = parse({
  a: optional(readonly(string())),
})

x.guard.a