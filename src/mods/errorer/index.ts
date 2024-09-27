import { Guard } from "mods/guard/index.js"

export class Errorer<T extends Guard<any, any>> {

  constructor(
    readonly guard: T,
    readonly error: (cause: unknown) => Error
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T>

  asOrThrow(value: Guard.Overloaded.Strong<T>): Guard.Overloaded.Output<T>

  asOrThrow(this: Errorer<Guard.Overloaded.Infer<T>>, value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T> {
    try {
      return this.guard.asOrThrow(value)
    } catch (cause: unknown) {
      throw this.error(cause)
    }
  }

}
