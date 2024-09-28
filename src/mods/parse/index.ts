import { Guard } from "mods/guard/index.js"
import { NullGuard, RecordGuard, StrongEqualityGuard, TupleGuard } from "mods/guards/index.js"
import { Property } from "mods/props/index.js"

export type Parsed<T> =
  T extends any[] ? never :
  T extends Guard<any, any> ? T :
  T extends readonly any[] ? TupleGuard<AllSubparsed<T>> :
  T extends { [k: PropertyKey]: Property<any> } ? RecordGuard<AllSubparsed<T>> :
  Guard.Overloaded<unknown, T, T>

export type Subparsed<T> =
  T extends Property.Optional<infer U> ? Property.Optional<Subparsed<U>> :
  T extends Property.Readonly<infer U> ? Property.Readonly<Subparsed<U>> :
  Parsed<T>

export type AllParsed<T> = { [K in keyof T]: Parsed<T[K]> }

export type AllSubparsed<T> = { [K in keyof T]: Subparsed<T[K]> }

export function parse<T>(value: T): Parsed<T> {
  if (value == null)
    return NullGuard as any

  if (Array.isArray(value))
    return new TupleGuard(value.map(x => parse(x))) as any

  if (Object.getPrototypeOf(value) === Object.prototype)
    return new RecordGuard(Object.fromEntries(Object.entries(value).map(([k, v]) => {
      if (v instanceof Property.Readonly)
        return [k, new Property.Readonly(parse(v.value))]
      if (v instanceof Property.Optional)
        return [k, new Property.Optional(parse(v.value))]
      return [k, parse(v)]
    }))) as any

  if (typeof value === "object" && "asOrThrow" in value)
    return value as any

  return new StrongEqualityGuard(value) as any
}