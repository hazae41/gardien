import { Inter } from "libs/inter/index.js";
import { Guard } from "mods/guard/index.js";

export class InterGuard<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]> {

  constructor(
    readonly guards: T
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<T[0]>): Guard.Overloaded.Output<Inter<T[number]>>

  asOrThrow(value: Guard.Overloaded.Strong<T[0]>): Guard.Overloaded.Output<Inter<T[number]>>

  asOrThrow(value: Guard.Overloaded.Weak<T[0]>): Guard.Overloaded.Output<Inter<T[number]>> {
    for (const guard of this.guards)
      value = guard.asOrThrow(value)
    return value as any
  }

}

export class UnionGuard<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]> {

  constructor(
    readonly guards: T,
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<T[number]>): Guard.Overloaded.Output<T[number]>

  asOrThrow(value: Guard.Overloaded.Strong<T[number]>): Guard.Overloaded.Output<T[number]>

  asOrThrow(value: Guard.Overloaded.Weak<T[number]>): Guard.Overloaded.Output<T[number]> {
    let cause = []

    for (const guard of this.guards)
      try {
        return guard.asOrThrow(value)
      } catch (e: unknown) {
        cause.push(e)
      }

    throw new Error(undefined, { cause })
  }

}