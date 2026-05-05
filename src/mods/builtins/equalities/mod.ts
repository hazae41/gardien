export class StrongGuard<T> {

  constructor(
    readonly value: T
  ) { }

  asOrThrow(value: unknown): T {
    if (value !== this.value)
      throw new Error()
    return value as T
  }

}

export class WeakGuard<T> {

  constructor(
    readonly value: T
  ) { }

  asOrThrow(value: unknown): T {
    if (value != this.value)
      throw new Error()
    return value as T
  }

}