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