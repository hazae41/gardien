export class PassGuard<T> {

  asOrThrow(value: T): T

  asOrThrow(value: T): T

  asOrThrow(value: T): T {
    return value
  }

}

export class FailGuard<T> {

  asOrThrow(value: T): never

  asOrThrow(value: T): never

  asOrThrow(value: T): never {
    throw new Error()
  }

}

export class AssertGuard<T> {

  asOrThrow(value: unknown): T

  asOrThrow(value: T): T

  asOrThrow(value: unknown): T {
    return value as T
  }

}