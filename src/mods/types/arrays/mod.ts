import { Guard } from "@/mods/guard/mod.ts"

export class ArrayGuard {

  constructor() { }

  static asOrThrow(value: unknown): readonly unknown[] {
    if (!Array.isArray(value))
      throw new Error()
    return value
  }

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

  asOrThrow(value: readonly Guard.Input<T>[]): readonly Guard.Output<T>[] {
    return value.map(x => this.guard.asOrThrow(x))
  }

}

export class TupleGuard<T extends readonly Guard<any, any>[]> {

  constructor(
    readonly guards: T
  ) { }

  asOrThrow(value: Guard.AllInput<T>): Guard.AllOutput<T> {
    if (value.length !== this.guards.length)
      throw new Error()
    return value.map((x, i) => this.guards[i].asOrThrow(x)) as Guard.AllOutput<T>
  }

}