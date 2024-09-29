export type Sup<X, T> = T extends X ? X : T

export type Inf<X, T> = T extends X ? T : X

export type Resup<X, T> = Sup<X, { [K in keyof T]: K extends keyof X ? Resup<X[K], T[K]> : T[K] }>

export type Reinf<X, T> = Inf<X, { [K in keyof T]: K extends keyof X ? Reinf<X[K], T[K]> : T[K] }>
