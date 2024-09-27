
export class StrongEqualityGuard<T> {

  constructor(
    readonly value: T
  ) { }

  asOrThrow(value: unknown): T

  asOrThrow(value: T): T

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

  asOrThrow(value: unknown): T

  asOrThrow(value: T): T

  asOrThrow(value: unknown): T {
    if (value != this.value)
      throw new Error()
    return value as T
  }

}