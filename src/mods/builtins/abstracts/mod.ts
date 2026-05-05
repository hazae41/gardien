export class PassGuard<T = unknown> {

  asOrThrow(value: unknown): T {
    return value as T
  }

}

export class FailGuard {

  static asOrThrow(_: unknown): never {
    throw new Error()
  }

}