export class AnyGuard {

  constructor() { }

  static asOrThrow(value: any): any {
    return value
  }

  asOrThrow(value: any): any {
    return value
  }

}

export class NeverGuard {

  constructor() { }

  static asOrThrow(value: never): never {
    throw new Error()
  }

  asOrThrow(value: never): never {
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