export type Accessor = (value?: string | number) => void | string | number;

export type LocalStorageAccessor = (variableName: string) => any[2];
