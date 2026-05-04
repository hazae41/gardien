import { Guard } from "@/mods/guard/index.ts";

export class RecordGuard<T extends { [k: PropertyKey]: Guard<any, any> }> {

  constructor(
    readonly guard: T
  ) { }

  asOrThrow(value: Guard.AllInput<T>): Guard.AllOutput<T> {
    const result: Record<PropertyKey, unknown> = {}

    for (const key in this.guard)
      result[key] = this.guard[key].asOrThrow(value[key])

    return result as Guard.AllOutput<T>
  }

}