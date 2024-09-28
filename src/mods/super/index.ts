
/**
 * Accept a value of supertype of `T` 
 */
export type Super<A, B> = B extends A ? A : never

/**
 * Accept a value of supertype or subtype of `T`
 */
export type Related<A, B> = A extends B ? A : B extends A ? A : never

/**
 * Restructure `T` to have the same keys as `S`
 */
export type Restruct<S, T> = T extends readonly (infer U)[] ? { [K in keyof S]: U } : T

/**
 * Force literal type to be inferred
 */
export type Resolve<T> = T extends Super<T, T> ? T : never

/**
 * Override type `X` with type `S`
 */
export type Override<A, B> = A extends readonly unknown[] ? (
  B extends readonly (infer T)[] ? (
    { [K in keyof A]: T }
  ) : (
    Omit<A, keyof B> & B
  )
) : (
    Omit<A, keyof B> & B
  )