import { Guard } from "mods/guard/index.js"
import { IsSame } from "mods/same/index.js"
import { Override, Super } from "mods/super/index.js"

export class Errorer<T extends Guard<any, any>> {

  constructor(
    readonly guard: T,
    readonly error: () => Error
  ) { }

  asOrThrow<X extends Guard.Overloaded.Strong<T>>(value: X): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? X : Guard.Overloaded.Output<T>

  asOrThrow<X extends Guard.Overloaded.Weak<T>>(value: Super<X, Override<X, Required<Guard.Overloaded.Strong<T>>>>): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? Override<X, Guard.Overloaded.Output<T>> : Guard.Overloaded.Output<T>

  asOrThrow(this: Errorer<Guard.Overloaded.Infer<T>>, value: Guard.Overloaded.Weak<T>): Guard.Overloaded.Output<T> {
    try {
      return this.guard.asOrThrow(value)
    } catch (error) {
      throw this.error()
    }
  }

}
