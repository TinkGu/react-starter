declare module 'jumpstate' {
  export const ActionCreators: {};
  export const Actions: {};
  export function CreateJumpstateMiddleware(options?: any): any;
  export function Effect(name: any, callback: any, ...args: any[]): any;
  export function Hook(callback: any): any;
  export function State(...args: any[]): any;
  export function dispatch(...args: any[]): any;
  export function getState(...args: any[]): any;
}
