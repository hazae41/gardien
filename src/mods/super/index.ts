
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

export type Exo<X, T> = T extends X ? X : T

export type AllExo<X, T> = { [K in keyof T]: K extends keyof X ? Exo<X[K], T[K]> : T[K] }

export type Unexo<X, T> = T extends X ? T : X