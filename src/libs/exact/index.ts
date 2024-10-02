/**
 * Force to infer exact type (e.g. f<T>(x: Exact<T>) => x, f(1): 1; whereas f<T>(x: T) => x, f(1): number)
 */
export type Exact<T> = T extends (T extends T ? T : never) ? T : never