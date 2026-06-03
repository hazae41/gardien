import { Guard } from "@/mods/guard/mod.ts"

export class ArrayGuard {

  constructor() { }

  static as(value: unknown): readonly unknown[] {
    if (!Array.isArray(value))
      throw new Error()
    return value
  }

  as(value: unknown): readonly unknown[] {
    if (!Array.isArray(value))
      throw new Error()
    return value
  }

}

export class ElementsGuard<T extends Guard<any, any>> {

  constructor(
    readonly guard: T
  ) { }

  as(value: readonly Guard.Input<T>[]): readonly Guard.Output<T>[] {
    return value.map(x => this.guard.as(x))
  }

}

export class TupleGuard<T extends readonly Guard<any, any>[]> {

  constructor(
    readonly guards: T
  ) { }

  as(value: Guard.AllInput<T>): Guard.AllOutput<T> {
    if (value.length !== this.guards.length)
      throw new Error()
    return value.map((x, i) => this.guards[i].as(x)) as Guard.AllOutput<T>
  }

}