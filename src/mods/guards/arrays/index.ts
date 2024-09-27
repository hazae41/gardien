import { Guard } from "mods/guard/index.js"

export class ArrayGuard {

  constructor() { }

  static asOrThrow(value: unknown): readonly unknown[]

  static asOrThrow(value: readonly unknown[]): readonly unknown[]

  static asOrThrow(value: unknown): readonly unknown[] {
    if (!Array.isArray(value))
      throw new Error()
    return value
  }

  asOrThrow(value: unknown): readonly unknown[]

  asOrThrow(value: readonly unknown[]): readonly unknown[]

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

  asOrThrow(value: readonly Guard.Overloaded.Weak<T>[]): readonly Guard.Overloaded.Output<T>[]

  asOrThrow(value: readonly Guard.Overloaded.Strong<T>[]): readonly Guard.Overloaded.Output<T>[]

  asOrThrow(this: ElementsGuard<Guard.Overloaded.Infer<T>>, value: readonly Guard.Overloaded.Weak<T>[]): readonly Guard.Overloaded.Output<T>[] {
    return value.map(x => this.guard.asOrThrow(x))
  }

}

export class ArrayAndElementsGuard<T extends Guard<unknown, any>> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow(value: unknown): readonly Guard.Overloaded.Output<T>[]

  asOrThrow(value: readonly Guard.Overloaded.Strong<T>[]): readonly Guard.Overloaded.Output<T>[]

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

  asOrThrow(value: Guard.Overloaded.AllWeak<T>): Guard.Overloaded.AllOutput<T>

  asOrThrow(value: Guard.Overloaded.AllStrong<T>): Guard.Overloaded.AllOutput<T>

  asOrThrow(this: TupleGuard<Guard.Overloaded.AllInfer<T>>, value: Guard.Overloaded.AllWeak<T>): Guard.Overloaded.AllOutput<T> {
    if (value.length !== this.guards.length)
      throw new Error()
    return value.map((x, i) => this.guards[i].asOrThrow(x)) as Guard.Overloaded.AllOutput<T>
  }

}