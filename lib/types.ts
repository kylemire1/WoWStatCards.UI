type QueryOptions<KeyName> = {
  key: KeyName;
  fetcher: (...args: Array<any>) => any;
  getKeyWithArgs?: (...args: Array<any>) => Record<any, any>;
};
export type Queries<TFetchers> = Record<
  keyof TFetchers,
  QueryOptions<keyof TFetchers>
>;

export type OnlyChildren = { children: React.ReactNode };
