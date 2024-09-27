import { Guard } from "mods/guard/index.js";

export class Json<T> {

  constructor(
    readonly text: string
  ) { }

  parseOrThrow(guard: Guard<unknown, T>) {
    return guard.asOrThrow(JSON.parse(this.text))
  }

}