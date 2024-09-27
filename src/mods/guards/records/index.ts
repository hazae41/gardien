import { Errorer } from "mods/errorer/index.js"
import { Guard } from "mods/guard/index.js"
import { NumberGuard } from "mods/guards/primitives/index.js"
import { Property } from "mods/props/index.js"
import { Override, Super } from "mods/super/index.js"

export class RecordGuard<T extends { [k: PropertyKey]: Property<Guard<any, any>> }> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow<X extends Guard.Overloaded.AllStrongOrSelf<Property.AllUnwrapped<T>>>(value: X): X

  asOrThrow<X extends Guard.Overloaded.AllWeakOrSelf<Property.AllUnwrapped<T>>>(value: Super<X, Override<X, Required<Guard.Overloaded.AllStrongOrSelf<Property.AllUnwrapped<T>>>>>): Override<X, Guard.Overloaded.AllOutputOrSelf<Property.AllUnwrapped<T>>>

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

new RecordGuard({
  a: NumberGuard,
  b: new Property.Optional(NumberGuard),
  c: new Property.Readonly(NumberGuard),
}).asOrThrow({
  a: null as unknown,
  b: 123,
  c: null as unknown,
})

new Errorer(new RecordGuard({
  a: NumberGuard,
  b: new Property.Optional(NumberGuard),
  c: new Property.Readonly(NumberGuard),
}), () => new Error()).asOrThrow({
  a: null as unknown,
  b: 13,
  c: null as unknown,
})