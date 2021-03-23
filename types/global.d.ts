declare interface Window {
  process: any;
  NODE_ENV: any;
}
declare module '*.scss' {
  const styles: any;
  export default styles;
}

/** redux store */
declare type ReduxStore = Record<string, any>;

declare type Primitive = bigint | boolean | null | number | string | symbol | undefined;

declare type PlainObject = {
  [key: string]: Primitive | PlainObject;
};

declare type JSONLike = Primitive | PlainObject | Array<Primitive | PlainObject> | { [key: string]: JSONLike } | Array<JSONLike>;
