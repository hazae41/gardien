import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
import { NumberGuard } from "mods/guards/primitives/index.js"
import { ZeroHexStringGuard } from "mods/index.js"
import { parse } from "mods/parse/index.js"
import { Property } from "mods/props/index.js"
import { optional, readonly } from "mods/toolbox/index.js"

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

Guard.asOrThrow(
  new Errorer(
    parse({
      a: 123,
      b: optional(ZeroHexStringGuard),
      c: readonly(NumberGuard),
    } as const),
    () => new Error("Could not parse")
  ),
  {
    a: 123,
    b: "0x",
    c: 122,
  } as const
)

