import { Inter } from "libs/inter/index.js";
import { Union } from "libs/union/index.js";
import { Guard } from "mods/guard/index.js";

export class InterGuard<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]> {

  constructor(
    readonly guards: T
  ) { }

  asOrThrow(value: Union<Guard.Overloaded.AllWeak<T>>): Inter<Guard.Overloaded.AllOutput<T>>

  asOrThrow(value: Inter<Guard.Overloaded.AllStrong<T>>): Inter<Guard.Overloaded.AllOutput<T>>

  asOrThrow(value: unknown): Inter<Guard.Overloaded.AllOutput<T>> {
    for (const guard of this.guards)
      value = guard.asOrThrow(value)
    return value as any
  }

}

export class UnionGuard<T extends readonly [Guard.Overloaded<any, any, any>, ...Guard.Overloaded<any, any, any>[], Guard.Overloaded<any, any, any>]> {

  constructor(
    readonly guards: T,
  ) { }

  asOrThrow(value: Union<Guard.Overloaded.AllWeak<T>>): Union<Guard.Overloaded.AllOutput<T>>

  asOrThrow(value: Union<Guard.Overloaded.AllStrong<T>>): Union<Guard.Overloaded.AllOutput<T>>

  asOrThrow(value: unknown): Union<Guard.Overloaded.AllOutput<T>> {
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