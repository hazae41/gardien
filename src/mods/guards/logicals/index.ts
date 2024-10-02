import { Guard } from "mods/guard/index.js"

export class InterGuard<A extends Guard.Overloaded<any, any, any>, B extends Guard.Overloaded<Guard.Overloaded.Output<A>, Guard.Overloaded.Output<A>, any>> {

  constructor(
    readonly left: A,
    readonly right: B
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<A>): Guard.Overloaded.Output<B>

  asOrThrow(value: Guard.Overloaded.Strong<B>): Guard.Overloaded.Output<B>

  asOrThrow(value: Guard.Overloaded.Weak<A>): Guard.Overloaded.Output<B> {
    return this.right.asOrThrow(this.left.asOrThrow(value))
  }

}

export class UnionGuard<A extends Guard.Overloaded<any, any, any>, B extends Guard.Overloaded<any, any, any>> {

  constructor(
    readonly left: A,
    readonly right: B
  ) { }

  asOrThrow(value: Guard.Overloaded.Weak<A> | Guard.Overloaded.Weak<B>): (Guard.Overloaded.Output<A> | Guard.Overloaded.Output<B>)

  asOrThrow(value: Guard.Overloaded.Strong<A> | Guard.Overloaded.Strong<B>): (Guard.Overloaded.Output<A> | Guard.Overloaded.Output<B>)

  asOrThrow(value: Guard.Overloaded.Weak<A> | Guard.Overloaded.Weak<B>): (Guard.Overloaded.Output<A> | Guard.Overloaded.Output<B>) {
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