import { ThenGuard } from "@/mods/builtins/logicals/mod.ts";
import { Guard } from "@/mods/guard/mod.ts";

export class Wrapper<T extends Guard<any, any>> {

  constructor(
    readonly guard: T
  ) { }

  as(value: Guard.Input<T>): Guard.Output<T> {
    return this.guard.as(value)
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

  as(value: Guard.Input<T>): Guard.Output<T> {
    try {
      return this.guard.as(value)
    } catch (cause: unknown) {
      throw this.error(cause)
    }
  }

}