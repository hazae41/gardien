import { Guard } from "mods/guard/index.js"
import { IsSame } from "mods/same/index.js"
import { Override, Super } from "mods/super/index.js"

export class ArrayGuard {

  constructor() { }

  static asOrThrow<X extends readonly unknown[]>(value: X): X

  static asOrThrow<X>(value: Super<X, Override<X, readonly unknown[]>>): Override<X, readonly unknown[]>

  static asOrThrow(value: unknown): readonly unknown[] {
    if (!Array.isArray(value))
      throw new Error()
    return value
  }

  asOrThrow<X extends unknown[]>(value: X): X

  asOrThrow<X>(value: Super<X, Override<X, readonly unknown[]>>): Override<X, readonly unknown[]>

  asOrThrow(value: unknown): readonly unknown[] {
    if (!Array.isArray(value))
      throw new Error()
    return value
  }

}

export class ElementsGuard<T extends Guard<any, any>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow<X extends readonly Guard.Overloaded.Strong<T>[]>(value: X): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? X : readonly Guard.Overloaded.Output<T>[]

  asOrThrow<X extends readonly Guard.Overloaded.Weak<T>[]>(value: Super<X, Override<X, readonly Guard.Overloaded.Strong<T>[]>>): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? Override<X, readonly Guard.Overloaded.Output<T>[]> : readonly Guard.Overloaded.Output<T>[]

  asOrThrow(this: ElementsGuard<Guard.Overloaded.Infer<T>>, value: readonly Guard.Overloaded.Weak<T>[]): readonly Guard.Overloaded.Output<T>[] {
    return value.map(x => this.guard.asOrThrow(x))
  }

}

export class ArrayAndElementsGuard<T extends Guard<unknown, any>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow<X extends readonly Guard.Overloaded.Strong<T>[]>(value: X): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? X : readonly Guard.Overloaded.Output<T>[]

  asOrThrow<X>(value: Super<X, Override<X, readonly Guard.Overloaded.Strong<T>[]>>): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? Override<X, readonly Guard.Overloaded.Output<T>[]> : readonly Guard.Overloaded.Output<T>[]

  asOrThrow(this: ArrayAndElementsGuard<Guard.Overloaded.Infer<T>>, value: unknown): Guard.Overloaded.Output<T>[] {
    if (!Array.isArray(value))
      throw new Error()
    return value.map(x => this.guard.asOrThrow(x))
  }

}

export class TupleGuard<T extends readonly Guard<any, any>[]> {

  constructor(
    readonly guards: T
  ) { }

  asOrThrow<X extends Guard.Overloaded.AllStrong<T>>(value: X): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? X : Guard.Overloaded.AllOutput<T>

  // @ts-ignore
  asOrThrow<X extends Guard.Overloaded.AllWeak<T>>(value: Super<X, Override<X, Guard.Overloaded.AllStrong<T>>>): IsSame<Guard.Overloaded.Strong<T>, Guard.Overloaded.Output<T>> extends true ? Override<X, Guard.Overloaded.AllOutput<T>> : Guard.Overloaded.AllOutput<T>

  asOrThrow(this: TupleGuard<Guard.Overloaded.AllInfer<T>>, value: Guard.Overloaded.AllWeak<T>): Guard.Overloaded.AllOutput<T> {
    if (value.length !== this.guards.length)
      throw new Error()
    return value.map((x, i) => this.guards[i].asOrThrow(x)) as Guard.Overloaded.AllOutput<T>
  }

}