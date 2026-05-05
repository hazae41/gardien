import { ThenGuard } from "@/mods/builtins/logicals/mod.ts";
import { Guard } from "@/mods/guard/mod.ts";

export class Wrapper<T extends Guard<any, any>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow(value: Guard.Input<T>): Guard.Output<T> {
    return this.guard.asOrThrow(value)
  }

  then<U extends Guard<any, any>>(next: U): ThenGuard<T, U> {
    return new ThenGuard(this.guard, next)
  }

}

export class Errorer<T extends Guard<any, any>> extends Wrapper<T> {

  constructor(
    readonly guard: T,
    readonly error: (cause: unknown) => Error
  ) {
    super(guard)
  }

  asOrThrow(value: Guard.Input<T>): Guard.Output<T> {
    try {
      return this.guard.asOrThrow(value)
    } catch (cause: unknown) {
      throw this.error(cause)
    }
  }

}