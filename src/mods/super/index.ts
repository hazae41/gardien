
/**
 * Accept a value of supertype of `T` 
 */
export type Super<X, T> = T extends X ? X : never

/**
 * Accept a value of supertype or subtype of `T`
 */
export type Related<X, T> = X extends T ? X : T extends X ? X : never

/**
 * Restructure `T` to have the same keys as `X`
 */
export type Restruct<X, T> = T extends readonly (infer U)[] ? { [K in keyof X]: U } : T

/**
 * Force literal type to be inferred
 */
export type Resolve<T> = T extends Super<T, T> ? T : never

/**
 * Accept a value of recursive subtype or supertype of `T`
 */
export type AllRelated<T, U> =
  T extends object ? (
    U extends object ? (
      { [K in keyof T]: K extends keyof U ? Related<T[K], U[K]> : T[K] }
    ) : (
      never
    )
  ) : (
    Related<T, U & { [K in keyof T]: K extends keyof U ? Related<T[K], U[K]> : T[K] }>
  )

export type Childest<A, B> = B extends A ? B : A extends B ? B : never