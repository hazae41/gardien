export class PassGuard<T = unknown> {

  as(value: unknown): T {
    return value as T
  }

}

export class FailGuard {

  static as(_: unknown): never {
    throw new Error()
  }

}