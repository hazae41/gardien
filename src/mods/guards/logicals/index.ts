import { Guard } from "mods/guard/index.js"
import { ArrayGuard, ElementsGuard } from "mods/guards/arrays/index.js"
import { StringGuard } from "mods/guards/strings/index.js"

export class UnionGuard<W, S extends W, A, B> {

  constructor(
    readonly left: Guard.Overloaded<W, S, A>,
    readonly right: Guard.Overloaded<W, S, B>
  ) { }

  asOrThrow(value: W): (A | B) {
    let cause = []

    try {
      return this.left.asOrThrow(value)
    } catch (e: unknown) {
      cause.push(e)
    }

    try {
      return this.right.asOrThrow(value)
    } catch (e: unknown) {
      cause.push(e)
    }

    throw new Error(undefined, { cause })
  }

}

export class InterGuard<W, S extends W, M, O> {

  constructor(
    readonly left: Guard.Overloaded<W, S, M>,
    readonly right: Guard.Overloaded<M, M, O>
  ) { }

  asOrThrow(value: W): O {
    return this.right.asOrThrow(this.left.asOrThrow(value))
  }

}

new InterGuard(ArrayGuard, new ElementsGuard(StringGuard)).asOrThrow([null as unknown] as const)

function test<T extends Guard.Overloaded<unknown, string, number>>(guard: T) {

}

// function infer<T extends Guard<string, number>>(guard: T): Guard.Output<T> {
//   return guard.asOrThrow("")
// }

test(StringGuard)

