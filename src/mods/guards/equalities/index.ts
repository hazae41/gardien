import { Override, Super } from "../../super"

export class StrongEqualityGuard<T> {

  constructor(
    readonly value: T
  ) { }

  asOrThrow<X extends T>(value: X): X

  // @ts-ignore
  asOrThrow<X>(value: Super<X, Override<X, T>>): Override<X, T>

  asOrThrow(value: unknown): T {
    if (value !== this.value)
      throw new Error()
    return value as T
  }

}

export class WeakEqualityGuard<T> {

  constructor(
    readonly value: T
  ) { }

  asOrThrow<X extends T>(value: X): X

  // @ts-ignore
  asOrThrow<X>(value: Super<X, Override<X, T>>): Override<X, T>

  asOrThrow(value: unknown): T {
    if (value != this.value)
      throw new Error()
    return value as T
  }

}