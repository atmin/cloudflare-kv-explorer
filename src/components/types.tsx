export type Accessor = (value?: string | number) => void | string | number;

export type SettingsProps = {
  useLocalStorage: (variableName: string) => any[2];
};
