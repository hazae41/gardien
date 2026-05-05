import { Inter, Union } from "@/libs/logical/mod.ts";
import { Guard } from "@/mods/guard/mod.ts";

export class ThenGuard<A extends Guard<any, any>, B extends Guard<any, any>> {

  constructor(
    readonly a: A,
    readonly b: B,
  ) { }

  asOrThrow(value: Guard.Input<A>): Guard.Output<B> {
    return this.b.asOrThrow(this.a.asOrThrow(value))
  }

}

export class EitherGuard<T extends readonly Guard<any, any>[]> {

  constructor(
    readonly guards: T,
  ) { }

  asOrThrow(value: Inter<Guard.AllInput<T>>): Union<Guard.AllOutput<T>> {
    for (const guard of this.guards) {
      try {
        return guard.asOrThrow(value)
      } catch {
        continue
      }
    }

    throw new Error()
  }

}