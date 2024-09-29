/**
 * Force literal type to be inferred
 */
export type Resolve<T> = T extends (T extends T ? T : never) ? T : never

/**
 * Restructure `T` to have the same keys as `X`
 */
export type Restruct<X, T> = X extends readonly any[] ? (T extends readonly (infer U)[] ? T extends readonly [any, ...any[]] ? T : { [K in keyof X]: U } : T) : T

export type Sup<X, T> = T extends X ? X : T

export type Inf<X, T> = T extends X ? T : X

export type Resup<X, T> = unknown extends X ? Sup<X, T> : { [K in keyof T]: K extends keyof X ? Resup<X[K], T[K]> : T[K] }
